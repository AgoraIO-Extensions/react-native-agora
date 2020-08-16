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
 */
export interface UserInfo {
    /**
     * The user ID of a user.
     */
    uid: number
    /**
     * The user account of a user.
     */
    userAccount: string
}

/**
 * The video resolution.
 */
export class VideoDimensions {
    /**
     * The video resolution on the horizontal axis.
     */
    width: number
    /**
     * The video resolution on the vertical axis.
     */
    height: number

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }
}

/**
 * Definition of VideoEncoderConfiguration.
 *
 */
export class VideoEncoderConfiguration {
    /**
     * The video frame dimensions (px), which is used to specify the video quality and measured by the total number of pixels along a
     * frame's width and height. The default value is 640 × 360.
     */
    dimensions?: VideoDimensions
    /**
     * The video frame rate (fps). The default value is 15. Users can either set the frame rate manually or choose from the following options.
     * We do not recommend setting this to a value greater than 30.
     */
    frameRate?: VideoFrameRate
    /**
     * The minimum video encoder frame rate (fps). The default value is Min(-1) (the SDK uses the lowest encoder frame rate).
     */
    minFrameRate?: VideoFrameRate
    /**
     * Bitrate of the video (Kbps). Refer to the table below and set your bitrate. If you set a bitrate beyond the proper range,
     * the SDK automatically adjusts it to a value within the range.
     */
    bitrate?: number
    /**
     * The minimum encoding bitrate (Kbps). The Agora SDK automatically adjusts the encoding bitrate to adapt to the network conditions. Using a value greater than the default value forces the video encoder to output high-quality images but may cause more packet loss and hence sacrifice the smoothness of the video transmission. That said, unless you have special requirements for image quality,
     * Agora does not recommend changing this value.
     */
    minBitrate?: number
    /**
     * The orientation mode.
     */
    orientationMode?: VideoOutputOrientationMode
    /**
     * The video encoding degradation preference under limited bandwidth.
     */
    degradationPrefer?: DegradationPreference
    /**
     * Sets the mirror mode of the published local video stream.
     */
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
 */
export class BeautyOptions {
    /**
     * The lightening contrast level.
     */
    lighteningContrastLevel?: LighteningContrastLevel
    /**
     * The brightness level. The value ranges between 0.0 (original) and 1.0. The default value is 0.7.
     */
    lighteningLevel?: number
    /**
     * The sharpness level. The value ranges between 0.0 (original) and 1.0.
     * The default value is 0.5. This parameter is usually used to remove blemishes.
     */
    smoothnessLevel?: number
    /**
     * The redness level. The value ranges between 0.0 (original) and 1.0.
     * The default value is 0.1. This parameter adjusts the red saturation level.
     */
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
 */
export class AgoraImage {
    /**
     * HTTP/HTTPS URL address of the image on the broadcasting video. The maximum length of this parameter is 1024 bytes.
     */
    url: string
    /**
     * Position of the image on the upper left of the broadcasting video on the horizontal axis.
     */
    x: number
    /**
     * Position of the image on the upper left of the broadcasting video on the vertical axis.
     */
    y: number
    /**
     * Width of the image on the broadcasting video.
     */
    width: number
    /**
     * Height of the image on the broadcasting video.
     */
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
 */
export class TranscodingUser {
    /**
     * ID of the user in the CDN live streaming.
     */
    uid: number
    /**
     * Horizontal position of the video frame of the user from the top left corner of the CDN live streaming.
     */
    x: number
    /**
     * Vertical position of the video frame of the user from the top left corner of the CDN live streaming.
     */
    y: number
    /**
     * Width of the video frame of the user on the CDN live streaming. The default value is 360.
     */
    width?: number
    /**
     * Height of the video frame of the user on the CDN live streaming. The default value is 640.
     */
    height?: number
    /**
     * Layer position of video frame of the user on the CDN live streaming. The value ranges between 0 and 100. From v2.3.0, Agora SDK supports setting zOrder as 0. The smallest value is 0 (default value), which means that the video frame is at the bottom layer. The biggest value is 100, which means that the video frame is at the top layer.
     */
    zOrder?: number
    /**
     * The transparency of the video frame of the user in the CDN live stream that ranges between 0.0 and 1.0. 0.0 means that the video frame is completely transparent and 1.0 means opaque. The default value is 1.0.
     */
    alpha?: number
    /**
     * The audio channel ranging between 0 and 5. The default value is 0.
     */
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
 *
 */
export class Color {
    /**
     * Red.
     */
    red: number
    /**
     * Green.
     */
    green: number
    /**
     * Blue.
     */
    blue: number

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }
}

/**
 * A class for managing user-specific CDN live audio/video transcoding settings.
 *
 */
export class LiveTranscoding {
    /**
     * Width (pixel) of the video. The default value is 360. If you push video streams to the CDN, set the value of width × height to at least 64 × 64, or the SDK adjusts it to 64 x 64.
     * If you push audio streams to the CDN, set the value of width × height to 0 × 0.
     */
    width?: number
    /**
     * Height (pixel) of the video. The default value is 640. If you push video streams to the CDN, set the value of width × height to at least 64 × 64, or the SDK adjusts it to 64 x 64.
     * If you push audio streams to the CDN, set the value of width × height to 0 × 0.
     */
    height?: number
    /**
     * Bitrate (Kbps) of the CDN live output video stream. The default value is 400. Set this parameter according to the Video Bitrate Table. If you set a bitrate beyond the proper range,
     * the SDK automatically adapts it to a value within the range.
     */
    videoBitrate?: number
    /**
     * Frame rate (fps) of the CDN live output video stream.
     * The value range is [0,30]. The default value is 15. Agora adjusts all values over 30 to 30.
     */
    videoFramerate?: VideoFrameRate
    /**
     * **Deprecated**
     * - true: Low latency with unassured quality.
     * - false: (Default) High latency with assured quality.
     */
    lowLatency?: boolean
    /**
     * Gop of the video frames in the CDN live stream. The default value is 30 fps.
     */
    videoGop?: number
    /**
     * The watermark image added to the CDN live publishing stream. Ensure that the format of the image is PNG. Once a watermark image is added,
     * the audience of the CDN live publishing stream can see it.
     */
    watermark?: AgoraImage
    /**
     * The background image added to the CDN live publishing stream. Once a background image is added,
     * the audience of the CDN live publishing stream can see it.
     */
    backgroundImage?: AgoraImage
    /**
     * Self-defined audio-sample rate: AudioSampleRateType.
     */
    audioSampleRate?: AudioSampleRateType
    /**
     * Bitrate (Kbps) of the CDN live audio output stream. The default value is 48 and the highest value is 128.
     */
    audioBitrate?: number
    /**
     * Agora self-defined audio channel type. We recommend choosing `1` or `2`. Special players are required if you choose `3`, `4` or `5`.
     */
    audioChannels?: AudioChannel
    /**
     * Audio codec profile type: AudioCodecProfileType. Set it as LC-AAC or HE-AAC. The default value is LC-AAC.
     */
    audioCodecProfile?: AudioCodecProfileType
    /**
     * Video codec profile type: VideoCodecProfileType. Set it as BASELINE, MAIN, or HIGH (default). If you set this parameter to other values, Agora adjusts it to the default value HIGH.
     */
    videoCodecProfile?: VideoCodecProfileType
    /**
     * Sets the background color.
     */
    backgroundColor?: Color
    /**
     * Reserved property. Extra user-defined information to send the Supplemental Enhancement Information (SEI) for the H.264/H.265 video stream to the CDN live client. Maximum length: 4096 Bytes.
     */
    userConfigExtraInfo?: string
    /**
     * An TranscodingUser object managing the user layout configuration in the CDN live stream. Agora supports a maximum of 17 transcoding users in a CDN live stream channel.
     */
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
 */
export class ChannelMediaInfo {
    /**
     * The channel name.
     */
    channelName?: string
    /**
     * The token that enables the user to join the channel.
     */
    token?: string
    /**
     * The user ID.
     */
    uid: number

