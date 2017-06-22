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

//销毁引擎实例
- (void)dealloc {
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
RCT_EXPORT_METHOD(loadAgoraKit:(NSDictionary *)options callback:(RCTResponseSenderBlock)callback) {
    
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
        
        NSMutableDictionary *params = [NSMutableDictionary dictionary];
        
        params[@"channel"] = channel;
        params[@"uid"] = [NSNumber numberWithInteger:uid];
        params[@"elapsed"] = [NSNumber numberWithInteger:elapsed];
        callback(@[params]);
        
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


//离开频道
RCT_EXPORT_METHOD(leaveChannel){
    [AgoraRtcEngineKit destroy];
    [self.rtcEngine leaveChannel:^(AgoraRtcStats *stat) {
        
    }];
}

//设置 本地 视频显示属性
RCT_EXPORT_METHOD(setupLocalVideo:(NSDictionary *)options){
    AgoraRtcVideoCanvas *canvas = [[AgoraRtcVideoCanvas alloc] init];
    canvas.uid = [options[@"uid"] integerValue];
    canvas.view = [self.bridge.uiManager viewForReactTag:options[@"reactTag"]];
    canvas.renderMode = [options[@"renderMode"] integerValue];
    [self.rtcEngine setupLocalVideo:canvas];
}

//设置 远端 视频显示视图
RCT_EXPORT_METHOD(setupRemoteVideo:(NSDictionary *)options){
    AgoraRtcVideoCanvas *canvas = [[AgoraRtcVideoCanvas alloc] init];
    canvas.uid = [options[@"uid"] integerValue];
    canvas.view = [self.bridge.uiManager viewForReactTag:options[@"reactTag"]];
    canvas.renderMode = [options[@"renderMode"] integerValue];
    [self.rtcEngine setupRemoteVideo:canvas];
}

//切换前置/后置摄像头
RCT_EXPORT_METHOD(switchCamera){
    [self.rtcEngine switchCamera];
}

//开启视频模式
RCT_EXPORT_METHOD(enableVideo){
    [self.rtcEngine enableVideo];
}

//关闭视频
RCT_EXPORT_METHOD(disableVideo){
    [self.rtcEngine disableVideo];
}

//开启扬声器  Yes: 音频输出至扬声器  No: 音频输出至听筒
RCT_EXPORT_METHOD(setEnableSpeakerphone:(BOOL)enableSpeaker){
    [self.rtcEngine setEnableSpeakerphone: enableSpeaker];
}

//将自己静音
RCT_EXPORT_METHOD(muteLocalAudioStream:(BOOL)mute){
    [self.rtcEngine muteLocalAudioStream:mute];
}

//静音所有远端 音频
RCT_EXPORT_METHOD(muteAllRemoteAudioStreams:(BOOL)mute){
    [self.rtcEngine muteAllRemoteAudioStreams:mute];
}

//静音指定用户 音频
RCT_EXPORT_METHOD(muteRemoteAudioStream:(NSUInteger)uid muted:(BOOL)mute){
    [self.rtcEngine muteRemoteAudioStream:uid mute:mute];
}

//暂停发送本地 视频流
RCT_EXPORT_METHOD(muteLocalVideoStream:(BOOL)muted){
    [self.rtcEngine muteLocalVideoStream:muted];
}

//禁用本地视频功能
RCT_EXPORT_METHOD(enableLocalVideo:(BOOL)enabled){
    [self.rtcEngine enableLocalVideo:enabled];
}

//暂停所有远端视频流
RCT_EXPORT_METHOD(muteAllRemoteVideoStreams:(BOOL)muted){
    [self.rtcEngine muteAllRemoteVideoStreams:muted];
}

//暂停指定远端视频流
RCT_EXPORT_METHOD(muteRemoteVideoStream:(NSUInteger)uid mute:(BOOL)mute){
    [self.rtcEngine muteRemoteVideoStream:uid mute:mute];
}

//启动服务端录制服务
RCT_EXPORT_METHOD(startRecordingService:(NSString*)recordingKey){
    [self.rtcEngine startRecordingService:recordingKey];
}

//停止服务端录制服务
RCT_EXPORT_METHOD(stopRecordingService:(NSString*)recordingKey){
    [self.rtcEngine stopRecordingService:recordingKey];
}

/*
 该回调方法表示SDK运行时出现了（网络或媒体相关的）错误。通常情况下，SDK上报的错误意味着SDK无法自动恢复，需要应用程序干预或提示用户。
 比如启动通话失败时，SDK会上报AgoraRtc_Error_StartCall(1002)错误。
 应用程序可以提示用户启动通话失败，并调用leaveChannel退出频道。
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didOccurError:(AgoraRtcErrorCode)errorCode{
    
}

/*
 客户端成功加入了指定的频道
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didJoinChannel:(NSString*)channel withUid:(NSUInteger)uid elapsed:(NSInteger) elapsed {
    
}

/*
 远端首帧视频接收解码回调
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine firstRemoteVideoDecodedOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed {
    
    NSMutableDictionary *params = [NSMutableDictionary dictionary];
    
    params[@"uid"] = [NSNumber numberWithInteger:uid];
    params[@"size"] = @{@"width": [NSString stringWithFormat:@"%f", size.width], @"height": [NSString stringWithFormat:@"%f", size.height]};
    params[@"elapsed"] = [NSNumber numberWithInteger:elapsed];
    
    [_bridge.eventDispatcher sendDeviceEventWithName:@"firstRemoteVideoDecodedOfUid" body:params];

}

/*
 用户加入回调
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didJoinedOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed {
 
    [_bridge.eventDispatcher sendDeviceEventWithName:@"didJoinedOfUid" body:[NSNumber numberWithInteger:uid]];
}

/*
 用户离线回调
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didOfflineOfUid:(NSUInteger)uid reason:(AgoraRtcUserOfflineReason)reason {
    
}

/*
 报告本地用户的网络质量，该回调方法每两秒触发一次
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine lastmileQuality:(AgoraRtcQuality)quality {
    
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(getViewWithTag:(nonnull NSNumber *)reactTag) {
    
    UIView *view = [self.bridge.uiManager viewForReactTag:reactTag];
    NSLog(@"%@",view);
    
}

@end

