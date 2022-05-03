import type {
  AreaCode,
  AudienceLatencyLevelType,
  AudioChannel,
  AudioCodecProfileType,
  AudioRecordingPosition,
  AudioRecordingQuality,
  AudioSampleRateType,
  CameraCaptureOutputPreference,
  CameraDirection,
  CaptureBrightnessLevelType,
  DegradationPreference,
  EncryptionMode,
  ExperiencePoorReason,
  ExperienceQualityType,
  LastmileProbeResultState,
  LighteningContrastLevel,
  LogLevel,
  NetworkQuality,
  VideoCodecProfileType,
  VideoCodecType,
  VideoFrameRate,
  VideoMirrorMode,
  VideoOutputOrientationMode,
  VideoQualityAdaptIndication,
  VideoStreamType,
  VirtualBackgroundBlurDegree,
  VirtualBackgroundSourceType,
  VideoCodecTypeForStream,
  VideoContentHint,
} from './Enums';

/**
 * The user information, including the user ID and user account.
 */
export interface UserInfo {
  /**
   * The user ID of a user.
   */
  uid: number;
  /**
   * The user account of a user.
   */
  userAccount: string;
}

/**
 * The video resolution.
 */
export class VideoDimensions {
  /**
   * The width (px) of the video encoding resolution.
   */
  width?: number;
  /**
   * The height (px) of the video encoding resolution.
   */
  height?: number;

  constructor(params?: { width?: number; height?: number }) {
    if (params) {
      this.width = params.width;
      this.height = params.height;
    }
  }
}

/**
 * Definition of VideoEncoderConfiguration.
 */
export class VideoEncoderConfiguration {
  /**
   * The video frame dimensions (px), which is used to specify the video quality and measured by the total number of pixels along a
   * frame's width and height. The default value is 640 × 360.
   * You can customize the dimension, or select from the following list:
   * <ul>
   *         <li>120x120</li>
   *         <li>160x120</li>
   *         <li>180x180</li>
   *         <li>240x180</li>
   *         <li>320x180</li>
   *         <li>240x240</li>
   *         <li>320x240</li>
   *         <li>424x240</li>
   *         <li>360x360</li>
   *         <li>480x360</li>
   *         <li>640x360</li>
   *         <li>480x480</li>
   *         <li>640x480</li>
   *         <li>840x480</li>
   *         <li>960x720</li>
   *         <li>1280x720</li>
   * </ul>
   *
   * **Note**
   * <ul>
   *    <li> The value of the dimension does not indicate the orientation mode of the output ratio. For how to set the video orientation, see [<code>VideoOutputOrientationMode</code>]{@link VideoOutputOrientationMode}.</li>
   *    <li> Whether 720p+ can be supported depends on the device. If the device cannot support 720p, the frame rate will be lower than the one listed in the table.</li>
   * </ul>
   *
   */
  dimensions?: VideoDimensions;
  /**
   * The video frame rate (fps). The default value is 15. Users can either set the frame rate manually or choose from the following options.
   * We do not recommend setting this to a value greater than 30.
   */
  frameRate?: VideoFrameRate;
  /**
   * The minimum video encoder frame rate (fps). The default value is Min(-1) (the SDK uses the lowest encoder frame rate).
   */
  minFrameRate?: VideoFrameRate;
  /**
   * Bitrate of the video (Kbps). Refer to the table below and set your bitrate. If you set a bitrate beyond the proper range, the SDK automatically adjusts it to a value within the range.
   * You can also choose from the following options:
   *  - [`Standard`]{@link BitRate.Standard}: (Recommended) The standard bitrate mode. In this mode, the bitrates differ between the `LiveBroadcasting` and `Communication` profiles:
   *      - In the `Communication` profile, the video bitrate is the same as the base bitrate.
   *      - In the `LiveBroadcasting` profile, the video bitrate is twice the base bitrate.
   *  - [`Compatible`]{@link BitRate.Compatible}: The compatible bitrate mode. In this mode, the bitrate stays the same regardless of the profile. If you choose this mode for the `LiveBroadcasting` profile, the video frame rate may be lower than the set value.
   *
   * Agora uses different video codecs for different profiles to optimize the user experience. For example, the Communication profile prioritizes the smoothness while the `LiveBroadcasting` profile prioritizes the video quality (a higher bitrate). Therefore, We recommend setting this parameter as [`Standard`]{@link BitRate.Standard}.
   *
   * **Video Bitrate Table**
   * <table>
   *     <tr>
   *         <th>Resolution</th>
   *         <th>Frame rate<p>(fps)</th>
   *         <th>Base Bitrate<p>(Kbps, for Communication)</th>
   *         <th>Live Bitrate<p>(Kbps, for Live Broadcasting)</th>
   *     </tr>
   *     <tr>
   *         <td>160*120</td>
   *         <td>15</td>
   *         <td>65</td>
   *         <td>130</td>
   *     </tr>
   *     <tr>
   *         <td>120*120</td>
   *         <td>15</td>
   *         <td>50</td>
   *         <td>100</td>
   *     </tr>
   *     <tr>
   *         <td>320*180</td>
   *         <td>15</td>
   *         <td>140</td>
   *         <td>280</td>
   *     </tr>
   *     <tr>
   *         <td>180*180</td>
   *         <td>15</td>
   *         <td>100</td>
   *         <td>200</td>
   *     </tr>
   *     <tr>
   *         <td>240*180</td>
   *         <td>15</td>
   *         <td>120</td>
   *         <td>240</td>
   *     </tr>
   *     <tr>
   *         <td>320*240</td>
   *         <td>15</td>
   *         <td>200</td>
   *         <td>400</td>
   *     </tr>
   *     <tr>
   *         <td>240*240</td>
   *         <td>15</td>
   *         <td>140</td>
   *         <td>280</td>
   *     </tr>
   *     <tr>
   *         <td>424*240</td>
   *         <td>15</td>
   *         <td>220</td>
   *         <td>440</td>
   *     </tr>
   *     <tr>
   *         <td>640*360</td>
   *         <td>15</td>
   *         <td>400</td>
   *         <td>800</td>
   *     </tr>
   *     <tr>
   *         <td>360*360</td>
   *         <td>15</td>
   *         <td>260</td>
   *         <td>520</td>
   *     </tr>
   *     <tr>
   *         <td>640*360</td>
   *         <td>30</td>
   *         <td>600</td>
   *         <td>1200</td>
   *     </tr>
   *     <tr>
   *         <td>360*360</td>
   *         <td>30</td>
   *         <td>400</td>
   *         <td>800</td>
   *     </tr>
   *     <tr>
   *         <td>480*360</td>
   *         <td>15</td>
   *         <td>320</td>
   *         <td>640</td>
   *     </tr>
   *     <tr>
   *         <td>480*360</td>
   *         <td>30</td>
   *         <td>490</td>
   *         <td>980</td>
   *     </tr>
   *     <tr>
   *         <td>640*480</td>
   *         <td>15</td>
   *         <td>500</td>
   *         <td>1000</td>
   *     </tr>
   *     <tr>
   *         <td>480*480</td>
   *         <td>15</td>
   *         <td>400</td>
   *         <td>800</td>
   *     </tr>
   *     <tr>
   *         <td>640*480</td>
   *         <td>30</td>
   *         <td>750</td>
   *         <td>1500</td>
   *     </tr>
   *     <tr>
   *         <td>480*480</td>
   *         <td>30</td>
   *         <td>600</td>
   *         <td>1200</td>
   *     </tr>
   *     <tr>
   *         <td>848*480</td>
   *         <td>15</td>
   *         <td>610</td>
   *         <td>1220</td>
   *     </tr>
   *     <tr>
   *         <td>848*480</td>
   *         <td>30</td>
   *         <td>930</td>
   *         <td>1860</td>
   *     </tr>
   *     <tr>
   *         <td>640*480</td>
   *         <td>10</td>
   *         <td>400</td>
   *         <td>800</td>
   *     </tr>
   *     <tr>
   *         <td>1280*720</td>
   *         <td>15</td>
   *         <td>1130</td>
   *         <td>2260</td>
   *     </tr>
   *     <tr>
   *         <td>1280*720</td>
   *         <td>30</td>
   *         <td>1710</td>
   *         <td>3420</td>
   *     </tr>
   *     <tr>
   *         <td>960*720</td>
   *         <td>15</td>
   *         <td>910</td>
   *         <td>1820</td>
   *     </tr>
   *     <tr>
   *         <td>960*720</td>
   *         <td>30</td>
   *         <td>1380</td>
   *         <td>2760</td>
   *     </tr>
   * </table>
   *
   * **Note**
   *
   * The base bitrate in this table applies to the Communication profile.
   * The `LiveBroadcasting` profile generally requires a higher bitrate for better video quality.
   * We recommend setting the bitrate mode as [`Standard`]{@link BitRate.Standard}. You can also set the bitrate as the base bitrate value &times; 2.
   */
  bitrate?: number;
  /**
   * The minimum encoding bitrate (Kbps). The Agora SDK automatically adjusts the encoding bitrate to adapt to the network conditions. Using a value greater than the default value forces the video encoder to output high-quality images but may cause more packet loss and hence sacrifice the smoothness of the video transmission. That said, unless you have special requirements for image quality,
   * Agora does not recommend changing this value.
   */
  minBitrate?: number;
  /**
   * The orientation mode.
   */
  orientationMode?: VideoOutputOrientationMode;
  /**
   * The video encoding degradation preference under limited bandwidth.
   */
  degradationPrefer?: DegradationPreference;
  /**
   * Sets the mirror mode of the published local video stream.
   */
  mirrorMode?: VideoMirrorMode;

