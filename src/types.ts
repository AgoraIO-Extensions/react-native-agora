import { ViewProps } from 'react-native';

/**
 * AgoraViewMode
 * @mode hidden Uniformly scale the video until it fills the visible boundaries (cropped). One dimension of the video may have clipped contents.
 * @mode FIT Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to the disparity in the aspect ratio are filled with black.
 */
export enum AgoraViewMode {
  HIDDEN = 1,
  FIT = 2
}

/**
 * AgoraUserInfo
 * @property uid: number
 * @property userAccount: string
 */
export interface AgoraUserInfo {
  uid: number
  userAccount: string
};

/**
 * VideoEncoderConfig details
 * @property width: number | The encoder video's width
 * @property height: number | The encoder video's height
 * @property bitrate: number | The encoder video's bitrate
 * @property frameRate: number | The frameRate of encoder video
 * @property orientationMode: number | The video orientation mode of the video
 * @orientationMode value range is [0 is "mode adapative", 1 is "mode fixed landscape", 2 is "mode fixed portrait"]
 */
export interface VideoEncoderConfig {
  width: number,
  height: number,
  bitrate: number,
  frameRate: number,
  orientationMode: number,
}

/**
 * Option is used to {@link init}
 * @member {@link appid} Sets the appid
 * @member {@link channelProfile} Number channelProfile Sets the channel mode. 0 is communication mode, 1 is broadcasting mode
 * @member {@link VideoEncoderConfig} sets video encoding config
 * @member {@link dualStream} is optional parameter only for enable for detail see [more](https://docs.agora.io/en/Video/API%20Reference/oc/Classes/AgoraRtcEngineKit.html#//api/name/enableDualStreamMode)
 * @member {@link mode} is optional sets only enable video / audio, 0 is audio mode, 1 is video mode
 * @member {@link clientRole} is only work in live mode, 1 is host, 2 is audience
 * @member {@link audioProfile} Sets audio profile to agora rtc sdk See more [details](https://docs.agora.io/en/Video/API%20Reference/oc/Constants/AgoraAudioProfile.html)
 * @member {@link audioScenario} Sets audio scenario to agora rtc sdk more [details](https://docs.agora.io/en/Video/API%20Reference/oc/Constants/AgoraAudioScenario.html)
 * @member {@link beauty} {@link BeautyOption}
 * @member {@link voice} {@link VoiceDecorator}
 */
export interface Option {
  appid: String,
  channelProfile: number,
  videoEncoderConfig: VideoEncoderConfig,
  dualStream: boolean,
  mode: number,
  clientRole: number,
  audioProfile: number,
  audioScenario: number,
  beauty?: BeautyOption,
  voice?: VoiceDecorator,
}

/**
 * VoiceDecorator is decorate local audio voice
 *
 * @description
 *   type 'reverbPreset' range values: [0 is "off", 1 is "popular", 2 is "rnb", 3 is "rock", 4 is "hiphop", 5 is "vocal concert", 6 is "KTV", 7 is "studio"]
 *   type 'changer' range values: [0 is "off", 1 is "old man", 2 is "baby boy", 3 is "baby girl", 4 is "zhubajie", 5 is "ethereal", 6 is "hulk"]
 * @member type: string | the range values ['changer' | 'reverbPreset'] This property is the identifier for audio voice decorator
 * @member value: number | the value for voice parameter option.
 */
export interface VoiceDecorator {
  type: string,
  value: number
}

export interface PublisherConfig {
  width: number,
  height: number,
  framerate: number,
  bitrate: number,
  defaultLayout: number,
  lifeCycle: number,
  pubishUrl: string,
  rawStreamUrl: string,
  extraInfo: String,
  owner: boolean
}

export interface BackgroundImage {
  url: string,
  x: number,
  y: number,
  width: number,
  height: number
}

export interface Size {
  width: number,
  height: number
}

export interface TranscodingUser {
  uid: number,
  x: number,
  y: number,
  width: number,
  height: number,
  alpha: number,
  zOrder: number,
  audioChannel: number
}

export interface Color {
  red: number,
  green: number,
  blue: number,
  alpha: number
}

export enum VideoCodecProfile {
  BASELINE = 66,
  MAIN = 77,
  HIGH = 100
}

export enum AudioCodecProfile {
  LC_AAC = 0,
  HE_AAC = 1
}

export enum AudioSampleRate {
  TYPE_32000 = 32000,
  TYPE_44100 = 44100,
  TYPE_48000 = 48000,
}

/**
 * AgoraChannelStereo
 * @note Agora’s self-defined audio channel type. We recommend choosing ONE or TWO. Special players are required if you choose TRHEE, FOUR or FIVE:
 */
export enum AudioChannelStereo {
  ONE = 1,
  TWO = 2,
  TRHEE = 3,
  FOUR = 4,
  FIVE = 5
}

/**
 * @member {@link size} {@link Size}
 * @member {@link videoBitrate} integer number
 * @member {@link videoFramerate} integer number
 * @member {@link lowLatency} boolean
 * @member {@link videoGop} number
 * @member {@link videoCodecProfile} {@link VideoCodecProfile}
 * @member {@link audioCodecProfile} {@link AudioCodecProfile}
 * @member {@link audioSampleRate} {@link AudioSampleRate}
 * @member {@link watermark} {@link BackgroundImage}
 * @member {@link backgroundImage} {@link BackgroundImage}
 * @member {@link backgroundColor} Standard RGB hex number: e.g. 0xffffff 
 * @member {@link audioBitrate} number
 * @member {@link audioChannels} {@link AudioChannelStereo}
 * @member {@link transcodingUsers} Array,{@link TranscodingUser}>,
 * @member {@link transcodingExtraInfo} string
 */
