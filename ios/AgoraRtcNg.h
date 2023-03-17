#import <AgoraRtcWrapper/iris_engine_base.h>
#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "AgoraRtcNgSpec.h"

@interface AgoraRtcNg : RCTEventEmitter <NativeAgoraRtcNgSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AgoraRtcNg : RCTEventEmitter <RCTBridgeModule>
#endif

@property(nonatomic) IApiEngineBase *irisApiEngine;

+ (instancetype)shareInstance;

@end