  constructor(params?: {
    dimensions?: VideoDimensions;
    frameRate?: VideoFrameRate;
    minFrameRate?: VideoFrameRate;
    bitrate?: number;
    minBitrate?: number;
    orientationMode?: VideoOutputOrientationMode;
    degradationPrefer?: DegradationPreference;
    mirrorMode?: VideoMirrorMode;
  }) {
    if (params) {
      this.dimensions = params.dimensions;
      this.frameRate = params.frameRate;
      this.minFrameRate = params.minFrameRate;
      this.bitrate = params.bitrate;
      this.minBitrate = params.minBitrate;
      this.orientationMode = params.orientationMode;
      this.degradationPrefer = params.degradationPrefer;
      this.mirrorMode = params.mirrorMode;
    }
  }
}

/**
 * Sets the image enhancement options.
 */
export class BeautyOptions {
  /**
   * The contrast level, often used in conjunction with `lighteningLevel`.
   * The higher the value, the greater the contrast level. See [`LighteningContrastLevel`]{@link LighteningContrastLevel}.
   */
  lighteningContrastLevel?: LighteningContrastLevel;
  /**
   * The brightening level, in the range [0.0,1.0], where 0.0 means the original brightening. The default value is 0.6. The higher the value, the greater the brightening level.
   */
  lighteningLevel?: number;
  /**
   * The smoothness level, in the range [0.0,1.0], where 0.0 means the original smoothness.
   * The default value is 0.5. The higher the value, the greater the smoothness level.
   */
  smoothnessLevel?: number;
  /**
   * The redness level, in the range [0.0,1.0], where 0.0 means the original redness.
   * The default value is 0.1. The higher the value, the greater the redness level.
   */
  rednessLevel?: number;
  /**
   * The sharpness level, in the range [0.0,1.0], where 0.0 means the original sharpness.
   * The default value is 0.3. The higher the value, the greater the sharpness level.
   *
   * @since v3.6.2
   */
  sharpnessLevel?: number;

  constructor(params?: {
    lighteningContrastLevel?: LighteningContrastLevel;
    lighteningLevel?: number;
    smoothnessLevel?: number;
    rednessLevel?: number;
    sharpnessLevel?: number;
  }) {
    if (params) {
      this.lighteningContrastLevel = params.lighteningContrastLevel;
      this.lighteningLevel = params.lighteningLevel;
      this.smoothnessLevel = params.smoothnessLevel;
      this.rednessLevel = params.rednessLevel;
      this.sharpnessLevel = params.sharpnessLevel;
    }
  }
}

/**
 * Agora image properties. A class for setting the properties of the watermark and background images.
 */
export class AgoraImage {
  /**
   * HTTP/HTTPS URL address of the image on the broadcasting video. The maximum length of this parameter is 1024 bytes.
   */
  url: string;
  /**
   * Position of the image on the upper left of the broadcasting video on the horizontal axis.
   */
  x?: number;
  /**
   * Position of the image on the upper left of the broadcasting video on the vertical axis.
   */
  y?: number;
  /**
   * Width of the image on the broadcasting video.
   */
  width?: number;
  /**
   * Height of the image on the broadcasting video.
   */
  height?: number;
  /**
   * The layer number of the watermark or background image.
   *
   * When you use the watermark array to add a watermark or multiple watermarks, you must pass a value to `zOrder` in the range [1,255];
   * otherwise, the SDK reports an error. In other cases, `zOrder` can optionally be passed in the range [0,255],
   * with 0 being the default value. `0` means the bottom layer and `255` means the top layer.
   *
   * @since v3.6.2
   */
  zOrder?: number;
  /**
   * The transparency of the watermark or background image. The value range is [0.0,1.0]:
   * - `0.0`: Completely transparent.
   * - `1.0`: (Default) Opaque.
   *
   * @since v3.6.2
   */
  alpha?: number;

  constructor(
    url: string,
    params?: {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      zOrder?: number;
      alpha?: number;
    }
  ) {
    this.url = url;
    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
      this.zOrder = params.zOrder;
      this.alpha = params.alpha;
    }
  }
}

/**
 * The transcodingUser class, which defines the audio and video properties in the CDN live. Agora supports a maximum of 17 transcoding users in a CDN live streaming channel.
 */
export class TranscodingUser {
  /**
   * ID of the user in the CDN live streaming.
   */
  uid: number;
  /**
   * Horizontal position of the video frame of the user from the top left corner of the CDN live streaming.
   */
  x?: number;
  /**
   * Vertical position of the video frame of the user from the top left corner of the CDN live streaming.
   */
  y?: number;
  /**
   * Width of the video frame of the user on the CDN live streaming. The default value is 360.
   */
  width?: number;
  /**
   * Height of the video frame of the user on the CDN live streaming. The default value is 640.
   */
  height?: number;
  /**
   * Layer position of video frame of the user on the CDN live streaming. The value ranges between 0 and 100. From v2.3.0, Agora SDK supports setting zOrder as 0. The smallest value is 0 (default value), which means that the video frame is at the bottom layer. The biggest value is 100, which means that the video frame is at the top layer.
   */
  zOrder?: number;
  /**
   * The transparency of the video frame of the user in the CDN live streaming that ranges between 0.0 and 1.0. 0.0 means that the video frame is completely transparent and 1.0 means opaque. The default value is 1.0.
   */
  alpha?: number;
  /**
   * The audio channel ranging between 0 and 5. The default value is 0.
   *
   * - 0: (default) Supports dual channels. Depends on the upstream of the broadcaster.
   * - 1: The audio stream of the broadcaster uses the FL audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 2: The audio stream of the broadcaster uses the FC audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 3: The audio stream of the broadcaster uses the FR audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 4: The audio stream of the broadcaster uses the BL audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   * - 5: The audio stream of the broadcaster uses the BR audio channel. If the broadcaster’s upstream uses multiple audio channels, these channels are mixed into mono first.
   *
   * **Note**
   *
   * Special players are needed if `audioChannel` is not set as 0.
   */
  audioChannel?: AudioChannel;

  constructor(
    uid: number,
    params?: {
      x?: number;
      y?: number;
      width?: number;
      height?: number;
      zOrder?: number;
      alpha?: number;
      audioChannel?: AudioChannel;
    }
  ) {
    this.uid = uid;
    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
      this.zOrder = params.zOrder;
      this.alpha = params.alpha;
      this.audioChannel = params.audioChannel;
    }
  }
}

/**
 * Color for [`VirtualBackgroundSource`]{@link VirtualBackgroundSource}
 */
export class Color {
  /**
   * Red value (0 - 255)
   */
  red: number;
  /**
   * Green value (0 - 255)
   */
  green: number;
  /**
   * Blue value (0 - 255)
   */
  blue: number;

  /**
   * Create a color for [`VirtualBackgroundSource`]{@link VirtualBackgroundSource}
   * @param red Red value (0 - 255)
   * @param green Green value (0 - 255)
   * @param blue Blue value (0 - 255)
   */
  constructor(red: number, green: number, blue: number) {
    this.red = red;
    this.green = green;
    this.blue = blue;
  }
}

/**
 * A class for managing user-specific CDN live audio/video transcoding settings.
 */
