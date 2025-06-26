#import "AgoraRtcNg.h"
#import <AgoraPIPKit/AgoraPIPKit.h>
#import <AgoraRtcWrapper/iris_module.h>
#import <React/RCTUIManager.h>
#import <ReplayKit/ReplayKit.h>
#import <objc/runtime.h>
#include <regex>
#include <string>
#include <vector>

#define EVENT_NAME @"AgoraRtcNg:onEvent"

@interface AgoraNativeView : UIView

@end

@implementation AgoraNativeView

@end

@interface AgoraRtcNg ()

@property(nonatomic, assign) BOOL hasListeners;

@end

namespace agora {
namespace iris {
class EventHandler : public IrisEventHandler {
public:
  EventHandler(void *plugin) { plugin_ = (__bridge AgoraRtcNg *)plugin; }

  void OnEvent(const char *event, const char *data, void **buffer,
               unsigned int *length, unsigned int buffer_count) {
    @autoreleasepool {
      NSMutableArray *array = [NSMutableArray new];
      for (int i = 0; i < buffer_count; ++i) {
        NSString *base64Buffer = [[[NSData alloc] initWithBytes:buffer[i]
                                                         length:length[i]]
            base64EncodedStringWithOptions:
                NSDataBase64EncodingEndLineWithLineFeed];
        [array addObject:base64Buffer];
      }

      if (plugin_.hasListeners) {
        [plugin_
            sendEventWithName:EVENT_NAME
                         body:@{
                           @"event" : [NSString stringWithUTF8String:event],
                           @"data" : [NSString stringWithUTF8String:data],
                           @"buffers" : array
                         }];
      }
    }
  }

  void OnEvent(EventParam *param) override {
    OnEvent(param->event, param->data, param->buffer, param->length,
            param->buffer_count);
  }

private:
  AgoraRtcNg *plugin_;
};
} // namespace iris
} // namespace agora

@interface AgoraRtcNg () <AgoraPIPStateChangedDelegate>

@property(nonatomic) agora::iris::EventHandler *eventHandler;
@property(nonatomic, strong) AgoraPIPController *pipController;
@property(nonatomic, strong) NSMutableArray *_Nonnull nativeViews;

@end

static AgoraRtcNg *instance = nil;

@implementation AgoraRtcNg
RCT_EXPORT_MODULE()

+ (instancetype)shareInstance {
  return instance;
}

- (instancetype)init {
  if (self = [super init]) {
    self.irisApiEngine = nullptr;
    self.nativeViews = [[NSMutableArray alloc] init];
    self.eventHandler = new agora::iris::EventHandler((__bridge void *)self);
    self.pipController = [[AgoraPIPController alloc]
        initWith:(id<AgoraPIPStateChangedDelegate>)self];
    instance = self;
  }
  return instance;
}

- (void)dealloc {
  if (self.irisApiEngine) {
    delete self.irisApiEngine;
  }
  if (self.eventHandler) {
    delete self.eventHandler;
  }
  if (self.pipController) {
    [self.pipController dispose];
    self.pipController = nil;
  }
}

