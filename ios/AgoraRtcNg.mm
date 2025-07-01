#import "AgoraRtcNg.h"
#import <AgoraRtcWrapper/AgoraPIPController.h>
#import <AgoraRtcWrapper/iris_module.h>
#import <React/RCTUIManager.h>
#import <ReplayKit/ReplayKit.h>
#import <objc/runtime.h>
#include <regex>
#include <string>
#include <vector>

#define EVENT_NAME @"AgoraRtcNg:onEvent"

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

    AgoraRtcNg *instance = [AgoraRtcNg shareInstance];
    pipOptions.apiEngine = instance.irisApiEngine;

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

    // contentViewLayout
    NSDictionary *contentViewLayout =
        [options objectForKey:@"contentViewLayout"];
    if (contentViewLayout) {
      pipOptions.contentViewLayout = [[AgoraPipContentViewLayout alloc] init];

      id paddingObj = [contentViewLayout objectForKey:@"padding"];
      pipOptions.contentViewLayout.padding =
          [paddingObj isKindOfClass:[NSNumber class]] ? [paddingObj intValue]
                                                      : 0;

      id spacingObj = [contentViewLayout objectForKey:@"spacing"];
      pipOptions.contentViewLayout.spacing =
          [spacingObj isKindOfClass:[NSNumber class]] ? [spacingObj intValue]
                                                      : 0;

      id rowObj = [contentViewLayout objectForKey:@"row"];
      pipOptions.contentViewLayout.row =
          [rowObj isKindOfClass:[NSNumber class]] ? [rowObj intValue] : 0;

      id columnObj = [contentViewLayout objectForKey:@"column"];
      pipOptions.contentViewLayout.column =
          [columnObj isKindOfClass:[NSNumber class]] ? [columnObj intValue] : 0;
    }

    // videoStreams
    NSArray *videoStreams = [options objectForKey:@"videoStreams"];
    if (videoStreams) {
      NSMutableArray *tempVideoStreamArray = [[NSMutableArray alloc] init];
      for (NSDictionary *videoStream in videoStreams) {
        NSDictionary *connectionObj = [videoStream objectForKey:@"connection"];
        NSDictionary *canvasObj = [videoStream objectForKey:@"canvas"];

        if (!connectionObj || !canvasObj) {
          continue;
        }

        AgoraPIPVideoStream *videoStreamObj =
            [[AgoraPIPVideoStream alloc] init];

        // connection
        id channelIdObj = [connectionObj objectForKey:@"channelId"];
        videoStreamObj.channelId =
            [channelIdObj isKindOfClass:[NSString class]] ? channelIdObj : @"";

        id localUidObj = [connectionObj objectForKey:@"localUid"];
        videoStreamObj.localUid = [localUidObj isKindOfClass:[NSNumber class]]
                                      ? [localUidObj intValue]
                                      : 0;

        // canvas
        id uidObj = [canvasObj objectForKey:@"uid"];
        videoStreamObj.uid =
            [uidObj isKindOfClass:[NSNumber class]] ? [uidObj intValue] : 0;

        id backgroundColorObj = [canvasObj objectForKey:@"backgroundColor"];
        videoStreamObj.backgroundColor =
            [backgroundColorObj isKindOfClass:[NSNumber class]]
                ? [backgroundColorObj intValue]
                : 0;

        id renderModeObj = [canvasObj objectForKey:@"renderMode"];
        videoStreamObj.renderMode =
            [renderModeObj isKindOfClass:[NSNumber class]]
                ? [renderModeObj intValue]
                : 0;

        id mirrorModeObj = [canvasObj objectForKey:@"mirrorMode"];
        videoStreamObj.mirrorMode =
            [mirrorModeObj isKindOfClass:[NSNumber class]]
                ? [mirrorModeObj intValue]
                : 0;

        id setupModeObj = [canvasObj objectForKey:@"setupMode"];
        videoStreamObj.setupMode = [setupModeObj isKindOfClass:[NSNumber class]]
                                       ? [setupModeObj intValue]
                                       : 0;

        id sourceTypeObj = [canvasObj objectForKey:@"sourceType"];
        videoStreamObj.sourceType =
            [sourceTypeObj isKindOfClass:[NSNumber class]]
                ? [sourceTypeObj intValue]
                : 0;

        id enableAlphaMaskObj = [canvasObj objectForKey:@"enableAlphaMask"];
        videoStreamObj.enableAlphaMask =
            [enableAlphaMaskObj isKindOfClass:[NSNumber class]]
                ? [enableAlphaMaskObj boolValue]
                : NO;

        id positionObj = [canvasObj objectForKey:@"position"];
        videoStreamObj.position = [positionObj isKindOfClass:[NSNumber class]]
                                      ? [positionObj intValue]
                                      : 0;

        [tempVideoStreamArray addObject:videoStreamObj];
      }
      pipOptions.videoStreamArray = tempVideoStreamArray;
    }

    // sourceContentView
    if ([options objectForKey:@"sourceContentView"]) {
      pipOptions.sourceContentView = (__bridge UIView *)[[options
          objectForKey:@"sourceContentView"] pointerValue];
    }

    NSNumber *pointerValue = [options objectForKey:@"contentView"];
    unsigned long long pointerLongValue = [pointerValue unsignedLongLongValue];
    UIView *view = (__bridge UIView *)(void *)pointerLongValue;
    pipOptions.contentView = view;

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

// Don't compile this code when we build for the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params {
  return std::make_shared<facebook::react::NativeAgoraRtcNgSpecJSI>(params);
}
#endif

@end
