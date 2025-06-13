#import <AgoraRtcWrapper/iris_engine_base.h>
#import <React/RCTEventEmitter.h>
// #import <AgoraPIPKit/AgoraPIPKit.h>

#ifdef RCT_NEW_ARCH_ENABLED
#import "AgoraRtcNgSpec.h"

@interface AgoraRtcNg : RCTEventEmitter <NativeAgoraRtcNgSpec>
#else
#import <React/RCTBridgeModule.h>

@interface AgoraRtcNg : RCTEventEmitter <RCTBridgeModule, RCTInvalidating>
#endif

@property(nonatomic) IApiEngineBase *irisApiEngine;
// @property(nonatomic) AgoraPIPController *pipController;

+ (instancetype)shareInstance;

@end
