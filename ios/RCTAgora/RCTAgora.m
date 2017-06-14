//
//  RCTAgora.m
//  RCTAgora
//
//  Created by 邓博 on 2017/6/13.
//  Copyright © 2017年 Syan. All rights reserved.
//

#import "RCTAgora.h"
#import <React/RCTEventDispatcher.h>
#import <React/RCTBridge.h>
#import <React/RCTUIManager.h>
#import <React/RCTView.h>

@interface RCTAgora ()
@property (strong, nonatomic) AgoraRtcEngineKit *rtcEngine;

@end

@implementation RCTAgora

RCT_EXPORT_MODULE();

@synthesize bridge = _bridge;

- (void)dealloc
{
    //销毁引擎实例
    [AgoraRtcEngineKit destroy];
}

//导出常量
- (NSDictionary *)constantsToExport {
    return @{};
}

/**
 *  初始化AgoraKit
 *
 *  @param appid
 *  @param channelProfile  设置频道模式
 *  @param videoProfile    视频模式
 *  @param clientRole      创建角色
 *  @param channelName     频道名称
 *  @param info            附加字段
 *  @param reactTag        绑定view的tag
 *  @return 0 when executed successfully. return negative value if failed.
 */
RCT_EXPORT_METHOD(loadAgoraKit:(NSDictionary *)options)
{
    
    self.rtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:options[@"appid"] delegate:self];
    
    //频道模式
    [self.rtcEngine setChannelProfile:[options[@"channelProfile"] integerValue]];
    //启用双流模式
    [self.rtcEngine enableDualStreamMode:YES];
    [self.rtcEngine enableVideo];
    [self.rtcEngine setVideoProfile:[options[@"videoProfile"] integerValue]swapWidthAndHeight:YES];
    [self.rtcEngine setClientRole:[options[@"clientRole"] integerValue] withKey:nil];
    
    //开启预览
    [self.rtcEngine startPreview];
    
    [self.rtcEngine joinChannelByKey:nil channelName:options[@"channelName"] info:options[@"info"] uid:0 joinSuccess:^(NSString *channel, NSUInteger uid, NSInteger elapsed) {
        
        //绑定本地视图
        AgoraRtcVideoCanvas *canvas = [[AgoraRtcVideoCanvas alloc] init];
        canvas.uid = uid;
        canvas.view = [self.bridge.uiManager viewForReactTag:options[@"reactTag"]];
        canvas.renderMode = AgoraRtc_Render_Hidden;
        [self.rtcEngine setupLocalVideo:canvas];
        
    }];
    
    //Agora Native SDK 与 Agora Web SDK 间的互通
    [self.rtcEngine enableWebSdkInteroperability:YES];
    
}

- (void)rtcEngine:(AgoraRtcEngineKit *)engine didOccurError:(AgoraRtcErrorCode)errorCode{
    
}

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(getViewWithTag:(nonnull NSNumber *)reactTag)
{
    
    UIView *view = [self.bridge.uiManager viewForReactTag:reactTag];
    NSLog(@"%@",view);
    
}

@end

