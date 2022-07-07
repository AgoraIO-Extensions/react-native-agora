import { IRtcEngine, ChannelMediaOptions } from './IAgoraRtcEngine';
import {
  VideoEncoderConfiguration,
  VideoCanvas,
  VideoStreamType,
  SpatialAudioParams,
  VideoMirrorModeType,
  ConnectionStateType,
  EncryptionConfig,
  WatermarkOptions,
  UserInfo,
  VideoSourceType,
  SimulcastStreamConfig,
  DataStreamConfig,
} from './AgoraBase';
import { RenderModeType } from './AgoraMediaBase';

/*
 * 包含连接信息的类。
 */
export class RtcConnection {
  /*
   * 频道名。
   */
  channelId?: string;
  /*
   * 本地用户 ID。
   */
  localUid?: number;
}

/*
 * 提供多频道方法的接口类。
 * 继承自 IRtcEngine 。
 */
export abstract class IRtcEngineEx extends IRtcEngine {
  /*
   * 使用连接 ID 加入频道。
   * 调用该方法，你可以同时加入多个频道。 如果你已经在一个频道内，你不能用相同的用户 UID 再次加入该频道。
   * 如果你想在不同的设备上加入相同的频道，请确保你在不同设备上使用的用户 UID 都不同。
   * 请确保生成 Token 时传入的 app ID 和创建 IRtcEngine 实例时传入的 app ID 一致。
   *
   * @param options 频道媒体设置选项。详见 ChannelMediaOptions 。
   *
   * @param token 在服务端生成的用于鉴权的动态密钥。详见
   *
   * @param connection
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。 -2：传入的参数无效。例如，使用了不合法的 Token，uid 参数未设置为整型， ChannelMediaOptions 结构体成员值不合法。你需要填入有效的参数，重新加入频道。
   * -3： IRtcEngine 对象初始化失败。你需要重新初始化 IRtcEngine 对象。
   * -7：IRtcEngine 对象尚未初始化。你需要在调用该方法前成功初始化 IRtcEngine 对象。
   * -8：IRtcEngine 对象内部状态错误。可能的原因是：调用 startEchoTest 开始通话回路测试后，未调用 stopEchoTest 停止测试就调用该方法加入频道。你需要在该方法前调用 stopEchoTest。
   * -17：加入频道被拒绝。可能的原因是用户已经在频道中。Agora 推荐通过 onConnectionStateChanged 回调判断用户是否在频道中。除收到 ConnectionStateDisconnected(1) 状态外，不要再次调用该方法加入频道。
   * -102：频道名无效。你需要在 channelId 中填入有效的频道名，重新加入频道。
   * -121：用户 ID 无效。你需要在 uid 中填入有效的用户 ID，重新加入频道。
   */
  abstract joinChannelEx(
    token: string,
    connection: RtcConnection,
    options: ChannelMediaOptions
  ): number;

  /*
   * 离开频道。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract leaveChannelEx(connection: RtcConnection): number;

  /*
   * 加入频道后更新频道媒体选项 。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param options 频道媒体选项，详见 ChannelMediaOptions 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。 -2： ChannelMediaOptions 结构体成员值设置无效。例如，使用了不合法的 Token，设置了无效的用户角色。你需要填入有效的参数。
   * -7：IRtcEngine 对象尚未初始化。你需要在调用该方法前成功初始化 IRtcEngine 对象。
   * -8：IRtcEngine 对象内部状态错误。可能的原因是用户不在频道中。Agora 推荐通过 onConnectionStateChanged 回调判断用户是否在频道中。如果收到 ConnectionStateDisconnected(1) 或 ConnectionStateFailed(5)，则表示用户不在频道中。你需要在调用该方法前调用 joinChannelWithOptions 加入频道。
   */
  abstract updateChannelMediaOptionsEx(
    options: ChannelMediaOptions,
    connection: RtcConnection
  ): number;

