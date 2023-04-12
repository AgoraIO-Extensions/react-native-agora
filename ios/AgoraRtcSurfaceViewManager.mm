#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"
#import "AgoraRtcNg.h"
#import <AgoraRtcWrapper/iris_rtc_engine.h>

@interface AgoraRtcSurfaceViewManager : RCTViewManager
@end

@implementation AgoraRtcSurfaceViewManager

RCT_EXPORT_MODULE(AgoraRtcSurfaceView)

- (UIView *)view {
    return [[UIView alloc] init];
}

RCT_CUSTOM_VIEW_PROPERTY(callApi, NSDictionary, UIView) {
    NSString *funcName = json[@"funcName"];
    NSString *params = json[@"params"];
    char result[kBasicResultLength];
    AgoraRtcNg *module =
    [self.bridge moduleForClass:[AgoraRtcNg class]];
    if (module) {
        void *buffers[1];
        buffers[0] = (__bridge void*)view;
        ApiParam param = {
            .event = funcName.UTF8String,
            .data = params.UTF8String,
            .data_size = static_cast<unsigned int>(params.length),
            .result = result,
            .buffer = buffers,
            .length = nullptr,
            .buffer_count = 1,
        };
        if (module.irisApiEngine) {
            module.irisApiEngine->CallIrisApi(&param);
        }
    }
}

@end