export class LiveTranscoding {
  /**
   * Width (pixel) of the video. The default value is 360.
   * - When pushing video streams to the CDN, the value range of `width` is [64,1920]. If the value is less than 64, Agora server automatically adjusts it to 64; if the value is greater than 1920, Agora server automatically adjusts it to 1920.
   * - If you push audio streams to the CDN, set the value of width × height to 0 × 0.
   */
  width?: number;
  /**
   * Height (pixel) of the video. The default value is 640.
   * - When pushing video streams to the CDN, the value range of `height` is [64,1080]. If the value is less than 64, Agora server automatically adjusts it to 64; if the value is greater than 1080, Agora server automatically adjusts it to 1080.
   * - If you push audio streams to the CDN, set the value of width × height to 0 × 0.
   */
  height?: number;
  /**
   * Bitrate (Kbps) of the CDN live output video stream. The default value is 400. Set this parameter according to the Video Bitrate Table. If you set a bitrate beyond the proper range,
   * the SDK automatically adapts it to a value within the range.
   */
  videoBitrate?: number;
  /**
   * Frame rate (fps) of the CDN live output video stream.
   * The value range is [0,30]. The default value is 15. Agora adjusts all values over 30 to 30.
   */
  videoFramerate?: VideoFrameRate;
  /**
   * @deprecated
   * - `true`: Low latency with unassured quality.
   * - `false`: (Default) High latency with assured quality.
   */
  lowLatency?: boolean;
  /**
   * Gop of the video frames in the CDN live stream. The default value is 30 fps.
   */
  videoGop?: number;
  /**
   * The watermark on the live video. The image format must be PNG.
   */
  watermark?: AgoraImage;
  /**
   * The array of watermarks on the live video. You can use `watermarkList` to add one or more watermarks.
   * The image format must be PNG.
   *
   * The total number of watermarks and background images on the live video must be greater than or equal to 0 and less than or equal to 10.
   *
   * @since v3.6.2
   */
  watermarkList?: AgoraImage[];
  /**
   * The background image on the live video. The format must be in the PNG format.
   */
  backgroundImage?: AgoraImage;
  /**
   * The array of background images on the live video. You can use `backgroundImageList` to add one or more background images. The image format must be PNG.
   * The total number of watermarks and background images on the live video must be greater than or equal to 0 and less than or equal to 10.
   *
   * @since v3.6.2
   */
  backgroundImageList?: AgoraImage[];
  /**
   * Self-defined audio-sample rate: AudioSampleRateType.
   */
  audioSampleRate?: AudioSampleRateType;
  /**
   * Bitrate (Kbps) of the CDN live audio output stream. The default value is 48 and the highest value is 128.
   */
  audioBitrate?: number;
  /**
   * The number of audio channels for the CDN live stream.
   *
   * Agora recommends choosing 1 (mono), or 2 (stereo) audio channels. Special players are required if you choose 3, 4, or 5.
   * - 1: (Default) Mono
   * - 2: Stereo
   * - 3: Three audio channels
   * - 4: Four audio channels
   * - 5: Five audio channels
   */
  audioChannels?: AudioChannel;
  /**
   * Audio codec profile type: AudioCodecProfileType. Set it as LC-AAC or HE-AAC. The default value is LC-AAC.
   */
  audioCodecProfile?: AudioCodecProfileType;
  /**
   * Video codec profile type: VideoCodecProfileType. Set it as BASELINE, MAIN, or HIGH (default). If you set this parameter to other values, Agora adjusts it to the default value HIGH.
   */
  videoCodecProfile?: VideoCodecProfileType;
  /**
   * The video codec type of the output video stream.
   *
   * @since v3.2.0
   */
  videoCodecType?: VideoCodecTypeForStream;
  /**
   * Sets the background color.
   */
  backgroundColor?: Color;
  /**
   * Reserved property. Extra user-defined information to send the Supplemental Enhancement Information (SEI) for the H.264/H.265 video stream to the CDN live client. Maximum length: 4096 Bytes.
   */
  userConfigExtraInfo?: string;
  /**
   * The metadata sent to the CDN live client.
   *
   * @deprecated This property is deprecated.
   */
  metadata?: string;
  /**
   * An TranscodingUser object managing the user layout configuration in the CDN live stream. Agora supports a maximum of 17 transcoding users in a CDN live stream channel.
   */
  transcodingUsers: TranscodingUser[];
  /**
   * @ignore
   */
  advancedFeatures?: Map<String, boolean>;

  constructor(
    transcodingUsers: TranscodingUser[],
    params?: {
      width?: number;
      height?: number;
      videoBitrate?: number;
      videoFramerate?: VideoFrameRate;
      lowLatency?: boolean;
      videoGop?: number;
      watermark?: AgoraImage;
      watermarkList?: AgoraImage[];
      backgroundImage?: AgoraImage;
      backgroundImageList?: AgoraImage[];
      audioSampleRate?: AudioSampleRateType;
      audioBitrate?: number;
      audioChannels?: AudioChannel;
      audioCodecProfile?: AudioCodecProfileType;
      videoCodecProfile?: VideoCodecProfileType;
      videoCodecType?: VideoCodecTypeForStream;
      backgroundColor?: Color;
      userConfigExtraInfo?: string;
      metadata?: string;
      advancedFeatures?: Map<String, boolean>;
    }
  ) {
    if (params) {
      this.width = params.width;
      this.height = params.height;
      this.videoBitrate = params.videoBitrate;
      this.videoFramerate = params.videoFramerate;
      this.lowLatency = params.lowLatency;
      this.videoGop = params.videoGop;
      this.watermark = params.watermark;
      this.watermarkList = params.watermarkList;
      this.backgroundImage = params.backgroundImage;
      this.backgroundImageList = params.backgroundImageList;
      this.audioSampleRate = params.audioSampleRate;
      this.audioBitrate = params.audioBitrate;
      this.audioChannels = params.audioChannels;
      this.audioCodecProfile = params.audioCodecProfile;
      this.videoCodecProfile = params.videoCodecProfile;
      this.videoCodecType = params.videoCodecType;
      this.backgroundColor = params.backgroundColor;
      this.userConfigExtraInfo = params.userConfigExtraInfo;
      this.metadata = params.metadata;
      this.advancedFeatures = params.advancedFeatures;
    }
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
  channelName: string;
  /**
   * The token that enables the user to join the channel.
   */
  token?: string;
  /**
   * The user ID.
   */
  uid: number;

  constructor(channelName: string, uid: number, params?: { token?: string }) {
    this.channelName = channelName;
    if (params) {
      this.token = params.token;
    }
    this.uid = uid;
  }
}

/**
 * The ChannelMediaRelayConfiguration class.
 */
export class ChannelMediaRelayConfiguration {
  /**
   * The information of the source channel: [`ChannelMediaInfo`]{@link ChannelMediaInfo}. It contains the following members:
   * - `channelName`: The name of the source channel. The default value is null, which means the SDK applies the name of the current channel.
   * - `uid`: ID of the host whose media stream you want to relay. The default value is 0, which means the SDK generates a random UID. You must set it as 0.
   * - `token`: The token for joining the source channel. It is generated with the `channelName` and `uid` you set in `srcInfo`.
   *  - If you have not enabled the App Certificate, set this parameter as the default value null, which means the SDK applies the App ID.
   *  - If you have enabled the App Certificate, you must use the token generated with the `channelName` and `uid`, and the `uid` must be set as 0.
   */
  srcInfo: ChannelMediaInfo;
  /**
   * The information of the destination channel: [`ChannelMediaInfo`]{@link ChannelMediaInfo}. It contains the following members:
   * - `channelName`: The name of the destination channel.
   * - `uid`: ID of the host in the destination channel. The value ranges from 0 to (2<sup>32</sup>-1). To avoid UID conflicts, this uid must be different from any other UIDs in the destination channel. The default value is 0, which means the SDK generates a random UID.
   * - `token`: The token for joining the source channel. It is generated with the `channelName` and `uid` you set in `destInfo`.
   *  - If you have not enabled the App Certificate, set this parameter as the default value null, which means the SDK applies the App ID.
   *  - If you have enabled the App Certificate, you must use the token generated with the `channelName` and `uid`, and the `uid` must be set as 0.
   */
  destInfos: ChannelMediaInfo[];

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
  probeUplink: boolean;
  /**
   * Whether to probe downlink of lastmile.
   */
  probeDownlink: boolean;
  /**
   * The expected maximum sending bitrate in bps in range of [100000,5000000]. It is recommended to set this value according to the required bitrate of selected video profile.
   */
  expectedUplinkBitrate: number;
  /**
   * The expected maximum receive bitrate in bps in range of [100000,5000000].
   */
  expectedDownlinkBitrate: number;

  constructor(
    probeUplink: boolean,
    probeDownlink: boolean,
    expectedUplinkBitrate: number,
    expectedDownlinkBitrate: number
  ) {
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
  x?: number;
  /**
   * The vertical offset from the top-left corner.
   */
  y?: number;
  /**
   * The width (pixels) of the watermark image.
   */
  width?: number;
  /**
   * The height (pixels) of the watermark image.
   */
  height?: number;

  constructor(params?: {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
  }) {
    if (params) {
      this.x = params.x;
      this.y = params.y;
      this.width = params.width;
      this.height = params.height;
    }
  }
}

/**
 * Agora watermark options. A class for setting the properties of watermark.
 */
export class WatermarkOptions {
  /**
   * Sets whether or not the watermark image is visible in the local video preview:
   * - `true`: (Default) The watermark image is visible in preview.
   * - `false`: The watermark image is not visible in preview.
   */
  visibleInPreview?: boolean;
  /**
   * The watermark position in the landscape mode.
   */
  positionInLandscapeMode?: Rectangle;
  /**
   * The watermark position in the portrait mode.
   */
  positionInPortraitMode?: Rectangle;