    constructor(uid: number, {channelName, token}: { channelName?: string, token?: string }) {
        this.channelName = channelName;
        this.token = token;
        this.uid = uid;
    }
}

/**
 * The ChannelMediaRelayConfiguration class.
 */
export class ChannelMediaRelayConfiguration {
    /**
     * Sets the information of the source channel.
     */
    srcInfo: ChannelMediaInfo
    /**
     * Sets the information of the destination channel.
     */
    destInfos: ChannelMediaInfo[]

    constructor(srcInfo: ChannelMediaInfo, destInfos: ChannelMediaInfo[]) {
        this.srcInfo = srcInfo;
        this.destInfos = destInfos;
    }
}

/**
 * Lastmile probe configuration.
 */
export class LastmileProbeConfig {
    /**
     * Whether to probe uplink of lastmile. i.e., audience don't need probe uplink bandwidth.
     */
    probeUplink: boolean
    /**
     * Whether to probe downlink of lastmile.
     */
    probeDownlink: boolean
    /**
     * The expected maximum sending bitrate in bps in range of [100000,5000000]. It is recommended to set this value according to the required bitrate of selected video profile.
     */
    expectedUplinkBitrate: number
    /**
     * The expected maximum receive bitrate in bps in range of [100000,5000000].
     */
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
 */
export class Rectangle {
    /**
     * The horizontal offset from the top-left corner.
     */
    x: number
    /**
     * The vertical offset from the top-left corner.
     */
    y: number
    /**
     * The width (pixels) of the watermark image.
     */
    width: number
    /**
     * The height (pixels) of the watermark image.
     */
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
 */
export class WatermarkOptions {
    /**
     * Sets whether or not the watermark image is visible in the local video preview:
     * - true: (Default) The watermark image is visible in preview.
     * - false: The watermark image is not visible in preview.
     */
    visibleInPreview?: boolean
    /**
     * The watermark position in the landscape mode.
     */
    positionInLandscapeMode: Rectangle
    /**
     * The watermark position in the portrait mode.
     */
    positionInPortraitMode: Rectangle

