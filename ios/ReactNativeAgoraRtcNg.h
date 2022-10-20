#import <AgoraRtcWrapper/iris_engine_base.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface ReactNativeAgoraRtcNg : RCTEventEmitter

@property(nonatomic) IApiEngineBase *irisApiEngine;

@end