  constructor(params?: {
    visibleInPreview?: boolean;
    positionInLandscapeMode?: Rectangle;
    positionInPortraitMode?: Rectangle;
  }) {
    if (params) {
      this.visibleInPreview = params.visibleInPreview;
      this.positionInLandscapeMode = params.positionInLandscapeMode;
      this.positionInPortraitMode = params.positionInPortraitMode;
    }
  }
}

/**
 * Configuration of the imported live interactive voice or video stream.
 */
export class LiveInjectStreamConfig {
  /**
   * Width (pixels) of the added stream to the live interactive streaming. The default value is 0, which is the same width as the original stream.
   */
  width?: number;
  /**
   * Height (pixels) of the added stream to the live interactive streaming. The default value is 0, which is the same height as the original stream.
   */
  height?: number;
  /**
   * Video GOP of the added stream to the live interactive streaming. The default value is 30 frames.
   */
  videoGop?: number;
  /**
   * Video frame rate of the added stream to the live interactive streaming. The default value is 15 fps.
   */
  videoFramerate?: VideoFrameRate;
  /**
   * Video bitrate of the added stream to the live interactive streaming. The default value is 400 Kbps.
   *
   * **Note**
   *
   * The setting of the video bitrate is closely linked to the resolution. If you set the video bitrate beyond a reasonable range, the SDK sets it within a reasonable range instead.
   */
  videoBitrate?: number;
  /**
   * Audio sample rate of the added stream to the live interactive streaming. The default value is 44100 Hz.
   *
   * **Note**
   *
   * We recommend you use the default value and not reset it.
   */
  audioSampleRate?: AudioSampleRateType;
  /**
   * Audio bitrate of the added stream to the live interactive streaming. The default value is 48 Kbps.
   *
   * **Note**
   *
   * We recommend you use the default value and not reset it.
   */
  audioBitrate?: number;
  /**
   * Audio channels to add into the live streaming. The value ranges between 1 and 2. The default value is 1.
   *
   * **Note**
   *
   * We recommend you use the default value and not reset it.
   */
  audioChannels?: AudioChannel;

  constructor(params?: {
    width?: number;
    height?: number;
    videoGop?: number;
    videoFramerate?: VideoFrameRate;
    videoBitrate?: number;
    audioSampleRate?: AudioSampleRateType;
    audioBitrate?: number;
    audioChannels?: AudioChannel;
  }) {
    if (params) {
      this.width = params.width;
      this.height = params.height;
      this.videoGop = params.videoGop;
      this.videoFramerate = params.videoFramerate;
      this.videoBitrate = params.videoBitrate;
      this.audioSampleRate = params.audioSampleRate;
      this.audioBitrate = params.audioBitrate;
      this.audioChannels = params.audioChannels;
    }
  }
}

/**
 * The metronome configuration, which is set in [`startRhythmPlayer`]{@link startRhythmPlayer} or [`configRhythmPlayer`]{@link configRhythmPlayer}.
 *
 * @since v3.4.2
 */
export class RhythmPlayerConfig {
  /**
   * The number of beats per measure. The range is 1 to 9. The default value is 4, which means that each measure contains one downbeat and three upbeats.
   */
  beatsPerMeasure?: number;
  /**
   * Tempo (beats per minute). The range is 60 to 360. The default value is 60, which means that the metronome plays 60 beats in one minute.
   */
  beatsPerMinute?: number;
  /**
   * Whether to publish the sound of the metronome to remote users:
   * - `true`: (Default) Publish. Both the local user and remote users can hear the metronome.
   * - `false`: Do not publish. Only the local user can hear the metronome.
   */
  publish?: boolean;

  constructor(params?: {
    beatsPerMeasure?: number;
    beatsPerMinute?: number;
    publish?: boolean;
  }) {
    if (params) {
      this.beatsPerMeasure = params.beatsPerMeasure;
      this.beatsPerMinute = params.beatsPerMinute;
      this.publish = params.publish;
    }
  }
}

/**
 * The definition of CameraCapturerConfiguration.
 */
export class CameraCapturerConfiguration {
  /**
   * The camera capture preference.
   */
  preference?: CameraCaptureOutputPreference;
  /**
   * The width (px) of the video image captured by the local camera. To customize the width of the video image, set `preference` as [`Manual`]{@link CameraCaptureOutputPreference.Manual} first, and then use `captureWidth`.
   *
   * @since v3.3.1.
   */
  captureWidth?: number;
  /**
   * The height (px) of the video image captured by the local camera. To customize the height of the video image, set `preference` as [`Manual`]{@link CameraCaptureOutputPreference.Manual} first, and then use `captureHeight`.
   *
   * @since v3.3.1.
   */
  captureHeight?: number;
  /**
   * The camera direction.
   */
  cameraDirection?: CameraDirection;

  constructor(params?: {
    preference?: CameraCaptureOutputPreference;
    captureWidth?: number;
    captureHeight?: number;
    cameraDirection?: CameraDirection;
  }) {
    if (params) {
      this.preference = params.preference;
      this.captureWidth = params.captureWidth;
      this.captureHeight = params.captureHeight;
      this.cameraDirection = params.cameraDirection;
    }
  }
}

/**
 * The channel media options.
 */
export class ChannelMediaOptions {
  /**
   * Determines whether to subscribe to audio streams when the user joins the channel.
   * - `true`: (Default) Subscribe.
   * - `false`: Do not subscribe.
   *
   * This member serves a similar function to the [`muteAllRemoteAudioStreams`]{@link RtcEngine.muteAllRemoteAudioStreams} method. After joining the channel, you can call the `muteAllRemoteAudioStreams` method to set whether to subscribe to audio streams in the channel.
   */
  autoSubscribeAudio?: boolean;
  /**
   * Determines whether to subscribe to video streams when the user joins the channel.
   * - `true`: (Default) Subscribe.
   * - `false`: Do not subscribe.
   *
   * This member serves a similar function to the [`muteAllRemoteVideoStreams`]{@link RtcEngine.muteAllRemoteVideoStreams} method. After joining the channel, you can call the `muteAllRemoteVideoStreams` method to set whether to subscribe to audio streams in the channel.
   */
  autoSubscribeVideo?: boolean;
  /**
   * Determines whether to publish the local audio stream when the user joins a channel:
   * - `true`: (Default) Publish.
   * - `false`: Do not publish.
   *
   * This member serves a similar function to the [`muteLocalAudioStream`]{@link RtcEngine.muteLocalAudioStream} method.
   * After the user joins the channel, you can call the `muteLocalAudioStream` method to set whether to publish the local audio stream in the channel.
   *
   * @since v3.4.5
   */
  publishLocalAudio?: boolean;
  /**
   * Determines whether to publish the local video stream when the user joins a channel:
   * - `true`: (Default) Publish.
   * - `false`: Do not publish.
   *
   * This member serves a similar function to the [`muteLocalVideoStream`]{@link RtcEngine.muteLocalVideoStream} method.
   * After the user joins the channel, you can call the `muteLocalVideoStream` method to set whether to publish the local video stream in the channel.
   *
   * @since v3.4.5
   */
  publishLocalVideo?: boolean;

  constructor(params?: {
    autoSubscribeAudio?: boolean;
    autoSubscribeVideo?: boolean;
    publishLocalAudio?: boolean;
    publishLocalVideo?: boolean;
  }) {
    if (params) {
      this.autoSubscribeAudio = params.autoSubscribeAudio;
      this.autoSubscribeVideo = params.autoSubscribeVideo;
      this.publishLocalAudio = params.publishLocalAudio;
      this.publishLocalVideo = params.publishLocalVideo;
    }
  }
}

/**
 * Definition of `EncryptionConfig`.
 *
 * @since v3.1.2.
 */
export class EncryptionConfig {
  /**
   * Encryption mode. The default encryption mode is `AES128GCM2`.
   * See [`EncryptionMode`]{@link EncryptionMode}.
   */
  encryptionMode?: EncryptionMode;
  /**
   * Encryption key in string type with unlimited length. Agora recommends using a 32-byte key.
   *
   * **Note**
   *
   * If you do not set an encryption key or set it as null, you cannot use the built-in encryption, and the SDK returns [`InvalidArgument(2)`]{@link ErrorCode.InvalidArgument}.
   */
  encryptionKey?: string;
  /**
   * The salt with the length of 32 bytes. Agora recommends using OpenSSL to generate the salt on your server.
   * For details, see *Media Stream Encryption*.
   *
   * @since v3.4.5
   *
   * Note: This parameter is only valid when you set the encryption mode as `AES128GCM2` or `AES256GCM2`.
   * Ensure that this parameter meets the following requirements:
   * - Android: This parameter is not 0.
   * - iOS: This parameter is not nil or 0, and the data length is 32 bytes.
   */
  encryptionKdfSalt?: number[];