RCT_EXPORT_METHOD(showRPSystemBroadcastPickerView
                  : (BOOL)showsMicrophoneButton resolve
                  : (RCTPromiseResolveBlock)resolve reject
                  : (RCTPromiseRejectBlock)reject) {
  if (@available(iOS 12.0, *)) {
    dispatch_async(dispatch_get_main_queue(), ^{
      NSURL *url = [[NSBundle mainBundle] URLForResource:nil
                                           withExtension:@"appex"
                                            subdirectory:@"PlugIns"];
      NSBundle *bundle = [NSBundle bundleWithURL:url];
      if (bundle) {
        RPSystemBroadcastPickerView *picker =
            [[RPSystemBroadcastPickerView alloc]
                initWithFrame:CGRectMake(0, 0, 100, 200)];
        picker.showsMicrophoneButton = showsMicrophoneButton;
        picker.preferredExtension = bundle.bundleIdentifier;
        for (UIView *view in [picker subviews]) {
          if ([view isKindOfClass:UIButton.class]) {
            [((UIButton *)view)
                sendActionsForControlEvents:UIControlEventAllTouchEvents];
          }
        }
      }
    });
    resolve([NSNull null]);
    return;
  }
  reject(@"", @"not support", nil);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(newIrisApiEngine) {
  if (self.irisApiEngine == nullptr) {
    enableUseJsonArray(true);
    self.irisApiEngine = createIrisRtcEngine(nullptr);
  }
  return [NSNull null];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(destroyIrisApiEngine) {
  if (self.irisApiEngine != nullptr) {
    delete self.irisApiEngine;
    self.irisApiEngine = nullptr;
  }
  return [NSNull null];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(nativeViewCreate) {
  __block NSNumber *result = nil;
  dispatch_sync(dispatch_get_main_queue(), ^{
    UIView *view = [[AgoraNativeView alloc] init];
    [self.nativeViews addObject:view];
    view.translatesAutoresizingMaskIntoConstraints = NO;
    uint64_t viewId = (uint64_t)view;
    result = @(viewId);
  });
  return result;
}

RCT_EXPORT_METHOD(nativeViewDestroy : (nonnull NSDictionary *)options) {
  UIView *view =
      [self findNativeView:[options[@"viewId"] unsignedLongLongValue]];

  if (view) {
    [view removeFromSuperview];           // Remove from parent view hierarchy
    [self.nativeViews removeObject:view]; // Remove from our array
    view = nil;                           // Clear the reference
  }
}

RCT_EXPORT_METHOD(nativeViewSetParent : (nonnull NSDictionary *)options) {

  UIView *view =
      [self findNativeView:[options[@"viewId"] unsignedLongLongValue]];
  UIView *parentView =
      [self findNativeView:[options[@"parentViewId"] unsignedLongLongValue]];

  // remove from previous parent view only it has a parent view and is not
  // the same as the new parent view, even if the new parent view is nil
  if (view.superview && view.superview != parentView) {
    [view removeFromSuperview];
  }

  // if parent view is nil, return true, which means the caller only want to
  // remove the view from its parent view
  if (!parentView) {
    return;
  }

  // if view is not in parent view, insert to new parent view at index if
  // specified
  if (view.superview != parentView) {
    // insert to new parent view at index if specified
    if (options[@"indexOfParentView"]) {
      [parentView insertSubview:view
                        atIndex:[options[@"indexOfParentView"] intValue]];
    } else {
      [parentView addSubview:view];
    }
  } else if (options[@"indexOfParentView"]) {
    // remove and reinsert to new index if it is not the same with the
    // specified index
    if ([options[@"indexOfParentView"] intValue] !=
        [parentView.subviews indexOfObject:view]) {
      [view removeFromSuperview];
      [parentView insertSubview:view
                        atIndex:[options[@"indexOfParentView"] intValue]];
    }
  }
}

RCT_EXPORT_METHOD(nativeViewSetLayout : (nonnull NSDictionary *)options) {

  UIView *view =
      [self findNativeView:[options[@"viewId"] unsignedLongLongValue]];

  // Handle layout properties
  if (options[@"layout"]) {
    [self applyContentViewLayout:(NSDictionary *)options[@"layout"]
                          toView:view];
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(pipIsSupported) {
  return @([self.pipController isSupported]);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(pipIsAutoEnterSupported) {
  return @([self.pipController isAutoEnterSupported]);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(isPipActivated) {
  return @([self.pipController isActivated]);
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(pipSetup
                                       : (nonnull NSDictionary *)options) {
  __block BOOL result = NO;

  if (![NSThread isMainThread]) {
    dispatch_sync(dispatch_get_main_queue(), ^{
      result = [[self class] _pipSetupInternal:options withBridge:self.bridge];
    });
  } else {
    result = [[self class] _pipSetupInternal:options withBridge:self.bridge];
  }

  return @(result);
}

+ (BOOL)_pipSetupInternal:(NSDictionary *)options
               withBridge:(RCTBridge *)bridge {
  @autoreleasepool {
    AgoraPIPOptions *pipOptions = [[AgoraPIPOptions alloc] init];

    // auto enter
    if ([options objectForKey:@"autoEnterEnabled"]) {
      pipOptions.autoEnterEnabled =
          [[options objectForKey:@"autoEnterEnabled"] boolValue];
    }

    // preferred content size
    if ([options objectForKey:@"preferredContentWidth"] &&
        [options objectForKey:@"preferredContentHeight"]) {
      pipOptions.preferredContentSize = CGSizeMake(
          [[options objectForKey:@"preferredContentWidth"] floatValue],
          [[options objectForKey:@"preferredContentHeight"] floatValue]);
    }

    // control style
    if ([options objectForKey:@"controlStyle"]) {
      pipOptions.controlStyle =
          [[options objectForKey:@"controlStyle"] intValue];
    }

    pipOptions.sourceContentView = 0;
    NSNumber *pointerValue = [options objectForKey:@"contentView"];
    unsigned long long pointerLongValue = [pointerValue unsignedLongLongValue];
    UIView *view = (__bridge UIView *)(void *)pointerLongValue;

    pipOptions.contentView = view;

    AgoraRtcNg *instance = [AgoraRtcNg shareInstance];
    return [instance.pipController setup:pipOptions];
  }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(pipStart) {
  return @([self.pipController start]);
}

RCT_EXPORT_METHOD(pipStop) { [self.pipController stop]; }

RCT_EXPORT_METHOD(pipDispose) { [self.pipController dispose]; }

- (void)pipStateChanged:(AgoraPIPState)state error:(NSString *)error {

  if (self.hasListeners) {
    NSDictionary *eventData =
        @{@"state" : @(state), @"error" : error ?: [NSNull null]};

    NSError *jsonError;
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:eventData
                                                       options:0
                                                         error:&jsonError];
    NSString *dataStr = @"{}";
    if (!jsonError && jsonData) {
      dataStr = [[NSString alloc] initWithData:jsonData
                                      encoding:NSUTF8StringEncoding];
    }

    [self sendEventWithName:EVENT_NAME
                       body:@{
                         @"event" : @"AgoraPip_onPipStateChanged",
                         @"data" : dataStr,
                         @"buffers" : @[]
                       }];
  }
}

#ifdef RCT_NEW_ARCH_ENABLED
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(
    callApi
    : (JS::NativeAgoraRtcNg::SpecCallApiArgs &)args)
#else
RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(callApi
                                       : (nonnull NSDictionary *)args)
#endif
{
  NSString *funcName =
#ifdef RCT_NEW_ARCH_ENABLED
      args.funcName();
#else
      args[@"funcName"];
#endif
  NSString *params =
#ifdef RCT_NEW_ARCH_ENABLED
      args.params();
#else
      args[@"params"];
#endif

  NSMutableArray<NSData *> *bufferArray = [NSMutableArray new];
#ifdef RCT_NEW_ARCH_ENABLED
  if (args.buffers().has_value()) {
    auto array = args.buffers().value();
    int count = array.size();
#else
  if ([args[@"buffers"] isKindOfClass:NSArray.class]) {
    NSArray *array = args[@"buffers"];
    NSUInteger count = array.count;
#endif
    for (int i = 0; i < count; ++i) {
      NSData *data = [[NSData alloc]
          initWithBase64EncodedString:array[i]
                              options:
                                  NSDataBase64DecodingIgnoreUnknownCharacters];
      [bufferArray addObject:data];
    }
  }

  void *buffers[bufferArray.count];
  unsigned int length[bufferArray.count];
  for (int i = 0; i < bufferArray.count; ++i) {
    buffers[i] = const_cast<void *>(bufferArray[i].bytes);
    length[i] = static_cast<unsigned int>(bufferArray[i].length);
  }

  char result[kBasicResultLength] = "";
  int error_code;

  NSUInteger paramsLength =
      [params lengthOfBytesUsingEncoding:NSUTF8StringEncoding];

  ApiParam param = {
      .event = funcName.UTF8String,
      .data = params.UTF8String,
      .data_size = static_cast<unsigned int>(paramsLength),
      .result = result,
      .buffer = buffers,
      .length = length,
      .buffer_count = static_cast<unsigned int>(bufferArray.count),
  };

  void *handler[1] = {self.eventHandler};
  if (bufferArray.count == 0) {
    std::smatch output;
    std::regex pattern =
        std::regex("^.*_.*((EventHandler|Observer|startDirectCdnStreaming|"
                   "Source|VideoFrameRenderer)(_[a-zA-Z0-9]*)?)$");
    std::string name = funcName.UTF8String;
    if (std::regex_match(name, output, pattern)) {
      param.buffer = handler;
      param.buffer_count = 1;
    }
  }

  [self newIrisApiEngine];
  error_code = self.irisApiEngine->CallIrisApi(&param);

  if (error_code != 0) {
    NSError *error;
    NSData *data =
        [NSJSONSerialization dataWithJSONObject:@{
          @"result" : @(error_code)
        }
                                        options:NSJSONWritingPrettyPrinted
                                          error:&error];
    return [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];
  }
  return [NSString stringWithUTF8String:result];
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

- (dispatch_queue_t)methodQueue {
  return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents {
  return @[ EVENT_NAME ];
}

- (void)startObserving {
  _hasListeners = YES;
}

- (void)stopObserving {
  _hasListeners = NO;
}

- (void)invalidate {
  [super invalidate];
  instance = nil;
}

- (void)applyContentViewLayout:(NSDictionary *)contentViewLayout
                        toView:(UIView *)view {
  if (!contentViewLayout || !view) {
    return;
  }

  // Get actual subview count
  NSArray *subviews = view.subviews;
  NSInteger subviewCount = subviews.count;
  if (subviewCount == 0) {
    return;
  }

  NSNumber *padding = contentViewLayout[@"padding"];
  NSNumber *spacing = contentViewLayout[@"spacing"];
  NSNumber *row = contentViewLayout[@"row"];
  NSNumber *column = contentViewLayout[@"column"];

  // Validate row and column values
  NSInteger actualRow = row ? [row integerValue] : 0;
  NSInteger actualColumn = column ? [column integerValue] : 0;

  // Rule 3: Ignore negative values
  if (actualRow < 0)
    actualRow = 0;
  if (actualColumn < 0)
    actualColumn = 0;

  // Rule 1: If row is not set or 0, calculate based on column and subview count
  if (actualRow == 0) {
    if (actualColumn > 0) {
      actualRow = (subviewCount + actualColumn - 1) / actualColumn;
    } else {
      // If both row and column are not set, use a default layout
      actualRow = 1;
      actualColumn = subviewCount;
    }
  }

  // Rule 2: Column is just a reference, adjust if needed
  if (actualColumn == 0) {
    if (actualRow > subviewCount) {
      actualColumn = 1;
    } else {
      actualColumn = (subviewCount + actualRow - 1) / actualRow;
    }
  }

  // Rule 4: If actualRow * actualColumn is less than subviewCount, adjust
  // actualRow and actualColumn
  if (actualRow * actualColumn < subviewCount) {
    actualColumn = (subviewCount + actualRow - 1) / actualRow;
  }

  // Remove existing constraints
  [view removeConstraints:view.constraints];
  for (UIView *subview in subviews) {
    // Only remove constraints between subview and parent view
    NSArray *subviewConstraints = [subview.constraints copy];
    for (NSLayoutConstraint *constraint in subviewConstraints) {
      if ((constraint.firstItem == subview && constraint.secondItem == view) ||
          (constraint.firstItem == view && constraint.secondItem == subview)) {
        [subview removeConstraint:constraint];
      }
    }
    subview.translatesAutoresizingMaskIntoConstraints = NO;
  }

  // Apply padding
  CGFloat paddingValue = padding ? [padding doubleValue] : 0;
  CGFloat spacingValue = spacing ? [spacing doubleValue] : 0;

  // Create constraints for each subview
  for (NSInteger i = 0; i < subviewCount; i++) {
    UIView *subview = subviews[i];
    NSInteger currentRow = i / actualColumn;
    NSInteger currentColumn = i % actualColumn;

    // Width constraint - equal width for all subviews in the same column
    if (currentColumn == 0) {
      // First column - set width based on container width
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeWidth
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:view
                                       attribute:NSLayoutAttributeWidth
                                      multiplier:1.0 / actualColumn
                                        constant:-(spacingValue *
                                                       (actualColumn - 1) +
                                                   paddingValue * 2) /
                                                 actualColumn]];
    } else {
      // Other columns - equal to first column
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeWidth
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:subviews[i - currentColumn]
                                       attribute:NSLayoutAttributeWidth
                                      multiplier:1.0
                                        constant:0.0]];
    }

    // Height constraint - equal height for all rows, regardless of whether they
    // have subviews
    [view
        addConstraint:[NSLayoutConstraint
                          constraintWithItem:subview
                                   attribute:NSLayoutAttributeHeight
                                   relatedBy:NSLayoutRelationEqual
                                      toItem:view
                                   attribute:NSLayoutAttributeHeight
                                  multiplier:1.0 / actualRow
                                    constant:-(spacingValue * (actualRow - 1) +
                                               paddingValue * 2) /
                                             actualRow]];

    // Position constraints
    if (currentColumn == 0) {
      // First column - leading edge
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeLeading
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:view
                                       attribute:NSLayoutAttributeLeading
                                      multiplier:1.0
                                        constant:paddingValue]];
    } else {
      // Other columns - spacing from previous view
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeLeading
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:subviews[i - 1]
                                       attribute:NSLayoutAttributeTrailing
                                      multiplier:1.0
                                        constant:spacingValue]];
    }

    if (currentRow == 0) {
      // First row - top edge
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeTop
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:view
                                       attribute:NSLayoutAttributeTop
                                      multiplier:1.0
                                        constant:paddingValue]];
    } else {
      // Other rows - spacing from row above
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeTop
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:subviews[i - actualColumn]
                                       attribute:NSLayoutAttributeBottom
                                      multiplier:1.0
                                        constant:spacingValue]];
    }

    // Last column - trailing edge
    if (currentColumn == actualColumn - 1) {
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeTrailing
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:view
                                       attribute:NSLayoutAttributeTrailing
                                      multiplier:1.0
                                        constant:-paddingValue]];
    }

    // Last row - bottom edge
    if (currentRow == actualRow - 1) {
      [view addConstraint:[NSLayoutConstraint
                              constraintWithItem:subview
                                       attribute:NSLayoutAttributeBottom
                                       relatedBy:NSLayoutRelationEqual
                                          toItem:view
                                       attribute:NSLayoutAttributeBottom
                                      multiplier:1.0
                                        constant:-paddingValue]];
    }
  }
}

- (UIView *)findNativeView:(uint64_t)viewId {
  __block UIView *view;
  [self.nativeViews
      enumerateObjectsUsingBlock:^(UIView *obj, NSUInteger idx, BOOL *stop) {
        if ((uint64_t)obj == viewId) {
          view = obj;
          *stop = YES;
        }
      }];
  return view;
}

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeAgoraRtcNgSpecJSI>(params);
}
#endif

@end
