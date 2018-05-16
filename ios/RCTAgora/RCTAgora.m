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
#import "AgoraConst.h"

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
RCT_EXPORT_METHOD(init:(NSDictionary *)options) {
    
    [AgoraConst share].appid = options[@"appid"];
    
    self.rtcEngine = [AgoraRtcEngineKit sharedEngineWithAppId:options[@"appid"] delegate:self];
    
    [AgoraConst share].rtcEngine = self.rtcEngine;
    
    //频道模式
    [self.rtcEngine setChannelProfile:[options[@"channelProfile"] integerValue]];
    //启用双流模式
    [self.rtcEngine enableDualStreamMode:YES];
    [self.rtcEngine enableVideo];
    [self.rtcEngine setVideoProfile:[options[@"videoProfile"] integerValue]swapWidthAndHeight:[options[@"swapWidthAndHeight"]boolValue]];
    [self.rtcEngine setClientRole:[options[@"clientRole"] integerValue]];
    //Agora Native SDK 与 Agora Web SDK 间的互通
    [self.rtcEngine enableWebSdkInteroperability:YES];
    
}

//加入房间
RCT_EXPORT_METHOD(joinChannel:(NSString *)channelName uid:(NSInteger)uid) {
    //保存一下uid 在自定义视图使用
    [AgoraConst share].localUid = uid;
    [self.rtcEngine joinChannelByToken:nil channelId:channelName info:nil uid:uid joinSuccess:NULL];
}

//离开频道
RCT_EXPORT_METHOD(leaveChannel){
    [self.rtcEngine leaveChannel:^(AgoraChannelStats * _Nonnull stat) {
      NSMutableDictionary *params = @{}.mutableCopy;
      params[@"type"] = @"onLeaveChannel";
      
      [self sendEvent:params];
    }];
}