  /*
   * 设置本地视频编码属性。
   * 每一种视频编码属性对应一系列视频相关参数设置，包含分辨率、帧率和码率。
   * 该方法的 config 参数设置是在理想网络状态下能达到的最大值。如果网络状态不好，视频引擎便不能使用该
   * config 渲染本地视频， 它会自动降低到一个合适的视频参数设置。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param config 视频编码参数配置。详见 VideoEncoderConfiguration 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setVideoEncoderConfigurationEx(
    config: VideoEncoderConfiguration,
    connection: RtcConnection
  ): number;

  /*
   * 初始化远端用户视图。
   * 该方法绑定远端用户和显示视图，并设置远端用户视图在本地显示时的渲染模式和镜像模式，只影响本地用户看到的视频画面。
   * 调用该方法时需要在 VideoCanvas 中指定远端视频的用户 ID，一般可以在进频道前提前设置好。
   * 如果无法在加入频道前得到远端用户的 uid，可以在收到 onUserJoined 回调时调用该方法。如果启用了视频录制功能，视频录制服务会做为一个哑客户端加入频道，因此其他客户端也会收到它的 onUserJoined 事件， App 不应给它绑定视图（因为它不会发送视频流）。
   * 如需解除某个远端用户的绑定视图，可以调用该方法并将 view 设置为空。
   * 离开频道后，SDK 会清除远端用户视图的绑定关系。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param canvas 视频画布信息。详见 VideoCanvas 。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract setupRemoteVideoEx(
    canvas: VideoCanvas,
    connection: RtcConnection
  ): number;

  /*
   * 停止/恢复接收指定的音频流。
   * 该方法停止/恢复接收某一个指定远端用户的音频流。在加入频道前或后都可以调用。该方法的设置在离开频道后失效。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param uid 指定用户的 ID。
   *
   * @param mute 是否停止接收指定音频流： true: 停止接收指定音频流。
   *  false:（默认）继续接收指定音频流。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract muteRemoteAudioStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /*
   * 停止/恢复接收指定的视频流。
   * 该方法停止/恢复接收某一个指定远端用户的视频流。在加入频道前或后都可以调用。该方法的设置在离开频道后失效。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param uid 远端用户的 ID。
   *
   * @param mute 是否停止接收某个远端用户的视频： true: 停止接收。
   *  false: （默认）恢复接收。
   *
   * @returns
   * 0：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract muteRemoteVideoStreamEx(
    uid: number,
    mute: boolean,
    connection: RtcConnection
  ): number;

  /*
   * TODO(doc)
   */
  abstract setRemoteVideoStreamTypeEx(
    uid: number,
    streamType: VideoStreamType,
    connection: RtcConnection
  ): number;

  /*
   * 设置远端用户声音的 2D 位置，即水平面位置。
   * 设置远端用户声音的空间位置和音量，方便本地用户听声辨位。
   * 通过调用该接口设置远端用户声音出现的位置，左右声道的声音差异会产生声音的方位感，从而判断出远端用户的实时位置。在多人在线游戏场景，如吃鸡游戏中，该方法能有效增加游戏角色的方位感，模拟真实场景。 为获得最佳听觉体验，我们建议用户佩戴有线耳机。
   * 该方法需要在加入频道后调用。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param uid 远端用户的 ID。
   *
   * @param pan 设置远端用户声音的空间位置，取值范围为 [-1.0,1.0]: -1.0: 声音出现在左边。
   *  (默认）0.0: 声音出现在正前方。
   *  1.0: 声音出现在右边。
   *
   * @param gain 设置远端用户声音的音量，取值范围为 [0.0,100.0]，默认值为 100.0，表示该用户的原始音量。取值越小，则音量越低。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setRemoteVoicePositionEx(
    uid: number,
    pan: number,
    gain: number,
    connection: RtcConnection
  ): number;

  /*
   * TODO(doc)
   */
  abstract setRemoteUserSpatialAudioParamsEx(
    uid: number,
    params: SpatialAudioParams,
    connection: RtcConnection
  ): number;

  /*
   * TODO(doc)
   */
  abstract setRemoteRenderModeEx(
    uid: number,
    renderMode: RenderModeType,
    mirrorMode: VideoMirrorModeType,
    connection: RtcConnection
  ): number;

  /*
   * TODO(doc)
   */
  abstract enableLoopbackRecordingEx(
    connection: RtcConnection,
    enabled: boolean,
    deviceName?: string
  ): number;

  /*
   *  获取当前网络连接状态。
   * 该方法在加入频道前后都能调用。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @returns
   * 当前网络连接状态。详见 ConnectionStateType 。
   */
  abstract getConnectionStateEx(connection: RtcConnection): ConnectionStateType;

  /*
   * TODO(doc)
   */
  abstract enableEncryptionEx(
    connection: RtcConnection,
    enabled: boolean,
    config: EncryptionConfig
  ): number;