  constructor(params?: {
    encryptionMode?: EncryptionMode;
    encryptionKey?: string;
    encryptionKdfSalt?: number[];
  }) {
    if (params) {
      this.encryptionMode = params.encryptionMode;
      this.encryptionKey = params.encryptionKey;
      this.encryptionKdfSalt = params.encryptionKdfSalt;
    }
  }
}

/**
 * Statistics of the call.
 */
export interface RtcStats {
  /**
   * Call duration in seconds, represented by an aggregate value.
   */
  duration: number;
  /**
   * Total number of bytes transmitted, represented by an aggregate value.
   */
  txBytes: number;
  /**
   * Total number of bytes received, represented by an aggregate value.
   */
  rxBytes: number;
  /**
   * Total number of audio bytes sent (bytes), represented by an aggregate value.
   */
  txAudioBytes: number;
  /**
   * Total number of video bytes sent (bytes), represented by an aggregate value.
   */
  txVideoBytes: number;
  /**
   * Total number of audio bytes received (bytes), represented by an aggregate value.
   */
  rxAudioBytes: number;
  /**
   * Total number of video bytes received (bytes), represented by an aggregate value.
   */
  rxVideoBytes: number;
  /**
   * Transmission bitrate in Kbps, represented by an instantaneous value.
   */
  txKBitRate: number;
  /**
   * Receive bitrate (Kbps), represented by an instantaneous value.
   */
  rxKBitRate: number;
  /**
   * The transmission bitrate of the audio packet (Kbps), represented by an instantaneous value.
   */
  txAudioKBitRate: number;
  /**
   * Audio receive bitrate (Kbps), represented by an instantaneous value.
   */
  rxAudioKBitRate: number;
  /**
   * Video transmission bitrate (Kbps), represented by an instantaneous value.
   */
  txVideoKBitRate: number;
  /**
   * Video receive bitrate (Kbps), represented by an instantaneous value.
   */
  rxVideoKBitRate: number;
  /**
   * The number of users in the channel.
   * - `COMMUNICATION` profile: The number of users in the channel.
   * - `LiveBroadcasting` profile:
   *  - If the local user is an audience member: The number of users in the channel = The number of hosts in the channel + 1.
   *  - If the local user is a host: The number of users in the channel = The number of hosts in the channel.
   */
  userCount: number;
  /**
   * Client-server latency.
   */
  lastmileDelay: number;
  /**
   * The packet loss rate (%) from the local client to Agora's edge server, before network countermeasures.
   */
  txPacketLossRate: number;
  /**
   * The packet loss rate (%) from Agora's edge server to the local client, before network countermeasures.
   */
  rxPacketLossRate: number;
  /**
   * System CPU usage (%).
   *
   * **Note**
   *
   * - The `cpuTotalUsage` reported in the `LeaveChannel` callback is always 0.
   * - As of Android 8.1, you might not be able to get the CPU usage from this attribute due to system limitations.
   */
  cpuTotalUsage: number;
  /**
   * Application CPU usage (%).
   *
   * **Note**
   *
   * - The `cpuAppUsage` reported in the `LeaveChannel` callback is always 0.
   * - - As of Android 8.1, you might not be able to get the CPU usage from this attribute due to system limitations.
   */
  cpuAppUsage: number;
  /**
   * The round-trip time delay from the client to the local router.
   *
   * **Note**
   * (iOS only) Since v3.1.2, this parameter is disabled by default. See [FAQ](https://docs.agora.io/en/faq/local_network_privacy) for details. If you need to enable this parameter, contact support@agora.io.
   */
  gatewayRtt: number;
  /**
   * The memory usage ratio of the app (%).
   *
   * **Note**
   *
   * This value is for reference only. Due to system limitations, you may not get the value of this member.
   */
  memoryAppUsageRatio: number;
  /**
   * The memory usage ratio of the system (%).
   *
   * **Note**
   *
   * This value is for reference only. Due to system limitations, you may not get the value of this member.
   */
  memoryTotalUsageRatio: number;
  /**
   * The memory usage of the app (KB).
   *
   * **Note**
   *
   * This value is for reference only. Due to system limitations, you may not get the value of this member.
   */
  memoryAppUsageInKbytes: number;
}

/**
 * Properties of the audio volume information. An array containing the user ID and volume information for each speaker.
 */
export interface AudioVolumeInfo {
  /**
   * The user ID of the speaker. The uid of the local user is 0.
   */
  uid: number;
  /**
   * The sum of the voice volume and audio-mixing volume of the speaker. The value ranges between 0 (lowest volume) and 255 (highest volume).
   */
  volume: number;
  /**
   * Voice activity status of the local user.
   * - 0: The local user is not speaking.
   * - 1: The local user is speaking.
   *
   * **Note**
   * - The `vad` parameter cannot report the voice activity status of the remote users. In the remote users' callback, `vad` is always 1.
   * - Ensure that you set `report_vad(true)` in the [`enableAudioVolumeIndication`]{@link RtcEngine.enableAudioVolumeIndication} method to enable the voice activity detection of the local user.
   */
  vad: number;
  /**
   * The channel ID, which indicates which channel the speaker is in.
   */
  channelId: string;
}

/**
 * The rectangular area.
 */
export interface Rect {
  /**
   * The horizontal coordinate of the left side of the rectangular area.
   */
  left: number;
  /**
   * The vertical coordinate of the upper side of the rectangular area.
   */
  top: number;
  /**
   * The horizontal coordinate of the right side of the rectangular area.
   */
  right: number;
  /**
   * The vertical coordinate of the bottom side of the rectangular area.
   */
  bottom: number;
}

/**
 * The one-way last-mile probe result.
 */
export interface LastmileProbeOneWayResult {
  /**
   * The packet loss rate (%).
   */
  packetLossRate: number;
  /**
   * The network jitter (ms).
   */
  jitter: number;
  /**
   * The estimated available bandwidth (bps).
   */
  availableBandwidth: number;
}

/**
 * Statistics of the lastmile probe.
 */
export interface LastmileProbeResult {
  /**
   * The state of the probe test.
   */
  state: LastmileProbeResultState;
  /**
   * The round-trip delay time (ms).
   */
  rtt: number;
  /**
   * The uplink last-mile network report.
   */
  uplinkReport: LastmileProbeOneWayResult;
  /**
   * The downlink last-mile network report.
   */
  downlinkReport: LastmileProbeOneWayResult;
}

/**
 * Statistics of the local audio stream.
 */
export interface LocalAudioStats {
  /**
   * The number of channels.
   */
  numChannels: number;
  /**
   * The sample rate (Hz).
   */
  sentSampleRate: number;
  /**
   * The average sending bitrate (Kbps).
   */
  sentBitrate: number;
  /**
   * The video packet loss rate (%) from the local client to the Agora edge server before applying the anti-packet loss strategies.
   *
   * @since v3.1.2.
   */
  txPacketLossRate: number;
}

/**
 * Statistics of the local video.
 */
export interface LocalVideoStats {
  /**
   * Bitrate (Kbps) sent in the reported interval, which does not include the bitrate of the re-transmission video after the packet loss.
   */
  sentBitrate: number;
  /**
   * Frame rate (fps) sent in the reported interval, which does not include the frame rate of the re-transmission video after the packet loss.
   */
  sentFrameRate: number;
  /**
   * The encoder output frame rate (fps) of the local video.
   */
  encoderOutputFrameRate: number;
  /**
   * The renderer output frame rate (fps) of the local video.
   */
  rendererOutputFrameRate: number;
  /**
   * The target bitrate (Kbps) of the current encoder. This value is estimated by the SDK based on the current network conditions.
   */
  targetBitrate: number;
  /**
   * The target frame rate (fps) of the current encoder.
   */
  targetFrameRate: number;
  /**
   * Quality change of the local video in terms of target frame rate and target bit rate since last count.
   */
  qualityAdaptIndication: VideoQualityAdaptIndication;
  /**
   * The encoding bitrate (Kbps), which does not include the bitrate of the re-transmission video after packet loss.
   */
  encodedBitrate: number;
  /**
   * The width of the encoding frame (px).
   */
  encodedFrameWidth: number;
  /**
   * The height of the encoding frame (px).
   */
  encodedFrameHeight: number;
  /**
   * The value of the sent frame rate, represented by an aggregate value.
   */
  encodedFrameCount: number;
  /**
   * The codec type of the local video.
   */
  codecType: VideoCodecType;
  /**
   * The video packet loss rate (%) from the local client to the Agora edge server before applying the anti-packet loss strategies.
   *
   * @since v3.1.2.
   */
  txPacketLossRate: number;
  /**
   * The capture frame rate (fps) of the local video.
   *
   * @since v3.1.2.
   */
  captureFrameRate: number;
  /**
   * The brightness level of the video image captured by the local camera. See [`CaptureBrightnessLevelType`]{@link CaptureBrightnessLevelType}.
   *
   * @since v3.3.1.
   */
  captureBrightnessLevel: CaptureBrightnessLevelType;
}

/**
 * Statistics of the remote audio.
 */
export interface RemoteAudioStats {
  /**
   * User ID of the user sending the audio streams.
   */
  uid: number;
  /**
   * Audio quality received by the user.
   */
  quality: NetworkQuality;
  /**
   * Network delay (ms) from the sender to the receiver.
   */
  networkTransportDelay: number;
  /**
   * Network delay (ms) from the receiver to the jitter buffer.
   *
   * **Note**
   *
   * When the receiver is an audience member and `AudienceLatencyLevelType` is `1`, this parameter does not take effect.
   */
  jitterBufferDelay: number;
  /**
   * Packet loss rate in the reported interval.
   */
  audioLossRate: number;
  /**
   * The number of channels.
   */
  numChannels: number;
  /**
   * The sample rate (Hz) of the received audio stream in the reported interval.
   */
  receivedSampleRate: number;
  /**
   * The average bitrate (Kbps) of the received audio stream in the reported interval.
   */
  receivedBitrate: number;
  /**
   * The total freeze time (ms) of the remote audio stream after the remote user joins the channel. In the reported interval, audio freeze occurs when the audio frame loss rate reaches 4%. totalFrozenTime = The audio freeze time × 2 × 1000 (ms).
   */
  totalFrozenTime: number;
  /**
   * The total audio freeze time as a percentage (%) of the total time when the audio is available.
   */
  frozenRate: number;
  /**
   * The total time (ms) when the remote user in the `Communication` profile or the remote broadcaster in the `LiveBroadcasting` profile neither stops sending the audio stream nor disables the audio module after joining the channel.
   */
  totalActiveTime: number;
  /**
   * The total active time (ms) of the remote audio stream after the remote user publish the audio stream.
   *
   * @since v3.1.2.
   *
   */
  publishDuration: number;
  /**
   * Quality of experience (QoE) of the local user when receiving a remote audio stream. See [`ExperienceQualityType`]{@link ExperienceQualityType}.
   *
   * @since 3.3.1.
   */
  qoeQuality: ExperienceQualityType;
  /**
   * The reason for poor QoE of the local user when receiving a remote audio stream. See [`ExperiencePoorReason`]{@link ExperiencePoorReason}.
   *
   * @since 3.3.1.
   */
  qualityChangedReason: ExperiencePoorReason;
  /**
   * The quality of the remote audio stream as determined by the Agora real-time audio MOS (Mean Opinion Score) measurement method in the reported interval. The return value ranges from 0 to 500. Dividing the return value by 100 gets the MOS score, which ranges from 0 to 5. The higher the score, the better the audio quality.
   *
   * @since v3.3.1.
   *
   * The subjective perception of audio quality corresponding to the Agora
   * real-time audio MOS scores is as follows:
   *
   * | MOS score       | Perception of audio quality                                                                                                                                 |
   * |-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------|
   * | Greater than 4  | Excellent. The audio sounds clear and smooth.                                                                                                               |
   * | From 3.5 to 4   | Good. The audio has some perceptible impairment, but still sounds clear.                                                                                    |
   * | From 3 to 3.5   | Fair. The audio freezes occasionally and requires attentive listening.                                                                                      |
   * | From 2.5 to 3   | Poor. The audio sounds choppy and requires considerable effort to understand.                                                                               |
   * | From 2 to 2.5   | Bad. The audio has occasional noise. Consecutive audio dropouts occur, resulting in some information loss. The users can communicate only with difficulty.  |
   * | Less than 2     | Very bad. The audio has persistent noise. Consecutive audio dropouts are frequent, resulting in severe information loss. Communication is nearly impossible. |
   *
   */
  mosValue: number;
}

/**
 * Statistics of the remote video.
 */
export interface RemoteVideoStats {
  /**
   * User ID of the user sending the video streams.
   */
  uid: number;
  /**
   * @deprecated
   *
   * Time delay (ms). In scenarios where audio and video is synchronized, you can use the value
   * of `networkTransportDelay` and `jitterBufferDelay`
   * in [`RemoteAudioStats`]{@link RemoteAudioStats} to know the delay statistics of the remote video.
   */
  delay: number;
  /**
   * Width (pixels) of the remote video.
   */
  width: number;
  /**
   * Height (pixels) of the remote video.
   */
  height: number;
  /**
   * Bitrate (Kbps) received in the reported interval.
   */
  receivedBitrate: number;
  /**
   * The decoder output frame rate (fps) of the remote video.
   */
  decoderOutputFrameRate: number;
  /**
   * The renderer output frame rate (fps) of the remote video.
   */
  rendererOutputFrameRate: number;
  /**
   * Packet loss rate (%) of the remote video stream after network countermeasures.
   */
  packetLossRate: number;
  /**
   * Video stream type (high-stream or low-stream).
   */
  rxStreamType: VideoStreamType;
  /**
   * The total freeze time (ms) of the remote video stream after the remote user joins the channel.
   *
   * In a video session where the frame rate is set to no less than 5 fps, video freeze occurs when the time interval between two adjacent
   * renderable video frames is more than 500 ms.
   */
  totalFrozenTime: number;
  /**
   * The total video freeze time (`totalFrozenTime`) as a percentage (%) of the total active time of the remote video stream (`totalActiveTime`).
   */
  frozenRate: number;
  /**
   * The total time (ms) when the remote user in the Communication profile or the remote broadcaster in the Live-broadcast profile neither stops sending the video stream nor disables the video module after joining the channel.
   */
  totalActiveTime: number;
  /**
   * The total publish duration (ms) of the remote video stream.
   *
   * @since v3.1.2.
   *
   */
  publishDuration: number;
}

/**
 * The information of the detected human face.
 */
export interface FacePositionInfo {
  /**
   * The x coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin,
   * the x coordinate represents the relative lateral displacement of the top left corner of the human face to the origin.
   */
  x: number;
  /**
   * The y coordinate (px) of the human face in the local video. Taking the top left corner of the captured video as the origin,
   * the y coordinate represents the relative longitudinal displacement of the top left corner of the human face to the origin.
   */
  y: number;
  /**
   * The width (px) of the human face in the captured video.
   */
  width: number;
  /**
   * The height (px) of the human face in the captured video.
   */
  height: number;
  /**
   * The distance (cm) between the human face and the screen.
   */
  distance: number;
}

/**
 * The detailed options of a user.
 *
 * @since v3.2.0.
 */
export class ClientRoleOptions {
  /**
   * The latency level of an audience member in a live interactive streaming. See {@link AudienceLatencyLevelType}.
   */
  audienceLatencyLevel?: AudienceLatencyLevelType;