    constructor(positionInLandscapeMode: Rectangle, positionInPortraitMode: Rectangle, visibleInPreview?: boolean) {
        this.visibleInPreview = visibleInPreview;
        this.positionInLandscapeMode = positionInLandscapeMode;
        this.positionInPortraitMode = positionInPortraitMode;
    }
}

/**
 * Configuration of the imported live broadcast voice or video stream.
 */
export class LiveInjectStreamConfig {
    /**
     * Width of the added stream to the live interactive streaming. The default value is 0, which is the same width as the original stream.
     */
    width?: number
    /**
     * Height of the added stream to the live interactive streaming. The default value is 0, which is the same height as the original stream.
     */
    height?: number
    /**
     * Video GOP of the added stream to the live interactive streaming. The default value is 30 frames.
     */
    videoGop?: number
    /**
     * Video frame rate of the added stream to the live interactive streaming. The default value is 15 fps.
     */
    videoFramerate?: VideoFrameRate
    /**
     * Video bitrate of the added stream to the live interactive streaming. The default value is 400 Kbps.
     */
    videoBitrate?: number
    /**
     * Audio sample rate of the added stream to the live interactive streaming: AudioSampleRateType. The default value is 44100 Hz.
     */
    audioSampleRate?: AudioSampleRateType
    /**
     * Audio bitrate of the added stream to the live interactive streaming. The default value is 48.
     */
    audioBitrate?: number
    /**
     * Audio channels to add into the live interactive streaming. The value ranges between `1` and `2`. The default value is `1`.
     */
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
 */
export class CameraCapturerConfiguration {
    /**
     * The camera capturer configuration.
     */
    preference: CameraCaptureOutputPreference
    /**
     * The camera direction.
     */
    cameraDirection: CameraDirection

    constructor(preference: CameraCaptureOutputPreference, cameraDirection: CameraDirection) {
        this.preference = preference;
        this.cameraDirection = cameraDirection;
    }
}

/**
 * The channel media options.
 */
export class ChannelMediaOptions {
    /**
     * Determines whether to subscribe to audio streams when the user joins the channel.
     */
    autoSubscribeAudio: boolean
    /**
     * Determines whether to subscribe to video streams when the user joins the channel.
     */
    autoSubscribeVideo: boolean