  /*
   * 发送数据流。
   * 调用 createDataStreamEx 后，你可以调用本方法向频道内所有用户发送数据流消息。
   * SDK 对该方法有如下限制：
   * 频道内每秒最多能发送 60 个包，且每个包最大为 1 KB。
   * 每个客户端每秒最多能发送 30 KB 数据。
   * 频道内每人最多能同时有 5 个数据通道。 成功调用该方法后，远端会触发 onStreamMessage 回调，远端用户可以在该回调中获取接收到的流消息；
   * 若调用失败，远端会触发 onStreamMessageError 回调。 请确保在调用该方法前，已调用 createDataStreamEx 创建了数据通道。
   * 该方法仅适用于通信场景以及直播场景下的主播用户，如果直播场景下的观众调用此方法可能会造成观众变主播。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param streamId 数据流 ID。可以通过 createDataStreamEx 获取。
   *
   * @param data 待发送的数据。
   *
   * @param length 数据长度。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract sendStreamMessageEx(
    streamId: number,
    data: Uint8Array,
    length: number,
    connection: RtcConnection
  ): number;

  /*
   * 添加本地视频水印。
   * 该方法将一张 PNG 图片作为水印添加到本地发布的直播视频流上，同一直播频道中的用户、旁路直播观众和采集设备都能看到或采集到该水印图片。
   * Agora 当前只支持在直播视频流中添加一个水印，后添加的水印会替换掉之前添加的水印。
   * 水印坐标和 setVideoEncoderConfigurationEx 方法中的设置有依赖关系： 如果视频编码方向（ OrientationMode ）固定为横屏或自适应模式下的横屏，那么水印使用横屏坐标。
   * 如果视频编码方向（OrientationMode）固定为竖屏或自适应模式下的竖屏，那么水印使用竖屏坐标。
   * 设置水印坐标时，水印的图像区域不能超出 setVideoEncoderConfigurationEx 方法中设置的视频尺寸，否则超出部分将被裁剪。
   * 你需要在调用 enableVideo 方法之后再调用本方法。
   * 待添加水印图片必须是 PNG 格式。本方法支持所有像素格式的 PNG 图片：RGBA、RGB、Palette、Gray 和 Alpha_gray。
   * 如果待添加的 PNG 图片的尺寸与你在本方法中设置的尺寸不一致，SDK 会对 PNG 图片进行缩放或裁剪，以与设置相符。
   * 如果你已经使用 startPreview 方法开启本地视频预览，那么本方法的 visibleInPreview 可设置水印在预览时是否可见。
   * 如果你已设置本地视频为镜像模式，那么此处的本地水印也为镜像。为避免本地用户看本地视频时的水印也被镜像，Agora 建议你不要对本地视频同时使用镜像和水印功能，请在应用层实现本地水印功能。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param options 待添加的水印图片的设置选项，详见 WatermarkOptions 。
   *
   * @param watermarkUrl 待添加的水印图片的本地路径。该方法支持从本地绝对/相对路径添加水印图片。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract addVideoWatermarkEx(
    watermarkUrl: string,
    options: WatermarkOptions,
    connection: RtcConnection
  ): number;

  /*
   * 删除已添加的视频水印。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract clearVideoWatermarkEx(connection: RtcConnection): number;

  /*
   * 自定义数据上报和分析服务。
   * 声网提供自定义数据上报和分析服务。该服务当前处于免费内测期。内测期提供的能力为 6 秒内最多上报 10 条数据，每条自定义数据不能超过 256 字节，每个字符串不能超过 100 字节。如需试用该服务，请联系 开通并商定自定义数据格式。
   */
  abstract sendCustomReportMessageEx(
    id: string,
    category: string,
    event: string,
    label: string,
    value: number,
    connection: RtcConnection
  ): number;

  /*
   * TODO(doc)
   */
  abstract enableAudioVolumeIndicationEx(
    interval: number,
    smooth: number,
    reportVad: boolean,
    connection: RtcConnection
  ): number;

  /*
   * TODO(doc)
   */
  abstract getUserInfoByUserAccountEx(
    userAccount: string,
    connection: RtcConnection
  ): UserInfo;

  /*
   * TODO(doc)
   */
  abstract getUserInfoByUidEx(uid: number, connection: RtcConnection): UserInfo;

  /*
   * TODO(doc)
   */
  abstract setVideoProfileEx(
    width: number,
    height: number,
    frameRate: number,
    bitrate: number
  ): number;

  /*
   * TODO(doc)
   */
  abstract enableDualStreamModeEx(
    sourceType: VideoSourceType,
    enabled: boolean,
    streamConfig: SimulcastStreamConfig,
    connection: RtcConnection
  ): number;

  /*
   * 增加旁路推流地址。
   * 调用该方法后，你可以根据 RtcConnection 选择向 CDN 推送任意一路 RTMP 或 RTMPS 协议的媒体流。SDK 会在本地触发 onRtmpStreamingStateChanged 回调，报告增加旁路推流地址的状态。 该方法需要在加入频道后调用。
   * 请确保已开通旁路推流的功能。
   * 只有直播场景中角色为主播的用户才能调用该方法。
   * 该方法每次只能增加一路旁路推流地址。若需推送多路流，则需多次调用该方法。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param transcodingEnabled 是否转码。转码是指在旁路推流时对音视频流进行转码处理后再推送到其他 CDN 服务器。多适用于频道内有多个主播，需要进行混流、合图的场景。 true: 转码。
   *  false: 不转码。 如果该参数设为 true，需先调用 setLiveTranscoding 方法。
   *
   * @param url 旁路推流地址，格式为 RTMP 或 RTMPS。该字符长度不能超过 1024 字节，不支持中文字符等特殊字符。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   * -2: 参数无效，一般是 URL 为空或是长度为 0 的字符串。
   * -7: 推流时未初始化引擎。
   */
  abstract addPublishStreamUrlEx(
    url: string,
    transcodingEnabled: boolean,
    connection: RtcConnection
  ): number;

  /*
   * 创建数据流。
   * 创建数据流。每个用户在每个频道中最多只能创建 5 个数据流。
   * 相比 createDataStreamEx ，本方法不支持数据可靠。接收方会丢弃超出发送时间 5 秒后的数据包。
   *
   * @param connection Connection 信息。详见 RtcConnection 。
   *
   * @param config 数据流设置。详见 DataStreamConfig 。
   *
   * @returns
   * 创建的数据流的 ID：方法调用成功。
   * < 0：方法调用失败。
   */
  abstract createDataStreamEx(
    config: DataStreamConfig,
    connection: RtcConnection
  ): number;
}