  constructor(params?: { audienceLatencyLevel?: AudienceLatencyLevelType }) {
    if (params) {
      this.audienceLatencyLevel = params.audienceLatencyLevel;
    }
  }
}

/**
 * Log file configurations.
 *
 * @since v3.3.1.
 */
export class LogConfig {
  /**
   * The absolute path of log files. The default file path is as follows:
   *   - Android: `/storage/emulated/0/Android/data/<package_name>/files/agorasdk.log`
   *   - iOS: `App Sandbox/Library/caches/agorasdk.log`
   * Ensure that the directory for the log files exists and is writable. You can use this parameter to rename the log files.
   */
  filePath?: string;
  /**
   * The size (KB) of a log file. The default value is 1024 KB. If you set `fileSize` to 1024 KB, the SDK outputs at most 5 MB log files; if you set it to less than 1024 KB, the setting is invalid, and the maximum size of a log file is still 1024 KB.
   */
  fileSize?: number;
  /**
   * The output log level of the SDK.
   *
   * For example, if you set the log level to `WARN`, the SDK outputs the logs within levels `FATAL`, `ERROR`, and `WARN`.
   *
   * See [`LogLevel`]{@link enum LogLevel}.
   */
  level?: LogLevel;

  constructor(params?: {
    filePath?: string;
    fileSize?: number;
    level?: LogLevel;
  }) {
    if (params) {
      this.filePath = params.filePath;
      this.fileSize = params.fileSize;
      this.level = params.level;
    }
  }
}

/**
 * The configurations for the data stream.
 *
 * @since v3.3.1
 *
 * | `syncWithAudio` | `ordered` | SDK behaviors                                                |
 * | :-------------- | :-------- | :----------------------------------------------------------- |
 * | `false`         | `false`   | The SDK triggers the `StreamMessage` callback immediately after the receiver receives a data packet. |
 * | `true`          | `false`   | <ul><li>If the data packet delay is within the audio delay, the SDK triggers the <code>StreamMessage</code> callback when the synchronized audio packet is played out</li><li>If the data packet delay exceeds the audio delay, the SDK triggers the <code>StreamMessage</code> callback as soon as the data packet is received. In this case, the data packet is not synchronized with the audio packet.</li></ul>.  |
 * | `false`         | `true`    | <ul><li>If the delay of a data packet is within five seconds, the SDK corrects the order of the data packet.</li><li>If the delay of a data packet exceeds five seconds, the SDK discards the data packet.</li></ul> |
 * | `true`          | `true`    |    <ul><li>If the delay of a data packet is within the audio delay, the SDK corrects the order of the data packet.</li><li>If the delay of a data packet exceeds the audio delay, the SDK discards this data packet.</li></ul>                                                          |
 */
export class DataStreamConfig {
  /**
   * Whether to synchronize the data packet with the published audio packet.
   * - `true`: Synchronize the data packet with the audio packet.
   * - `false`: Do not synchronize the data packet with the audio packet.
   *
   * When you set the data packet to synchronize with the audio, then if the data packet delay is within the audio delay range, the SDK triggers the [`StreamMessage`]{@link RtcEngineEvents.StreamMessage} callback when the synchronized audio packet is played out. Do not set this parameter as `true` if you need the receiver to receive the data packet immediately. Agora recommends that you set this parameter to `true` only when you need to implement specific functions, for example lyric synchronization.
   */
  syncWithAudio: boolean;
  /**
   * Whether the SDK guarantees that the receiver receives the data in the sent order.
   * - `true`: Guarantee that the receiver receives the data in the sent order.
   * - `false`: Do not guarantee that the receiver receives the data in the sent order.
   *
   * Do not set this parameter to `true` if you need the receiver to receive the data immediately.
   */
  ordered: boolean;

