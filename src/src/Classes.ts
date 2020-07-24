import {
    AudioChannel,
    AudioCodecProfileType,
    AudioSampleRateType,
    CameraCaptureOutputPreference,
    CameraDirection,
    DegradationPreference,
    LastmileProbeResultState,
    LighteningContrastLevel,
    NetworkQuality,
    VideoCodecProfileType,
    VideoCodecType,
    VideoFrameRate,
    VideoMirrorMode,
    VideoOutputOrientationMode,
    VideoQualityAdaptIndication,
    VideoStreamType
} from "./Enums";

/**
 * The user information, including the user ID and user account.
 * @property uid: int | The user ID of a user.
 * @property userAccount: string | The user account of a user.
 */
export interface UserInfo {
    uid: number
    userAccount: string
}

/**
 * The video resolution.
 * @property width: int | The video resolution on the horizontal axis.
 * @property height: int | The video resolution on the vertical axis.
 */
export class VideoDimensions {
    width: number
    height: number

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

/**
 * Definition of VideoEncoderConfiguration.
 * @property dimensions: object | The video frame dimensions (px), which is used to specify the video quality and measured by the total number of pixels along a frame's width and height. The default value is 640 × 360.
 * @property frameRate: int | The video frame rate (fps). The default value is 15. Users can either set the frame rate manually or choose from the following options. We do not recommend setting this to a value greater than 30.
 * @property minFrameRate: int | The minimum video encoder frame rate (fps). The default value is Min(-1) (the SDK uses the lowest encoder frame rate).
 * @property bitrate: int | Bitrate of the video (Kbps). Refer to the table below and set your bitrate. If you set a bitrate beyond the proper range, the SDK automatically adjusts it to a value within the range.
 * @property minBitrate: int | The minimum encoding bitrate (Kbps). The Agora SDK automatically adjusts the encoding bitrate to adapt to the network conditions. Using a value greater than the default value forces the video encoder to output high-quality images but may cause more packet loss and hence sacrifice the smoothness of the video transmission. That said, unless you have special requirements for image quality, Agora does not recommend changing this value.
 * @property orientationMode: int | The orientation mode.
 * @property degradationPrefer: int | The video encoding degradation preference under limited bandwidth.
 * @property mirrorMode: int | Sets the mirror mode of the published local video stream.
 */
export class VideoEncoderConfiguration {
    dimensions?: VideoDimensions
    frameRate?: VideoFrameRate
    minFrameRate?: VideoFrameRate
    bitrate?: number
    minBitrate?: number
    orientationMode?: VideoOutputOrientationMode
    degradationPrefer?: DegradationPreference
    mirrorMode?: VideoMirrorMode

    constructor({dimensions, frameRate, minFrameRate, bitrate, minBitrate, orientationMode, degradationPrefer, mirrorMode}: { dimensions?: VideoDimensions, frameRate?: VideoFrameRate, minFrameRate?: VideoFrameRate, bitrate?: number, minBitrate?: number, orientationMode?: VideoOutputOrientationMode, degradationPrefer?: DegradationPreference, mirrorMode?: VideoMirrorMode }) {
        this.dimensions = dimensions;
        this.frameRate = frameRate;
        this.minFrameRate = minFrameRate;
        this.bitrate = bitrate;
        this.minBitrate = minBitrate;
        this.orientationMode = orientationMode;
        this.degradationPrefer = degradationPrefer;
        this.mirrorMode = mirrorMode;
    }
}

/**
 * Sets the image enhancement options.
 * @property lighteningContrastLevel: int | The lightening contrast level.
 * @property lighteningLevel: float | The brightness level. The value ranges between 0.0 (original) and 1.0. The default value is 0.7.
 * @property smoothnessLevel: float | The sharpness level. The value ranges between 0.0 (original) and 1.0. The default value is 0.5. This parameter is usually used to remove blemishes.
 * @property rednessLevel: float | The redness level. The value ranges between 0.0 (original) and 1.0. The default value is 0.1. This parameter adjusts the red saturation level.
 */
export class BeautyOptions {
    lighteningContrastLevel?: LighteningContrastLevel
    lighteningLevel?: number
    smoothnessLevel?: number
    rednessLevel?: number