    constructor(autoSubscribeAudio: boolean, autoSubscribeVideo: boolean) {
        this.autoSubscribeAudio = autoSubscribeAudio;
        this.autoSubscribeVideo = autoSubscribeVideo;
    }
}

/**
 * Statistics of RTCEngine.
 *
 */
export interface RtcStats {
    /**
     * Call duration in seconds, represented by an aggregate value.
     */
    totalDuration: number
    /**
     * Total number of bytes transmitted, represented by an aggregate value.
     */
    txBytes: number
    /**
     * Total number of bytes received, represented by an aggregate value.
     */
    rxBytes: number
    /**
     * Total number of audio bytes sent (bytes), represented by an aggregate value.
     */
    txAudioBytes: number
    /**
     * Total number of video bytes sent (bytes), represented by an aggregate value.
     */
    txVideoBytes: number
    /**
     * Total number of audio bytes received (bytes), represented by an aggregate value.
     */
    rxAudioBytes: number
    /**
     * Total number of video bytes received (bytes), represented by an aggregate value.
     */
    rxVideoBytes: number
    /**
     * Transmission bitrate in Kbps, represented by an instantaneous value.
     */
    txKBitRate: number
    /**
     * Receive bitrate (Kbps), represented by an instantaneous value.
     */
    rxKBitRate: number
    /**
     * The transmission bitrate of the audio packet (Kbps), represented by an instantaneous value.
     */
    txAudioKBitRate: number
    /**
     * Audio receive bitrate (Kbps), represented by an instantaneous value.
     */
    rxAudioKBitRate: number
    /**
     * Video transmission bitrate (Kbps), represented by an instantaneous value.
     */
    txVideoKBitRate: number
    /**
     * Video receive bitrate (Kbps), represented by an instantaneous value.
     */
    rxVideoKBitRate: number
    /**
     * The number of users in the channel.
     */
    users: number
    /**
     * Client-server latency.
     */
    lastmileDelay: number
    /**
     * The packet loss rate (%) from the local client to Agora's edge server, before network countermeasures.
     */
    txPacketLossRate: number
    /**
     * The packet loss rate (%) from Agora's edge server to the local client, before network countermeasures.
     */
    rxPacketLossRate: number
    /**
     * System CPU usage (%).
     */
    cpuTotalUsage: number
    /**
     * Application CPU usage (%).
     */
    cpuAppUsage: number
    /**
     * The round-trip time delay from the client to the local router.
     */
    gatewayRtt: number
    /**
     * The memory usage ratio of the app (%).
     */
    memoryAppUsageRatio: number
    /**
     * The memory usage ratio of the system (%).
     */
    memoryTotalUsageRatio: number
    /**
     * The memory usage of the app (KB).
     */
    memoryAppUsageInKbytes: number
}

/**
 * Properties of the audio volume information. An array containing the user ID and volume information for each speaker.
 *
 */
export interface AudioVolumeInfo {
    /**
     * The user ID of the speaker. The uid of the local user is 0.
     */
    uid: number
    /**
     * The sum of the voice volume and audio-mixing volume of the speaker. The value ranges between 0 (lowest volume) and 255 (highest volume).
     */
    volume: number
    /**
     * Voice activity status of the local user.
     */
    vad: number
    /**
     * The channel ID, which indicates which channel the speaker is in.
     */
    channelId: string
}

/**
 * Rect.
 *
 */
export interface Rect {
    /**
     * Left.
     */
    left: number
    /**
     * Top.
     */
    top: number
    /**
     * Right.
     */
    right: number
    /**
     * Bottom.
     */
    bottom: number
}

/**
 * The one-way last-mile probe result.
 *
 */
export interface LastmileProbeOneWayResult {
    /**
     * The packet loss rate (%).
     */
    packetLossRate: number
    /**
     * The network jitter (ms).
     */
    jitter: number
    /**
     * The estimated available bandwidth (bps).
     */
    availableBandwidth: number
}

/**
 * Statistics of the lastmile probe.
 *
 */
export interface LastmileProbeResult {
    /**
     * The state of the probe test.
     */
    state: LastmileProbeResultState
    /**
     * The round-trip delay time (ms).
     */
    rtt: number
    /**
     * The uplink last-mile network report.
     */
    uplinkReport: LastmileProbeOneWayResult
    /**
     * The downlink last-mile network report.
     */
    downlinkReport: LastmileProbeOneWayResult
}

/**
 * Statistics of the local audio stream.
 *
 */
export interface LocalAudioStats {
    /**
     * The number of channels.
     */
    numChannels: number
    /**
     * The sample rate (Hz).
     */
    sentSampleRate: number
    /**
     * The average sending bitrate (Kbps).
     */
    sentBitrate: number
}

/**
 * Statistics of the local video.
 *
 */
export interface LocalVideoStats {
    /**
     * Bitrate (Kbps) sent in the reported interval, which does not include the bitrate of the re-transmission video after the packet loss.
     */
    sentBitrate: number
    /**
     * Frame rate (fps) sent in the reported interval, which does not include the frame rate of the re-transmission video after the packet loss.
     */
    sentFrameRate: number
    /**
     * The encoder output frame rate (fps) of the local video.
     */
    encoderOutputFrameRate: number
    /**
     * The renderer output frame rate (fps) of the local video.
     */
    rendererOutputFrameRate: number
    /**
     * The target bitrate (Kbps) of the current encoder. This value is estimated by the SDK based on the current network conditions.
     */
    targetBitrate: number
    /**
     * The target frame rate (fps) of the current encoder.
     */
    targetFrameRate: number
    /**
     * Quality change of the local video in terms of target frame rate and target bit rate since last count.
     */
    qualityAdaptIndication: VideoQualityAdaptIndication
    /**
     * The encoding bitrate (Kbps), which does not include the bitrate of the re-transmission video after packet loss.
     */
    encodedBitrate: number
    /**
     * The width of the encoding frame (px).
     */
    encodedFrameWidth: number
    /**
     * The height of the encoding frame (px).
     */
    encodedFrameHeight: number
    /**
     * The value of the sent frame rate, represented by an aggregate value.
     */
    encodedFrameCount: number
    /**
     * The codec type of the local video.
     */
    codecType: VideoCodecType
}

/**
 * Statistics of the remote audio.
 *
 */
export interface RemoteAudioStats {
    /**
     * User ID of the user sending the audio streams.
     */
    uid: number
    /**
     * Audio quality received by the user.
     */
    quality: NetworkQuality
    /**
     * Network delay (ms) from the sender to the receiver.
     */
    networkTransportDelay: number
    /**
     * Network delay (ms) from the receiver to the jitter buffer.
     */
    jitterBufferDelay: number
    /**
     * Packet loss rate in the reported interval.
     */
    audioLossRate: number
    /**
     * The number of channels.
     */
    numChannels: number
    /**
     * The sample rate (Hz) of the received audio stream in the reported interval.
     */
    receivedSampleRate: number
    /**
     * The average bitrate (Kbps) of the received audio stream in the reported interval.
     */
    receivedBitrate: number
    /**
     * The total freeze time (ms) of the remote audio stream after the remote user joins the channel. In the reported interval, audio freeze occurs when the audio frame loss rate reaches 4%. totalFrozenTime = The audio freeze time × 2 × 1000 (ms).
     */
    totalFrozenTime: number
    /**
     * The total audio freeze time as a percentage (%) of the total time when the audio is available.
     */
    frozenRate: number
    /**
     * The total time (ms) when the remote user in the `Communication` profile or the remote broadcaster in the `LiveBroadcasting` profile neither stops sending the audio stream nor disables the audio module after joining the channel.
     */
    totalActiveTime: number
}

/**
 * Statistics of the remote video.
 *
 */
export interface RemoteVideoStats {