  constructor(syncWithAudio: boolean, ordered: boolean) {
    this.syncWithAudio = syncWithAudio;
    this.ordered = ordered;
  }
}

/**
 * Configurations for the [`RtcEngine`]{@link RtcEngine}.
 *
 * @since v3.4.5
 */
export class RtcEngineContext {
  /**
   * The App ID issued to you by Agora. See [How to get the App ID](https://docs.agora.io/en/Agora%20Platform/token#get-an-app-id).
   * Only users in apps with the same App ID can join the same channel and communicate with each other. Use an App ID to create only
   * one `IRtcEngine` instance. To change your App ID, call `release` to destroy the current `IRtcEngine` instance and then call `createAgoraRtcEngine`
   * and `initialize` to create an `IRtcEngine` instance with the new App ID.
   */
  appId: string;
  /**
   * The region for connection. This advanced feature applies to scenarios that have regional restrictions.
   *
   * For the regions that Agora supports, see [`AreaCode`]{@link AreaCode}. The area codes support bitwise operation.
   *
   * After specifying the region, the SDK connects to the Agora servers within that region.
   *
   */
  areaCode?: AreaCode[];
  /**
   * The configuration of the log files that the SDK outputs. See [`LogConfig`]{@link LogConfig}.
   *
   * By default, the SDK outputs five log files, `agorasdk.log`, `agorasdk_1.log`, `agorasdk_2.log`, `agorasdk_3.log`, `agorasdk_4.log`, each with a default size of 1024 KB. These log files are encoded in UTF-8. The SDK writes the latest logs in `agorasdk.log`. When `agorasdk.log` is full, the SDK deletes the log file with the earliest modification time among the other four, renames `agorasdk.log` to the name of the deleted log file, and creates a new `agorasdk.log` to record latest logs.
   *
   * The log file records all log data for the SDK’s operation. Ensure that the directory for the log file exists and is writable.
   */
  logConfig?: LogConfig;

  constructor(
    appId: string,
    params?: { areaCode?: AreaCode[]; logConfig?: LogConfig }
  ) {
    this.appId = appId;
    if (params) {
      this.areaCode = params.areaCode;
      this.logConfig = params.logConfig;
    }
  }
}

/**
 *
 * Configurations for the [`RtcEngine`]{@link RtcEngine}.
 *
 * @deprecated As of v3.4.5, this class is deprecated. Use [`RtcEngineContext`]{@link RtcEngineContext} instead.
 *
 * @since v3.3.1
 */
export class RtcEngineConfig extends RtcEngineContext {}

/**
 * Recording configuration, which is set in [`startAudioRecordingWithConfig`]{@link startAudioRecordingWithConfig}.
 */
export class AudioRecordingConfiguration {
  /**
   *
   * The absolute path (including the filename extensions) of the recording file. For example:
   * - On Android: `/sdcard/emulated/0/audio.aac`.
   * - On iOS: `/var/mobile/Containers/Data/audio.aac`.
   *
   * **Note**
   * Ensure that the path you specify exists and is writable.
   */
  filePath: string;
  /**
   * Audio recording quality. See [`AudioRecordingQuality`]{@link AudioRecordingQuality}.
   *
   * **Note** This parameter applies to AAC files only.
   */
  recordingQuality?: AudioRecordingQuality;
  /**
   * Recording content. See [`AudioRecordingPosition`]{@link AudioRecordingPosition}.
   */
  recordingPosition?: AudioRecordingPosition;
  /**
   * Recording sample rate (Hz). The following values are supported:
   * - 16000
   * - (Default) 32000
   * - 44100
   * - 48000
   *
   * **Note**
   * If this parameter is set to `44100` or `48000`, for better recording effects, Agora recommends recording WAV files or AAC files whose `recordingQuality` is `Medium` or `High`.
   *
   */
  recordingSampleRate?: AudioSampleRateType;
  /**
   * The recorded audio channel. The following values are supported:
   * - `1`: (Default) Mono channel.
   * - `2`: Dual channel.
   *
   * @since v3.6.2
   */
  recordingChannel?: number;

  constructor(
    filePath: string,
    params?: {
      recordingQuality?: AudioRecordingQuality;
      recordingPosition?: AudioRecordingPosition;
      recordingSampleRate?: AudioSampleRateType;
      recordingChannel?: number;
    }
  ) {
    this.filePath = filePath;
    if (params) {
      this.recordingQuality = params.recordingQuality;
      this.recordingPosition = params.recordingPosition;
      this.recordingSampleRate = params.recordingSampleRate;
      this.recordingChannel = params.recordingChannel;
    }
  }
}

/**
 * The custom background image.
 *
 * @since v3.5.0.3
 */
export class VirtualBackgroundSource {
  /**
   * The type of the custom background image. See [`VirtualBackgroundSourceType`]{@link VirtualBackgroundSourceType}.
   */
  backgroundSourceType?: VirtualBackgroundSourceType;
  /**
   * The color of the custom background image.
   * The format is a hexadecimal integer defined by RGB, without the # sign, such as 0xFFB6C1 for light pink.
   * The default value is 0xFFFFFF, which signifies white. The value range is [0x000000,0xffffff]. If the value is invalid, the SDK replaces the original background image with a white background image.
   *
   * **Note**
   * This parameter takes effect only when the type of the custom background image is `Color`.
   */
  color?: Color;
  /**
   * The local absolute path of the custom background image. PNG and JPG formats are supported.
   * If the path is invalid, the SDK replaces the original background image with a white background image.
   *
   * **Note**
   * This parameter takes effect only when the type of the custom background image is `Img`.
   */
  source?: string;
  /**
   * The degree of blurring applied to the custom background image. See [`VirtualBackgroundBlurDegree`]{@link VirtualBackgroundBlurDegree}.
   *
   * **Since** v3.5.2
   */
  blur_degree?: VirtualBackgroundBlurDegree;

  constructor(params?: {
    backgroundSourceType?: VirtualBackgroundSourceType;
    color?: Color;
    source?: string;
    blur_degree?: VirtualBackgroundBlurDegree;
  }) {
    if (params) {
      this.backgroundSourceType = params.backgroundSourceType;
      this.color = params.color;
      this.source = params.source;
      this.blur_degree = params.blur_degree;
    }
  }
}

/**
 * The information of an audio file, which is reported in [`RequestAudioFileInfo`]{@link RequestAudioFileInfo}.
 *
 * @since v3.5.2
 */
export interface AudioFileInfo {
  /** The file path.
   */
  filePath: string;
  /** The file duration (ms).
   */
  durationMs: number;
}

/**
 * The configuration of the audio call loop test.
 *
 * @since v3.5.2
 */
export class EchoTestConfiguration {
  /**
   * Whether to enable the audio device for the call loop test:
   * - true: (Default) Enables the audio device. To test the audio device, set this parameter as `true`.
   * - false: Disables the audio device.
   */
  enableAudio?: boolean;
  /**
   * Reversed for future use.
   */
  enableVideo?: boolean;
  /**
   * The token used to secure the audio call loop test. If you do not enable App Certificate in Agora
   * Console, you do not need to pass a value in this parameter; if you have enabled App Certificate in Agora Console,
   * you must pass a token in this parameter, the `uid` used when you generate the token must be 0xFFFFFFFF, and the
   * channel name used must be the channel name that identifies each audio loop tested. For server-side
   * token generation, see [Authenticate Your Users with Tokens](https://docs.agora.io/en/Interactive%20Broadcast/token_server?platform=All%20Platforms).
   */
  token?: string;
  /**
   * The channel name that identifies each audio call loop. To ensure proper loop test functionality, the
   * channel name passed in to identify each loop test cannot be the same when users of the same project (App ID)
   * perform audio call loop tests on different devices.
   */
  channelId?: string;

  constructor(params?: {
    enableAudio?: boolean;
    enableVideo?: boolean;
    token?: string;
    channelId?: string;
  }) {
    if (params) {
      this.enableAudio = params.enableAudio;
      this.enableVideo = params.enableVideo;
      this.token = params.token;
      this.channelId = params.channelId;
    }
  }
}

/**
 * Configurations for the local audio and video recording.
 *
 * @since v3.6.2
 */
export class MediaRecorderConfiguration {
  /**
   * The absolute path (including the filename extensions) for the recording file.
   * For example:
   * - Android: `/storage/emulated/0/Android/data/<package name>/files/example.mp4`
   * - iOS: `/App Sandbox/Library/Caches/example.mp4`
   *
   * **Note**
   * Ensure that the specified path exists and is writable.
   */
  storagePath: string;
  /**
   * The format of the recording file. The SDK currently supports only `1`, which is MP4 format.
   */
  containerFormat: number;
  /**
   * The recording content:
   * - `0x1`: Only audio.
   * - `0x2`: Only video.
   * - `0x3`: (Default) Audio and video.
   */
  streamType: number;
  /**
   * The maximum recording duration, in milliseconds. The default value is `120000`.
   */
  maxDurationMs: number;
  /**
   * The interval (ms) of updating the recording information.
   * The value range is [1000,10000]. Based on the set value of `recorderInfoUpdateInterval`,
   * the SDK triggers the [`RecorderInfoUpdated`]{@link RtcEngineEvents.RecorderInfoUpdated} callback to report the updated recording information.
   */
  recorderInfoUpdateInterval: number;