    constructor({lighteningContrastLevel, lighteningLevel, smoothnessLevel, rednessLevel}: { lighteningContrastLevel?: LighteningContrastLevel, lighteningLevel?: number, smoothnessLevel?: number, rednessLevel?: number }) {
        this.lighteningContrastLevel = lighteningContrastLevel;
        this.lighteningLevel = lighteningLevel;
        this.smoothnessLevel = smoothnessLevel;
        this.rednessLevel = rednessLevel;
    }
}

/**
 * Agora image properties. A class for setting the properties of the watermark and background images.
 * @property url: string | HTTP/HTTPS URL address of the image on the broadcasting video. The maximum length of this parameter is 1024 bytes.
 * @property x: int | Position of the image on the upper left of the broadcasting video on the horizontal axis.
 * @property y: int | Position of the image on the upper left of the broadcasting video on the vertical axis.
 * @property width: int | Width of the image on the broadcasting video.
 * @property height: int | Height of the image on the broadcasting video.
 */
export class AgoraImage {
    url: string
    x: number
    y: number
    width: number
    height: number

    constructor(url: string, x: number, y: number, width: number, height: number) {
        this.url = url;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * The transcodingUser class, which defines the audio and video properties in the CDN live. Agora supports a maximum of 17 transcoding users in a CDN live streaming channel.
 * @property uid: int | ID of the user in the CDN live streaming.
 * @property x: int | Horizontal position of the video frame of the user from the top left corner of the CDN live streaming.
 * @property y: int | Vertical position of the video frame of the user from the top left corner of the CDN live streaming.
 * @property width: int | Width of the video frame of the user on the CDN live streaming. The default value is 360.
 * @property height: int | Height of the video frame of the user on the CDN live streaming. The default value is 640.
 * @property zOrder: int | Layer position of video frame of the user on the CDN live streaming. The value ranges between 0 and 100. From v2.3.0, Agora SDK supports setting zOrder as 0. The smallest value is 0 (default value), which means that the video frame is at the bottom layer. The biggest value is 100, which means that the video frame is at the top layer.
 * @property alpha: float | The transparency of the video frame of the user in the CDN live stream that ranges between 0.0 and 1.0. 0.0 means that the video frame is completely transparent and 1.0 means opaque. The default value is 1.0.
 * @property audioChannel: int | The audio channel ranging between 0 and 5. The default value is 0.
 */
export class TranscodingUser {
    uid: number
    x: number
    y: number
    width?: number
    height?: number
    zOrder?: number
    alpha?: number
    audioChannel?: AudioChannel

    constructor(uid: number, x: number, y: number, {width, height, zOrder, alpha, audioChannel}: { width?: number, height?: number, zOrder?: number, alpha?: number, audioChannel?: AudioChannel }) {
        this.uid = uid;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.zOrder = zOrder;
        this.alpha = alpha;
        this.audioChannel = audioChannel;
    }
}

/**
 * Color.
 * @property red: int | Red.
 * @property green: int | Green.
 * @property blue: int | Blue.
 */
export class Color {
    red: number
    green: number
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

/**
 * A class for managing user-specific CDN live audio/video transcoding settings.
 * @property width: int | Width (pixel) of the video. The default value is 360. If you push video streams to the CDN, set the value of width × height to at least 64 × 64, or the SDK adjusts it to 64 x 64. If you push audio streams to the CDN, set the value of width × height to 0 × 0.
 * @property height: int | Height (pixel) of the video. The default value is 640. If you push video streams to the CDN, set the value of width × height to at least 64 × 64, or the SDK adjusts it to 64 x 64. If you push audio streams to the CDN, set the value of width × height to 0 × 0.
 * @property videoBitrate: int | Bitrate (Kbps) of the CDN live output video stream. The default value is 400. Set this parameter according to the Video Bitrate Table. If you set a bitrate beyond the proper range, the SDK automatically adapts it to a value within the range.
 * @property videoFramerate: int | Frame rate (fps) of the CDN live output video stream. The value range is [0, 30]. The default value is 15. Agora adjusts all values over 30 to 30.
 * @property lowLatency: boolean | true: Low latency with unassured quality. false: (Default) High latency with assured quality.
 * @property videoGop: int | Gop of the video frames in the CDN live stream. The default value is 30 fps.
 * @property watermark: object | The watermark image added to the CDN live publishing stream. Ensure that the format of the image is PNG. Once a watermark image is added, the audience of the CDN live publishing stream can see it.
 * @property backgroundImage: object | The background image added to the CDN live publishing stream. Once a background image is added, the audience of the CDN live publishing stream can see it.
 * @property audioSampleRate: int | Self-defined audio-sample rate: AudioSampleRateType.
 * @property audioBitrate: int | Bitrate (Kbps) of the CDN live audio output stream. The default value is 48 and the highest value is 128.
 * @property audioChannels: int | Agora’s self-defined audio channel type. We recommend choosing 1 or 2. Special players are required if you choose 3, 4 or 5.
 * @property audioCodecProfile: int | Audio codec profile type: AudioCodecProfileType. Set it as LC-AAC or HE-AAC. The default value is LC-AAC.
 * @property videoCodecProfile: int | Video codec profile type: VideoCodecProfileType. Set it as BASELINE, MAIN, or HIGH (default). If you set this parameter to other values, Agora adjusts it to the default value HIGH.
 * @property backgroundColor: int | Sets the background color.
 * @property userConfigExtraInfo: string | Reserved property. Extra user-defined information to send the Supplemental Enhancement Information (SEI) for the H.264/H.265 video stream to the CDN live client. Maximum length: 4096 Bytes.
 * @property transcodingUsers: array | An TranscodingUser object managing the user layout configuration in the CDN live stream. Agora supports a maximum of 17 transcoding users in a CDN live stream channel.
 */
export class LiveTranscoding {
    width?: number
    height?: number
    videoBitrate?: number
    videoFramerate?: VideoFrameRate
    /** @deprecated */
    lowLatency?: boolean
    videoGop?: number
    watermark?: AgoraImage
    backgroundImage?: AgoraImage
    audioSampleRate?: AudioSampleRateType
    audioBitrate?: number
    audioChannels?: AudioChannel
    audioCodecProfile?: AudioCodecProfileType
    videoCodecProfile?: VideoCodecProfileType
    backgroundColor?: Color
    userConfigExtraInfo?: string
    transcodingUsers: TranscodingUser[]

    constructor(transcodingUsers: TranscodingUser[], {width, height, videoBitrate, videoFramerate, lowLatency, videoGop, watermark, backgroundImage, audioSampleRate, audioBitrate, audioChannels, audioCodecProfile, videoCodecProfile, backgroundColor, userConfigExtraInfo}: { width?: number, height?: number, videoBitrate?: number, videoFramerate?: VideoFrameRate, lowLatency?: boolean, videoGop?: number, watermark?: AgoraImage, backgroundImage?: AgoraImage, audioSampleRate?: AudioSampleRateType, audioBitrate?: number, audioChannels?: AudioChannel, audioCodecProfile?: AudioCodecProfileType, videoCodecProfile?: VideoCodecProfileType, backgroundColor?: Color, userConfigExtraInfo?: string, }) {
        this.width = width;
        this.height = height;
        this.videoBitrate = videoBitrate;
        this.videoFramerate = videoFramerate;
        this.lowLatency = lowLatency;
        this.videoGop = videoGop;
        this.watermark = watermark;
        this.backgroundImage = backgroundImage;
        this.audioSampleRate = audioSampleRate;
        this.audioBitrate = audioBitrate;
        this.audioChannels = audioChannels;
        this.audioCodecProfile = audioCodecProfile;
        this.videoCodecProfile = videoCodecProfile;
        this.backgroundColor = backgroundColor;
        this.userConfigExtraInfo = userConfigExtraInfo;
        this.transcodingUsers = transcodingUsers;
    }
}

/**
 * The ChannelMediaInfo class.
 * @property channelName: string | The channel name.
 * @property token: string | The token that enables the user to join the channel.
 * @property uid: int | The user ID.
 */
export class ChannelMediaInfo {
    channelName?: string
    token?: string
    uid: number

    constructor(uid: number, {channelName, token}: { channelName?: string, token?: string }) {
        this.channelName = channelName;
        this.token = token;
        this.uid = uid;
    }
}

/**
 * The ChannelMediaRelayConfiguration class.
 * @property srcInfo: object | Sets the information of the source channel.
 * @property destInfos: array | Sets the information of the destination channel.
 */
export class ChannelMediaRelayConfiguration {
    srcInfo: ChannelMediaInfo
    destInfos: ChannelMediaInfo[]

    constructor(srcInfo: ChannelMediaInfo, destInfos: ChannelMediaInfo[]) {
        this.srcInfo = srcInfo;
        this.destInfos = destInfos;
    }
}

/**
 * Lastmile probe configuration.
 * @property probeUplink: boolean | Whether to probe uplink of lastmile. i.e., audience don't need probe uplink bandwidth.
 * @property probeDownlink: boolean | Whether to probe downlink of lastmile.
 * @property expectedUplinkBitrate: int | The expected maximum sending bitrate in bps in range of [100000, 5000000]. It is recommended to set this value according to the required bitrate of selected video profile.
 * @property expectedDownlinkBitrate: int | The expected maximum receive bitrate in bps in range of [100000, 5000000].
 */
export class LastmileProbeConfig {
    probeUplink: boolean
    probeDownlink: boolean
    expectedUplinkBitrate: number
    expectedDownlinkBitrate: number

    constructor(probeUplink: boolean, probeDownlink: boolean, expectedUplinkBitrate: number, expectedDownlinkBitrate: number) {
        this.probeUplink = probeUplink;
        this.probeDownlink = probeDownlink;
        this.expectedUplinkBitrate = expectedUplinkBitrate;
        this.expectedDownlinkBitrate = expectedDownlinkBitrate;
    }
}

/**
 * The position and size of the watermark image.
 * @property x: int | The horizontal offset from the top-left corner.
 * @property y: int | The vertical offset from the top-left corner.
 * @property width: int | The width (pixels) of the watermark image.
 * @property height: int | The height (pixels) of the watermark image.
 */
export class Rectangle {
    x: number
    y: number
    width: number
    height: number

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

/**
 * Agora watermark options. A class for setting the properties of watermark.
 * @property visibleInPreview: boolean | Sets whether or not the watermark image is visible in the local video preview: true: (Default) The watermark image is visible in preview. false: The watermark image is not visible in preview.
 * @property positionInLandscapeMode: object | The watermark position in the landscape mode.
 * @property positionInPortraitMode: object | The watermark position in the portrait mode.
 */
export class WatermarkOptions {
    visibleInPreview?: boolean
    positionInLandscapeMode: Rectangle
    positionInPortraitMode: Rectangle

    constructor(positionInLandscapeMode: Rectangle, positionInPortraitMode: Rectangle, visibleInPreview?: boolean) {
        this.visibleInPreview = visibleInPreview;
        this.positionInLandscapeMode = positionInLandscapeMode;
        this.positionInPortraitMode = positionInPortraitMode;
    }
}

/**
 * Configuration of the imported live broadcast voice or video stream.
 * @property width: int | Width of the added stream to the broadcast. The default value is 0, which is the same width as the original stream.
 * @property height: int | Height of the added stream to the broadcast. The default value is 0, which is the same height as the original stream.
 * @property videoGop: int | Video GOP of the added stream to the broadcast. The default value is 30 frames.
 * @property videoFramerate: int | Video frame rate of the added stream to the broadcast. The default value is 15 fps.
 * @property videoBitrate: int | Video bitrate of the added stream to the broadcast. The default value is 400 Kbps.
 * @property audioSampleRate: int | Audio sample rate of the added stream to the broadcast: AudioSampleRateType. The default value is 44100 Hz.
 * @property audioBitrate: int | Audio bitrate of the added stream to the broadcast. The default value is 48.
 * @property audioChannels: int | Audio channels to add into the broadcast. The value ranges between 1 and 2. The default value is 1.
 */
export class LiveInjectStreamConfig {
    width?: number
    height?: number
    videoGop?: number
    videoFramerate?: VideoFrameRate
    videoBitrate?: number
    audioSampleRate?: AudioSampleRateType
    audioBitrate?: number
    audioChannels?: AudioChannel

    constructor({width, height, videoGop, videoFramerate, videoBitrate, audioSampleRate, audioBitrate, audioChannels}: { width?: number, height?: number, videoGop?: number, videoFramerate?: VideoFrameRate, videoBitrate?: number, audioSampleRate?: AudioSampleRateType, audioBitrate?: number, audioChannels?: AudioChannel }) {
        this.width = width;
        this.height = height;
        this.videoGop = videoGop;
        this.videoFramerate = videoFramerate;
        this.videoBitrate = videoBitrate;
        this.audioSampleRate = audioSampleRate;
        this.audioBitrate = audioBitrate;
        this.audioChannels = audioChannels;
    }
}

/**
 * The definition of CameraCapturerConfiguration.
 * @property preference: int | The camera capturer configuration.
 * @property cameraDirection: int | The camera direction.
 */
export class CameraCapturerConfiguration {
    preference: CameraCaptureOutputPreference
    cameraDirection: CameraDirection

    constructor(preference: CameraCaptureOutputPreference, cameraDirection: CameraDirection) {
        this.preference = preference;
        this.cameraDirection = cameraDirection;
    }
}

/**
 * The channel media options.
 * @property autoSubscribeAudio: boolean | Determines whether to subscribe to audio streams when the user joins the channel.
 * @property autoSubscribeVideo: boolean | Determines whether to subscribe to video streams when the user joins the channel.
 */
export class ChannelMediaOptions {
    autoSubscribeAudio: boolean
    autoSubscribeVideo: boolean

    constructor(autoSubscribeAudio: boolean, autoSubscribeVideo: boolean) {
        this.autoSubscribeAudio = autoSubscribeAudio;
        this.autoSubscribeVideo = autoSubscribeVideo;
    }
}

/**
 * Statistics of RTCEngine.
 * @property totalDuration: int | Call duration in seconds, represented by an aggregate value.
 * @property txBytes: int | Total number of bytes transmitted, represented by an aggregate value.
 * @property rxBytes: int | Total number of bytes received, represented by an aggregate value.
 * @property txAudioBytes: int | Total number of audio bytes sent (bytes), represented by an aggregate value.
 * @property txVideoBytes: int | Total number of video bytes sent (bytes), represented by an aggregate value.
 * @property rxAudioBytes: int | Total number of audio bytes received (bytes), represented by an aggregate value.
 * @property rxVideoBytes: int | Total number of video bytes received (bytes), represented by an aggregate value.
 * @property txKBitRate: int | Transmission bitrate in Kbps, represented by an instantaneous value.
 * @property rxKBitRate: int | Receive bitrate (Kbps), represented by an instantaneous value.
 * @property txAudioKBitRate: int | The transmission bitrate of the audio packet (Kbps), represented by an instantaneous value.
 * @property rxAudioKBitRate: int | Audio receive bitrate (Kbps), represented by an instantaneous value.
 * @property txVideoKBitRate: int | Video transmission bitrate (Kbps), represented by an instantaneous value.
 * @property rxVideoKBitRate: int | Video receive bitrate (Kbps), represented by an instantaneous value.
 * @property users: int | The number of users in the channel.
 * @property lastmileDelay: int | Client-server latency.
 * @property txPacketLossRate: int | The packet loss rate (%) from the local client to Agora's edge server, before network countermeasures.
 * @property rxPacketLossRate: int | The packet loss rate (%) from Agora's edge server to the local client, before network countermeasures.
 * @property cpuTotalUsage: float | System CPU usage (%).
 * @property cpuAppUsage: float | Application CPU usage (%).
 * @property gatewayRtt: int | The round-trip time delay from the client to the local router.
 * @property memoryAppUsageRatio: float | The memory usage ratio of the app (%).
 * @property memoryTotalUsageRatio: float | The memory usage ratio of the system (%).
 * @property memoryAppUsageInKbytes: int | The memory usage of the app (KB).
 */
export interface RtcStats {
    totalDuration: number
    txBytes: number
    rxBytes: number
    txAudioBytes: number
    txVideoBytes: number
    rxAudioBytes: number
    rxVideoBytes: number
    txKBitRate: number
    rxKBitRate: number
    txAudioKBitRate: number
    rxAudioKBitRate: number
    txVideoKBitRate: number
    rxVideoKBitRate: number
    users: number
    lastmileDelay: number
    txPacketLossRate: number
    rxPacketLossRate: number
    cpuTotalUsage: number
    cpuAppUsage: number
    gatewayRtt: number
    memoryAppUsageRatio: number
    memoryTotalUsageRatio: number
    memoryAppUsageInKbytes: number
}

/**
 * Properties of the audio volume information. An array containing the user ID and volume information for each speaker.
 * @property uid: int | The user ID of the speaker. The uid of the local user is 0.
 * @property volume: int | The sum of the voice volume and audio-mixing volume of the speaker. The value ranges between 0 (lowest volume) and 255 (highest volume).
 * @property vad: int | Voice activity status of the local user.
 * @property channelId: string | The channel ID, which indicates which channel the speaker is in.
 */
export interface AudioVolumeInfo {
    uid: number
    volume: number
    vad: number
    channelId: string
}

/**
 * Rect.
 * @property left: int | Left.
 * @property top: int | Top.
 * @property right: int | Right.
 * @property bottom: int | Bottom.
 */
export interface Rect {
    left: number
    top: number
    right: number
    bottom: number
}

/**
 * The one-way last-mile probe result.
 * @property packetLossRate: int | The packet loss rate (%).
 * @property jitter: int | The network jitter (ms).
 * @property availableBandwidth: int | The estimated available bandwidth (bps).
 */
export interface LastmileProbeOneWayResult {
    packetLossRate: number
    jitter: number
    availableBandwidth: number
}

/**
 * Statistics of the lastmile probe.
 * @property state: int | The state of the probe test.
 * @property rtt: int | The round-trip delay time (ms).
 * @property uplinkReport: object | The uplink last-mile network report.
 * @property downlinkReport: object | The downlink last-mile network report.
 */
export interface LastmileProbeResult {
    state: LastmileProbeResultState
    rtt: number
    uplinkReport: LastmileProbeOneWayResult
    downlinkReport: LastmileProbeOneWayResult
}

/**
 * Statistics of the local audio stream.
 * @property numChannels: int | The number of channels.
 * @property sentSampleRate: int | The sample rate (Hz).
 * @property sentBitrate: int | The average sending bitrate (Kbps).
 */
export interface LocalAudioStats {
    numChannels: number
    sentSampleRate: number
    sentBitrate: number
}

/**
 * Statistics of the local video.
 * @property sentBitrate: int | Bitrate (Kbps) sent in the reported interval, which does not include the bitrate of the re-transmission video after the packet loss.
 * @property sentFrameRate: int | Frame rate (fps) sent in the reported interval, which does not include the frame rate of the re-transmission video after the packet loss.
 * @property encoderOutputFrameRate: int | The encoder output frame rate (fps) of the local video.
 * @property rendererOutputFrameRate: int | The renderer output frame rate (fps) of the local video.
 * @property targetBitrate: int | The target bitrate (Kbps) of the current encoder. This value is estimated by the SDK based on the current network conditions.
 * @property targetFrameRate: int | The target frame rate (fps) of the current encoder.
 * @property qualityAdaptIndication: int | Quality change of the local video in terms of target frame rate and target bit rate since last count.
 * @property encodedBitrate: int | The encoding bitrate (Kbps), which does not include the bitrate of the re-transmission video after packet loss.
 * @property encodedFrameWidth: int | The width of the encoding frame (px).
 * @property encodedFrameHeight: int | The height of the encoding frame (px).
 * @property encodedFrameCount: int | The value of the sent frame rate, represented by an aggregate value.
 * @property codecType: int | The codec type of the local video.
 */
export interface LocalVideoStats {
    sentBitrate: number
    sentFrameRate: number
    encoderOutputFrameRate: number
    rendererOutputFrameRate: number
    targetBitrate: number
    targetFrameRate: number
    qualityAdaptIndication: VideoQualityAdaptIndication
    encodedBitrate: number
    encodedFrameWidth: number
    encodedFrameHeight: number
    encodedFrameCount: number
    codecType: VideoCodecType
}

/**
 * Statistics of the remote audio.
 * @property uid: int | User ID of the user sending the audio streams.
 * @property quality: int | Audio quality received by the user.
 * @property networkTransportDelay: int | Network delay (ms) from the sender to the receiver.
 * @property jitterBufferDelay: int | Network delay (ms) from the receiver to the jitter buffer.
 * @property audioLossRate: int | Packet loss rate in the reported interval.
 * @property numChannels: int | The number of channels.
 * @property receivedSampleRate: int | The sample rate (Hz) of the received audio stream in the reported interval.
 * @property receivedBitrate: int | The average bitrate (Kbps) of the received audio stream in the reported interval.
 * @property totalFrozenTime: int | The total freeze time (ms) of the remote audio stream after the remote user joins the channel. In the reported interval, audio freeze occurs when the audio frame loss rate reaches 4%. totalFrozenTime = The audio freeze time × 2 × 1000 (ms).
 * @property frozenRate: int | The total audio freeze time as a percentage (%) of the total time when the audio is available.
 * @property totalActiveTime: int | The total time (ms) when the remote user in the Communication profile or the remote broadcaster in the Live-broadcast profile neither stops sending the audio stream nor disables the audio module after joining the channel.
 */
export interface RemoteAudioStats {
    uid: number
    quality: NetworkQuality
    networkTransportDelay: number
    jitterBufferDelay: number
    audioLossRate: number
    numChannels: number
    receivedSampleRate: number
    receivedBitrate: number
    totalFrozenTime: number
    frozenRate: number
    totalActiveTime: number
}

/**
 * Statistics of the remote video.
 * @property uid: int | User ID of the user sending the video streams.
 * @property delay: int | Time delay (ms). In scenarios where audio and video is synchronized, you can use the value of networkTransportDelay and jitterBufferDelay in RemoteAudioStats to know the delay statistics of the remote video.
 * @property width: int | Width (pixels) of the remote video.
 * @property height: int | Height (pixels) of the remote video.
 * @property receivedBitrate: int | Bitrate (Kbps) received in the reported interval.
 * @property decoderOutputFrameRate: int | The decoder output frame rate (fps) of the remote video.
 * @property rendererOutputFrameRate: int | The renderer output frame rate (fps) of the remote video.
 * @property packetLossRate: int | Packet loss rate (%) of the remote video stream after network countermeasures.
 * @property rxStreamType: int | Video stream type (high-stream or low-stream).
 * @property totalFrozenTime: int | The total freeze time (ms) of the remote video stream after the remote user joins the channel.
 * @property frozenRate: int | The total video freeze time as a percentage (%) of the total time when the video is available.
 * @property totalActiveTime: int | The total time (ms) when the remote user in the Communication profile or the remote broadcaster in the Live-broadcast profile neither stops sending the video stream nor disables the video module after joining the channel.
 */
export interface RemoteVideoStats {
    uid: number
    /**
     * @deprecated
     */
    delay: number
    width: number
    height: number
    receivedBitrate: number
    decoderOutputFrameRate: number
    rendererOutputFrameRate: number
    packetLossRate: number
    rxStreamType: VideoStreamType
    totalFrozenTime: number
    frozenRate: number
    totalActiveTime: number
}

/**
 * The information of the detected human face.
 * @property x: int | The x coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin, the x coordinate represents the relative lateral displacement of the top left corner of the human face to the origin.
 * @property y: int | The y coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin, the y coordinate represents the relative longitudinal displacement of the top left corner of the human face to the origin.
 * @property width: int | The width (px) of the human face in the captured video.
 * @property height: int | The height (px) of the human face in the captured video.
 * @property distance: int | The distance (cm) between the human face and the screen.
 */
export interface FacePositionInfo {
    x: number
    y: number
    width: number
    height: number
    distance: number
}
