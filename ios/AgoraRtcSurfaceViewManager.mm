#import "AgoraRtcSurfaceViewManager.h"
#import "ReactNativeAgoraRtcNg.h"
#import <AgoraRtcWrapper/iris_rtc_engine.h>

@implementation AgoraRtcSurfaceViewManager

- (UIView *)view {
    return [[UIView alloc] init];
}

RCT_EXPORT_MODULE(AgoraRtcSurfaceView)

RCT_CUSTOM_VIEW_PROPERTY(callApi, NSDictionary, UIView) {
    NSString *funcName = json[@"funcName"];
    NSString *params = json[@"params"];
    char result[kBasicResultLength];
    ReactNativeAgoraRtcNg *module =
    [self.bridge moduleForClass:[ReactNativeAgoraRtcNg class]];
    if (module) {
        void *buffers[1];
        buffers[0] = (__bridge void*)view;
        module.irisApiEngine->CallIrisApi(funcName.UTF8String, params.UTF8String, params.length, buffers, 1, result);
    }
}

@end