export interface LiveTranscodingOption {
  size: Size,
  videoBitrate: number,
  videoFramerate: number,
  lowLatency: boolean, // @deprecate lowLatency
  videoGop: number,
  videoCodecProfile: VideoCodecProfile,
  audioCodecProfile: AudioCodecProfile,
  audioSampleRate: AudioSampleRate,
  watermark: BackgroundImage,
  backgroundImage: BackgroundImage,
  backgroundColor: number,
  audioBitrate: number,
  audioChannels: AudioChannelStereo,
  transcodingUsers: Array<TranscodingUser>,
  transcodingExtraInfo: string,
}

export interface VideoOption {
  uid: number,
  renderMode: number,
  reactTag: number
}

export interface AudioRecordingOption {
  filepath: String,
  quality: number
}

export type Callback<T> = (err: any, data: any) => T;

export type Nullable<T> = T | null | undefined;

export type String = Nullable<string>;
export type Number = Nullable<number> | 0;

export interface AgoraViewProps extends ViewProps {
  mode: number,
  showLocalVideo: boolean,
  remoteUid: number,
  zOrderMediaOverlay: boolean,
  [key:string]: any;
}

export interface DataStreamOption {
  streamId: number,
  ordered: boolean,
  reliable: boolean
}

export interface AudioMixingOption {
  filepath: String,
  loopback: boolean,
  replace: boolean,
  cycle: number
}

export interface PlayEffectOption {
  soundId: number,
  filepath: String,
  loopcount: number,
  pitch: number,
  pan: number,
  gain: number,
  publish: boolean
}

export interface AudioFrameOption {
  sampleRate: number,
  channel: number,
  mode: number,
  samplesPerCall: number
}

export interface MixedAudioFrameOption {
  sampleRate: number,
  samplesPerCall: number
}

export interface ImageOption {
  url: String,
  height: number,
  width: number,
  x: number,
  y: number
}

export interface VideoStreamOption {
  uid: number,
  streamType: number
}

export interface DefaultVideoStreamOption {
  streamType: number
}

export interface InjectStreamOption {
  url: String,
  config: {
    size: {
      width: number,
      height: number,
    },
    videoGop: number,
    videoBitrate: number,
    videoFramerate: number,
    audioBitrate: number,
    audioSampleRate: number,
    audioChannels: number
  }
}

export interface RemoveInjectStreamOption {
  url: String
}

export interface PublishStreamOption {
  url: String,
  enable: boolean
}

export interface RemovePublishStreamOption {
  url: String
}

export interface PositionOption {
  x: number,
  y: number
}

/**
 * BeautyOption is setBeautyEffectOptions's option parameter
 * @property lighteningContrastLevel: integer | lightening contrast level and the value ranges is low: 0, normal: 1, high: 2
 * @property lighteningLevel: float | brightness level and the value ranges between 0.0 (original) and 1.0.
 * @property smoothnessLevel: float | The sharpness level. The value ranges between 0.0 (original) and 1.0. This parameter is usually used to remove blemishes.
 * @property rednessLevel: float | The redness level. The value ranges between 0.0 (original) and 1.0. This parameter adjusts the red saturation level.
 */
export interface BeautyOption {
  lighteningContrastLevel: number,
  lighteningLevel: number,
  smoothnessLevel: number,
  rednessLevel: number,
}

/**
 * LastmileProbeConfig is startLastmileProbeTest's config parameter
 * @property probeUplink: boolean | sets whether or not to test the uplink networks. some users, for example, the audience in a Live-broadcast channel, do not need such a test. true: enables the probe test. false: disables the probe test.
 * @property probeDownlink: boolean | sets whether or not to probe the downlink network. true: enables the probe test. false: disables the probe test.
 * @property expectedUplinkBitrate: integer | The expected maximum sending bitrate (Kbps) of the local user. The value ranges between 100 and 5000. We recommend setting this parameter according to the bitrate value set by setVideoEncoderConfiguration.
 * @property expectedDownlinkBitrate: integer | The expected maximum receiving bitrate (Kbps) of the local user. The value ranges between 100 and 5000.
 */
export interface LastmileProbeConfig {
  probeUplink: boolean,
  probeDownlink: boolean,
  expectedUplinkBitrate: number,
  expectedDownlinkBitrate: number
}


/**
 * CameraCapturerConfiguration is setCameraCapturerConfiguration's config parameter
 * @property preference: number | The Camera capture preference and the value range is [0 is "(default) self-adapts the camera output parameters to the system performance and network conditions to balance CPU consumption and video preview quality.", 1 is "prioritizes the system performance. The SDK chooses the dimension and frame rate of the local camera capture closest to those set by setVideoEncoderConfiguration.", 2 is "prioritizes the local preview quality. The SDK chooses higher camera output parameters to improve the local video preview quality. This option requires extra CPU and RAM usage for video pre-processing."]
 */
export interface CameraCapturerConfiguration {
  preference: number
}
