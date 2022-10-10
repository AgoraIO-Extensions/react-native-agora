#import "ReactNativeAgoraRtcNg.h"
#import <AgoraRtcWrapper/iris_module.h>
#import <ReplayKit/ReplayKit.h>
#include <vector>
#include <string>
#include <regex>

#define EVENT_NAME @"onEvent"

@interface ReactNativeAgoraRtcNg ()

@property(nonatomic, assign) BOOL hasListeners;

@end

namespace agora {
namespace iris {
class EventHandler : public IrisEventHandler {
public:
    EventHandler(void *plugin) {
        plugin_ = (__bridge ReactNativeAgoraRtcNg *)plugin;
    }

    void OnEvent(const char *event, const char *data, void **buffer,
                 unsigned int *length, unsigned int buffer_count) {
        @autoreleasepool {
            NSMutableArray *array = [NSMutableArray new];
            for (int i=0; i<buffer_count; ++i) {
                NSString *base64Buffer = [[[NSData alloc] initWithBytes:buffer[i] length:length[i]] base64EncodedStringWithOptions:NSDataBase64EncodingEndLineWithLineFeed];
                [array addObject:base64Buffer];
            }

            if (plugin_.hasListeners) {
                [plugin_ sendEventWithName:EVENT_NAME
                                      body:@{
                    @"event" :
                        [NSString stringWithUTF8String:event],
                    @"data" : [NSString stringWithUTF8String:data],
                    @"buffers" : array
                }];
            }
        }
    }

    void OnEvent(EventParam *param) override {
        OnEvent(param->event, param->data, param->buffer, param->length, param->buffer_count);
    }

private:
    ReactNativeAgoraRtcNg *plugin_;
};
}
}

@interface ReactNativeAgoraRtcNg ()

@property(nonatomic) agora::iris::EventHandler *eventHandler;

@end

@implementation ReactNativeAgoraRtcNg

- (instancetype)init {
    self = [super init];
    if (self) {
        self.irisApiEngine = nullptr;
        self.eventHandler = new agora::iris::EventHandler((__bridge void *)self);
    }
    return self;
}

- (void)dealloc {
    delete self.irisApiEngine;
    delete self.eventHandler;
}

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(showRPSystemBroadcastPickerView) {
    if (@available(iOS 12.0, *)) {
        dispatch_async(dispatch_get_main_queue(), ^{
            NSURL *url = [[NSBundle mainBundle] URLForResource:nil withExtension:@"appex" subdirectory:@"PlugIns"];
            NSBundle *bundle = [NSBundle bundleWithURL:url];
            if (bundle) {
                RPSystemBroadcastPickerView *picker = [[RPSystemBroadcastPickerView alloc] initWithFrame:CGRectMake(0, 0, 100, 200)];
                picker.showsMicrophoneButton = YES;
                picker.preferredExtension = bundle.bundleIdentifier;
                for (UIView *view in [picker subviews]) {
                    if ([view isKindOfClass:UIButton.class]) {
                        [((UIButton*)view) sendActionsForControlEvents:UIControlEventAllTouchEvents];
                    }
                }
            }
        });
    }
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(newIrisApiEngine) {
    if (self.irisApiEngine == nullptr) {
        enableUseJsonArray(true);
        self.irisApiEngine = new IrisApiEngine;
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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(callApi: (nonnull NSDictionary *)arguments) {
    NSString *funcName = arguments[@"funcName"];
    NSString *params = arguments[@"params"];

    NSMutableArray<NSData *> *bufferArray = [NSMutableArray new];
    if ([arguments[@"buffers"] isKindOfClass:NSArray.class]) {
        NSArray *array = arguments[@"buffers"];
        for (int i = 0; i < array.count; ++i) {
            NSData *data = [[NSData alloc] initWithBase64EncodedString:array[i] options:NSDataBase64DecodingIgnoreUnknownCharacters];
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

    ApiParam param = {
        .event = funcName.UTF8String,
        .data = params.UTF8String,
        .data_size = static_cast<unsigned int>(params.length),
        .result = result,
        .buffer = buffers,
        .length = length,
        .buffer_count = static_cast<unsigned int>(bufferArray.count),
    };

    if (bufferArray.count == 0) {
        std::smatch output;
        std::regex pattern = std::regex("^.*(Observer|Handler|Callback|Receiver)$");
        std::string name = funcName.UTF8String;
        if (std::regex_match(name, output, pattern)) {
            void *handler[1] = {self.eventHandler};
            param.buffer = handler;
            param.buffer_count = 1;
        }
    }

    error_code = self.irisApiEngine->CallIrisApi(&param);

    if (error_code != 0) {
        NSError *error;
        NSData *data = [NSJSONSerialization
                        dataWithJSONObject:@{@"result": @(error_code)}
                        options:NSJSONWritingPrettyPrinted
                        error:&error];
        return [[NSString alloc]
                initWithData:data
                encoding:NSUTF8StringEncoding];
    }
    return [NSString stringWithUTF8String:result];
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

@end
