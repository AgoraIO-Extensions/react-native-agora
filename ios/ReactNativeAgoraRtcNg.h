#import <AgoraRtcWrapper/iris_cxx_api.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface ReactNativeAgoraRtcNg : RCTEventEmitter

@property(nonatomic) IrisApiEngine *irisApiEngine;

@end
