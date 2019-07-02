//
//  RCTAgora.h
//  RCTAgora
//
//  Created by 邓博 on 2017/6/13.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>
#import <AgoraRtcEngineKit/AgoraRtcEngineKit.h>

@interface RCTAgora : RCTEventEmitter<RCTBridgeModule, AgoraMediaMetadataDelegate, AgoraMediaMetadataDataSource>
- (void) sendEvent:(NSString *_Nullable)msg params:(NSDictionary *_Nullable)params;
- (NSInteger) metadataMaxSize;
- (NSData *_Nullable)readyToSendMetadataAtTimestamp:(NSTimeInterval)timestamp;
- (void)receiveMetadata:(NSData *_Nonnull)data fromUser:(NSInteger)uid atTimestamp:(NSTimeInterval)timestamp;
@end