  constructor(
    storagePath: string,
    containerFormat: number,
    streamType: number,
    maxDurationMs: number,
    recorderInfoUpdateInterval: number
  ) {
    this.storagePath = storagePath;
    this.containerFormat = containerFormat;
    this.streamType = streamType;
    this.maxDurationMs = maxDurationMs;
    this.recorderInfoUpdateInterval = recorderInfoUpdateInterval;
  }
}

/**
 * @ignore For future use
 */
export class ContentInspectModule {
  type?: number;
  interval?: number;
}

/**
 * @ignore For future use
 */
export class ContentInspectConfig {
  extraInfo?: string;
  modules?: ContentInspectModule[];
  moduleCount?: number;
}

/**
 * @ignore For future use
 */
export class LocalAccessPointConfiguration {
  ipList?: string[];
  domainList?: string[];
  verifyDomainName?: string;
  mode?: number;
}

/**
 * The video noise reduction options.
 *
 * @since v3.6.2
 */
export class VideoDenoiserOptions {
  /**
   * The video noise reduction mode：
   * - `0`: (Default) Automatic mode. The SDK automatically enables or disables the video noise reduction feature according to the ambient light.
   * - `1`: Manual mode. Users need to enable or disable the video noise reduction feature manually.
   */
  denoiserMode?: number;
  /**
   * The video noise reduction level:
   *
   * - `0`: (Default) Promotes video quality during video noise reduction.
   * `0` balances performance consumption and video noise reduction quality.
   * The performance consumption is moderate, the video noise reduction speed is moderate,
   * and the overall video quality is optimal.
   * - `1`: Promotes reducing performance consumption during video noise reduction.
   * `1` prioritizes reducing performance consumption over video noise reduction quality.
   * The performance consumption is lower, and the video noise reduction speed is faster.
   * To avoid a noticeable shadowing effect (shadows trailing behind moving objects) in the processed video,
   * Agora recommends that you use `1` when the camera is fixed.
   * - `2`: Enhanced video noise reduction. `2` prioritizes video noise reduction quality over reducing
   * performance consumption. The performance consumption is higher, the video noise reduction speed is slower,
   * and the video noise reduction quality is better. If `0` is not enough for your video noise reduction needs, you can use `2`.
   */
  denoiserLevel?: number;
}

/**
 * The low-light enhancement options.
 *
 * @since v3.6.2
 */
export class LowLightEnhanceOptions {
  /**
   * The low-light enhancement mode:
   *
   * - `0`: (Default) Automatic mode. The SDK automatically enables or disables the low-light enhancement feature according
   * to the ambient light to compensate for the lighting level or prevent overexposure, as necessary.
   * - `1`: Manual mode. Users need to enable or disable the low-light enhancement feature manually.
   */
  lowlightEnhanceMode?: number;
  /**
   * The low-light enhancement level:
   *
   * - `0`: (Default) Promotes video quality during low-light enhancement. It processes the brightness, details,
   * and noise of the video image. The performance consumption is moderate, the processing speed is moderate, and
   * the overall video quality is optimal.
   * - `1`: Promotes performance during low-light enhancement. It processes the brightness and details of the video image.
   * The processing speed is faster.
   */
  lowlightEnhanceLevel?: number;
}

/**
 * The color enhancement options.
 *
 * @since v3.6.2
 */
export class ColorEnhanceOptions {
  /**
   * The level of color enhancement.
   * The value range is [0.0,1.0]. `0.0` means no color enhancement is applied to the video.
   * The higher the value, the higher the level of color enhancement.
   * The default value is `0.5` on Android and `0.0` on iOS.
   */
  strengthLevel?: number;
  /**
   * The level of skin tone protection.
   * The value range is [0.0,1.0].
   * `0.0` means no skin tone protection.
   * The higher the value, the higher the level of skin tone protection.
   * The default value is `1.0`. When the level of color enhancement is higher,
   * the portrait skin tone can be significantly distorted, so you need to set the level of skin
   * tone protection; when the level of skin tone protection is higher, the color enhancement effect
   * can be slightly reduced. Therefore, to get the best color enhancement effect, Agora recommends
   * that you adjust strengthLevel and skinProtectLevel to get the most appropriate values.
   */
  skinProtectLevel?: number;
}

/**
 * Information for the recording file.
 *
 * @since v3.6.2
 */
export interface RecorderInfo {
  /**
   * The absolute path of the recording file.
   */
  fileName: string;
  /**
   * The recording duration, in milliseconds.
   */
  durationMs: number;
  /**
   * The size in bytes of the recording file.
   */
  fileSize: number;
}

/**
 * @ignore For future user
 */
export interface WlAccStats {
  e2eDelayPercent: number;
  frozenRatioPercent: number;
  lossRatePercent: number;
}

/**
 * The configuration of the screen sharing.
 *
 * @since v3.7.0
 */
export class ScreenCaptureParameters {
  /**
   * Determines whether to capture system audio during screen sharing:
   * - `true`: Capture.
   * - `false`: (Default) Do not capture.
   *
   * **Note**
   * On Android, due to system limitations, capturing system audio is only available for Android API level 29
   * and later (that is, Android 10 and later).
   */
  captureAudio?: boolean;
  /**
   * The audio configuration for the shared screen stream. See [`ScreenAudioParameters`]{@link ScreenAudioParameters}.
   *
   * **Note**
   * This parameter is only available for scenarios where `captureAudio` is `true`.
   */
  audioParams?: ScreenAudioParameters;
  /**
   * Determines whether to capture the screen during screen sharing:
   * - `true`: Capture.
   * - `false`: (Default) Do not capture.
   *
   * **Note**
   * On Android, due to system limitations, screen capture is only available for Android API level 21
   * and later (that is, Android 5 and later).
   */
  captureVideo?: boolean;
  /**
   * The video configuration for the shared screen stream. See [`ScreenVideoParameters`]{@link ScreenVideoParameters}.
   *
   * **Note**
   * This parameter is only available for scenarios where `captureVideo` is `false`.
   */
  videoParams?: ScreenVideoParameters;
}

/**
 * The video configuration for the shared screen stream.
 *
 * Only available for scenarios where `captureVideo` is `true`.
 *
 * @since v3.7.0
 */
export class ScreenVideoParameters {
  /**
   * The video encoding bitrate (Kbps). For recommended values,
   * see [Recommended video profiles](https://docs.agora.io/en/Interactive%20Broadcast/game_streaming_video_profile?platform=Android#recommended-video-profiles).
   */
  bitrate?: number;
  /**
   * The video encoding frame rate (fps). The default value is 15. For recommended values,
   * see [Recommended video profiles](https://docs.agora.io/en/Interactive%20Broadcast/game_streaming_video_profile?platform=Android#recommended-video-profiles).
   */
  frameRate?: number;
  /**
   * The video encoding resolution. The default value is 1280 × 720. For recommended values,
   * see [Recommended video profiles](https://docs.agora.io/en/Interactive%20Broadcast/game_streaming_video_profile?platform=Android#recommended-video-profiles).
   *
   * If the aspect ratio is different between `dimensions` and the screen, the SDK adjusts the video encoding resolution according to the
   * following rules (using an example value for `dimensions` of 1280 × 720):
   * - When the width and height of the screen are both lower than those of `dimensions`, the SDK uses the resolution of the screen for video encoding.
   * For example, if the screen is 640 × 360, the SDK uses 640 × 360 for video encoding.
   * - When either the width or height of the screen is higher than that of `dimension`, the SDK uses the maximum values that do not exceed those of `dimensions`
   * while maintaining the aspect ratio of the screen for video encoding. For example, if the screen is 2000 × 1500, the SDK uses 960 × 720 for video encoding.
   *
   * **Note**
   * - The billing of the screen sharing stream is based on the value of `dimensions`.
   * When you do not pass in a value, Agora bills you at 1280 × 720; when you pass a value in,
   * Agora bills you at that value. For details, see [Pricing for Real-time Communication](https://docs.agora.io/en/Interactive%20Broadcast/billing_rtc?platform=React%20Native).
   * - This value does not indicate the orientation mode of the output ratio. For how to set the video orientation, see [`VideoOutputOrientationMode`]{@link VideoOutputOrientationMode}.
   * - Whether the SDK can support a resolution at 720P depends on the performance of the device. If you set 720P but the device cannot support it, the video frame rate can be lower.
   */
  dimensions?: VideoDimensions;
  /**
   * The content hint of the screen sharing. See [`VideoContentHint`]{@link VideoContentHint}.
   */
  contentHint?: VideoContentHint;
}

/**
 * The audio configuration for the shared screen stream.
 *
 * Only available for scenarios where `captureAudio` is `true`.
 *
 * @since v3.7.0
 */
export class ScreenAudioParameters {
  /**
   * The audio sample rate (Hz). The default value is 16000.
   */
  sampleRate?: number;
  /**
   * The number of audio channels. The default value is 2, indicating dual channels.
   */
  channels?: number;
  /**
   * The volume of the captured system audio. The value range is [0,100]. The default value is 100.
   */
  captureSignalVolume?: number;
  /**
   * Determines whether to capture the audio played by the current application:
   * - `true`: Capture.
   * - `false`: (Default) Do not capture.
   */
  allowCaptureCurrentApp?: boolean;
}

/**
 * @ignore Contact support@agora.io.
 *
 * @since v3.7.0
 */
export class SpatialAudioParams {
  speaker_azimuth?: number;
  speaker_elevation?: number;
  speaker_distance?: number;
  speaker_orientation?: number;
  enable_blur?: boolean;
  enable_air_absorb?: boolean;
}