    /**
     * User ID of the user sending the video streams.
     */uid: number
    /**
     * **Deprecated**
     * Time delay (ms). In scenarios where audio and video is synchronized, you can use the value of networkTransportDelay and jitterBufferDelay
     * in RemoteAudioStats to know the delay statistics of the remote video.
     */
    delay: number
    /**
     * Width (pixels) of the remote video.
     */
    width: number
    /**
     * Height (pixels) of the remote video.
     */
    height: number
    /**
     * Bitrate (Kbps) received in the reported interval.
     */
    receivedBitrate: number
    /**
     * The decoder output frame rate (fps) of the remote video.
     */
    decoderOutputFrameRate: number
    /**
     * The renderer output frame rate (fps) of the remote video.
     */
    rendererOutputFrameRate: number
    /**
     * Packet loss rate (%) of the remote video stream after network countermeasures.
     */
    packetLossRate: number
    /**
     * Video stream type (high-stream or low-stream).
     */
    rxStreamType: VideoStreamType
    /**
     * The total freeze time (ms) of the remote video stream after the remote user joins the channel.
     */
    totalFrozenTime: number
    /**
     * The total video freeze time as a percentage (%) of the total time when the video is available.
     */
    frozenRate: number
    /**
     * The total time (ms) when the remote user in the Communication profile or the remote broadcaster in the Live-broadcast profile neither stops sending the video stream nor disables the video module after joining the channel.
     */
    totalActiveTime: number
}

/**
 * The information of the detected human face.
 *
 */
export interface FacePositionInfo {
    /**
     * The x coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin,
     * the x coordinate represents the relative lateral displacement of the top left corner of the human face to the origin.
     */
    x: number
    /**
     * The y coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin,
     * the y coordinate represents the relative longitudinal displacement of the top left corner of the human face to the origin.
     */
    y: number
    /**
     * The width (px) of the human face in the captured video.
     */
    width: number
    /**
     * The height (px) of the human face in the captured video.
     */
    height: number
    /**
     * The distance (cm) between the human face and the screen.
     */
    distance: number
}