//销毁引擎实例
RCT_EXPORT_METHOD(destroy){
    [AgoraRtcEngineKit destroy];
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

//开启视频预览
RCT_EXPORT_METHOD(startPreview){
    [self.rtcEngine startPreview];
}

//配置旁路直播推流(configPublisher)
//请确保用户已经调用 setClientRole() 且已将用户角色设为主播
//主播必须在加入频道前调用本章 API
RCT_EXPORT_METHOD(configPublisher:(NSDictionary *)config){
    AgoraPublisherConfiguration *apc = [AgoraPublisherConfiguration new];
    
    apc.width = [config[@"width"] integerValue];  //旁路直播的输出码流的宽度
    apc.height = [config[@"height"] integerValue]; //旁路直播的输出码流的高度
    apc.framerate = [config[@"framerate"] integerValue]; //旁路直播的输出码率帧率
    apc.bitrate = [config[@"bitrate"] integerValue]; //旁路直播输出码流的码率
    apc.defaultLayout = [config[@"defaultLayout"] integerValue]; //设置流生命周期
    apc.lifeCycle = [config[@"lifeCycle"] integerValue]; //默认合图布局
    apc.publishUrl = config[@"publishUrl"]; //合图推流地址
    apc.rawStreamUrl = config[@"rawStreamUrl"]; //单流地址
    apc.extraInfo = config[@"extraInfo"]; //其他信息
    apc.owner = [config[@"owner"] boolValue]; //是否将当前主播设为该 RTMP 流的主人
    
    [self.rtcEngine configPublisher:apc];
}

//设置本地视频显示模式
RCT_EXPORT_METHOD(setLocalRenderMode:(NSUInteger)mode){
    [self.rtcEngine setLocalRenderMode:mode];
}

//设置远端视频显示模式
RCT_EXPORT_METHOD(setRemoteRenderMode:(NSUInteger)uid mode:(NSUInteger)mode){
    [self.rtcEngine setRemoteRenderMode:uid mode:mode];
}

//启用说话者音量提示
RCT_EXPORT_METHOD(enableAudioVolumeIndication:(NSUInteger)interval smooth:(NSUInteger)smooth){
    [self.rtcEngine enableAudioVolumeIndication:interval smooth:smooth];
}

//开启屏幕共享
//RCT_EXPORT_METHOD(startScreenCapture:(NSUInteger)windowId){
//
//}

//关闭视频预览
RCT_EXPORT_METHOD(stopPreview){
    [self.rtcEngine stopPreview];
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

//打开外放  Yes: 音频输出至扬声器  No: 音频输出至听筒
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

//是否打开闪光灯
RCT_EXPORT_METHOD(setCameraTorchOn:(BOOL)isOn){
    [self.rtcEngine setCameraTorchOn:isOn];
}

//否开启人脸对焦功能
RCT_EXPORT_METHOD(setCameraAutoFocusFaceModeEnabled:(BOOL)enable){
    [self.rtcEngine setCameraAutoFocusFaceModeEnabled:enable];
}

//修改默认的语音路由 True: 默认路由改为外放(扬声器) False: 默认路由改为听筒
RCT_EXPORT_METHOD(setDefaultAudioRouteToSpeakerphone:(BOOL)defaultToSpeaker){
    [self.rtcEngine setDefaultAudioRouteToSpeakerphone:defaultToSpeaker];
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

//获取版本号
RCT_EXPORT_METHOD(getSdkVersion:(RCTResponseSenderBlock)callback){
    callback(@[[AgoraRtcEngineKit getSdkVersion]]);
}

RCT_EXPORT_METHOD(setAudioProfile:(NSInteger)audioProfile scenario:(NSInteger)scenario) {
    [self.rtcEngine setAudioProfile:(AgoraAudioProfile)audioProfile
                           scenario:(AgoraAudioScenario)scenario];
}

RCT_EXPORT_METHOD(allowMusicMix) {
    BOOL result = [self.rtcEngine setParameters:@"{\"che.audio.mixable.option\": true}"];
    result = [self.rtcEngine setAudioProfile:AgoraAudioProfileMusicHighQualityStereo
                                    scenario:AgoraAudioScenarioChatRoomGaming];
    result = [self.rtcEngine startAudioMixing:@"" loopback:YES replace:NO cycle:-1];
    NSLog(@"%d", result);
}

/*
 该回调方法表示SDK运行时出现了（网络或媒体相关的）错误。通常情况下，SDK上报的错误意味着SDK无法自动恢复，需要应用程序干预或提示用户。
 比如启动通话失败时，SDK会上报AgoraRtc_Error_StartCall(1002)错误。
 应用程序可以提示用户启动通话失败，并调用leaveChannel退出频道。
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didOccurError:(AgoraErrorCode)errorCode{
    NSMutableDictionary *params = @{}.mutableCopy;
    params[@"type"] = @"onError";
    params[@"err"] = [NSNumber numberWithInteger:errorCode];;
    
    [self sendEvent:params];
}

/*
 警告
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didOccurWarning:(AgoraWarningCode)warningCode {
    NSMutableDictionary *params = @{}.mutableCopy;
    params[@"type"] = @"onWarning";
    params[@"err"] = [NSNumber numberWithInteger:warningCode];;
    
    [self sendEvent:params];
}


/*
 客户端成功加入了指定的频道
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didJoinChannel:(NSString*)channel withUid:(NSUInteger)uid elapsed:(NSInteger) elapsed {
    
    NSMutableDictionary *params = @{}.mutableCopy;
    params[@"type"] = @"onJoinChannelSuccess";
    params[@"uid"] = [NSNumber numberWithInteger:uid];
    params[@"channel"] = channel;
    
    [self sendEvent:params];
}

/*
 远端首帧视频接收解码回调
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine firstRemoteVideoDecodedOfUid:(NSUInteger)uid size:(CGSize)size elapsed:(NSInteger)elapsed {
    
    NSMutableDictionary *params = @{}.mutableCopy;
    params[@"type"] = @"onFirstRemoteVideoDecoded";
    params[@"uid"] = [NSNumber numberWithInteger:uid];
    
    [self sendEvent:params];
    
}

/*
 用户加入回调
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didJoinedOfUid:(NSUInteger)uid elapsed:(NSInteger)elapsed {
    NSMutableDictionary *params = @{}.mutableCopy;
    params[@"type"] = @"onUserJoined";
    params[@"uid"] = [NSNumber numberWithInteger:uid];
    
    [self sendEvent:params];
}

/*
 用户离线回调
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine didOfflineOfUid:(NSUInteger)uid reason:(AgoraUserOfflineReason)reason {
    NSMutableDictionary *params = @{}.mutableCopy;
    params[@"type"] = @"onUserOffline";
    params[@"uid"] = [NSNumber numberWithInteger:uid];
    
    [self sendEvent:params];
}

/*
 音量提示回调
 需要开启enableAudioVolumeIndication
 */
- (void)rtcEngine:(AgoraRtcEngineKit *)engine reportAudioVolumeIndicationOfSpeakers:(NSArray*)speakers totalVolume:(NSInteger)totalVolume {
    NSMutableDictionary *params = @{}.mutableCopy;
    params[@"type"] = @"onAudioVolumeIndication";
    
    NSMutableArray *arr = [NSMutableArray array];
    for (AgoraRtcAudioVolumeInfo *obj in speakers) {
        [arr addObject:@{@"uid":[NSNumber numberWithInteger:obj.uid], @"volume":[NSNumber numberWithInteger:obj.volume]}];
    }
    
    params[@"speakers"] = arr;
    params[@"totalVolume"] = [NSNumber numberWithInteger:totalVolume];
    
    [self sendEvent:params];
}

- (NSArray<NSString *> *)supportedEvents {
  return @[@"agoraEvent"];
}

- (void)sendEvent:(NSDictionary *)params {
//  [self sendEventWithName:@"agoraEvent" body:params];
    [_bridge.eventDispatcher sendDeviceEventWithName:@"agoraEvent" body:params];
}

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

//RCT_EXPORT_METHOD(getViewWithTag:(nonnull NSNumber *)reactTag) {
//
//    UIView *view = [self.bridge.uiManager viewForReactTag:reactTag];
//    NSLog(@"%@",view);
//
//}

@end

