#import "ReactNativeAgoraRtcNg.h"
#include <vector>
#include <string>

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

    void OnEvent(const char *event, const char *data, const void **buffer,
                 unsigned int *length, unsigned int buffer_count) override {
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

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(newIrisApiEngine) {
    if (self.irisApiEngine == nullptr) {
        self.irisApiEngine = new IrisApiEngine;
        self.irisApiEngine->SetIrisRtcEngineEventHandler(self.eventHandler);
        self.irisApiEngine->SetIrisMediaPlayerEventHandler(self.eventHandler);
        //        self.irisApiEngine->SetIrisCloudAudioEngineEventHandler(self.eventHandler);
    }
    return [NSNull null];
}

RCT_EXPORT_BLOCKING_SYNCHRONOUS_METHOD(destroyIrisApiEngine) {
    if (self.irisApiEngine != nullptr) {
        self.irisApiEngine->UnsetIrisRtcEngineEventHandler(self.eventHandler);
        self.irisApiEngine->UnsetIrisMediaPlayerEventHandler(self.eventHandler);
        //        self.irisApiEngine->UnsetIrisCloudAudioEngineEventHandler(self.eventHandler);
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
    for (int i = 0; i < bufferArray.count; ++i) {
        buffers[i] = const_cast<void *>(bufferArray[i].bytes);
    }

    char result[kBasicResultLength] = "";
    int ret = self.irisApiEngine->CallIrisApi(funcName.UTF8String, params.UTF8String, params.length, buffers, bufferArray.count, result);
    if (ret != 0) {
        return [NSNull null];
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
