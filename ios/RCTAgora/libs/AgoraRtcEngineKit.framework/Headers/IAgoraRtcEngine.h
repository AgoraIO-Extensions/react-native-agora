//
//  Agora Rtc Engine SDK
//
//  Copyright (c) 2018 Agora.io. All rights reserved.
//

/**
 @defgroup createAgoraRtcEngine Create an Agora Rtc Engine
 */

#ifndef AGORA_RTC_ENGINE_H
#define AGORA_RTC_ENGINE_H
#include "AgoraBase.h"
#include "IAgoraService.h"

namespace agora {
namespace rtc {
    typedef unsigned int uid_t;
    typedef void* view_t;
/** Maximum length of the device ID.
*/
enum MAX_DEVICE_ID_LENGTH_TYPE
{
  /** The maximum length of the device ID is 512 bytes.
  */
    MAX_DEVICE_ID_LENGTH = 512
};
/** Format of the quality report.
*/
enum QUALITY_REPORT_FORMAT_TYPE
{
  /** 0: The quality report in JSON format,
  */
    QUALITY_REPORT_JSON = 0,
    /** 1: The quality report in HTML format.
    */
    QUALITY_REPORT_HTML = 1,
};

enum MEDIA_ENGINE_EVENT_CODE_TYPE
{
    MEDIA_ENGINE_RECORDING_ERROR = 0,
    MEDIA_ENGINE_PLAYOUT_ERROR = 1,
    MEDIA_ENGINE_RECORDING_WARNING = 2,
    MEDIA_ENGINE_PLAYOUT_WARNING = 3,
    MEDIA_ENGINE_AUDIO_FILE_MIX_FINISH = 10,
    MEDIA_ENGINE_AUDIO_FAREND_MUSIC_BEGINS = 12,
    MEDIA_ENGINE_AUDIO_FAREND_MUSIC_ENDS = 13,
    MEDIA_ENGINE_LOCAL_AUDIO_RECORD_ENABLED = 14,
    MEDIA_ENGINE_LOCAL_AUDIO_RECORD_DISABLED = 15,
    // media engine role changed
    MEDIA_ENGINE_ROLE_BROADCASTER_SOLO = 20,
    MEDIA_ENGINE_ROLE_BROADCASTER_INTERACTIVE = 21,
    MEDIA_ENGINE_ROLE_AUDIENCE = 22,
    MEDIA_ENGINE_ROLE_COMM_PEER = 23,
    MEDIA_ENGINE_ROLE_GAME_PEER = 24,
    // iOS adm sample rate changed
    MEDIA_ENGINE_AUDIO_ADM_REQUIRE_RESTART = 110,
    MEDIA_ENGINE_AUDIO_ADM_SPECIAL_RESTART = 111,
};
/** Media device state.
*/
enum MEDIA_DEVICE_STATE_TYPE
{
  /** 1: The device is active.
  */
    MEDIA_DEVICE_STATE_ACTIVE = 1,
    /** 2: The device is disabled.
    */
    MEDIA_DEVICE_STATE_DISABLED = 2,
    /** 4: The device is not present.
    */
    MEDIA_DEVICE_STATE_NOT_PRESENT = 4,
    /** 8: The device is unplugged.
    */
    MEDIA_DEVICE_STATE_UNPLUGGED = 8
};

/** Media device type.
*/
enum MEDIA_DEVICE_TYPE
{
  /** -1: Unknown device type.
  */
    UNKNOWN_AUDIO_DEVICE = -1,
    /** 0: Audio playback device.
    */
    AUDIO_PLAYOUT_DEVICE = 0,
    /** 1: Audio recording device.
    */
    AUDIO_RECORDING_DEVICE = 1,
    /** 2: Video renderer.
    */
    VIDEO_RENDER_DEVICE = 2,
    /** 3: Video capturer.
    */
    VIDEO_CAPTURE_DEVICE = 3,
    /** 4: Application audio playback device.
    */
    AUDIO_APPLICATION_PLAYOUT_DEVICE = 4,
};

/** Audio recording quality.
*/
enum AUDIO_RECORDING_QUALITY_TYPE
{
  /** 0: Low audio recording quality.
  */
    AUDIO_RECORDING_QUALITY_LOW = 0,
    /** 1: Medium audio recording quality.
    */
    AUDIO_RECORDING_QUALITY_MEDIUM = 1,
    /** 2: High audio recording quality.
    */
    AUDIO_RECORDING_QUALITY_HIGH = 2,
};

/** Network quality. */
enum QUALITY_TYPE
{
    /** 0: The network quality is unknown. */
    QUALITY_UNKNOWN = 0,
    /**  1: The network quality is excellent. */
    QUALITY_EXCELLENT = 1,
    /** 2: The network quality is quite good, but the bitrate may be slightly lower than excellent. */
    QUALITY_GOOD = 2,
    /** 3: Users can feel the communication slightly impaired. */
    QUALITY_POOR = 3,
    /** 4: Users cannot communicate smoothly. */
    QUALITY_BAD = 4,
    /** 5: The network is so bad that users can barely communicate. */
    QUALITY_VBAD = 5,
    /** 6: The network is down and users cannot communicate at all. */
    QUALITY_DOWN = 6,
    /** 7: Users cannot detect the network quality. (Not in use.) */
    QUALITY_UNSUPPORTED = 7,
    /** 8: Detecting the network quality. */
    QUALITY_DETECTING = 8,
};

/** Video display mode. */
enum RENDER_MODE_TYPE
{
  /**
1: Uniformly scale the video until it fills the visible boundaries (cropped). One dimension of the video may have clipped contents.
 */
    RENDER_MODE_HIDDEN = 1,
    /**
2: Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to the disparity in the aspect ratio will be filled with black.
 */
    RENDER_MODE_FIT = 2,
    /** @deprecated
     3：This mode is deprecated.
     */
    RENDER_MODE_ADAPTIVE = 3,
};

/** Video mirror mode. */
enum VIDEO_MIRROR_MODE_TYPE
{
      /** 0: Default mirror mode determined by the SDK. */
    VIDEO_MIRROR_MODE_AUTO = 0,//determined by SDK
        /** 1: Enabled mirror mode. */
    VIDEO_MIRROR_MODE_ENABLED = 1,//enabled mirror
        /** 2: Disabled mirror mode. */
    VIDEO_MIRROR_MODE_DISABLED = 2,//disable mirror
};

/** @deprecated
 Video profile. */
enum VIDEO_PROFILE_TYPE
{
    /** 0: 160 &times; 120, frame rate 15 fps, bitrate 65 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_120P = 0,
    /** 2: 120 &times; 120, frame rate 15 fps, bitrate 50 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_120P_3 = 2,
    /** 10: 320&times;180, frame rate 15 fps, bitrate 140 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_180P = 10,
    /** 12: 180 &times; 180, frame rate 15 fps, bitrate 100 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_180P_3 = 12,
    /** 13: 240 &times; 180, frame rate 15 fps, bitrate 120 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_180P_4 = 13,
    /** 20: 320 &times; 240, frame rate 15 fps, bitrate 200 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_240P = 20,
    /** 22: 240 &times; 240, frame rate 15 fps, bitrate 140 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_240P_3 = 22,
    /** 23: 424 &times; 240, frame rate 15 fps, bitrate 220 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_240P_4 = 23,
    /** 30: 640 &times; 360, frame rate 15 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_360P = 30,
    /** 32: 360 &times; 360, frame rate 15 fps, bitrate 260 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_360P_3 = 32,
    /** 33: 640 &times; 360, frame rate 30 fps, bitrate 600 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_360P_4 = 33,
    /** 35: 360 &times; 360, frame rate 30 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_360P_6 = 35,
    /** 36: 480 &times; 360, frame rate 15 fps, bitrate 320 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_360P_7 = 36,
    /** 37: 480 &times; 360, frame rate 30 fps, bitrate 490 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_360P_8 = 37,
    /** 38: 640 &times; 360, frame rate 15 fps, bitrate 800 Kbps.
     @note Live broadcast profile only.
     */
    VIDEO_PROFILE_LANDSCAPE_360P_9 = 38,
    /** 39: 640 &times; 360, frame rate 24 fps, bitrate 800 Kbps.
     @note Live broadcast profile only.
     */
    VIDEO_PROFILE_LANDSCAPE_360P_10 = 39,
    /** 100: 640 &times; 360, frame rate 24 fps, bitrate 1000 Kbps.
     @note Live broadcast profile only.
     */
    VIDEO_PROFILE_LANDSCAPE_360P_11 = 100,
    /** 40: 640 &times; 480, frame rate 15 fps, bitrate 500 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_480P = 40,
    /** 42: 480 &times; 480, frame rate 15 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_480P_3 = 42,
    /** 43: 640 &times; 480, frame rate 30 fps, bitrate 750 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_480P_4 = 43,
    /** 45: 480 &times; 480, frame rate 30 fps, bitrate 600 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_480P_6 = 45,
    /** 47: 848 &times; 480, frame rate 15 fps, bitrate 610 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_480P_8 = 47,
    /** 48: 848 &times; 480, frame rate 30 fps, bitrate 930 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_480P_9 = 48,
    /** 49: 640 &times; 480, frame rate 10 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_480P_10 = 49,
    /** 50: 1280 &times; 720, frame rate 15 fps, bitrate 1130 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_720P = 50,
    /** 52: 1280 &times; 720, frame rate 30 fps, bitrate 1710 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_720P_3 = 52,
    /** 54: 960 &times; 720, frame rate 15 fps, bitrate 910 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_720P_5 = 54,
    /** 55: 960 &times; 720, frame rate 30 fps, bitrate 1380 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_720P_6 = 55,
    /** 60: 1920 &times; 1080, frame rate 15 fps, bitrate 2080 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_1080P = 60,
    /** 62: 1920 &times; 1080, frame rate 30 fps, bitrate 3150 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_1080P_3 = 62,
    /** 64: 1920 &times; 1080, frame rate 60 fps, bitrate 4780 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_1080P_5 = 64,
    /** 66: 2560 &times; 1440, frame rate 30 fps, bitrate 4850 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_1440P = 66,
    /** 67: 2560 &times; 1440, frame rate 60 fps, bitrate 6500 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_1440P_2 = 67,
    /** 70: 3840 &times; 2160, frame rate 30 fps, bitrate 6500 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_4K = 70,
    /** 72: 3840 &times; 2160, frame rate 60 fps, bitrate 6500 Kbps. */
    VIDEO_PROFILE_LANDSCAPE_4K_3 = 72,
    /** 1000: 120 &times; 160, frame rate 15 fps, bitrate 65 Kbps. */
    VIDEO_PROFILE_PORTRAIT_120P = 1000,
    /** 1002: 120 &times; 120, frame rate 15 fps, bitrate 50 Kbps. */
    VIDEO_PROFILE_PORTRAIT_120P_3 = 1002,
    /** 1010: 180 &times; 320, frame rate 15 fps, bitrate 140 Kbps. */
    VIDEO_PROFILE_PORTRAIT_180P = 1010,
    /** 1012: 180 &times; 180, frame rate 15 fps, bitrate 100 Kbps. */
    VIDEO_PROFILE_PORTRAIT_180P_3 = 1012,
    /** 1013: 180 &times; 240, frame rate 15 fps, bitrate 120 Kbps. */
    VIDEO_PROFILE_PORTRAIT_180P_4 = 1013,
    /** 1020: 240 &times; 320, frame rate 15 fps, bitrate 200 Kbps. */
    VIDEO_PROFILE_PORTRAIT_240P = 1020,
    /** 1022: 240 &times; 240, frame rate 15 fps, bitrate 140 Kbps. */
    VIDEO_PROFILE_PORTRAIT_240P_3 = 1022,
    /** 1023: 240 &times; 424, frame rate 15 fps, bitrate 220 Kbps. */
    VIDEO_PROFILE_PORTRAIT_240P_4 = 1023,
    /** 1030: 360 &times; 640, frame rate 15 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_PORTRAIT_360P = 1030,
    /** 1032: 360 &times; 360, frame rate 15 fps, bitrate 260 Kbps. */
    VIDEO_PROFILE_PORTRAIT_360P_3 = 1032,
    /** 1033: 360 &times; 640, frame rate 30 fps, bitrate 600 Kbps. */
    VIDEO_PROFILE_PORTRAIT_360P_4 = 1033,
    /** 1035: 360 &times; 360, frame rate 30 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_PORTRAIT_360P_6 = 1035,
    /** 1036: 360 &times; 480, frame rate 15 fps, bitrate 320 Kbps. */
    VIDEO_PROFILE_PORTRAIT_360P_7 = 1036,
    /** 1037: 360 &times; 480, frame rate 30 fps, bitrate 490 Kbps. */
    VIDEO_PROFILE_PORTRAIT_360P_8 = 1037,
    /** 1038: 360 &times; 640, frame rate 15 fps, bitrate 800 Kbps.
     @note Live broadcast profile only.
     */
    VIDEO_PROFILE_PORTRAIT_360P_9 = 1038,
    /** 1039: 360 &times; 640, frame rate 24 fps, bitrate 800 Kbps.
     @note Live broadcast profile only.
     */
    VIDEO_PROFILE_PORTRAIT_360P_10 = 1039,
    /** 1100: 360 &times; 640, frame rate 24 fps, bitrate 1000 Kbps.
     @note Live broadcast profile only.
     */
    VIDEO_PROFILE_PORTRAIT_360P_11 = 1100,
    /** 1040: 480 &times; 640, frame rate 15 fps, bitrate 500 Kbps. */
    VIDEO_PROFILE_PORTRAIT_480P = 1040,
    /** 1042: 480 &times; 480, frame rate 15 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_PORTRAIT_480P_3 = 1042,
    /** 1043: 480 &times; 640, frame rate 30 fps, bitrate 750 Kbps. */
    VIDEO_PROFILE_PORTRAIT_480P_4 = 1043,
    /** 1045: 480 &times; 480, frame rate 30 fps, bitrate 600 Kbps. */
    VIDEO_PROFILE_PORTRAIT_480P_6 = 1045,
    /** 1047: 480 &times; 848, frame rate 15 fps, bitrate 610 Kbps. */
    VIDEO_PROFILE_PORTRAIT_480P_8 = 1047,
    /** 1048: 480 &times; 848, frame rate 30 fps, bitrate 930 Kbps. */
    VIDEO_PROFILE_PORTRAIT_480P_9 = 1048,
    /** 1049: 480 &times; 640, frame rate 10 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_PORTRAIT_480P_10 = 1049,
    /** 1050: 720 &times; 1280, frame rate 15 fps, bitrate 1130 Kbps. */
    VIDEO_PROFILE_PORTRAIT_720P = 1050,
    /** 1052: 720 &times; 1280, frame rate 30 fps, bitrate 1710 Kbps. */
    VIDEO_PROFILE_PORTRAIT_720P_3 = 1052,
    /** 1054: 720 &times; 960, frame rate 15 fps, bitrate 910 Kbps. */
    VIDEO_PROFILE_PORTRAIT_720P_5 = 1054,
    /** 1055: 720 &times; 960, frame rate 30 fps, bitrate 1380 Kbps. */
    VIDEO_PROFILE_PORTRAIT_720P_6 = 1055,
    /** 1060: 1080 &times; 1920, frame rate 15 fps, bitrate 2080 Kbps. */
    VIDEO_PROFILE_PORTRAIT_1080P = 1060,
    /** 1062: 1080 &times; 1920, frame rate 30 fps, bitrate 3150 Kbps. */
    VIDEO_PROFILE_PORTRAIT_1080P_3 = 1062,
    /** 1064: 1080 &times; 1920, frame rate 60 fps, bitrate 4780 Kbps. */
    VIDEO_PROFILE_PORTRAIT_1080P_5 = 1064,
    /** 1066: 1440 &times; 2560, frame rate 30 fps, bitrate 4850 Kbps. */
    VIDEO_PROFILE_PORTRAIT_1440P = 1066,
    /** 1067: 1440 &times; 2560, frame rate 60 fps, bitrate 6500 Kbps. */
    VIDEO_PROFILE_PORTRAIT_1440P_2 = 1067,
    /** 1070: 2160 &times; 3840, frame rate 30 fps, bitrate 6500 Kbps. */
    VIDEO_PROFILE_PORTRAIT_4K = 1070,
    /** 1072: 2160 &times; 3840, frame rate 60 fps, bitrate 6500 Kbps. */
    VIDEO_PROFILE_PORTRAIT_4K_3 = 1072,
    /** Default 640 &times; 360, frame rate 15 fps, bitrate 400 Kbps. */
    VIDEO_PROFILE_DEFAULT = VIDEO_PROFILE_LANDSCAPE_360P,
};

/** Audio profile.

Sets the sampling rate, bitrate, encoding mode, and the number of channels:*/
enum AUDIO_PROFILE_TYPE // sample rate, bit rate, mono/stereo, speech/music codec
{
  /**
   0: Default audio profile. In the communication profile, the default value is 1; in the live-broadcast profile, the default value is 2.
   */
    AUDIO_PROFILE_DEFAULT = 0, // use default settings
    /**
     1: Sampling rate of 32 kHz, audio encoding, mono, and a bitrate of up to 18 Kbps.
     */
    AUDIO_PROFILE_SPEECH_STANDARD = 1, // 32Khz, 18Kbps, mono, speech
    /**
     2: Sampling rate of 48 kHz, music encoding, mono, and a bitrate of up to 48 Kbps.
     */
    AUDIO_PROFILE_MUSIC_STANDARD = 2, // 48Khz, 48Kbps, mono, music
    /**
     3: Sampling rate of 48 kHz, music encoding, stereo, and a bitrate of up to 56 Kbps.
     */
    AUDIO_PROFILE_MUSIC_STANDARD_STEREO = 3, // 48Khz, 56Kbps, stereo, music
    /**
     4: Sampling rate of 48 kHz, music encoding, mono, and a bitrate of up to 128 Kbps.
     */
    AUDIO_PROFILE_MUSIC_HIGH_QUALITY = 4, // 48Khz, 128Kbps, mono, music
    /**
     5: Sampling rate of 48 kHz, music encoding, stereo, and a bitrate of up to 192 Kbps.
     */
    AUDIO_PROFILE_MUSIC_HIGH_QUALITY_STEREO = 5, // 48Khz, 192Kbps, stereo, music
    /**
     6: Sampling rate of 16 kHz, audio encoding, mono, and Acoustic Echo Cancellation (AES) enabled.
     */
    AUDIO_PROFILE_IOT                       = 6,
    AUDIO_PROFILE_NUM = 7,
};

/** Audio application scenario.
*/
enum AUDIO_SCENARIO_TYPE // set a suitable scenario for your app type
{
    /** 0: Default. */
    AUDIO_SCENARIO_DEFAULT = 0,
    /** 1: Entertainment scenario, supporting voice during gameplay. */
    AUDIO_SCENARIO_CHATROOM_ENTERTAINMENT = 1,
    /** 2: Education scenario, prioritizing fluency and stability. */
    AUDIO_SCENARIO_EDUCATION = 2,
    /** 3: Live gaming scenario, enabling the gaming audio effects in the speaker mode in a live broadcast scenario. Choose this scenario for high-fidelity music playback. */
    AUDIO_SCENARIO_GAME_STREAMING = 3,
    /** 4: Showroom scenario, optimizing the audio quality with external professional equipment. */
    AUDIO_SCENARIO_SHOWROOM = 4,
    /** 5: Gaming scenario. */
    AUDIO_SCENARIO_CHATROOM_GAMING = 5,
    /** 6: Applicable to the IoT scenario. */
    AUDIO_SCENARIO_IOT = 6,
    AUDIO_SCENARIO_NUM = 7,
};

 /** Channel profile.
 */
enum CHANNEL_PROFILE_TYPE
{
  /** 0: Communication.

   This is used in one-on-one calls or group calls, where all users in the channel can talk freely.
   */
	CHANNEL_PROFILE_COMMUNICATION = 0,
  /** 1: Live Broadcast.

   Host and audience roles that can be set by calling \ref IRtcEngine::setClientRole "setClientRole". The host sends and receives voice, while the audience receives voice only with the sending function disabled.
   */
	CHANNEL_PROFILE_LIVE_BROADCASTING = 1,
  /** 2: Gaming.

   @note This profile applies to the Agora Gaming SDK only.

   Any user in the channel can talk freely. This mode uses the codec with low-power consumption and low bitrate by default.
   */
    CHANNEL_PROFILE_GAME = 2,
};

/** Client role in a live broadcast. */
enum CLIENT_ROLE_TYPE
{
    /** 1: Host */
    CLIENT_ROLE_BROADCASTER = 1,
        /** 2: Audience */
    CLIENT_ROLE_AUDIENCE = 2,
};

/** Reason for the user being offline. */
enum USER_OFFLINE_REASON_TYPE
{
    /** 0: A user quit the call. */
    USER_OFFLINE_QUIT = 0,
    /** 1: The SDK times out and the user drops offline because no data packet is received within a certain period of time. If a user quits the call and the message is not passed to the SDK (due to an unreliable channel), the SDK assumes the user dropped offline. */
    USER_OFFLINE_DROPPED = 1,
      /** 2: (Live broadcast only.) The client role switched from the host to the audience. */
    USER_OFFLINE_BECOME_AUDIENCE = 2,
};

/** State of importing an external video stream in a live broadcast. */
enum INJECT_STREAM_STATUS
{
    /** 0: The external video stream imported successfully. */
    INJECT_STREAM_STATUS_START_SUCCESS = 0,
    /** 1: The external video stream already exists. */
    INJECT_STREAM_STATUS_START_ALREADY_EXISTS = 1,
    /** 2: The external video stream to be imported is unauthorized. */
    INJECT_STREAM_STATUS_START_UNAUTHORIZED = 2,
    /** 3: Import external video stream timeout. */
    INJECT_STREAM_STATUS_START_TIMEDOUT = 3,
    /** 4: Import external video stream failed. */
    INJECT_STREAM_STATUS_START_FAILED = 4,
    /** 5: The external video stream stopped importing successfully. */
    INJECT_STREAM_STATUS_STOP_SUCCESS = 5,
    /** 6: No external video stream is found. */
    INJECT_STREAM_STATUS_STOP_NOT_FOUND = 6,
    /** 7: The external video stream to be stopped importing is unauthorized. */
    INJECT_STREAM_STATUS_STOP_UNAUTHORIZED = 7,
    /** 8: Stop importing external video stream timeout. */
    INJECT_STREAM_STATUS_STOP_TIMEDOUT = 8,
    /** 9: Stop importing external video stream failed. */
    INJECT_STREAM_STATUS_STOP_FAILED = 9,
    /** 10: The external video stream is corrupted. */
    INJECT_STREAM_STATUS_BROKEN = 10,
};
/** Remote video stream type. */
enum REMOTE_VIDEO_STREAM_TYPE
{
      /** 0: High-stream video. */
    REMOTE_VIDEO_STREAM_HIGH = 0,
      /** 1: Low-stream video. */
    REMOTE_VIDEO_STREAM_LOW = 1,
};

/** Use mode of the \ref media::IAudioFrameObserver::onRecordAudioFrame "onRecordAudioFrame" callback. */
enum RAW_AUDIO_FRAME_OP_MODE_TYPE
{
    /** 0: Read-only mode: Users only read the \ref agora::media::IAudioFrameObserver::AudioFrame "AudioFrame" data without modifying anything. For example, when users acquire the data with the Agora SDK then push the RTMP streams. */
    RAW_AUDIO_FRAME_OP_MODE_READ_ONLY = 0,
    /** 1: Write-only mode: Users replace the \ref agora::media::IAudioFrameObserver::AudioFrame "AudioFrame" data with their own data and pass the data to the SDK for encoding. For example, when users acquire the data. */
    RAW_AUDIO_FRAME_OP_MODE_WRITE_ONLY = 1,
    /** 2: Read and write mode: Users read the data from \ref agora::media::IAudioFrameObserver::AudioFrame "AudioFrame", modify it, and then play it. For example, when users have their own sound-effect processing module and perform some voice pre-processing, such as a voice change. */
    RAW_AUDIO_FRAME_OP_MODE_READ_WRITE = 2,
};

/** Audio-sampling rate. */
enum AUDIO_SAMPLE_RATE_TYPE
{
    /** 32000: 32 kHz */
    AUDIO_SAMPLE_RATE_32000 = 32000,
    /** 44100: 44.1 kHz */
    AUDIO_SAMPLE_RATE_44100 = 44100,
      /** 48000: 48 kHz */
    AUDIO_SAMPLE_RATE_48000 = 48000,
};

/** Video codec profile type. */
enum VIDEO_CODEC_PROFILE_TYPE
{  /** 66: Baseline video codec profile. Generally used in video calls on mobile phones. */
    VIDEO_CODEC_PROFILE_BASELINE = 66,
    /** 77: Main video codec profile. Generally used in mainstream electronics such as MP4 players, portable video players, PSP, and iPads. */
    VIDEO_CODEC_PROFILE_MAIN = 77,
      /**  100: (Default) High video codec profile. Generally used in high-resolution broadcasts or television. */
    VIDEO_CODEC_PROFILE_HIGH = 100,
};

/** Audio equalization band frequency. */
enum AUDIO_EQUALIZATION_BAND_FREQUENCY
{
    /** 0: 31 Hz */
    AUDIO_EQUALIZATION_BAND_31 = 0,
      /** 1: 62 Hz */
    AUDIO_EQUALIZATION_BAND_62 = 1,
    /** 2: 125 Hz */
    AUDIO_EQUALIZATION_BAND_125 = 2,
      /** 3: 250 Hz */
    AUDIO_EQUALIZATION_BAND_250 = 3,
      /** 4: 500 Hz */
    AUDIO_EQUALIZATION_BAND_500 = 4,
        /** 5: 1 kHz */
    AUDIO_EQUALIZATION_BAND_1K = 5,
        /** 6: 2 kHz */
    AUDIO_EQUALIZATION_BAND_2K = 6,
        /** 7: 4 kHz */
    AUDIO_EQUALIZATION_BAND_4K = 7,
        /** 8: 8 kHz */
    AUDIO_EQUALIZATION_BAND_8K = 8,
      /** 9: 16 kHz */
    AUDIO_EQUALIZATION_BAND_16K = 9,
};

/** Audio reverberation type. */
enum AUDIO_REVERB_TYPE
{
    /** 0: The level of the dry signal (db). The value is between -20 and 10. */
    AUDIO_REVERB_DRY_LEVEL = 0, // (dB, [-20,10]), the level of the dry signal
    /** 1: The level of the early reflection signal (wet signal) (dB). The value is between -20 and 10. */
    AUDIO_REVERB_WET_LEVEL = 1, // (dB, [-20,10]), the level of the early reflection signal (wet signal)
    /** 2: The room size of the reflection. The value is between 0 and 100. */
    AUDIO_REVERB_ROOM_SIZE = 2, // ([0,100]), the room size of the reflection
    /** 3: The length of the initial delay of the wet signal (ms). The value is between 0 and 200. */
    AUDIO_REVERB_WET_DELAY = 3, // (ms, [0,200]), the length of the initial delay of the wet signal in ms
    /** 4: The reverberation strength. The value is between 0 and 100. */
    AUDIO_REVERB_STRENGTH = 4, // ([0,100]), the strength of the reverberation
};

/** Remote video state. */
enum REMOTE_VIDEO_STATE
{
    // REMOTE_VIDEO_STATE_STOPPED is not used at this version. Ignore this value.
    // REMOTE_VIDEO_STATE_STOPPED = 0,  // Default state, video is started or remote user disabled/muted video stream
      /** 1: The remote video is playing. */
      REMOTE_VIDEO_STATE_RUNNING = 1,  // Running state, remote video can be displayed normally
      /** 2: The remote video is frozen. */
      REMOTE_VIDEO_STATE_FROZEN = 2,    // Remote video is frozen, probably due to network issue.
};

/** Video frame rate. */
enum FRAME_RATE
{
      /** 1: 1 fps */
    FRAME_RATE_FPS_1 = 1,
        /** 7: 7 fps */
    FRAME_RATE_FPS_7 = 7,
      /** 10: 10 fps */
    FRAME_RATE_FPS_10 = 10,
    /** 15: 15 fps */
    FRAME_RATE_FPS_15 = 15,
        /** 24: 24 fps */
    FRAME_RATE_FPS_24 = 24,
    /** 30: 30 fps */
    FRAME_RATE_FPS_30 = 30,
    /** 60: 60 fps (Windows and macOS only) */
    FRAME_RATE_FPS_60 = 60,
};

/** Video output orientation mode.
 */
enum ORIENTATION_MODE {
  /** 0: (Default) Adaptive mode.

   The video encoder adapts to the orientation mode of the video input device.

   - If the width of the captured video from the SDK is greater than the height, the encoder sends the video in landscape mode. The encoder also sends the rotational information of the video, and the receiver uses the rotational information to rotate the received video.
   - When you use a custom video source, the output video from the encoder inherits the orientation of the original video. If the original video is in portrait mode, the output video from the encoder is also in portrait mode. The encoder also sends the rotational information of the video to the receiver.
   */
    ORIENTATION_MODE_ADAPTIVE = 0,
    /** 1: Landscape mode.

     The video encoder always sends the video in landscape mode. The video encoder rotates the original video before sending it and the rotational infomation is 0. This mode applies to scenarios involving CDN live streaming.
     */
    ORIENTATION_MODE_FIXED_LANDSCAPE = 1,
    /** 2: Portrait mode.

     The video encoder always sends the video in portrait mode. The video encoder rotates the original video before sending it and the rotational infomation is 0. This mode applies to scenarios involving CDN live streaming.
     */
    ORIENTATION_MODE_FIXED_PORTRAIT = 2,
};

/** Stream fallback options. */
enum STREAM_FALLBACK_OPTIONS
{
    /** 0: No fallback behavior for the local/remote stream when the uplink/downlink network conditions are poor. The quality of the stream is not guaranteed. */
    STREAM_FALLBACK_OPTION_DISABLED = 0,
    /** 1: Under poor downlink network conditions, the remote stream, to which you subscribe, falls back to the low-stream video (low resolution and low bitrate). You can set this option only in \ref RtcEngineParameters::setRemoteSubscribeFallbackOption "setRemoteSubscribeFallbackOption". Nothing happens when you set this in \ref RtcEngineParameters::setLocalPublishFallbackOption "setLocalPublishFallbackOption". */
    STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW = 1,
    /** 2: Under poor uplink network conditions, the locally published stream falls back to audio-only.

    Under poor downlink network conditions, the remote stream, to which you subscribe, first falls back to the low-stream video (low resolution and low bitrate); and then to an audio-only stream if the network conditions worsen.*/
    STREAM_FALLBACK_OPTION_AUDIO_ONLY = 2,
};


/** Connection states. */
enum CONNECTION_STATE_TYPE
{
  /** 1: The SDK is disconnected from Agora's edge server.

   - This is the initial state before calling the \ref agora::rtc::IRtcEngine::joinChannel "joinChannel" method.
   - The SDK also enters this state when the application calls the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method.
   */
  CONNECTION_STATE_DISCONNECTED = 1,
  /** 2: The SDK is connecting to Agora's edge server.

   - When the application calls the \ref agora::rtc::IRtcEngine::joinChannel "joinChannel" method, the SDK starts to establish a connection to the specified channel, triggers the \ref agora::rtc::IRtcEngineEventHandler::onConnectionStateChanged "onConnectionStateChanged" callback, and switches to the #CONNECTION_STATE_CONNECTING state.
   - When the SDK successfully joins the channel, it triggers the \ref agora::rtc::IRtcEngineEventHandler::onConnectionStateChanged "onConnectionStateChanged" callback and switches to the #CONNECTION_STATE_CONNECTED state.
   - After the SDK joins the channel and when it finishes initializing the media engine, the SDK triggers the \ref agora::rtc::IRtcEngineEventHandler::onJoinChannelSuccess "onJoinChannelSuccess" callback.
   */
  CONNECTION_STATE_CONNECTING = 2,
  /** 3: The SDK is connected to Agora's edge server and has joined a channel. You can now publish or subscribe to a media stream in the channel.

   If the connection to the channel is lost because, for example, the network is down or switched, the SDK automatically tries to reconnect and triggers:
   - The \ref agora::rtc::IRtcEngineEventHandler::onConnectionInterrupted "onConnectionInterrupted" callback (deprecated).
   - The \ref agora::rtc::IRtcEngineEventHandler::onConnectionStateChanged "onConnectionStateChanged" callback and switches to the #CONNECTION_STATE_RECONNECTING state.
   */
  CONNECTION_STATE_CONNECTED = 3,
  /** 4: The SDK keeps rejoining the channel after being disconnected from a joined channel because of network issues.

   - If the SDK cannot rejoin the channel within 10 seconds after being disconnected from Agora's edge server, the SDK triggers the \ref agora::rtc::IRtcEngineEventHandler::onConnectionLost "onConnectionLost" callback, stays in the #CONNECTION_STATE_RECONNECTING state, and keeps rejoining the channel.
   - If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora's edge server, the SDK triggers the \ref agora::rtc::IRtcEngineEventHandler::onConnectionStateChanged "onConnectionStateChanged" callback, switches to the #CONNECTION_STATE_FAILED state, and stops rejoining the channel.
   */
  CONNECTION_STATE_RECONNECTING = 4,
  /** 5: The SDK fails to connect to Agora's edge server or join the channel.

   You must call the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method to leave this state, and call the \ref agora::rtc::IRtcEngine::joinChannel "joinChannel" method again to rejoin the channel.

   If the SDK is banned from joining the channel by Agora's edge server (through the RESTful API), the SDK triggers the \ref agora::rtc::IRtcEngineEventHandler::onConnectionBanned "onConnectionBanned" (deprecated) and \ref agora::rtc::IRtcEngineEventHandler::onConnectionStateChanged "onConnectionStateChanged" callbacks.
   */
  CONNECTION_STATE_FAILED = 5,
};

/** Reasons for the connection state change. */
enum CONNECTION_CHANGED_REASON_TYPE
{
  /** 0: The SDK is connecting to Agora's edge server. */
  CONNECTION_CHANGED_CONNECTING = 0,
  /** 1: The SDK has joined the channel successfully. */
  CONNECTION_CHANGED_JOIN_SUCCESS = 1,
  /** 2: The connection between the SDK and Agora's edge server is interrupted. */
  CONNECTION_CHANGED_INTERRUPTED = 2,
  /** 3: The connection between the SDK and Agora's edge server is banned by Agora's edge server. */
  CONNECTION_CHANGED_BANNED_BY_SERVER = 3,
  /** 4: The SDK fails to join the channel for more than 20 minutes and stops reconnecting to the channel. */
  CONNECTION_CHANGED_JOIN_FAILED = 4,
  /** 5: The SDK has left the channel. */
  CONNECTION_CHANGED_LEAVE_CHANNEL = 5,
};

/** Properties of the audio volume information.

 An array containing the user ID and volume information for each speaker.
 */
struct AudioVolumeInfo
{
  /**
 User ID of the speaker. The uid of the local user is 0.
 */
    uid_t uid;
    /** The volume of the speaker. The volume ranges between 0 (lowest volume) and 255 (highest volume).
 */
    unsigned int volume;
};

/** Statistics of the channel.
 */
struct RtcStats
{
  /**
   Call duration (s), represented by an aggregate value.
   */
    unsigned int duration;
    /**
     Total number of bytes transmitted, represented by an aggregate value.
     */
    unsigned int txBytes;
    /**
     Total number of bytes received, represented by an aggregate value.
     */
    unsigned int rxBytes;
    /**
     Transmission bitrate (Kbps), represented by an instantaneous value.
     */
    unsigned short txKBitRate;
    /**
     Receive bitrate (Kbps), represented by an instantaneous value.
     */
    unsigned short rxKBitRate;
    /**
     Audio receive bitrate (Kbps), represented by an instantaneous value.
     */
    unsigned short rxAudioKBitRate;
    /**
     Audio transmission bitrate (Kbps), represented by an instantaneous value.
     */
    unsigned short txAudioKBitRate;
    /**
     Video receive bitrate (Kbps), represented by an instantaneous value.
     */
    unsigned short rxVideoKBitRate;
    /**
     Video transmission bitrate (Kbps), represented by an instantaneous value.
     */
    unsigned short txVideoKBitRate;
    /** Client-server latency (ms)
     */
    unsigned short lastmileDelay;
    /** Number of users in the channel.

     - Communication profile: The number of users in the channel.
     - Live broadcast profile:

         -  If the local user is an audience: The number of hosts in the channel + 1.
         -  If the user is a host: The number of hosts in the channel.
     */
    unsigned int userCount;
    /**
     Application CPU usage (%).
     */
    double cpuAppUsage;
    /**
     System CPU usage (%).
     */
    double cpuTotalUsage;
  RtcStats()
      : duration(0)
      , txBytes(0)
      , rxBytes(0)
      , txKBitRate(0)
      , rxKBitRate(0)
      , rxAudioKBitRate(0)
      , txAudioKBitRate(0)
      , rxVideoKBitRate(0)
      , txVideoKBitRate(0)
      , lastmileDelay(0)
      , userCount(0)
      , cpuAppUsage(0)
      , cpuTotalUsage(0) {}
};

/** Statistics of the local video stream.
 */
struct LocalVideoStats
{
  /** Data transmission bitrate (Kbps) sent since last count.
   */
    int sentBitrate;
    /** Data transmission frame rate (fps) sent since last count.
     */
    int sentFrameRate;
};
/** Statistics of the remote video stream.
 */
struct RemoteVideoStats
{
  /**
 User ID of the remote user sending the video streams.
 */
    uid_t uid;
    /** @deprecated Time delay (ms).
 */
    int delay;
/**
 Width (pixels) of the video stream.
 */
	int width;
  /**
 Height (pixels) of the video stream.
 */
	int height;
  /**
 Bitrate (Kbps) received since the last count.
 */
	int receivedBitrate;
  /**
 Frame rate (fps) received since the last count.
 */
	int receivedFrameRate;
  /**
   Remote video stream type (high-stream or low-stream): #REMOTE_VIDEO_STREAM_TYPE
   */
    REMOTE_VIDEO_STREAM_TYPE rxStreamType;
};
/** Audio statistics of a remote user */
struct RemoteAudioStats
{
    /** User ID of the remote user sending the audio streams. */
    uid_t uid;
    /** Audio quality received by the user: #QUALITY_TYPE. */
    int quality;
    /** Network delay from the sender to the receiver. */
    int networkTransportDelay;
    /** Jitter buffer delay at the receiver. */
    int jitterBufferDelay;
    /** Packet loss rate in the reported interval. */
    int audioLossRate;
};

/** @deprecated
 RTC video compositing layout.
 */
struct VideoCompositingLayout
{
  /** @deprecated
   The display region of a specified user on the screen.
   */
    struct Region {
      /** User ID of the user whose video will be displayed on the screen.
      */
        uid_t uid;
        /** Horizontal position of the region on the screen. The value ranges between 0.0 and 1.0.
        */
        double x;//[0,1]
        /** Vertical position of the region on the screen. The value ranges between 0.0 and 1.0.
         */
        double y;//[0,1]
        /** Actual width of the region. The value ranges between 0.0 and 1.0. For example, if the width of the screen is 360, and the width of the region is 120, set the width value as 0.33.
        */
        double width;//[0,1]
        /** Actual height of the region. The value ranges between 0.0 and 1.0. For example, if the height of the screen is 240, and the height of the region is 120, set the height value as 0.5.
        */
        double height;//[0,1]
        /** Layer position of the region:

         - 0: (Default) The region is at the bottom layer.
         - 100: The region is at the top layer.

         @note
         - If zOrder is beyond this range, the SDK reports #ERR_INVALID_ARGUMENT.
         - As of v2.3, the SDK supports zOrder = 0.
         */
        int zOrder; //optional, [0, 100] //0 (default): bottom most, 100: top most

    /** The transparency of the video region in CDN live. The value ranges between 0.0 and 1.0:

    - 0: The region is transparent.
    - 1: (Default) The region is opaque.
    */
        double alpha;
        /** @deprecated This parameter will not take effect. Ignore it.
         */
        RENDER_MODE_TYPE renderMode;
        Region()
            :uid(0)
            , x(0)
            , y(0)
            , width(0)
            , height(0)
            , zOrder(0)
            , alpha(1.0)
            , renderMode(RENDER_MODE_HIDDEN)
        {}

    };
    /** Ignore this parameter. The width of the canvas is set by \ref IRtcEngine::configPublisher "configPublisher", not by \ref VideoCompositingLayout::canvasWidth "canvasWidth".
    */
    int canvasWidth;
    /** Ignore this parameter. The height of the canvas is set by \ref IRtcEngine::configPublisher "configPublisher", not by \ref VideoCompositingLayout::canvasHeight "canvasWidth".
    */
    int canvasHeight;
    /** RGB hex color value.

     @note Value only, do not include a #. For example, C0C0C0.
     */
    const char* backgroundColor;
    /** Screen display region information.

     Sets the screen display region of a host or a delegated host in CDN live streaming. See Region for more information.
     */
    const Region* regions;
    /** Number of the screen display regions.
     */
    int regionCount;
    /** Application-defined data. Supports a maximum of 2048 bytes.
    */
    const char* appData;
    /** Length of the user-defined application data.
    */
    int appDataLength;
    VideoCompositingLayout()
        :canvasWidth(0)
        ,canvasHeight(0)
        ,backgroundColor(NULL)
        ,regions(NULL)
        , regionCount(0)
        , appData(NULL)
        , appDataLength(0)
    {}
};

/**
 * Video dimensions.
 */
struct VideoDimensions {
    /** The width of the video in number of pixels.*/
    int width;
      /** The height of the video in number of pixels.*/
    int height;
    VideoDimensions()
        : width(640), height(480)
    {}
    VideoDimensions(int w, int h)
        : width(w), height(h)
    {}
};

/** (Recommended) The standard bitrate set in \ref IRtcEngine::setVideoEncoderConfiguration "setVideoEncoderConfiguration".

 In this mode, the bitrates differ between the live broadcast and communication profiles:

 - Communication profile: The video bitrate is the same as the base bitrate.
 - Live broadcast profile: The video bitrate is twice the base bitrate.

 */
const int STANDARD_BITRATE = 0;

/** The compatible bitrate set in \ref IRtcEngine::setVideoEncoderConfiguration "setVideoEncoderConfiguration".

 The bitrate remains the same regardless of the channel profile. If you choose this mode in the live broadcast profile, the video frame rate may be lower than the set value.
 */
const int COMPATIBLE_BITRATE = -1;

/** Use default minimum bitrate.
 */
const int DEFAULT_MIN_BITRATE = -1;

/** Properties of the video encoder configuration.
 */
struct VideoEncoderConfiguration {
  /** The video frame dimension used to specify the video quality and measured by the total number of pixels along a frame's width and height: VideoDimensions.
  */
    VideoDimensions dimensions;
    /** Frame rate of the video: #FRAME_RATE.
    */
    FRAME_RATE frameRate;
    /** Video encoding Bitrate (Kbps).
     
     Choose one of the following options:

     - #STANDARD_BITRATE: (Recommended) Standard bitrate.
        - Communication profile: The encoding bitrate equals the base bitrate.
        - Live broadcast profile: The encoding bitrate is twice the base bitrate.
     - #COMPATIBLE_BITRATE: Compatible bitrate: The bitrate stays the same regardless of the profile.

     The communication profile prioritizes smoothness, whilst the live broadcast profile prioritizes video quality (requiring a higher bitrate). Agora recommends setting the bitrate mode as #STANDARD_BITRATE or simply to address this difference.
     
     The following table lists the recommended video encoder configurations, where the base bitrate applies to the communication profile. Set your bitrate based on this table. If the bitrate you set is beyond the proper range, the SDK automatically sets it to within the range.

     | Resolution             | Frame Rate (fps) | Base Bitrate (Kbps, for Communication) | Live Bitrate (Kbps, for Live Broadcast)|
     |------------------------|------------------|----------------------------------------|----------------------------------------|
     | 160 &times; 120        | 15               | 65                                     | 130                                    |
     | 120 &times; 120        | 15               | 50                                     | 100                                    |
     | 320 &times; 180        | 15               | 140                                    | 280                                    |
     | 180 &times; 180        | 15               | 100                                    | 200                                    |
     | 240 &times; 180        | 15               | 120                                    | 240                                    |
     | 320 &times; 240        | 15               | 200                                    | 400                                    |
     | 240 &times; 240        | 15               | 140                                    | 280                                    |
     | 424 &times; 240        | 15               | 220                                    | 440                                    |
     | 640 &times; 360        | 15               | 400                                    | 800                                    |
     | 360 &times; 360        | 15               | 260                                    | 520                                    |
     | 640 &times; 360        | 30               | 600                                    | 1200                                   |
     | 360 &times; 360        | 30               | 400                                    | 800                                    |
     | 480 &times; 360        | 15               | 320                                    | 640                                    |
     | 480 &times; 360        | 30               | 490                                    | 980                                    |
     | 640 &times; 480        | 15               | 500                                    | 1000                                   |
     | 480 &times; 480        | 15               | 400                                    | 800                                    |
     | 640 &times; 480        | 30               | 750                                    | 1500                                   |
     | 480 &times; 480        | 30               | 600                                    | 1200                                   |
     | 848 &times; 480        | 15               | 610                                    | 1220                                   |
     | 848 &times; 480        | 30               | 930                                    | 1860                                   |
     | 640 &times; 480        | 10               | 400                                    | 800                                    |
     | 1280 &times; 720       | 15               | 1130                                   | 2260                                   |
     | 1280 &times; 720       | 30               | 1710                                   | 3420                                   |
     | 960 &times; 720        | 15               | 910                                    | 1820                                   |
     | 960 &times; 720        | 30               | 1380                                   | 2760                                   |
     | 1920 &times; 1080      | 15               | 2080                                   | 4160                                   |
     | 1920 &times; 1080      | 30               | 3150                                   | 6300                                   |
     | 1920 &times; 1080      | 60               | 4780                                   | 6500                                   |
     | 2560 &times; 1440      | 30               | 4850                                   | 6500                                   |
     | 2560 &times; 1440      | 60               | 6500                                   | 6500                                   |
     | 3840 &times; 2160      | 30               | 6500                                   | 6500                                   |
     | 3840 &times; 2160      | 60               | 6500                                   | 6500                                   |

     */
    int bitrate;
    /** Minimum encoding bitrate (Kbps).
     
     The Agora SDK automatically adjusts the encoding bitrate to adapt to the network conditions. Using a value greater than the default value forces the video encoder to output high-quality images but may cause more packet loss and hence sacrifice the smoothness of the video transmission. That said, unless you have special requirements for image quality, Agora does not recommend changing this value.
     
     @note This parameter applies only to the Live Broadcast profile.
     */
    int minBitrate;
    /** Video orientation mode of the video: #ORIENTATION_MODE.
    */
    ORIENTATION_MODE orientationMode;
    
    VideoEncoderConfiguration(
        const VideoDimensions& d, FRAME_RATE f,
        int b, ORIENTATION_MODE m)
        : dimensions(d), frameRate(f), bitrate(b),
          minBitrate(DEFAULT_MIN_BITRATE), orientationMode(m)
    {}
    VideoEncoderConfiguration(
        int width, int height, FRAME_RATE f,
        int b, ORIENTATION_MODE m)
        : dimensions(width, height), frameRate(f), bitrate(b),
          minBitrate(DEFAULT_MIN_BITRATE), orientationMode(m)
    {}
    VideoEncoderConfiguration()
        : dimensions(640, 480)
        , frameRate(FRAME_RATE_FPS_15)
        , bitrate(STANDARD_BITRATE)
        , minBitrate(DEFAULT_MIN_BITRATE)
        , orientationMode(ORIENTATION_MODE_ADAPTIVE)
    {}
};
/** Definition of the rectangular region. */
typedef struct Rect {
    /** Y-axis of the top line.
     */
    int top;
    /** X-axis of the left line.
     */
    int left;
    /** Y-axis of the bottom line.
     */
    int bottom;
    /** X-axis of the right line.
     */
    int right;

    Rect(): top(0), left(0), bottom(0), right(0) {}
    Rect(int t, int l, int b, int r): top(t), left(l), bottom(b), right(r) {}
} Rect;

/** The video properties of the user displaying the video in the CDN live. Agora supports a maximum of 17 transcoding users in a CDN streaming channel.
*/
typedef struct TranscodingUser {
  /** User ID of the user displaying the video in the CDN live.
  */
    uid_t uid;

/** Horizontal position from the top left corner of the video frame.
*/
    int x;
    /** Vertical position from the top left corner of the video frame.
    */
    int y;
    /** Width of the video frame. The default value is 360.
    */
    int width;
    /** Height of the video frame. The default value is 640.
    */
    int height;

    /** Layer position of the video frame. The value ranges between 0 and 100.

     - 0: (Default) Lowest
     - 100: Highest

     @note
     - If zOrder is beyond this range, the SDK reports #ERR_INVALID_ARGUMENT.
     - As of v2.3, the SDK supports zOrder = 0.
     */
    int zOrder;
    /**  Transparency of the video frame in CDN live. The value ranges between 0 and 1.0:

     - 0: Completely transparent
     - 1.0: (Default) Opaque
     */
    double alpha;
    /** The audio channel of the sound. The default value is 0:

     - 0: (Default) Supports dual channels at most, depending on the upstream of the broadcaster.
     - 1: The audio stream of the broadcaster uses the FL audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     - 2: The audio stream of the broadcaster uses the FC audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     - 3: The audio stream of the broadcaster uses the FR audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     - 4: The audio stream of the broadcaster uses the BL audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     - 5: The audio stream of the broadcaster uses the BR audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.

     @note If your setting is not 0, you may need a specialized player.
     */
    int audioChannel;
    TranscodingUser()
        : uid(0)
        , x(0)
        , y(0)
        , width(0)
        , height(0)
        , zOrder(0)
        , alpha(1.0)
        , audioChannel(0)
    {}

} TranscodingUser;

/** Image properties.

 The properties of the watermark and background images.
 */
typedef struct RtcImage {
    RtcImage() :
       url(NULL),
       x(0),
       y(0),
       width(0),
       height(0)
    {}
    /** URL address of the image on the broadcasting video. */
    const char* url;
    /** Horizontal position of the image from the upper left of the broadcasting video. */
    int x;
    /** Vertical position of the image from the upper left of the broadcasting video. */
    int y;
    /** Width of the image on the broadcasting video. */
    int width;
    /** Height of the image on the broadcasting video. */
    int height;
} RtcImage;

/**  A structure for managing CDN live audio/video transcoding settings.
*/
typedef struct LiveTranscoding {
  /** Width of the video. The default value is 360.
   */
    int width;
    /** Height of the video. The default value is 640.
    */
    int height;
    /** Bitrate of the CDN live output video stream. The default value is 400 Kbps.
    */
    int videoBitrate;
    /** Frame rate of the output video stream set for the CDN live broadcast. The default value is 15 fps.
    */
    int videoFramerate;

    /** Latency mode:

     - true: Low latency with unassured quality.
     - false: (Default) High latency with assured quality.
     */
    bool lowLatency;

    /** Video GOP in frames. The default value is 30 fps.
    */
    int videoGop;
    /** Self-defined video codec profile: #VIDEO_CODEC_PROFILE_TYPE
    */
    VIDEO_CODEC_PROFILE_TYPE videoCodecProfile;
    /** RGB hex value.

     Background color of the output video stream for the CDN live broadcast defined as int color = (A & 0xff) << 24 | (R & 0xff) << 16 | (G & 0xff) << 8 | (B & 0xff). Users can set the *backgroundColor* with ARGB ColorInt.

     @note Value only, do not include a #. For example, C0C0C0.
     */
    unsigned int backgroundColor;
    /** The number of users in the live broadcast.
     */
    unsigned int userCount;
    /** TranscodingUser
    */
    TranscodingUser *transcodingUsers;
    /** Reserved property. Extra user-defined information to send SEI for the H.264/H.265 video stream to the CDN live client.
     */
    const char *transcodingExtraInfo;

    /** The metadata sent to the CDN live client defined by the RTMP or FLV metadata.
     */
    const char *metadata;
    /** The watermark image added to the CDN live publishing stream.

    The audience of the CDN live publishing stream can see the watermark image. See RtcImage.
    */
    RtcImage* watermark;
    /** The background image added to the CDN live publishing stream.

    The audience of the CDN live publishing stream can see the background image. See RtcImage.
    */
    RtcImage* backgroundImage;
    /** Self-defined audio-sampling rate: #AUDIO_SAMPLE_RATE_TYPE.
    */
    AUDIO_SAMPLE_RATE_TYPE audioSampleRate;
    /** Bitrate of the CDN live audio output stream. The default value is 48 Kbps, and the highest value is 128.
     */
    int audioBitrate;
    /** Agora's self-defined audio-channel types. Agora recommends choosing option 1 or 2. A special player is required if you choose option 3, 4, or 5:

     - 1: (Default) Mono
     - 2: Two-channel stereo
     - 3: Three-channel stereo
     - 4: Four-channel stereo
     - 5: Five-channel stereo
     */
    int audioChannels;

    LiveTranscoding()
        : width(360)
        , height(640)
        , videoBitrate(400)
        , videoFramerate(15)
        , lowLatency(false)
        , videoGop(30)
        , videoCodecProfile(VIDEO_CODEC_PROFILE_HIGH)
        , backgroundColor(0x000000)
        , userCount(0)
        , transcodingUsers(NULL)
        , transcodingExtraInfo(NULL)
        , metadata(NULL)
        , watermark(NULL)
        , backgroundImage(NULL)
        , audioSampleRate(AUDIO_SAMPLE_RATE_48000)
        , audioBitrate(48)
        , audioChannels(1)
    {}
} LiveTranscoding;



/** Configuration of the imported live broadcast voice or video stream.
 */
struct InjectStreamConfig {
    /** Width of the added stream in the live broadcast. The default value is 0 (same width as the original stream).
     */
    int width;
    /** Height of the added stream in the live broadcast. The default value is 0 (same height as the original stream).
     */
    int height;
    /** Video GOP of the added stream in the live broadcast in frames. The default value is 30 fps.
     */
    int videoGop;
    /** Video frame rate of the added stream in the live broadcast. The default value is 15 fps.
     */
    int videoFramerate;
    /** Video bitrate of the added stream in the live broadcast. The default value is 400 Kbps.

     @note The setting of the video bitrate is closely linked to the resolution. If the video bitrate you set is beyond a reasonable range, the SDK will set it within a reasonable range.
     */
    int videoBitrate;
    /** Audio-sampling rate of the added stream in the live broadcast: #AUDIO_SAMPLE_RATE_TYPE. The default value is 48000 Hz.

     @note Agora recommends setting the default value.
     */
    AUDIO_SAMPLE_RATE_TYPE audioSampleRate;
    /** Audio bitrate of the added stream in the live broadcast. The default value is 48.

     @note Agora recommends setting the default value.
     */
    int audioBitrate;
    /** Audio channels in the live broadcast.

     - 1: (Default) Mono
     - 2: Two-channel stereo

     @note Agora recommends setting the default value.
     */
    int audioChannels;

    // width / height default set to 0 means pull the stream with its original resolution
    InjectStreamConfig()
        : width(0)
        , height(0)
        , videoGop(30)
        , videoFramerate(15)
        , videoBitrate(400)
        , audioSampleRate(AUDIO_SAMPLE_RATE_48000)
        , audioBitrate(48)
        , audioChannels(1)
    {}
};

/**  @deprecated Lifecycle of the CDN live video stream.
*/
enum RTMP_STREAM_LIFE_CYCLE_TYPE
{
  /** Bound to the channel lifecycle. If all hosts leave the channel, the CDN live streaming stops after 30 seconds.
  */
	RTMP_STREAM_LIFE_CYCLE_BIND2CHANNEL = 1,
  /** Bound to the owner of the RTMP stream. If the owner leaves the channel, the CDN live streaming stops immediately.
  */
	RTMP_STREAM_LIFE_CYCLE_BIND2OWNER = 2,
};

/** @deprecated
*/
struct PublisherConfiguration {
  /** Width of the CDN live output video stream. The default value is 360.
  */
	int width;
  /** Height of the CDN live output video stream. The default value is 640.
  */
	int height;
  /** Frame rate of the CDN live output video stream. The default value is 15 fps.
  */
	int framerate;
  /** Bitrate of the CDN live output video stream. The default value is 500 Kbps.
  */
	int bitrate;
  /** Default layout:

   - 0: Tile horizontally
   - 1: Layered windows
   - 2: Tile vertically
   */
	int defaultLayout;
    /** Video stream lifecycle of CDN live: #RTMP_STREAM_LIFE_CYCLE_TYPE.
  */
	int lifecycle;
  /** Whether or not the current user is the owner of the RTMP stream:

   - true: (Default) Yes. The push-stream configuration takes effect.
   - false: No. The push-stream configuration will not work.
   */
	bool owner;
  /** Width of the injected stream. N/A. Set it as 0.
  */
	int injectStreamWidth;
  /** Height of the injected stream. N/A. Set it as 0.
  */
	int injectStreamHeight;
  /** URL address of the injected stream in the channel. N/A.
  */
	const char* injectStreamUrl;
  /** Push-stream URL address for the picture-in-picture layout. The default value is NULL.
  */
	const char* publishUrl;
  /** The push-stream URL address of the original stream not requiring picture-blending. The default value is NULL.
  */
	const char* rawStreamUrl;
  /** Reserved field. The default value is NULL.
  */
	const char* extraInfo;


	PublisherConfiguration()
		: width(640)
		, height(360)
		, framerate(15)
		, bitrate(500)
		, defaultLayout(1)
		, lifecycle(RTMP_STREAM_LIFE_CYCLE_BIND2CHANNEL)
		, owner(true)
		, injectStreamWidth(0)
		, injectStreamHeight(0)
		, injectStreamUrl(NULL)
		, publishUrl(NULL)
		, rawStreamUrl(NULL)
		, extraInfo(NULL)
	{}

};

#if !defined(__ANDROID__)
/** Video display settings of the VideoCanvas class.
*/
struct VideoCanvas
{
  /** Video display window (view).
  */
    view_t view;
    /** Video display mode: #RENDER_MODE_TYPE.
    */
    int renderMode;
    uid_t uid;
    void *priv; // private data (underlying video engine denotes it)

    VideoCanvas()
        : view(NULL)
        , renderMode(RENDER_MODE_HIDDEN)
        , uid(0)
        , priv(NULL)
    {}
    VideoCanvas(view_t v, int m, uid_t u)
        : view(v)
        , renderMode(m)
        , uid(u)
        , priv(NULL)
    {}
};
#else
struct VideoCanvas;
#endif

    /** Definition of IPacketObserver.
     */
class IPacketObserver
{
public:
/** Definition of Packet.
 */
	struct Packet
	{
        /** Buffer address of the sent or received data.
         */
		const unsigned char* buffer;
        /** Buffer size of the sent or received data.
         */
		unsigned int size;
	};
	/** Occurs when an audio packet is sent to other users.

     @param packet See Packet.
     @return
     - true: The packet is sent successfully.
     - false: The packet is discarded.
     */
	virtual bool onSendAudioPacket(Packet& packet) = 0;
	/** Occurs when a video packet is sent to other users.

     @param packet See Packet.
     @return
     - true: The packet is sent successfully.
     - false: The packet is discarded.
     */
	virtual bool onSendVideoPacket(Packet& packet) = 0;
	/** Occurs when an audio packet is sent by other users.

     @param packet See Packet.
     @return
     - true: The packet is received successfully.
     - false: The packet is discarded.
	 */
	virtual bool onReceiveAudioPacket(Packet& packet) = 0;
	/** Occurs when a video packet is sent by other users.

     @param packet See Packet.
     @return
     - true: The packet is received successfully.
     - false: The packet is discarded.
	 */
	virtual bool onReceiveVideoPacket(Packet& packet) = 0;
};


/** The SDK uses the IRtcEngineEventHandler interface class to send callbacks to the application. The application inherits the methods of this interface class to retrieve these callbacks.

 All methods in this interface class have default (empty) implementations. Therefore, the application can only inherit some required events. In the callbacks, avoid time-consuming tasks or calling blocking APIs, such as the SendMessage method, otherwise, the SDK may not work properly.
 */
class IRtcEngineEventHandler
{
public:
    virtual ~IRtcEngineEventHandler() {}

    /** Reports a warning during SDK runtime.

     In most cases, the application can ignore the warning reported by the SDK because the SDK can usually fix the issue and resume running. For example, when losing connection with the server, the SDK may report #WARN_LOOKUP_CHANNEL_TIMEOUT and automatically try to reconnect.

     @param warn Warning code: #WARN_CODE_TYPE.
     @param msg Pointer to the warning message.
     */
    virtual void onWarning(int warn, const char* msg) {
        (void)warn;
        (void)msg;
    }

    /** Reports an error during SDK runtime.

     In most cases, the SDK cannot fix the issue and resume running. The SDK requires the application to take action or informs the user about the issue.

     For example, the SDK reports an #ERR_START_CALL error when failing to initialize a call. The application informs the user that the call initialization failed and invokes the \ref IRtcEngine::leaveChannel "leaveChannel" method to leave the channel.

     @param err Error code: #ERROR_CODE_TYPE.
     @param msg Pointer to the error message.
     */
    virtual void onError(int err, const char* msg) {
        (void)err;
        (void)msg;
    }

    /** Occurs when a user joins a specified channel.

     The channel name assignment is based on *channelName* specified in the \ref IRtcEngine::joinChannel "joinChannel" method.

     If the @p uid is not specified when *joinChannel* is called, the server automatically assigns a @p uid.

     @param channel  Pointer to the channel name.
     @param  uid User ID.
     @param  elapsed Time elapsed (ms) from the user calling \ref IRtcEngine::joinChannel "joinChannel" until the SDK triggers this callback.
     */
    virtual void onJoinChannelSuccess(const char* channel, uid_t uid, int elapsed) {
        (void)channel;
        (void)uid;
        (void)elapsed;
    }

    /** Occurs when a user rejoins the channel after disconnection due to network problems.

    When a user loses connection with the server because of network problems, the SDK automatically tries to reconnect and triggers this callback upon reconnection.

     @param channel Pointer to the channel name.
     @param uid User ID.
     @param elapsed Time elapsed (ms) from starting to reconnect until the SDK triggers this callback.
     */
    virtual void onRejoinChannelSuccess(const char* channel, uid_t uid, int elapsed) {
        (void)channel;
        (void)uid;
        (void)elapsed;
    }

    /** Occurs when a user leaves the channel.

     When the application calls the \ref IRtcEngine::leaveChannel "leaveChannel" method, this callback notifies the application that the user leaves the channel.

     With this callback, the application retrieves information, such as the call duration and statistics.

     @param stats Pointer to the statistics of the call: RtcStats.
     */
    virtual void onLeaveChannel(const RtcStats& stats) {
        (void)stats;
    }

    /** Occurs when the user role switches in a live broadcast. For example, from a host to an audience or vice versa.

     @param oldRole Role that the user switches from: #CLIENT_ROLE_TYPE.
     @param newRole Role that the user switches to: #CLIENT_ROLE_TYPE.
     */
    virtual void onClientRoleChanged(CLIENT_ROLE_TYPE oldRole, CLIENT_ROLE_TYPE newRole) {
    }

    /** Occurs when a user or host joins the channel.

     - Communication profile: This callback notifies the application that another user joins the channel. If other users are already in the channel, the SDK also reports to the application on the existing users.
     - Live-broadcast profile: This callback notifies the application that the host joins the channel. If other hosts are already in the channel, the SDK also reports to the application on the existing hosts. Agora recommends limiting the number of hosts to 17.

     @note In the live broadcast profile:
     - The host receives this callback when another host joins the channel.
     - The audience in the channel receives this callback when a new host joins the channel.
     - When a web application joins the channel, the SDK triggers this callback as long as the web application publishes streams.

     @param uid ID of the user or host who joins the channel.
     @param elapsed Time delay (ms) from the user calling \ref IRtcEngine::joinChannel "joinChannel" or \ref IRtcEngine::setClientRole "setClientRole" (host) until the SDK triggers this callback.
     */
    virtual void onUserJoined(uid_t uid, int elapsed) {
        (void)uid;
        (void)elapsed;
    }

    /** Occurs when a remote user (Communication)/host (Live Broadcast) leaves the channel.

    There are two reasons for users to be offline:

    - Leave the channel: When the user/host leaves the channel, the user/host sends a goodbye message. When the message is received, the SDK assumes that the user/host leaves the channel.
    - Drop offline: When no data packet of the user or host is received for a certain period of time (20 seconds for the communication profile, and more for the live broadcast profile), the SDK assumes that the user/host drops offline. Unreliable network connections may lead to false detections, so Agora recommends using a signaling system for more reliable offline detection.

     @param uid ID of the user who leaves the channel or goes offline.
     @param reason Reason why the user goes offline: #USER_OFFLINE_REASON_TYPE.
     */
    virtual void onUserOffline(uid_t uid, USER_OFFLINE_REASON_TYPE reason) {
        (void)uid;
        (void)reason;
    }

    /** Reports the last mile network quality of the local user once every two seconds before the user joins the channel.

     Last mile refers to the connection between the local device and Agora's edge server. After the application calls the \ref IRtcEngine::enableLastmileTest "enableLastmileTest" method, this callback reports once every two seconds the uplink and downlink last mile network conditions of the local user before the user joins the channel.

     @param quality Network quality: #QUALITY_TYPE.
     */
    virtual void onLastmileQuality(int quality) {
        (void)quality;
    }

    /** @deprecated Occurs when the connection between the SDK and the server is interrupted.

     Deprecated as of v2.3.2. Replaced by \ref agora::rtc::IRtcEngineEventHandler::onConnectionStateChanged "onConnectionStateChanged(CONNECTION_STATE_RECONNECTING, CONNECTION_CHANGED_INTERRUPTED)".

     This callback is triggered when the SDK loses connection with the server for more than four seconds after the connection is established.

     After triggering this callback, the SDK tries reconnecting to the server. You can use this callback to implement pop-up reminders.

     This callback is different from \ref agora::rtc::IRtcEngineEventHandler::onConnectionLost "onConnectionLost":
     - The \ref agora::rtc::IRtcEngineEventHandler::onConnectionInterrupted "onConnectionInterrupted" callback is triggered when the SDK loses connection with the server for more than four seconds after the SDK successfully joins the channel.
     - The \ref agora::rtc::IRtcEngineEventHandler::onConnectionLost "onConnectionLost" callback is triggered when the SDK loses connection with the server for more than 10 seconds, regardless of whether the SDK joins the channel or not.

    For both callbacks, the SDK tries to reconnect to the server until the application calls \ref IRtcEngine::leaveChannel "leaveChannel".

    */
    virtual void onConnectionInterrupted() {}

    /** Occurs when the SDK cannot reconnect to Agora's edge server 10 seconds after its connection to the server is interrupted.

    This callback is triggered when the SDK cannot connect to the server 10 seconds after calling \ref IRtcEngine::joinChannel "joinChannel", regardless of whether the SDK is in the channel or not.

    This callback is different from \ref agora::rtc::IRtcEngineEventHandler::onConnectionInterrupted "onConnectionInterrupted":

    - The \ref agora::rtc::IRtcEngineEventHandler::onConnectionInterrupted "onConnectionInterrupted" callback is triggered when the SDK loses connection with the server for more than four seconds after the SDK successfully joins the channel.
    - The \ref agora::rtc::IRtcEngineEventHandler::onConnectionLost "onConnectionLost" callback is triggered when the SDK loses connection with the server for more than 10 seconds, regardless of whether the SDK joins the channel or not.

    For both callbacks, the SDK tries to reconnect to the server until the application calls \ref IRtcEngine::leaveChannel "leaveChannel".

     */
    virtual void onConnectionLost() {}

    /** @deprecated Deprecated as of v2.3.2. Replaced by \ref agora::rtc::IRtcEngineEventHandler::onConnectionStateChanged "onConnectionStateChanged(CONNECTION_STATE_FAILED, CONNECTION_CHANGED_BANNED_BY_SERVER)".

    Occurs when your connection is banned by the Agora Server.
     */
    virtual void onConnectionBanned() {}

    /** Occurs when a method is executed by the SDK.

     @param err The error code (#ERROR_CODE_TYPE) returned by the SDK when the method fails. If the SDK returns 0, then the SDK is called successfully.
     @param api Pointer to the method executed by the SDK.
     @param result Pointer to the result of the method call.
     */
    virtual void onApiCallExecuted(int err, const char* api, const char* result) {
        (void)err;
        (void)api;
        (void)result;
    }

    /** Occurs when the token expires.

     After a token is specified by calling the \ref IRtcEngine::joinChannel "joinChannel" method, if the SDK losses connection with the Agora server due to network issues, the token may expire after a certain period of time and a new token may be required to reconnect to the server.

     This callback notifies the application to generate a new token. Call \ref IRtcEngine::renewToken "renewToken" to renew the token.

     In previous SDKs, this notification was provided in the \ref IRtcEngineEventHandler::onError "onError" callback as the #ERR_TOKEN_EXPIRED and #ERR_INVALID_TOKEN errors. Starting from the Agora SDK v1.7.3, the old method is still valid, but it is recommended to use the *onRequestToken* callback.
     */
    virtual void onRequestToken() {
    }

    /** Occurs when the token expires in 30 seconds.

     The user becomes offline if the token used in \ref IRtcEngine::joinChannel "joinChannel" expires. This callback is triggered 30 seconds before the token expires to remind the application to get a new token. Upon receiving this callback, generate a new token on the server and call \ref IRtcEngine::renewToken "renewToken" to pass the new token to the SDK.

     @param token Pointer to the token that expires in 30 seconds.
     */
    virtual void onTokenPrivilegeWillExpire(const char* token) {
        (void)token;
    }

    /** @deprecated Reports the audio quality of the remote user.

    Deprecated as of v2.3.2. Use \ref agora::rtc::IRtcEngineEventHandler::onRemoteAudioStats "onRemoteAudioStats" instead.

     Triggered once every two seconds, this callback reports the audio quality of each remote user/host sending the audio stream. If a channel has multiple users/hosts sending audio streams, then this callback will be triggered as many times.

     @param uid User ID of the speaker.
     @param quality Audio quality of the user: #QUALITY_TYPE
     @param delay Time delay (ms) of the audio packet from the sender to the receiver, including the time delay from audio sampling pre-processing, transmission, and the jitter buffer.
     @param lost Packet loss rate (%) of the audio packet sent from the sender to the receiver.
     */
    virtual void onAudioQuality(uid_t uid, int quality, unsigned short delay, unsigned short lost) {
        (void)uid;
        (void)quality;
        (void)delay;
        (void)lost;
    }

    /** Reports the statistics of the current call session once every two seconds.

     @param stats Pointer to the RTC engine statistics: RtcStats.
     */
    virtual void onRtcStats(const RtcStats& stats) {
        (void)stats;
    }

    /** Reports the last mile network quality of each user in the channel once every two seconds.

     Last mile refers to the connection between the local device and Agora's edge server. This callback reports once every two seconds the uplink last mile network conditions of each user in the channel. If a channel includes multiple users, then this callback will be triggered as many times.

     @param uid User ID. The network quality of the user with this @p uid is reported. If @p uid is 0, the local network quality is reported.
     @param txQuality Uplink transmission quality rating of the user in terms of the transmission bitrate, packet loss rate, average RTT (Round-Trip Time), and jitter of the uplink network. @p txQuality is a quality rating helping you understand how well the current uplink network conditions can support the selected VideoEncoderConfiguration. For example, a 1000 Kbps uplink network may be adequate for video frames with a resolution of 640 &times; 480 and a frame rate of 15 fps in the Live Broadcast profile, but may be inadequate for resolutions higher than 1280 &times; 720. See #QUALITY_TYPE.
     @param rxQuality Downlink network quality rating of the user in terms of the packet loss rate, average RTT, and jitter of the downlink network. See #QUALITY_TYPE.
     */
    virtual void onNetworkQuality(uid_t uid, int txQuality, int rxQuality) {
    (void)uid;
    (void)txQuality;
    (void)rxQuality;
    }

    /** Reports the statistics of the uploading local video streams once every two seconds.

     @param stats Pointer to the statistics of the uploading local video streams: LocalVideoStats
     */
  virtual void onLocalVideoStats(const LocalVideoStats& stats) {
    (void)stats;
    }

    /** Reports the statistics of the remote video streams from each user/host.

     This callback is triggered once every two seconds for each user/host. If a channel includes multiple users, then this callback will be triggered as many times.

     The statistics that this callback reports are more closely linked to the real user experience of the video transmission quality than the statistics that the \ref agora::rtc::IRtcEngineEventHandler::onRemoteVideoTransportStats "onRemoteVideoTransportStats" callback reports.

     Schemes such as FEC (Forward Error Correction) or retransmission can keep the frame loss rate at the lowest level even when the packet loss rate is high.

     @param stats Pointer to the statistics of the received remote video streams. See: RemoteVideoStats.
     */
    virtual void onRemoteVideoStats(const RemoteVideoStats& stats) {
      (void)stats;
      }

    /** Reports the statistics of the remote audio streams from each user/host.

     This callback replaces the \ref agora::rtc::IRtcEngineEventHandler::onAudioQuality "onAudioQuality" callback.

     This callback is triggered once every two seconds for each user/host. If a channel includes multiple users, then this callback will be triggered as many times.

     The statistics that this callback reports are more closely linked to the real user experience of the audio transmission quality than the statistics that the \ref agora::rtc::IRtcEngineEventHandler::onRemoteAudioTransportStats "onRemoteAudioTransportStats" callback reports. This callback reports more about media layer statistics such as the frame loss rate, while the \ref agora::rtc::IRtcEngineEventHandler::onRemoteAudioTransportStats "onRemoteAudioTransportStats" callback reports more about the transport layer statistics such as the packet loss rate.

     Schemes such as FEC (Forward Error Correction) or retransmission can keep the frame loss rate at the lowest level even when the packet loss rate is high.

     @param stats Pointer to the statistics of the received remote audio streams. See: RemoteAudioStats.
     */
    virtual void onRemoteAudioStats(const RemoteAudioStats& stats) {
        (void)stats;
    }

    /** Reports which users are speaking and the speakers' volume.

     This callback reports the ID and volume of the loudest speakers at the moment in the channel.

     This callback is disabled by default and can be enabled by the \ref RtcEngineParameters::enableAudioVolumeIndication "enableAudioVolumeIndication" method.
     
     The local user has a dedicated *onAudioVolumeIndication* callback; all remote speakers share a separate *onAudioVolumeIndication* callback.
     - For the local user's callback, the @p speakers array has @p uid = 0 and @p volume = @p totalVolume, and @p speakerNumber = 1 regardless of whether the local user speaks or not.
     - For the remote speakers' callback, the @p speakers array includes the user ID and volume of the loudest speakers in the channel.

     @note
     - Calling the \ref agora::rtc::RtcEngineParameters::muteLocalAudioStream "muteLocalAudioStream" method affects the SDK's behavior:
        - If the local user calls the \ref agora::rtc::RtcEngineParameters::muteLocalAudioStream "muteLocalAudioStream" method, the SDK stops triggering the local user's callback.
        - 15 seconds after a remote speaker calls the *muteLocalAudioStream* method, the remote speakers' callback excludes this remote user's information; 15 seconds after all remote users call the *muteLocalAudioStream* method, the SDK stops triggering the remote speakers' callback.
     - An empty @p speakers array in the *onAudioVolumeIndication* callback suggests that no remote user is speaking at the moment.

     @param speakers A pointer to the array that contains the user ID and volume information for each speaker: AudioVolumeInfo.
     @param speakerNumber Total number of speakers.
     @param totalVolume Total volume after audio mixing. The value ranges between 0 (lowest volume) and 255 (highest volume).
     */
    virtual void onAudioVolumeIndication(const AudioVolumeInfo* speakers, unsigned int speakerNumber, int totalVolume) {
        (void)speakers;
        (void)speakerNumber;
        (void)totalVolume;
    }

    /** Reports which user is the loudest speaker.

    If the user enables the audio volume indication by calling \ref RtcEngineParameters::enableAudioVolumeIndication "enableAudioVolumeIndication", this callback returns the uid of the active speaker detected by the audio volume detection module of the SDK.

    @note
    - To receive this callback, you need to call \ref RtcEngineParameters::enableAudioVolumeIndication "enableAudioVolumeIndication".
    - This callback returns the user ID of the user with the highest voice volume during a period of time, instead of at the moment.

    @param uid User ID of the active speaker. A @p uid of 0 represents the local user.
    */
    virtual void onActiveSpeaker(uid_t uid) {
        (void)uid;
    }

    /** Occurs when the video stops playing.

     The application can use this callback to change the configuration of the view (for example, displaying other pictures in the view) after the video stops playing.
     */
    virtual void onVideoStopped() {}

    /** Occurs when the engine receives and renders the first local video frame on the video window.

    @param width Width (pixels) of the first local video frame.
    @param height Height (pixels) of the first local video frame.
    @param elapsed Time elapsed (ms) from the local user calling \ref IRtcEngine::joinChannel "joinChannel" until the SDK triggers this callback.
    If \ref IRtcEngine::startPreview "startPreview" is called before *joinChannel*, then @p elapsed is the time elapsed from *startPreview* until the SDK triggers this callback.
    */
    virtual void onFirstLocalVideoFrame(int width, int height, int elapsed) {
        (void)width;
        (void)height;
        (void)elapsed;
    }

    /** Occurs when the engine receives and decodes the first video frame from a specific remote user.

    The application can configure the user view settings in this callback.

    @param uid User ID of the remote user sending the video stream.
    @param width Width (pixels) of the video stream.
    @param height Height (pixels) of the video stream.
    @param elapsed Time elapsed (ms) from the remote user calling \ref IRtcEngine::joinChannel "joinChannel" until the SDK triggers this callback.
    */
    virtual void onFirstRemoteVideoDecoded(uid_t uid, int width, int height, int elapsed) {
        (void)uid;
        (void)width;
        (void)height;
        (void)elapsed;
    }

    /** Occurs when the first remote video frame is rendered.

    This callback is triggered when the first frame of the remote video is displayed in the user’s video window. The application can retrieve the time elapsed from a user joining the channel until the first video frame is displayed.

    @param uid User ID of the remote user sending the video stream.
    @param width Width (pixels) of the video frame.
    @param height Height (pixels) of the video stream.
    @param elapsed Time elapsed (ms) from the remote user calling \ref IRtcEngine::joinChannel "joinChannel" until the SDK triggers this callback.
    */
    virtual void onFirstRemoteVideoFrame(uid_t uid, int width, int height, int elapsed) {
        (void)uid;
        (void)width;
        (void)height;
        (void)elapsed;
    }

    /** Occurs when a remote user's audio stream is muted/unmuted.

     @note This callback returns invalid when the number of users in a channel exceeds 20.

     @param uid ID of the remote user.
     @param muted Whether the remote user's audio stream is muted/unmuted:
     - true: Muted.
     - false: Unmuted.
     */
    virtual void onUserMuteAudio(uid_t uid, bool muted) {
        (void)uid;
        (void)muted;
    }

    /** Occurs when a remote user's video stream playback pauses/resumes.

     @note This callback returns invalid when the number of users in a channel exceeds 20.

     @param uid User ID of the remote user.
     @param muted Whether the remote user's video stream playback is paused/resumed:
     - true: Paused.
     - false: Resumed.
     */
    virtual void onUserMuteVideo(uid_t uid, bool muted) {
        (void)uid;
        (void)muted;
    }


    	/** Occurs when a specific remote user enables/disables the video module.

         Once the video module is disabled, the remote user can only use a voice call. The remote user cannot send or receive any video from other users.

         @note This callback returns invalid when the number of users in a channel exceeds 20.

         @param uid User ID of the remote user.
         @param enabled Whether the remote user enables/disables the video module:
         - true: Enable. The remote user can enter a video session.
         - false: Disable. The remote user can only enter a voice session, and cannot send or receive any video stream.
         */
    	virtual void onUserEnableVideo(uid_t uid, bool enabled) {
    		(void)uid;
    		(void)enabled;
    	}

    /** Occurs when the audio device state changes.

     This callback notifies the application that the system’s audio device state is changed. For example, a headset is unplugged from the device.

     @param deviceId Pointer to the device ID.
     @param deviceType Device type: #MEDIA_DEVICE_TYPE.
     @param deviceState Device state: #MEDIA_DEVICE_STATE_TYPE.
     */
    virtual void onAudioDeviceStateChanged(const char* deviceId, int deviceType, int deviceState) {
        (void)deviceId;
        (void)deviceType;
        (void)deviceState;
    }

    /** Occurs when the volume of the playback device, microphone, or application changes.

     @param deviceType Device type: #MEDIA_DEVICE_TYPE.
     @param volume Volume of the device. The value ranges between 0 and 255.
     @param muted
     - true: The audio device is muted.
     - false: The audio device is not muted.
     */
    virtual void onAudioDeviceVolumeChanged(MEDIA_DEVICE_TYPE deviceType, int volume, bool muted) {
        (void)deviceType;
        (void)volume;
        (void)muted;
    }

    /** Occurs when the camera turns on and is ready to capture the video.

     If the camera fails to turn on, fix the error reported in the \ref IRtcEngineEventHandler::onError "onError" callback.
     */
    virtual void onCameraReady() {}

    /** Occurs when the camera focus area changes.

     @param x x coordinate of the changed camera focus area.
     @param y y coordinate of the changed camera focus area.
     @param width Width of the changed camera focus area.
     @param height Height of the changed camera focus area.
     */
    virtual void onCameraFocusAreaChanged(int x, int y, int width, int height) {
        (void)x;
        (void)y;
        (void)width;
        (void)height;
    }

    /** Occurs when the camera exposure area changes.

     @param x x coordinate of the changed camera exposure area.
     @param y y coordinate of the changed camera exposure area.
     @param width Width of the changed camera exposure area.
     @param height Height of the changed camera exposure area.
     */
    virtual void onCameraExposureAreaChanged(int x, int y, int width, int height) {
        (void)x;
        (void)y;
        (void)width;
        (void)height;
    }

    /** Occurs when the audio mixing file playback finishes.

     You can start an audio mixing file playback by calling the \ref RtcEngineParameters::startAudioMixing "startAudioMixing" method. This callback is triggered when the audio mixing file playback finishes.

     If the *startAudioMixing* method call fails, an error code returns in the \ref IRtcEngineEventHandler::onError "onError" callback.

     */
    virtual void onAudioMixingFinished() {
    }

    /** Occurs when a remote user starts audio mixing.

     When a remote user calls \ref RtcEngineParameters::startAudioMixing "startAudioMixing" to play the background music, the SDK reports this callback.
     */
    virtual void onRemoteAudioMixingBegin() {
    }
    /** Occurs when a remote user finishes audio mixing.
     */
    virtual void onRemoteAudioMixingEnd() {
    }

    /** Occurs when the local audio effect playback finishes.

    You can start a local audio effect file playback by calling the \ref RtcEngineParameters::playEffect "playEffect" method. This callback is triggered when the local audio effect file playback finishes.

     @param soundId ID of the local audio effect. Each local audio effect has a unique ID.
     */
    virtual void onAudioEffectFinished(int soundId) {
    }

    /** Occurs when the video device state changes.

     @note On a Windows device with an external camera for video capturing, the video disables once the external camera is unplugged.

     @param deviceId Pointer to the device ID of the video device that changes state.
     @param deviceType Device type: #MEDIA_DEVICE_TYPE.
     @param deviceState Device state: #MEDIA_DEVICE_STATE_TYPE.
     */
    virtual void onVideoDeviceStateChanged(const char* deviceId, int deviceType, int deviceState) {
        (void)deviceId;
        (void)deviceType;
        (void)deviceState;
    }

    /** Occurs when the video size or rotation of a specified user changes.

     @param uid User ID of the remote user or local user (0) whose video size or rotation changes.
     @param width New width (pixels) of the video.
     @param height New height (pixels) of the video.
     @param rotation New rotation of the video [0 to 360).
     */
    virtual void onVideoSizeChanged(uid_t uid, int width, int height, int rotation) {
        (void)uid;
        (void)width;
        (void)height;
        (void)rotation;
    }
    /** Occurs when the remote video state changes.

     @note This callback is triggered when the time interval between two video frames &ge; 600 ms.

     @param uid ID of the user whose video state changes.
     @param state State of the remote video: Playing normally or frozen. See #REMOTE_VIDEO_STATE.
     */
    virtual void onRemoteVideoStateChanged(uid_t uid, REMOTE_VIDEO_STATE state) {
        (void)uid;
        (void)state;
    }

	/** Occurs when a specified remote user enables/disables the local video capturing function.

     This callback is only applicable to the scenario when the user only wants to watch the remote video without sending any video stream to the other user.

     @param uid User ID of the remote user.
     @param enabled Whether the specified remote user enables/disables the local video capturing function:
     - true: Enable. Other users in the channel can see the video of this remote user.
     - false: Disable. Other users in the channel can no longer receive the video stream from this remote user, while this remote user can still receive the video streams from other users.
     */
    virtual void onUserEnableLocalVideo(uid_t uid, bool enabled) {
        (void)uid;
        (void)enabled;
    }

//    virtual void onStreamError(int streamId, int code, int parameter, const char* message, size_t length) {}
    /** Occurs when the local user receives the data stream from the remote user within five seconds.

    @param uid User ID of the remote user sending the message.
    @param streamId Stream ID.
    @param data Pointer to the data received by the local user.
    @param length Length of the data in bytes.
    */
    virtual void onStreamMessage(uid_t uid, int streamId, const char* data, size_t length) {
        (void)uid;
        (void)streamId;
        (void)data;
        (void)length;
    }

	/** Occurs when the local user does not receive the data stream from the remote user within five seconds.

     @param uid User ID of the remote user sending the message.
     @param streamId Stream ID.
     @param code Error code: #ERROR_CODE_TYPE.
     @param missed Number of lost messages.
     @param cached Number of incoming cached messages when the data stream is interrupted.
     */
	virtual void onStreamMessageError(uid_t uid, int streamId, int code, int missed, int cached) {
        (void)uid;
        (void)streamId;
        (void)code;
        (void)missed;
        (void)cached;
    }

    /** Occurs when the media engine loads.*/
    virtual void onMediaEngineLoadSuccess() {
    }
    /** Occurs when the media engine call starts.*/
    virtual void onMediaEngineStartCallSuccess() {
    }

    /** Occurs when the engine sends the first local audio frame.

    @param elapsed Time elapsed (ms) from the local user calling \ref IRtcEngine::joinChannel "joinChannel" until the SDK triggers this callback.
    */
    virtual void onFirstLocalAudioFrame(int elapsed) {
        (void)elapsed;
    }

    /** Occurs when the engine receives the first audio frame from a specific remote user.

    @param uid User ID of the remote user.
    @param elapsed Time elapsed (ms) from the remote user calling \ref IRtcEngine::joinChannel "joinChannel" until the SDK triggers this callback.
    */
    virtual void onFirstRemoteAudioFrame(uid_t uid, int elapsed) {
        (void)uid;
        (void)elapsed;
    }

    /** Occurs when a stream is published. (CDN live only.)

     @param url Pointer to the HTTP/HTTPS URL address, to which the publisher publishes the stream.
     @param error Error code: #ERROR_CODE_TYPE. Main errors include:
     - #ERR_OK (0): The publishing succeeds.
     - #ERR_FAILED (1): The publishing fails.
     - #ERR_INVALID_ARGUMENT (2): Invalid argument used. If, for example, you did not call \ref agora::rtc::IRtcEngine::setLiveTranscoding "setLiveTranscoding" to configure LiveTranscoding before calling \ref agora::rtc::IRtcEngine::addPublishStreamUrl "addPublishStreamUrl", the SDK reports #ERR_INVALID_ARGUMENT.
     - #ERR_TIMEDOUT (10): The publishing timed out.
     - #ERR_ALREADY_IN_USE (19): The chosen HTTP/HTTPS URL address is already in use for CDN live streaming.
     - #ERR_ABORTED (20): The SDK is disconnected from the CDN streaming server, and the CDN live streaming stopped.
     - #ERR_RESOURCE_LIMITED (22): The backend system does not have enough resources for the CDN live streaming.
     - #ERR_ENCRYPTED_STREAM_NOT_ALLOWED_PUBLISH (130): You cannot publish an encrypted stream.
     */
    virtual void onStreamPublished(const char *url, int error) {
        (void)url;
        (void)error;
    }
    /** Occurs when a stream is unpublished. (CDN live only.)

     This callback notifies the host that the CDN live stream is unpublished.

     @param url Pointer to the HTTP/HTTPS URL address, from which the publisher unpublishes the stream.
     */
    virtual void onStreamUnpublished(const char *url) {
        (void)url;
    }
/** Occurs when the publisher's transcoding is updated. */
    virtual void onTranscodingUpdated() {
    }
   /** Occurs when a voice or video stream HTTP/HTTPS URL address is added to a live broadcast.

    @param url Pointer to the URL address of the externally injected stream.
    @param uid User ID.
    @param status State of the externally injected stream: #INJECT_STREAM_STATUS.
    */
    virtual void onStreamInjectedStatus(const char* url, uid_t uid, int status) {
        (void)url;
        (void)uid;
        (void)status;
    }

   /** Occurs when the locally published media stream falls back to an audio-only stream due to poor network conditions or switches back to the video after the network conditions improve.

    If you call \ref RtcEngineParameters::setLocalPublishFallbackOption "setLocalPublishFallbackOption" and set *option* as #STREAM_FALLBACK_OPTION_AUDIO_ONLY, the SDK triggers this callback when the locally published stream falls back to audio-only mode due to poor uplink conditions, or when the audio stream switches back to the video after the uplink network condition improves.

    @param isFallbackOrRecover Whether the locally published stream falls back to audio-only or switches back to the video:
    - true: The locally published stream falls back to audio-only due to poor network conditions.
    - false: The locally published stream switches back to the video after the network conditions improve.
    */
    virtual void onLocalPublishFallbackToAudioOnly(bool isFallbackOrRecover) {
        (void)isFallbackOrRecover;
    }

    /** Occurs when the remotely subscribed media stream falls back to audio-only due to poor network conditions or switches back to the video after the network conditions improve.

    If you call \ref RtcEngineParameters::setRemoteSubscribeFallbackOption "setRemoteSubscribeFallbackOption" and set @p option as #STREAM_FALLBACK_OPTION_AUDIO_ONLY, the SDK triggers this callback when the remotely subscribed media stream falls back to audio-only mode due to poor uplink conditions, or when the remotely subscribed media stream switches back to the video after the uplink network condition improves.

     @note Once the remotely subscribed media stream switches to the low stream due to poor network conditions, you can monitor the stream switch between a high and low stream in the RemoteVideoStats callback.

     @param uid    ID of the remote user sending the stream.
     @param  isFallbackOrRecover Whether the remotely subscribed media stream falls back to audio-only or switches back to the video:
     - true: The remotely subscribed media stream falls back to audio-only due to poor network conditions.
     - false: The remotely subscribed media stream switches back to the video stream after the network conditions improved.
     */
    virtual void onRemoteSubscribeFallbackToAudioOnly(uid_t uid, bool isFallbackOrRecover) {
        (void)uid;
        (void)isFallbackOrRecover;
    }

    /** Reports the statistics of the remote audio transmission.

     This callback reports the transport layer statistics such as the packet loss rate and network time delay once every two seconds after the local user receives the audio packet from a remote user.

     @param uid  User ID of the remote user sending the audio packet.
     @param delay Network time delay (ms) from the remote user sending the audio packet to the local user.
     @param lost Packet loss rate (%) of the audio packet sent from the remote user.
     @param rxKBitRate  Received bitrate (Kbps) of the audio packet sent from the remote user.
     */
    virtual void onRemoteAudioTransportStats(
        uid_t uid, unsigned short delay, unsigned short lost,
        unsigned short rxKBitRate) {
        (void)uid;
        (void)delay;
        (void)lost;
        (void)rxKBitRate;
    }

    /** Reports the statistics of the remote video transmission.

     This callback reports the transport layer statistics such as the packet loss rate and network time delay once every two seconds after the local user receives the video packet from a remote user.

     @param uid User ID of the remote user sending the video packet.
     @param delay Network time delay (ms) from the remote user sending the video packet to the local user.
     @param lost Packet loss rate (%) of the video packet sent from the remote user.
     @param rxKBitRate Received bitrate (Kbps) of the video packet sent from the remote user.
     */
    virtual void onRemoteVideoTransportStats(
        uid_t uid, unsigned short delay, unsigned short lost,
        unsigned short rxKBitRate) {
        (void)uid;
        (void)delay;
        (void)lost;
        (void)rxKBitRate;
    }

    /** Occurs when the microphone is enabled/disabled.

     @param enabled Whether the microphone is enabled/disabled:
     - true: Enabled.
     - false: Disabled.
    */
    virtual void onMicrophoneEnabled(bool enabled) {
        (void)enabled;
    }
    /** Occurs when the connection state of the SDK to the server is changed.

     @param state See #CONNECTION_STATE_TYPE.
     @param reason See #CONNECTION_CHANGED_REASON_TYPE.
     */
    virtual void onConnectionStateChanged(
        CONNECTION_STATE_TYPE state, CONNECTION_CHANGED_REASON_TYPE reason) {
      (void)state;
      (void)reason;
    }
};

/**
* Video device collection methods.

 The IVideoDeviceCollection interface class retrieves the video device information.
*/
class IVideoDeviceCollection
{
protected:
    virtual ~IVideoDeviceCollection(){}
public:
    /** Retrieves the total number of the indexed video devices in the system.

    @return Total number of the indexed video devices:
    */
    virtual int getCount() = 0;

    /** Retrieves a specified piece of information about an indexed video device.

     @param index The specified index of the video device that must be less than the return value of \ref IVideoDeviceCollection::getCount "getCount".
     @param deviceName Pointer to the video device name.
     @param deviceId Pointer to the video device ID.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getDevice(int index, char deviceName[MAX_DEVICE_ID_LENGTH], char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Sets the device with the device ID.

     @param deviceId Device ID of the device.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setDevice(const char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Releases all IVideoDeviceCollection resources.
    */
    virtual void release() = 0;
};

/** Video device management methods.

 The IVideoDeviceManager interface class tests the video device interfaces. Instantiate an AVideoDeviceManager class to retrieve an IVideoDeviceManager interface.
*/
class IVideoDeviceManager
{
protected:
    virtual ~IVideoDeviceManager(){}
public:

    /** Enumerates the video devices.

     This method returns an IVideoDeviceCollection object including all video devices in the system. With the IVideoDeviceCollection object, the application can enumerate the video devices. The application must call the \ref IVideoDeviceCollection::release "release" method to release the returned object after using it.

     @return
     - An IVideoDeviceCollection object including all video devices in the system: Success.
     - NULL: Failure.
     */
    virtual IVideoDeviceCollection* enumerateVideoDevices() = 0;

    /** Starts the video-capture device test.

     This method tests whether the video-capture device works properly. Before calling this method, ensure that you have already called the \ref IRtcEngine::enableVideo "enableVideo" method, and the window handle (*hwnd*) parameter is valid.

     @param hwnd The window handle used to display the screen.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int startDeviceTest(view_t hwnd) = 0;

    /** Stops the video-capture device test.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int stopDeviceTest() = 0;

    /** Sets a device with the device ID.

     @param deviceId Pointer to the video-capture device ID. Call the \ref IVideoDeviceManager::enumerateVideoDevices "enumerateVideoDevices" method to retrieve it.

     @note Plugging or unplugging the device does not change the device ID.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setDevice(const char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Retrieves the video-capture device that is in use.

     @param deviceId Pointer to the video-capture device ID.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getDevice(char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Releases all IVideoDeviceCollection resources.
    */
    virtual void release() = 0;
};

/** Audio device collection methods.

The IAudioDeviceCollection interface class retrieves device-related information.
*/
class IAudioDeviceCollection
{
protected:
    virtual ~IAudioDeviceCollection(){}
public:

    /** Retrieves the total number of audio playback or audio recording devices.

     @note You must first call the \ref IAudioDeviceManager::enumeratePlaybackDevices "enumeratePlaybackDevices" or \ref IAudioDeviceManager::enumerateRecordingDevices "enumerateRecordingDevices" method before calling this method to return the number of  audio playback or audio recording devices.

     @return Number of audio playback or audio recording devices.
     */
    virtual int getCount() = 0;

    /** Retrieves a specified piece of information about an indexed audio device.

     @param index The specified index that must be less than the return value of \ref IAudioDeviceCollection::getCount "getCount".
     @param deviceName Pointer to the audio device name.
     @param deviceId Pointer to the audio device ID.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getDevice(int index, char deviceName[MAX_DEVICE_ID_LENGTH], char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Specifies a device with the device ID.

     @param deviceId Pointer to the device ID of the device.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setDevice(const char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Sets the volume of the application.

    @param volume Application volume. The value ranges between 0 (lowest volume) and 255 (highest volume).
    @return
    - 0: Success.
    - < 0: Failure.
    */
    virtual int setApplicationVolume(int volume) = 0;

    /** Retrieves the volume of the application.

     @param volume Pointer to the application volume. The volume value ranges between 0 (lowest volume) and 255 (highest volume).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getApplicationVolume(int& volume) = 0;

    /** Mutes the application.

     @param mute Sets whether to mute/unmute the application:
     - true: Mute the application.
     - false: Unmute the application.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setApplicationMute(bool mute) = 0;
    /** Retrieves the mute status of the application.

     @param mute Pointer to whether the application is muted/unmuted.
     - true: The application is muted.
     - false: The application is not muted.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int isApplicationMute(bool& mute) = 0;
    /**
    * Releases all IAudioDeviceCollection resources.
    */
    virtual void release() = 0;
};
/** Audio device management methods.

 The IAudioDeviceManager interface class allows for audio device interface testing. Instantiate an AAudioDeviceManager class to retrieve the IAudioDeviceManager interface.
*/
class IAudioDeviceManager
{
protected:
    virtual ~IAudioDeviceManager(){}
public:

    /** Enumerates the audio playback devices.

     This method returns an IAudioDeviceCollection object that includes all audio playback devices in the system. With the IAudioDeviceCollection object, the application can enumerate the audio playback devices.

     @note The application must call the \ref IAudioDeviceCollection::release "release" method to release the returned object after using it.

     @return
     - Returns an IAudioDeviceCollection object that includes all audio playback devices in the system: Success.
     - Returns NULL: Failure.
     */
    virtual IAudioDeviceCollection* enumeratePlaybackDevices() = 0;

    /** Enumerates the audio recording devices.

     This method returns an IAudioDeviceCollection object that includes all audio recording devices in the system. With the IAudioDeviceCollection object, the application can enumerate the audio recording devices.

     @note The application needs to call the \ref IAudioDeviceCollection::release "release" method to release the returned object after using it.

     @return
     - Returns an IAudioDeviceCollection object that includes all audio recording devices in the system: Success.
     - Returns NULL: Failure.
     */
    virtual IAudioDeviceCollection* enumerateRecordingDevices() = 0;

    /** Sets the audio playback device using the device ID.

     @note Plugging or unplugging the audio device does not change the device ID.

     @param deviceId Device ID of the audio playback device, retrieved by calling the \ref IAudioDeviceManager::enumeratePlaybackDevices "enumeratePlaybackDevices" method.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setPlaybackDevice(const char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Sets the audio recording device using the device ID.

     @param deviceId Device ID of the audio recording device, retrieved by calling the \ref IAudioDeviceManager::enumerateRecordingDevices "enumerateRecordingDevices" method.

     @note Plugging or unplugging the audio device does not change the device ID.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setRecordingDevice(const char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Starts the audio playback device test.

     This method tests if the playback device works properly. In the test, the SDK plays an audio file specified by the user. If the user can hear the audio, the playback device works properly.

     @param testAudioFilePath Pointer to the path of the audio file for the audio playback device test in UTF-8:
     - Supported file formats: wav, mp3, m4a, and aac.
     - Supported file sampling rates: 8000, 16000, 32000, 44100, and 48000.

     @return
     - 0: Success, and you can hear the sound of the specified audio file.
     - < 0: Failure.
     */
    virtual int startPlaybackDeviceTest(const char* testAudioFilePath) = 0;

    /** Stops the audio playback device test.

     This method stops testing the audio playback device. You must call this method to stop the test after calling the \ref IAudioDeviceManager::startPlaybackDeviceTest "startPlaybackDeviceTest" method.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int stopPlaybackDeviceTest() = 0;

    /** Sets the volume of the audio playback device.

     @param volume Sets the volume of the audio playback device. The value ranges between 0 (lowest volume) and 255 (highest volume).
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setPlaybackDeviceVolume(int volume) = 0;

    /** Retrieves the volume of the audio playback device.

     @param volume Pointer to the audio playback device volume. The volume value ranges between 0 (lowest volume) and 255 (highest volume).
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getPlaybackDeviceVolume(int *volume) = 0;

    /** Sets the volume of the microphone.

     @param volume Sets the volume of the microphone. The value ranges between 0 (lowest volume) and 255 (highest volume).
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setRecordingDeviceVolume(int volume) = 0;

    /** Retrieves the volume of the microphone.

     @param volume Pointer to the microphone volume. The volume value ranges between 0 (lowest volume) and 255 (highest volume).
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getRecordingDeviceVolume(int *volume) = 0;

    /** Mutes the audio playback device.

     @param mute Sets whether to mute/unmute the audio playback device:
     - true: Mutes.
     - false: Unmutes.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setPlaybackDeviceMute(bool mute) = 0;
    /** Retrieves the mute status of the audio playback device.

     @param mute Pointer to whether the audio playback device is muted/unmuted.
     - true: Muted.
     - false: Unmuted.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getPlaybackDeviceMute(bool *mute) = 0;
    /** Mutes/Unmutes the microphone.

     @param mute Sets whether to mute/unmute the microphone:
     - true: Mutes.
     - false: Unmutes.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setRecordingDeviceMute(bool mute) = 0;

    /** Retrieves the microphone’s mute status.

     @param mute Pointer to whether the microphone is muted/unmuted.
     - true: Muted.
     - false: Unmuted.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getRecordingDeviceMute(bool *mute) = 0;

    /** Starts the microphone test.

     This method tests whether the microphone works properly. Once the test starts, the SDK uses the \ref IRtcEngineEventHandler::onAudioVolumeIndication "onAudioVolumeIndication" callback to notify the application with the volume information.

     @param indicationInterval Interval period (ms) of the \ref IRtcEngineEventHandler::onAudioVolumeIndication "onAudioVolumeIndication" callback cycle.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int startRecordingDeviceTest(int indicationInterval) = 0;

    /** Stops the microphone test.

     This method stops the microphone test. You must call this method to stop the test after calling the \ref IAudioDeviceManager::startRecordingDeviceTest "startRecordingDeviceTest" method.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int stopRecordingDeviceTest() = 0;

    /** Retrieves the audio playback device associated with the device ID.

     @param deviceId Pointer to the ID of the audio playback device.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getPlaybackDevice(char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Retrieves the audio playback device information associated with the device ID and device name.

     @param deviceId Pointer to the device ID of the audio playback device.
     @param deviceName Pointer to the device name of the audio playback device.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getPlaybackDeviceInfo(char deviceId[MAX_DEVICE_ID_LENGTH], char deviceName[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Retrieves the audio recording device associated with the device ID.

     @param deviceId Pointer to the device ID of the audio recording device.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getRecordingDevice(char deviceId[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Retrieves the audio recording device information associated with the device ID and device name.

     @param deviceId Pointer to the device ID of the recording audio device.
     @param deviceName Pointer to the device name of the recording audio device.
     @return
     - 0: Success.
     - < 0: Failure.
     */
   virtual int getRecordingDeviceInfo(char deviceId[MAX_DEVICE_ID_LENGTH], char deviceName[MAX_DEVICE_ID_LENGTH]) = 0;

    /** Releases all IAudioDeviceManager resources.
    */
    virtual void release() = 0;
};

/** Definition of RTCEngineContext.
*/
struct RtcEngineContext
{
    IRtcEngineEventHandler* eventHandler;
    /** App ID issued to developers by Agora. Apply for a new App ID from Agora if it is missing from your kit.
    */
    const char* appId;
    RtcEngineContext()
    :eventHandler(NULL)
    ,appId(NULL)
    {}
};

/** IRtcEngine is the base interface class of the Agora SDK that provides the main Agora SDK methods invoked by your application.

Enable the Agora SDK's communication functionality through the creation of an IRtcEngine object, then call the methods of this object.
 */
class IRtcEngine
{
protected:
    virtual ~IRtcEngine() {}
public:

    /** Initializes the Agora SDK service.

     After calling the createAgoraRtcEngine() method to create an IRtcEngine object, call this method to initialize the Agora SDK service before calling any method. After initialization, the service is set to voice mode by default. Use the issued Agora App ID in RtcEngineContext.

     @warning
     - Only users with the same App ID can call each other.
     - Each IRtcEngine instance can use only one App ID. If you need to change the App ID, call the \ref IRtcEngine::release "release" method to release the current IRtcEngine instance first, and then call this method to create a new IRtcEngine instance.

     @param context Pointer to the RTC engine context. See RtcEngineContext.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int initialize(const RtcEngineContext& context) = 0;

    /** Releases all IRtcEngine resources.

     @param sync

     - true: (Synchronous call) The result returns after the IRtcEngine resources are released. The application should not call this method in the SDK generated callbacks. Otherwise, the SDK must wait for the callbacks to return to recover the associated IRtcEngine resources, resulting in a deadlock. The SDK automatically detects the deadlock and converts this method into an asynchronous call, causing the test to take additional time.
     - false: (Asynchronous call) The result returns immediately, even when the IRtcEngine resources have not been released. The SDK releases all resources.

     @note Do not immediately uninstall the SDK's dynamic library after the call, or it may cause a crash due to the SDK clean-up thread not quitting.
     */
    virtual void release(bool sync=false) = 0;

    /** Sets the channel profile.

     The SDK needs to know the application scenario to set the appropriate channel profile to apply different optimization methods.

     @note
     - Users in the same channel must use the same channel profile.
     - Before calling this method to set a new channel profile, \ref IRtcEngine::release "release" the current engine and create a new engine using createAgoraRtcEngine() and \ref IRtcEngine::initialize "initialize".
     - Call this method before a user \ref IRtcEngine::joinChannel "joins a channel" because you cannot configure the channel profile when the channel is in use.
     - In the communication profile, the Agora SDK supports encoding only in raw data, not in texture.

     @param profile Sets the channel profile. See #CHANNEL_PROFILE_TYPE.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setChannelProfile(CHANNEL_PROFILE_TYPE profile) = 0;

    /** Sets the role of the user, such as a host or an audience (default), before joining a channel in a live broadcast.

     This method can be used to switch the user role in a live broadcast after the user joins a channel.

     @param role Sets the role of the user. See #CLIENT_ROLE_TYPE.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setClientRole(CLIENT_ROLE_TYPE role) = 0;

    /** Allows a user to join a channel.

     Users in the same channel can talk to each other, and multiple users in the same channel can start a group chat. Users with different App IDs cannot call each other.

     You must call the \ref IRtcEngine::leaveChannel "leaveChannel" method to exit the current call before entering another channel.

     @note A channel does not accept duplicate uids, such as two users with the same @p uid. If you set @p uid as 0, the system automatically assigns a @p uid.
     @warning Ensure that the App ID used for creating the token is the same App ID used by the \ref IRtcEngine::initialize "initialize" method for initializing the RTC engine. Otherwise, the CDN live streaming may fail.

     @param token Pointer to the token generated by the application server. In most circumstances, a static App ID suffices. For added security, use a Channel Key.
     - If the user uses a static App ID, *token* is optional and can be set as NULL.
     - If the user uses a Channel Key, Agora issues an additional App Certificate for developers to generate a user key based on the algorithm and App Certificate for user authentication on the server.
     @param channelId Pointer to the unique channel name for the Agora RTC session in the string format smaller than 64 bytes. Supported characters:
     - 26 lowercase English letters from a to z
     - 26 uppercase English letters from A to Z
     - 10 numbers from 0 to 9
     - Space
     - "!", "#", "$", "%", "&", "(", ")", "+", "-", ":", ";", "<", "=", ".", ">", "?", "@", "[", "]", "^", "_", " {", "}", "|", "~", ","
     @param info (Optional) Pointer to additional information about the channel. This parameter can be set to NULL or contain channel related information. Other users in the channel will not receive this message.
     @param uid (Optional) User ID. A 32-bit unsigned integer with a value ranging from 1 to 2<sup>32</sup>-1. The @p uid must be unique. If a @p uid is not assigned (or set to 0), the SDK assigns and returns a @p uid in the \ref IRtcEngineEventHandler::onJoinChannelSuccess "onJoinChannelSuccess" callback. Your application must record and maintain the returned *uid* since the SDK does not do so.

     @return
     - 0: Success.
     - < 0: Failure.
        - #ERR_INVALID_ARGUMENT (-2)
        - #ERR_NOT_READY (-3)
        - #ERR_REFUSED (-5)
     */
    virtual int joinChannel(const char* token, const char* channelId, const char* info, uid_t uid) = 0;

    /** Allows a user to leave a channel, such as hanging up or exiting a call.

     After joining a channel, the user must call the *leaveChannel* method to end the call before joining another channel.

     This method returns 0 if the user leaves the channel and releases all resources related to the call.

     This method call is asynchronous, and the user has not left the channel when the method call returns. Once the user leaves the channel, the SDK triggers the \ref IRtcEngineEventHandler::onLeaveChannel "onLeaveChannel" callback.

     @note
     - If you call the \ref IRtcEngine::release "release" method immediately after the *leaveChannel* method, the *leaveChannel* process interrupts, and the \ref IRtcEngineEventHandler::onLeaveChannel "onLeaveChannel" callback is not triggered.
     - If you call the *leaveChannel* method during a CDN live streaming, the \ref IRtcEngine::removePublishStreamUrl "removePublishStreamUrl" method is triggered.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int leaveChannel() = 0;

    /** Gets a new token when the current token expires after a period of time.

     The *token* expires after a period of time once the token schema is enabled when:

     - The \ref IRtcEngineEventHandler::onTokenPrivilegeWillExpire "onTokenPrivilegeWillExpire" callback is triggered, or
     - The \ref IRtcEngineEventHandler::onError "onError" callback reports the #ERR_TOKEN_EXPIRED error, or
     - The \ref IRtcEngineEventHandler::onRequestToken "onRequestToken" callback reports the #ERR_TOKEN_EXPIRED error.

     The application should call this method to get the new *token*. Failure to do so will result in the SDK disconnecting from the server.

     @param token Pointer to the new token.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int renewToken(const char* token) = 0;

    /** Retrieves the pointer to the device manager object.

     @param iid ID of the interface.
     @param inter Pointer to the *DeviceManager* object.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int queryInterface(INTERFACE_ID_TYPE iid, void** inter) = 0;

    /** Starts an audio call test.

     This method starts an audio call test to check whether the audio devices (for example, headset and speaker) and the network connection are working properly.

     To conduct the test:

     - The user speaks and the recording is played back within 10 seconds.
     - If the user can hear the recording within 10 seconds, the audio devices and network connection are working properly.

     @note
     - After calling this method, always call the \ref IRtcEngine::stopEchoTest "stopEchoTest" method to end the test. Otherwise, the application cannot run the next echo test.
     - In the live broadcast profile, only the hosts can call this method. If the user switches from a communication to live broadcast channel, the user must call the \ref IRtcEngine::setClientRole "setClientRole" method to change the user role from the audience (default) to the host before calling this method.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int startEchoTest() = 0;

    /** Stops the audio call test.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int stopEchoTest() = 0;

    /** Enables the video module.

     Call this method either before joining a channel or during a call. If this method is called before joining a channel, the call starts in the video mode. If this method is called during an audio call, the audio mode switches to the video mode. To disable the video module, call the \ref IRtcEngine::disableVideo "disableVideo" method.

     @note
     - This method affects the internal engine and can be called after the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method.
     - This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the video engine modules separately:
         - \ref RtcEngineParameters::enableLocalVideo "enableLocalVideo": Whether to enable the camera to create the local video stream.
         - \ref RtcEngineParameters::muteLocalVideoStream "muteLocalVideoStream": Whether to publish the local video stream.
         - \ref RtcEngineParameters::muteRemoteVideoStream "muteRemoteVideoStream": Whether to subscribe to and play the remote video stream.
         - \ref RtcEngineParameters::muteAllRemoteVideoStreams "muteAllRemoteVideoStreams": Whether to subscribe to and play all remote video streams.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int enableVideo() = 0;

    /** Disables the video module.

    This method can be called before joining a channel or during a call. If this method is called before joining a channel, the call starts in audio mode. If this method is called during a video call, the video mode switches to the audio mode. To enable the video module, call the \ref IRtcEngine::enableVideo "enableVideo" method.

     @note
     - This method affects the internal engine and can be called after the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method.
     - This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the video engine modules separately:
         - \ref RtcEngineParameters::enableLocalVideo "enableLocalVideo": Whether to enable the camera to create the local video stream.
         - \ref RtcEngineParameters::muteLocalVideoStream "muteLocalVideoStream": Whether to publish the local video stream.
         - \ref RtcEngineParameters::muteRemoteVideoStream "muteRemoteVideoStream": Whether to subscribe to and play the remote video stream.
         - \ref RtcEngineParameters::muteAllRemoteVideoStreams "muteAllRemoteVideoStreams": Whether to subscribe to and play all remote video streams.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int disableVideo() = 0;

    /** @deprecated
     Sets the video profile.

     This method is deprecated as of v2.3. Use the \ref IRtcEngine::setVideoEncoderConfiguration "setVideoEncoderConfiguration" method instead.

     Each video profile includes a set of parameters, such as the resolution, frame rate, and bitrate. If the camera device does not support the specified resolution, the SDK automatically chooses a suitable camera resolution, keeping the encoder resolution specified by the *setVideoProfile* method.

     @note
     - If you do not need to set the video profile after joining the channel, call this method before the \ref IRtcEngine::enableVideo "enableVideo" method to reduce the render time of the first video frame.
     - Always set the video profile before calling the \ref IRtcEngine::joinChannel "joinChannel" or \ref IRtcEngine::startPreview "startPreview" method.

     @param profile Sets the video profile. See #VIDEO_PROFILE_TYPE.
     @param swapWidthAndHeight Sets whether to swap the width and height of the video stream:
     - true: Swap the width and height.
     - false: (Default) Do not swap the width and height.
     The width and height of the output video are consistent with the set video profile.
     @note Since the landscape or portrait mode of the output video can be decided directly by the video profile, Agora recommends setting *swapWidthAndHeight* to *false* (default).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setVideoProfile(VIDEO_PROFILE_TYPE profile, bool swapWidthAndHeight) = 0;

    /** Sets the video encoder configuration.

     Each video encoder configuration corresponds to a set of video parameters, including the resolution, frame rate, bitrate, and video orientation.

     The parameters specified in this method are the maximum values under ideal network conditions. If the video engine cannot render the video using the specified parameters due to poor network conditions, the parameters further down the list are considered until a successful configuration is found.

     @note If you do not need to set the video encoder configuration after joining the channel, you can call this method before the \ref IRtcEngine::enableVideo "enableVideo" method to reduce the render time of the first video frame.

     @param config Sets the video encoder configuration. See VideoEncoderConfiguration.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setVideoEncoderConfiguration(const VideoEncoderConfiguration& config) = 0;

    /** Sets the local video view and configures the video display settings on the local machine.

     The application calls this method to bind each video window (view) of the local video streams and configures the video display settings. Call this method after initialization to configure the local video display settings before joining a channel. The binding is still valid after the user leaves the channel, which means that the window still displays. To unbind the view, set the *view* in VideoCanvas to NULL.

     @param canvas Pointer to the local video view and settings. See VideoCanvas.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setupLocalVideo(const VideoCanvas& canvas) = 0;

    /** Sets the remote video view.

     This method binds the remote user to the video display window (sets the view for the remote user by the specified uid in VideoCanvas).

     The application specifies the uid of the remote video in this method before the remote user joins the channel.

     If the remote uid is unknown to the application, set it after the application receives the \ref IRtcEngineEventHandler::onUserJoined "onUserJoined" callback.

     If the Video Recording function is enabled, the Video Recording Service joins the channel as a dummy client, causing other clients to also receive the \ref IRtcEngineEventHandler::onUserJoined "onUserJoined" callback. Do not bind the dummy client to the application view because the dummy client does not send any video streams. If your application does not recognize the dummy client, bind the remote user to the view when the \ref IRtcEngineEventHandler::onFirstRemoteVideoDecoded "onFirstRemoteVideoDecoded" callback is triggered.

     To unbind the remote user from the view, set the view in VideoCanvas to NULL. Once the remote user leaves the channel, the SDK unbinds the remote user.

     @param canvas Pointer to the remote video view and settings. See VideoCanvas.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setupRemoteVideo(const VideoCanvas& canvas) = 0;

    /** Starts the local video preview before joining the channel.

     Before calling this method, you must:

     - Call the \ref IRtcEngine::setupLocalVideo "setupLocalVideo" method to set up the local preview window and configure the attributes.
     - Call the \ref IRtcEngine::enableVideo "enableVideo" method to enable video.

     @note Once the startPreview method is called to start the local video preview, if you leave the channel by calling the \ref IRtcEngine::leaveChannel "leaveChannel" method, the local video preview remains until you call the \ref IRtcEngine::stopPreview "stopPreview" method to disable it.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int startPreview() = 0;

    /** Stops the local video preview and disables video.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int stopPreview() = 0;

    /** Enables the audio module.

    The audio mode is enabled by default.

     @note
     - This method affects the internal engine and can be called after the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method. You can call this method either before or after joining a channel.
     - This method resets the internal engine and takes some time to take effect. Agora recommends using the following API methods to control the audio engine modules separately:
         - \ref IRtcEngine::enableLocalAudio "enableLocalAudio": Whether to enable the microphone to create the local audio stream.
         - \ref RtcEngineParameters::muteLocalAudioStream "muteLocalAudioStream": Whether to publish the local audio stream.
         - \ref RtcEngineParameters::muteRemoteAudioStream "muteRemoteAudioStream": Whether to subscribe to and play the remote audio stream.
         - \ref RtcEngineParameters::muteAllRemoteAudioStreams "muteAllRemoteAudioStreams": Whether to subscribe to and play all remote audio streams.

    @return
    - 0: Success.
    - < 0: Failure.
    */
    virtual int enableAudio() = 0;

    /** Disables/Re-enables the local audio function.

     The audio function is enabled by default. This method disables or re-enables the local audio function, that is, to stop or restart local audio capturing.

     This method does not affect receiving or playing the remote audio streams.

    The \ref IRtcEngineEventHandler::onMicrophoneEnabled "onMicrophoneEnabled" callback is triggered once the local audio function is disabled or enabled.

     @note
     - Call this method after the \ref IRtcEngine::joinChannel "joinChannel" method.
     - This method is different from the \ref agora::rtc::RtcEngineParameters::muteLocalAudioStream "muteLocalAudioStream" method:

        - \ref agora::rtc::IRtcEngine::enableLocalAudio "enableLocalAudio": Disables/Re-enables the local audio capturing and processing.
        - \ref agora::rtc::RtcEngineParameters::muteLocalAudioStream "muteLocalAudioStream": Sends/Stops sending the local audio streams.

     @param enabled Sets whether to disable/re-enable the local audio function:
     - true: (Default) Re-enable the local audio function, that is, to start the local audio capturing device (for example, the microphone).
     - false: Disable the local audio function, that is, to stop local audio capturing.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int enableLocalAudio(bool enabled) = 0;

    /** Disables the audio module.

     @note
     - This method affects the internal engine and can be called after the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method. You can call this method either before or after joining a channel.
     - This method resets the internal engine and takes some time to take effect. Agora recommends using the \ref agora::rtc::IRtcEngine::enableLocalAudio "enableLocalAudio" and \ref agora::rtc::RtcEngineParameters::muteLocalAudioStream "muteLocalAudioStream" methods to capture, process, and send the local audio streams.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int disableAudio() = 0;

	/** Sets the audio parameters and application scenarios.

     @note
     - The *setAudioProfile* method must be called before the \ref IRtcEngine::joinChannel "joinChannel" method.
     - In the communication profile, you can set the profile but not the scenario.
     - In the communication and live-broadcast profiles, the bitrate may be different from your settings due to network self-adaptation.
     - In scenarios involving music education, Agora recommends setting profile as #AUDIO_PROFILE_MUSIC_HIGH_QUALITY (4) and scenario as #AUDIO_PROFILE_MUSIC_STANDARD_STEREO (3) in #AUDIO_SCENARIO_TYPE.

     @param  profile Sets the sampling rate, bitrate, encoding mode, and the number of channels. See #AUDIO_PROFILE_TYPE.
     @param  scenario Sets the audio application scenario. See #AUDIO_SCENARIO_TYPE.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setAudioProfile(AUDIO_PROFILE_TYPE profile, AUDIO_SCENARIO_TYPE scenario) = 0;

#if defined(__APPLE__) || defined(_WIN32)
#if defined(__APPLE__)
  typedef unsigned int WindowIDType;
#elif defined(_WIN32)
  typedef HWND WindowIDType;
#endif

  /** Starts screen sharing.

   This method shares the whole screen, specified window, or specified region:

   - Whole screen: Set @p windowId as 0 and @p rect as NULL.
   - Specified window: Set @p windowId as a value other than 0. Each window has a @p windowId that is not 0.
   - Specified region: Set @p windowId as 0 and @p rect not as NULL. In this case, you can share the specified region, for example by dragging the mouse or implementing your own logic.

   @note The specified region is a region on the whole screen. Currently, sharing a specified region in a specific window is not supported.
         *captureFreq* is the captured frame rate once the screen-sharing function is enabled. The mandatory value ranges between 1 fps and 15 fps.

   @param windowId Sets the screen sharing area. See WindowIDType.
   @param captureFreq (Mandatory) The captured frame rate. The value ranges between 1 fps and 15 fps.
   @param rect Specifies the screen-sharing region. @p rect is valid when @p windowsId is set as 0. When @p rect is set as NULL, the whole screen is shared.
   @param bitrate The captured bitrate.

   @return
   - 0: Success.
   - < 0: Failure.
   */
  virtual int startScreenCapture(WindowIDType windowId, int captureFreq, const Rect *rect, int bitrate) = 0;

  /** Stops screen sharing.

   @return
   - 0: Success.
   - < 0: Failure.
   */
  virtual int stopScreenCapture() = 0;

  /** Updates the screen capture region.

   @param rect Specifies the screen capture region. @p rect is valid when @p windowsId is set as 0. When @p rect is set as NULL, the whole screen is captured.

   @return
   - 0: Success.
   - < 0: Failure.
   */
  virtual int updateScreenCaptureRegion(const Rect *rect) = 0;
#endif

    /** Retrieves the current call ID.

     When a user joins a channel on a client, a @p callId is generated to identify the call from the client. Feedback methods, such as \ref IRtcEngine::rate "rate" and \ref IRtcEngine::complain "complain", must be called after the call ends to submit feedback to the SDK.

     The \ref IRtcEngine::rate "rate" and \ref IRtcEngine::complain "complain" methods require the @p callId parameter retrieved from the *getCallId* method during a call. @p callId is passed as an argument into the \ref IRtcEngine::rate "rate" and \ref IRtcEngine::complain "complain" methods after the call ends.

     @param callId Pointer to the current call ID.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getCallId(agora::util::AString& callId) = 0;

    /** Allows a user to rate a call after the call ends.

     @param callId Pointer to the ID of the call, retrieved from the \ref IRtcEngine::getCallId "getCallId" method.
     @param rating  Rating of the call. The value is between 1 (lowest score) and 5 (highest score). If you set a value out of this range, the #ERR_INVALID_ARGUMENT (2) error returns.
     @param description (Optional) Pointer to the description of the rating, with a string length smaller than 800 bytes.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int rate(const char* callId, int rating, const char* description) = 0;

    /** Allows a user to complain about the call quality after a call ends.

    @param callId Pointer to the ID of the call, retrieved from the \ref IRtcEngine::getCallId "getCallId" method.
    @param description (Optional) Pointer to the description of the complaint, with a character length smaller than 800 bytes.

    @return
    - 0: Success.
    - < 0: Failure.

    */
    virtual int complain(const char* callId, const char* description) = 0;

    /** Retrieves the SDK version number.

     @param build Pointer to the build number.
     @return The version of the current SDK in the string format. For example, 2.3.1.
     */
    virtual const char* getVersion(int* build) = 0;

    /**  Enables the network connection quality test.

     This method tests the quality of the users’ network connections and is disabled by default.

     Before users join a channel or before an audience switches to a host, call this method to check the uplink network quality.

     This method consumes additional network traffic, and hence may affect communication quality.

     Call the \ref IRtcEngine::disableLastmileTest "disableLastmileTest" method to disable this test immediately after receiving the \ref IRtcEngineEventHandler::onLastmileQuality "onLastmileQuality" callback, and before joining a channel.

     @note
     - Do not call any other methods before receiving the \ref IRtcEngineEventHandler::onLastmileQuality "onLastmileQuality" callback. Otherwise, the callback may be interrupted by other methods, and hence may not be triggered.
     - In the Live Broadcast profile, a host should not call this method.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int enableLastmileTest() = 0;

    /** Disables the network connection quality test.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int disableLastmileTest() = 0;

    /** Retrieves the warning or error description.

     @return code #WARN_CODE_TYPE or #ERROR_CODE_TYPE returned in the \ref IRtcEngineEventHandler::onWarning "onWarning" or \ref IRtcEngineEventHandler::onError "onError" callback.
     */
    virtual const char* getErrorDescription(int code) = 0;

    /** Enables built-in encryption with an encryption password before users join a channel.

     All users in a channel must use the same encryption password. The encryption password is automatically cleared once a user leaves the channel.

     If an encryption password is not specified, the encryption functionality will be disabled.

     @note Do not use this method for CDN live streaming.

     @param secret Pointer to the encryption password.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setEncryptionSecret(const char* secret) = 0;

    /** Sets the built-in encryption mode.

     The Agora SDK supports built-in encryption, which is set to the @p aes-128-xts mode by default. Call this method to use other encryption modes.

     All users in the same channel must use the same encryption mode and password.

     Refer to the information related to the AES encryption algorithm on the differences between the encryption modes.

     @note Call the \ref IRtcEngine::setEncryptionSecret "setEncryptionSecret" method to enable the built-in encryption function before calling this method.

     @param encryptionMode Pointer to the set encryption mode:
     - "aes-128-xts": (Default) 128-bit AES encryption, XTS mode.
     - "aes-128-ecb": 128-bit AES encryption, ECB mode.
     - "aes-256-xts": 256-bit AES encryption, XTS mode.
     - "": When encryptionMode is set as NULL, the encryption mode is set as "aes-128-xts" by default.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setEncryptionMode(const char* encryptionMode) = 0;

    /** Registers a packet observer.

     The Agora SDK allows your application to register a packet observer to receive callbacks for voice or video packet transmission.

     @param observer Pointer to the registered packet observer. See IPacketObserver.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int registerPacketObserver(IPacketObserver* observer) = 0;

    /** Creates a data stream.

     Each user can have up to five simultaneous data streams in a channel.

     @note Set both the @p reliable and @p ordered parameters to true or false. Do not set one as true and the other as false.

     @param streamId Pointer to the ID of the created data stream.
     @param reliable Sets whether or not the recipients are guaranteed to receive the data stream from the sender within five seconds:
     - true: The recipients receive the data stream from the sender within five seconds. If the recipient does not receive the data stream within five seconds, an error is reported to the application.
     - false: There is no guarantee that the recipients receive the data stream within five seconds and no error message is reported for any delay or missing data stream.
     @param ordered Sets whether or not the recipients receive the data stream in the sent order:
     - true: The recipients receive the data stream in the sent order.
     - false: The recipients do not receive the data stream in the sent order.

     @return
     - Returns the ID of the data stream, if this method call succeeds.
     - < 0: Failure.
     */
    virtual int createDataStream(int* streamId, bool reliable, bool ordered) = 0;

    /** Sends data stream messages to all users in a channel.

     The SDK has the following restrictions on this method:
     - Up to 30 packets can be sent per second in a channel with each packet having a maximum size of 1 kB.
     - Each client can send up to 6 kB of data per second.
     - Each user can have up to five data streams simultaneously.

     @note This method applies only to the communication profile or to the hosts in the live broadcast profile. If an audience in the live broadcast profile calls this method, the audience may be switched to a host.

     @param  streamId  ID of the sent data stream, returned in the \ref IRtcEngine::createDataStream "createDataStream" method.
     @param data Pointer to the sent data.
     @param length Length of the sent data.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int sendStreamMessage(int streamId, const char* data, size_t length) = 0;

    /** Adds a stream RTMP URL address, to which the host publishes the stream. (CDN live only.)

     The host publishes the stream to the specified CDN live RTMP address. The corresponding callback is: \ref IRtcEngineEventHandler::onStreamPublished "onStreamPublished".

     @note
     - Ensure that the user joins the channel before calling this method.
     - This method adds only one stream RTMP URL address each time it is called.
     - The RTMP URL address must not contain special characters, such as Chinese language characters.

     @param url Pointer to the RTMP URL address, to which the host publishes the stream.
     @param  transcodingEnabled Sets whether transcoding is enabled/disabled:
     - true: Enable transcoding. To [transcode](https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#transcoding) the audio or video streams when publishing them to CDN live, often used for combining the audio and video streams of multiple hosts in CDN live.
     - false: Disable transcoding.

     @return
     - 0: Success.
     - < 0: Failure.
          - #ERR_INVALID_ARGUMENT (2): The RTMP URL address is NULL or has a string length of 0.
          - #ERR_NOT_INITIALIZED (7): You have not initialized the RTC engine when publishing the stream.
     */
    virtual int addPublishStreamUrl(const char *url, bool transcodingEnabled) = 0;

    /** Removes a stream RTMP URL address. (CDN live only.)

     This method removes the RTMP URL address (added by the \ref IRtcEngine::addPublishStreamUrl "addPublishStreamUrl" method) from a CDN live stream.

     @note
     - This method removes only one RTMP URL address each time it is called.
     - The RTMP URL address must not contain special characters, such as Chinese language characters.

     @param url Pointer to the RTMP URL address to be removed.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int removePublishStreamUrl(const char *url) = 0;

    /** Sets the video layout and audio settings for CDN live. (CDN live only.)

     @param transcoding Sets the CDN live audio/video transcoding settings. See LiveTranscoding.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setLiveTranscoding(const LiveTranscoding &transcoding) = 0;

    /** @deprecated

     Configures the CDN live stream before the user joins a channel.

     This method is deprecated. Agora recommends using the following methods instead:

     - \ref IRtcEngine::addPublishStreamUrl "addPublishStreamUrl"
     - \ref IRtcEngine::removePublishStreamUrl "removePublishStreamUrl"
     - \ref IRtcEngine::setLiveTranscoding "setLiveTranscoding"

     @param config Pointer to the CDN live streaming settings. See PublisherConfiguration.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int configPublisher(const PublisherConfiguration& config) = 0;

    /** @deprecated

     Sets the picture-in-picture layouts for CDN live broadcasts. (CDN live only.)

     @note This method is deprecated and Agora recommends using the \ref IRtcEngine::setLiveTranscoding "setLiveTranscoding" method instead. This method is only applicable when you want to push streams to the Agora server. When you push the stream to the server, you need to:

     1. Define a canvas, the width and height (video resolution), background color, and the total number of video streams you want to display.
     2. Define the position and size for each video stream on the canvas, and indicate whether the view is cropped or zoomed to fit.

     @note
     - Call this method after the user joins the channel.
     - The application should only allow one user to call this method in the same channel. If more than one user calls this method, the other users must call the \ref IRtcEngine::clearVideoCompositingLayout "clearVideoCompositingLayout" method to remove the settings.

     @param sei Pointer to the video compositing layout. See VideoCompositingLayout.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setVideoCompositingLayout(const VideoCompositingLayout& sei) = 0;

    /** @deprecated

     Removes the picture-in-picture layout settings created by the \ref IRtcEngine::setVideoCompositingLayout "setVideoCompositingLayout" method. (CDN live only.)

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int clearVideoCompositingLayout() = 0;

    /** Adds a watermark image to the local video or CDN live stream.

     This method adds a PNG watermark image to the local video stream for the recording device, channel audience, and CDN live audience to view and capture.

     To add the PNG file to the CDN live publishing stream, see the \ref IRtcEngine::setLiveTranscoding "setLiveTranscoding" method.

     @param watermark Pointer to the watermark image to be added to the local video stream. See RtcImage.

     @note
     - The URL descriptions are different for the local video and CDN live streams:
        - In a local video stream, @p url in RtcImage refers to the absolute path of the added watermark image file in the local video stream.
        - In a CDN live stream, @p url in RtcImage refers to the HTTP/HTTPS URL address of the added watermark image in the CDN live broadcast.
     - The source file of the watermark image must be in the PNG file format. If the width and height of the PNG file differ from your settings in this method, the PNG file will be cropped to conform to your settings.
     - The Agora SDK supports adding only one watermark image onto a local video or CDN live stream. The newly added watermark image replaces the previous one.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int addVideoWatermark(const RtcImage& watermark) = 0;

    /** Removes the watermark image from the video stream added by the \ref IRtcEngine::addVideoWatermark "addVideoWatermark" method.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int clearVideoWatermarks() = 0;

    /** Adds a voice or video stream HTTP/HTTPS URL address to a live broadcast.

     - The \ref IRtcEngineEventHandler::onStreamInjectedStatus "onStreamInjectedStatus" callback returns the inject stream status.
     - The added stream HTTP/HTTPS URL address can be found in the channel with a @p uid of 666, and the \ref IRtcEngineEventHandler::onUserJoined "onUserJoined" and \ref IRtcEngineEventHandler::onFirstRemoteVideoFrame "onFirstRemoteVideoFrame" callbacks are triggered.

     @param url Pointer to the HTTP/HTTPS URL address to be added to the ongoing live broadcast. Valid protocols are RTMP, HLS, and FLV.
     - Supported FLV audio codec type: AAC.
     - Supported FLV video codec type: H264 (AVC).
     @param config Pointer to the InjectStreamConfig object that contains the configuration of the added voice or video stream.

     @return
     - 0: Success.
     - < 0: Failure.
        - #ERR_INVALID_ARGUMENT (2): The injected URL does not exist. Call this method again to inject the stream and ensure that the URL is valid.
        - #ERR_NOT_READY (3): The user is not in the channel.
        - #ERR_NOT_SUPPORTED (4): The channel profile is not live broadcast. Call the \ref agora::rtc::IRtcEngine::setChannelProfile "setChannelProfile" method and set the channel profile to live broadcast before calling this method.
        - #ERR_NOT_INITIALIZED (7): The SDK is not initialized. Ensure that the IRtcEngine object is initialized before calling this method.
     */
    virtual int addInjectStreamUrl(const char* url, const InjectStreamConfig& config) = 0;

    /** Removes the voice or video stream HTTP/HTTPS URL address from a live broadcast.

     This method removes the HTTP/HTTPS URL address (added by the \ref IRtcEngine::addInjectStreamUrl "addInjectStreamUrl" method) from the live broadcast.

     @note If this method is called successfully, the \ref IRtcEngineEventHandler::onUserOffline "onUserOffline" callback is triggered and a stream uid of 666 is returned.

     @param url Pointer to the HTTP/HTTPS URL address of the added stream to be removed.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int removeInjectStreamUrl(const char* url) = 0;
    virtual bool registerEventHandler(IRtcEngineEventHandler *eventHandler) = 0;
    virtual bool unregisterEventHandler(IRtcEngineEventHandler *eventHandler) = 0;
    /** Gets the connection state of the SDK.

     @return #CONNECTION_STATE_TYPE.
     */
    virtual CONNECTION_STATE_TYPE getConnectionState() = 0;
};


class IRtcEngineParameter
{
public:
    /**
    * Releases all IRtcEngineParameter resources.
    */
    virtual void release() = 0;

    /** Sets the bool value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Sets the value.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setBool(const char* key, bool value) = 0;

    /** Sets the int value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Sets the value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setInt(const char* key, int value) = 0;

    /** Sets the unsigned int value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Sets the value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setUInt(const char* key, unsigned int value) = 0;

    /** Sets the double value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Sets the value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setNumber(const char* key, double value) = 0;

    /** Sets the string value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the set value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setString(const char* key, const char* value) = 0;

    /** Sets the object value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the set value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setObject(const char* key, const char* value) = 0;

    /** Retrieves the bool value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the retrieved value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getBool(const char* key, bool& value) = 0;

    /** Retrieves the int value of the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the retrieved value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getInt(const char* key, int& value) = 0;

    /** Retrieves the unsigned int value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the retrieved value.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getUInt(const char* key, unsigned int& value) = 0;

    /** Retrieves the double value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the retrieved value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getNumber(const char* key, double& value) = 0;

    /** Retrieves the string value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the retrieved value.

     @return
     - 0: Success.
     - < 0: Failure.
    */
    virtual int getString(const char* key, agora::util::AString& value) = 0;

    /** Retrieves a child object value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the retrieved value.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int getObject(const char* key, agora::util::AString& value) = 0;

    /** Retrieves the array value of a specified key in the JSON format.

     @param key Pointer to the name of the key.
     @param value Pointer to the retrieved value.
     @return

     - 0: Success.
     - < 0: Failure.
     */
    virtual int getArray(const char* key, agora::util::AString& value) = 0;

    /** Provides the technical preview functionalities or special customizations by configuring the SDK with JSON options.

     @param parameters Pointer to the set parameters in a JSON string.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setParameters(const char* parameters) = 0;

    /** Sets the profile to control the RTC engine.

     @param profile Pointer to the set profile.
     @param merge Sets whether to merge the profile data with the original value:
     - true: Merge the profile data with the original value.
     - false: Do not merge the profile data with the original value.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    virtual int setProfile(const char* profile, bool merge) = 0;

	virtual int convertPath(const char* filePath, agora::util::AString& value) = 0;
};

class AAudioDeviceManager : public agora::util::AutoPtr<IAudioDeviceManager>
{
public:
    AAudioDeviceManager(IRtcEngine* engine)
    {
		queryInterface(engine, AGORA_IID_AUDIO_DEVICE_MANAGER);
    }
};

class AVideoDeviceManager : public agora::util::AutoPtr<IVideoDeviceManager>
{
public:
    AVideoDeviceManager(IRtcEngine* engine)
    {
		queryInterface(engine, AGORA_IID_VIDEO_DEVICE_MANAGER);
    }
};

class AParameter : public agora::util::AutoPtr<IRtcEngineParameter>
{
public:
    AParameter(IRtcEngine& engine) { initialize(&engine); }
    AParameter(IRtcEngine* engine) { initialize(engine); }
    AParameter(IRtcEngineParameter* p) :agora::util::AutoPtr<IRtcEngineParameter>(p) {}
private:
    bool initialize(IRtcEngine* engine)
    {
        IRtcEngineParameter* p = NULL;
        if (engine && !engine->queryInterface(AGORA_IID_RTC_ENGINE_PARAMETER, (void**)&p))
            reset(p);
        return p != NULL;
    }
};
/** The RtcEngineParameters class is an auxiliary class setting parameters for the SDK.

*/
class RtcEngineParameters
{
public:
    RtcEngineParameters(IRtcEngine& engine)
        :m_parameter(&engine){}
    RtcEngineParameters(IRtcEngine* engine)
        :m_parameter(engine){}

    /** Disables/Re-enables the local video.

     This method is only applicable when the user wants to watch the remote video without sending any video stream to the other user.

     Call this method after calling the \ref agora::rtc::IRtcEngine::enableVideo "enableVideo" method. Otherwise, this method may not work properly.

     After the *enableVideo* method is called, the local video is enabled by default. This method is used to disable/re-enable the local video while the remote video remains unaffected.

     @note This method affects the internal engine and can be called after the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method.

     @param enabled Sets whether to disable/re-enable the local video, including the capturer, renderer, and sender:
     - true: (Default) Re-enable the local video.
     - false: Disable the local video. Once the local video is disabled, the remote users can no longer receive the video stream of this user, while this user can still receive the video streams of the other remote users.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int enableLocalVideo(bool enabled) {
        return setParameters("{\"rtc.video.capture\":%s,\"che.video.local.capture\":%s,\"che.video.local.render\":%s,\"che.video.local.send\":%s}", enabled ? "true" : "false", enabled ? "true" : "false", enabled ? "true" : "false", enabled ? "true" : "false");
    }


    /** Stops sending the local video stream.

     @note When set to *true*, this method does not disable the camera which does not affect the retrieval of the local video streams. This method executes faster than the \ref agora::rtc::RtcEngineParameters::enableLocalVideo "enableLocalVideo" method which controls the sending of the local video stream.

     @param mute Sets whether to send/stop sending the local video stream:
     - true: Stop sending the local video stream.
     - false: (Default) Send the local video stream.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int muteLocalVideoStream(bool mute) {
        return setParameters("{\"rtc.video.mute_me\":%s,\"che.video.local.send\":%s}", mute ? "true" : "false", mute ? "false" : "true");
    }

    /** Stops receiving all remote users’ video streams.

     @param  mute Sets whether to receive/stop receiving all remote users' video streams:
     - true: Stop receiving all remote users' video streams.
     - false: (Default) Receive all remote users' video streams.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int muteAllRemoteVideoStreams(bool mute) {
        return m_parameter ? m_parameter->setBool("rtc.video.mute_peers", mute) : -ERR_NOT_INITIALIZED;
    }


    /** Stops receiving all remote users' video streams by default.

     @param mute Sets whether to receive/stop receiving all remote users' video streams by default:
     - true: Stop receiving all remote users' video streams by default.
     - false: (Default) Receive all remote users' video streams by default.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setDefaultMuteAllRemoteVideoStreams(bool mute) {
        return m_parameter ? m_parameter->setBool("rtc.video.set_default_mute_peers", mute) : -ERR_NOT_INITIALIZED;
    }

    /** Stops receiving a specified remote user’s video stream.

     @note If you called the \ref agora::rtc::RtcEngineParameters::muteAllRemoteVideoStreams "muteAllRemoteVideoStreams" method and set @p mute as @p true to stop receiving all remote video streams, call the *muteAllRemoteVideoStreams* method and set @p mute as @p false before calling this method.

     @param uid User ID of the specified remote user.
     @param mute Sets whether to receive/stop receiving the specified remote user’s video stream:
     - true: Stop receiving the specified remote user’s video stream.
     - false: (Default) Receive the specified remote user’s video stream.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int muteRemoteVideoStream(uid_t uid, bool mute) {
        return setObject("rtc.video.mute_peer", "{\"uid\":%u,\"mute\":%s}", uid, mute ? "true" : "false");
    }

    /** @deprecated Use \ref agora::rtc::IAudioDeviceManager::setPlaybackDeviceVolume "setPlaybackDeviceVolume" instead. Sets the playback device volume.

     @param volume Sets the volume of the playback device. The value ranges between 0 and 255.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setPlaybackDeviceVolume(int volume) {// [0,255]
        return m_parameter ? m_parameter->setInt("che.audio.output.volume", volume) : -ERR_NOT_INITIALIZED;
    }

    /** Starts an audio recording.

     The SDK allows recording during a call. Supported formats:

     - .wav: Large file size with high fidelity.
     - .aac: Small file size with low fidelity.

     Ensure that the directory to save the recording file exists and is writable.
     This method is usually called after the \ref agora::rtc::IRtcEngine::joinChannel "joinChannel" method.
     The recording automatically stops when the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method is called.

     @param filePath Pointer to the absolute file path of the recording file. The string of the file name is in UTF-8.
     @param quality Sets the audio recording quality. See #AUDIO_RECORDING_QUALITY_TYPE.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int startAudioRecording(const char* filePath, AUDIO_RECORDING_QUALITY_TYPE quality) {
        if (!m_parameter) return -ERR_NOT_INITIALIZED;
#if defined(_WIN32)
        util::AString path;
        if (!m_parameter->convertPath(filePath, path))
            filePath = path->c_str();
        else
            return -ERR_INVALID_ARGUMENT;
#endif
        return setObject("che.audio.start_recording", "{\"filePath\":\"%s\",\"quality\":%d}", filePath, quality);
    }

    /** Stops an audio recording on the client.

     You can call this method before calling the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method else, the recording automatically stops when the \ref agora::rtc::IRtcEngine::leaveChannel "leaveChannel" method is called.

     @return
     - 0: Success
     - < 0: Failure.
     */
    int stopAudioRecording() {
        return m_parameter ? m_parameter->setBool("che.audio.stop_recording", true) : -ERR_NOT_INITIALIZED;
    }

    /** Starts playing and mixing the music file.

     This method mixes the specified local audio file with the audio stream from the microphone, or replaces the microphone's audio stream with the specified local audio file. You can choose whether the other user can hear the local audio playback and specify the number of playback loops. This method also supports online music playback.

     When the audio mixing file playback finishes after calling this method, the \ref agora::rtc::IRtcEngineEventHandler::onAudioMixingFinished "onAudioMixingFinished" callback is triggered.

     @note Call this method when you are in a channel.

     @param filePath Pointer to the absolute path of the local or online audio file to mix. Supported audio formats: 3GP, ASF, ADTS, AVI, MP3, MPEG-4, SAMI, and WAVE. For more information, see [Supported Media Formats in Media Foundation](https://docs.microsoft.com/en-us/windows/desktop/medfound/supported-media-formats-in-media-foundation).
     @param loopback Sets which user can hear the audio mixing:
     - true: Only the local user can hear the audio mixing.
     - false: Both users can hear the audio mixing.
     @param replace Sets the audio mixing content:
     - true: Only the specified audio file is published; the audio stream received by the microphone is not published.
     - false: The local audio file is mixed with the audio stream from the microphone.
     @param cycle Sets the number of playback loops:
     - Positive integer: Number of playback loops.
     - -1: Infinite playback loops.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int startAudioMixing(const char* filePath, bool loopback, bool replace, int cycle) {
        if (!m_parameter) return -ERR_NOT_INITIALIZED;
#if defined(_WIN32)
        util::AString path;
        if (!m_parameter->convertPath(filePath, path))
            filePath = path->c_str();
        else
            return -ERR_INVALID_ARGUMENT;
#endif
        return setObject("che.audio.start_file_as_playout", "{\"filePath\":\"%s\",\"loopback\":%s,\"replace\":%s,\"cycle\":%d}",
                         filePath,
                         loopback?"true":"false",
                         replace?"true":"false",
                         cycle);
    }

    /** Stops playing and mixing the music file.

     Call this method when you are in a channel.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int stopAudioMixing() {
        return m_parameter ? m_parameter->setBool("che.audio.stop_file_as_playout", true) : -ERR_NOT_INITIALIZED;
    }

    /** Pauses playing and mixing the music file.

     Call this method when you are in a channel.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int pauseAudioMixing() {
        return m_parameter ? m_parameter->setBool("che.audio.pause_file_as_playout", true) : -ERR_NOT_INITIALIZED;
    }

    /** Resumes playing and mixing the music file.

     Call this method when you are in a channel.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int resumeAudioMixing() {
        return m_parameter ? m_parameter->setBool("che.audio.pause_file_as_playout", false) : -ERR_NOT_INITIALIZED;
    }

    /** Adjusts the volume during audio mixing.

     Call this method when you are in a channel.

     @param volume Audio mixing volume. The value ranges between 0 and 100 (default).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int adjustAudioMixingVolume(int volume) {
        int ret = adjustAudioMixingPlayoutVolume(volume);
        if (ret == 0) {
            adjustAudioMixingPublishVolume(volume);
        }
        return ret;
    }

    /** Adjusts the audio mixing volume for local playback.

     @note Call this method when you are in a channel.

     @param volume Audio mixing volume for local playback. The value ranges between 0 and 100 (default).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int adjustAudioMixingPlayoutVolume(int volume) {
        return m_parameter ? m_parameter->setInt("che.audio.set_file_as_playout_volume", volume) : -ERR_NOT_INITIALIZED;
    }

    /** Adjusts the audio mixing volume for publishing (for remote users).

     @note Call this method when you are in a channel.

     @param volume Audio mixing volume for publishing. The value ranges between 0 and 100 (default).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int adjustAudioMixingPublishVolume(int volume) {
        return m_parameter ? m_parameter->setInt("che.audio.set_file_as_playout_publish_volume", volume) : -ERR_NOT_INITIALIZED;
    }

    /** Retrieves the duration (ms) of the music file.

     Call this method when you are in a channel.

     @return
     - &ge; 0: The audio mixing duration, if this method call succeeds.

     - < 0: Failure.
     */
    int getAudioMixingDuration() {
        int duration = 0;
        int r = m_parameter ? m_parameter->getInt("che.audio.get_mixing_file_length_ms", duration) : -ERR_NOT_INITIALIZED;
        if (r == 0)
            r = duration;
        return r;
    }

    /** Retrieves the playback position (ms) of the music file.

     Call this method when you are in a channel.

     @return
     - &ge; 0: The current playback position of the audio mixing, if this method call succeeds.

     - < 0: Failure.
     */
    int getAudioMixingCurrentPosition() {
        if (!m_parameter) return -ERR_NOT_INITIALIZED;
        int pos = 0;
        int r = m_parameter->getInt("che.audio.get_mixing_file_played_ms", pos);
        if (r == 0)
            r = pos;
        return r;
    }
    /** Sets the playback position of the music file to a different start position (the default plays from the beginning).

     @param pos The playback start position (ms) of the music file.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setAudioMixingPosition(int pos /*in ms*/) {
        return m_parameter ? m_parameter->setInt("che.audio.mixing.file.position", pos) : -ERR_NOT_INITIALIZED;
    }

    /** Retrieves the volume of the audio effects.

     The value ranges between 0.0 and 100.0.

     @return
     - &ge; 0: Volume of the audio effects, if this method call succeeds.

     - < 0: Failure.
     */
    int getEffectsVolume() {
        if (!m_parameter) return -ERR_NOT_INITIALIZED;
        int volume = 0;
        int r = m_parameter->getInt("che.audio.game_get_effects_volume", volume);
        if (r == 0)
            r = volume;
        return r;
    }

    /** Sets the volume of the audio effects.

     @param volume Sets the volume of the audio effects. The value ranges between 0.0 and 100.0 (default).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setEffectsVolume(int volume) {
        return m_parameter ? m_parameter->setInt("che.audio.game_set_effects_volume", volume) : -ERR_NOT_INITIALIZED;
    }

    /** Sets the volume of a specified audio effect.

     @param soundId ID of the audio effect. Each audio effect has a unique ID.
     @param volume Sets the volume of the specified audio effect. The value ranges between 0.0 and 100.0 (default).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setVolumeOfEffect(int soundId, int volume) {
        return setObject(
                         "che.audio.game_adjust_effect_volume",
                         "{\"soundId\":%d,\"gain\":%d}",
                         soundId, volume);
    }

    /** Plays a specified audio effect.

     If this method call succeeds, the Agora SDK returns the \ref IRtcEngineEventHandler::onAudioEffectFinished "onAudioEffectFinished" callback.

     @param soundId ID of the specified audio effect. Each audio effect has a unique ID.

     @note If the audio effect is preloaded into the memory through the \ref RtcEngineParameters::preloadEffect "preloadEffect" method, the value of @p soundID must be the same as that in the *preloadEffect* method.

     @param filePath Pointer to the absolute path of the audio effect file.
     @param loopCount Sets the number of times the audio effect loops:
     - 0: Play the audio effect once.
     - 1: Play the audio effect twice.
     - -1: Play the audio effect in an indefinite loop until the \ref RtcEngineParameters::stopEffect "stopEffect" or \ref RtcEngineParameters::stopAllEffects "stopAllEffects" method is called.
     @param pitch Sets the pitch of the audio effect. The value ranges between 0.5 and 2. The default value is 1 (no change to the pitch). The lower the value, the lower the pitch.
     @param pan Sets the spatial position of the audio effect. The value ranges between -1.0 and 1.0:
     - 0.0: The audio effect displays ahead.
     - 1.0: The audio effect displays to the right.
     - -1.0: The audio effect displays to the left.
     @param gain  Sets the volume of the audio effect. The value ranges between 0.0 and 100.0 (default). The lower the value, the lower the volume of the audio effect.
     @param publish Sets whether or not to publish the specified audio effect to the remote stream:
     - true: The locally played audio effect is published to the Agora Cloud and the remote users can hear it.
     - false: The locally played audio effect is not published to the Agora Cloud and the remote users cannot hear it.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int playEffect(int soundId, const char* filePath, int loopCount, double pitch, double pan, int gain, bool publish = false) {
#if defined(_WIN32)
        util::AString path;
        if (!m_parameter->convertPath(filePath, path))
            filePath = path->c_str();
        else if (!filePath)
            filePath = "";
#endif
        return setObject(
                         "che.audio.game_play_effect",
                         "{\"soundId\":%d,\"filePath\":\"%s\",\"loopCount\":%d, \"pitch\":%lf,\"pan\":%lf,\"gain\":%d, \"send2far\":%d}",
                         soundId, filePath, loopCount, pitch, pan, gain, publish);
    }

    /** Stops playing a specified audio effect.

     @param soundId ID of the audio effect to stop playing. Each audio effect has a unique ID.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int stopEffect(int soundId) {
        return m_parameter ? m_parameter->setInt(
                                                 "che.audio.game_stop_effect", soundId) : -ERR_NOT_INITIALIZED;
    }

    /** Stops playing all audio effects.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int stopAllEffects() {
        return m_parameter ? m_parameter->setBool(
                                                  "che.audio.game_stop_all_effects", true) : -ERR_NOT_INITIALIZED;
    }

    /** Preloads a specified audio effect file into the memory.

     To ensure smooth communication, limit the size of the audio effect file. Agora recommends using this method to preload the audio effect before calling the \ref IRtcEngine::joinChannel "joinChannel" method.

     Supported audio formats: mp3, aac, m4a, 3gp, and wav.

     @param soundId ID of the audio effect. Each audio effect has a unique ID.
     @param filePath Pointer to the absolute path of the audio effect file.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int preloadEffect(int soundId, char* filePath) {
        return setObject(
                         "che.audio.game_preload_effect",
                         "{\"soundId\":%d,\"filePath\":\"%s\"}",
                         soundId, filePath);
    }

    /** Releases a specified preloaded audio effect from the memory.

     @param soundId ID of the audio effect. Each audio effect has a unique ID.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int unloadEffect(int soundId) {
        return m_parameter ? m_parameter->setInt(
                                                 "che.audio.game_unload_effect", soundId) : -ERR_NOT_INITIALIZED;
    }

    /** Pauses a specified audio effect.

     @param soundId ID of the audio effect. Each audio effect has a unique ID.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int pauseEffect(int soundId) {
        return m_parameter ? m_parameter->setInt(
                                                 "che.audio.game_pause_effect", soundId) : -ERR_NOT_INITIALIZED;
    }

    /** Pauses all audio effects.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int pauseAllEffects() {
        return m_parameter ? m_parameter->setBool(
                                                  "che.audio.game_pause_all_effects", true) : -ERR_NOT_INITIALIZED;
    }

    /** Resumes playing a specified audio effect.

     @param soundId ID of the audio effect. Each audio effect has a unique ID.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int resumeEffect(int soundId) {
        return m_parameter ? m_parameter->setInt(
                                                 "che.audio.game_resume_effect", soundId) : -ERR_NOT_INITIALIZED;
    }

    /** Resumes playing all audio effects.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int resumeAllEffects() {
        return m_parameter ? m_parameter->setBool(
                                                  "che.audio.game_resume_all_effects", true) : -ERR_NOT_INITIALIZED;
    }

    /** Changes the voice pitch of the local speaker.

     @param pitch Sets the voice pitch. The value ranges between 0.5 and 2.0. The lower the value, the lower the voice pitch. The default value is 1.0 (no change to the local voice pitch).
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setLocalVoicePitch(double pitch) {
        return m_parameter ? m_parameter->setInt(
                                                 "che.audio.morph.pitch_shift",
                                                 static_cast<int>(pitch * 100)) : -ERR_NOT_INITIALIZED;
    }
    /** Sets the local voice equalization effect.

     @param bandFrequency Sets the band frequency. The value ranges between 0 and 9, representing the respective 10-band center frequencies of the voice effects, including 31, 62, 125, 500, 1k, 2k, 4k, 8k, and 16k Hz. See #AUDIO_EQUALIZATION_BAND_FREQUENCY.
     @param bandGain  Sets the gain of each band in dB. The value ranges between -15 and 15.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setLocalVoiceEqualization(AUDIO_EQUALIZATION_BAND_FREQUENCY bandFrequency, int bandGain) {
        return setObject(
                         "che.audio.morph.equalization",
                         "{\"index\":%d,\"gain\":%d}",
                         static_cast<int>(bandFrequency), bandGain);
    }
    /**  Sets the local voice reverberation.

     @param reverbKey Sets the reverberation key. See #AUDIO_REVERB_TYPE.
     @param value Sets the value of the reverberation key.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setLocalVoiceReverb(AUDIO_REVERB_TYPE reverbKey, int value) {
        return setObject(
                         "che.audio.morph.reverb",
                         "{\"key\":%d,\"value\":%d}",
                         static_cast<int>(reverbKey), value);
    }

    /** @deprecated Use the \ref IRtcEngine::disableAudio "disableAudio" method instead. Disables the audio function in the channel.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int pauseAudio() {
        return m_parameter ? m_parameter->setBool("che.pause.audio", true) : -ERR_NOT_INITIALIZED;
    }

    /** @deprecated Use the \ref IRtcEngine::enableAudio "enableAudio" method instead.

     Resumes playing the audio in the channel.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int resumeAudio() {
        return m_parameter ? m_parameter->setBool("che.pause.audio", false) : -ERR_NOT_INITIALIZED;
    }

    /** @deprecated Agora does not recommend using this method.

     Sets the high-quality audio preferences. Call this method and set all parameters before joining a channel.

     Do not call this method again after joining a channel.

     @param fullband Sets whether to enable/disable full-band codec (48-kHz sampling rate). Not compatible with SDK versions before v1.7.4:
     - true: Enable full-band codec.
     - false: Disable full-band codec.
     @param  stereo Sets whether to enable/disable stereo codec. Not compatible with SDK versions before v1.7.4:
     - true: Enable stereo codec.
     - false: Disable stereo codec.
     @param fullBitrate Sets whether to enable/disable high-bitrate mode. Recommended in voice-only mode:
     - true: Enable high-bitrate mode.
     - false: Disable high-bitrate mode.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setHighQualityAudioParameters(bool fullband, bool stereo, bool fullBitrate) {
        return setObject("che.audio.codec.hq", "{\"fullband\":%s,\"stereo\":%s,\"fullBitrate\":%s}", fullband ? "true" : "false", stereo ? "true" : "false", fullBitrate ? "true" : "false");
    }

    /** Adjusts the recording volume.

     @param volume Recording volume. The value ranges between 0 and 400:
     - 0: Mute.
     - 100: Original volume.
     - 400: (Maximum) Four times the original volume with signal clipping protection.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int adjustRecordingSignalVolume(int volume) {//[0, 400]: e.g. 50~0.5x 100~1x 400~4x
        if (volume < 0)
            volume = 0;
        else if (volume > 400)
            volume = 400;
        return m_parameter ? m_parameter->setInt("che.audio.record.signal.volume", volume) : -ERR_NOT_INITIALIZED;
    }

    /** Adjusts the playback volume.

     @param volume Playback volume. The value ranges between 0 and 400:
     - 0: Mute.
     - 100: Original volume.
     - 400: (Maximum) Four times the original volume with signal clipping protection.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int adjustPlaybackSignalVolume(int volume) {//[0, 400]
        if (volume < 0)
            volume = 0;
        else if (volume > 400)
            volume = 400;
        return m_parameter ? m_parameter->setInt("che.audio.playout.signal.volume", volume) : -ERR_NOT_INITIALIZED;
    }

    /** Enables the \ref agora::rtc::IRtcEngineEventHandler::onAudioVolumeIndication "onAudioVolumeIndication" callback at a set time interval to report on which user is speaking and the speaker's volume.

     Once this method is enabled, the SDK returns the volume indication in the \ref agora::rtc::IRtcEngineEventHandler::onAudioVolumeIndication "onAudioVolumeIndication" callback at the set time interval, regardless of whether any user is speaking in the channel.

     @param interval Sets the time interval between two consecutive volume indications:
     - &le; 0: Disables the volume indication.
     - > 0: Time interval (ms) between two consecutive volume indications. Agora recommends setting @p interval &gt; 200 ms. Do not set @p interval &lt; 10 ms, or the *onAudioVolumeIndication* callback will not be triggered.
     @param smooth  Smoothing factor sets the sensitivity of the audio volume indicator. The value ranges between 0 and 10. The greater the value, the more sensitive the indicator. The recommended value is 3.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int enableAudioVolumeIndication(int interval, int smooth) { // in ms: <= 0: disable, > 0: enable, interval in ms
        if (interval < 0)
            interval = 0;
        return setObject("che.audio.volume_indication", "{\"interval\":%d,\"smooth\":%d}", interval, smooth);
    }

    /** Stops sending/Re-sends the local audio stream.

     @note When @p mute is set as @p true, this method does not disable the microphone, which does not affect any ongoing recording.

     @param mute Sets whether to send/stop sending the local audio stream:
     - true: Stops sending the local audio stream.
     - false: (Default) Sends the local audio stream.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int muteLocalAudioStream(bool mute) {
        return setParameters("{\"rtc.audio.mute_me\":%s,\"che.audio.mute_me\":%s}", mute ? "true" : "false", mute ? "true" : "false");
    }
    // mute/unmute all peers. unmute will clear all muted peers specified mutePeer() interface

    /** Stops receiving a specified remote user’s audio stream.

     @note If you called the \ref agora::rtc::RtcEngineParameters::muteAllRemoteAudioStreams "muteAllRemoteAudioStreams" method and set @p mute as @p true to stop receiving all remote users' audio streams, call the *muteAllRemoteAudioStreams* method and set @p mute as @p false before calling this method. The *muteAllRemoteAudioStreams* method sets all remote audio streams, while the *muteRemoteAudioStream* method sets a specified remote audio stream.

     @param uid User ID of the specified remote user sending the audio.
     @param mute Sets whether to receive/stop receiving a specified remote user’s audio stream:
     - true: Stops receiving the specified remote user’s audio stream.
     - false: (Default) Receives the specified remote user’s audio stream.

     @return
     - 0: Success.
     - < 0: Failure.

     */
    int muteRemoteAudioStream(uid_t uid, bool mute) {
        return setObject("rtc.audio.mute_peer", "{\"uid\":%u,\"mute\":%s}", uid, mute?"true":"false");
    }

    /** Stops receiving all remote users' audio streams.

     @param mute Sets whether to receive/stop receiving all remote users' audio streams.
     - true: Stops receiving all remote users' audio streams.
     - false: (Default) Receives all remote users' audio streams.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int muteAllRemoteAudioStreams(bool mute) {
        return m_parameter ? m_parameter->setBool("rtc.audio.mute_peers", mute) : -ERR_NOT_INITIALIZED;
    }

    /** Stops receiving all remote users' audio streams by default.

     @param mute Sets whether to receive/stop receiving all remote users' audio streams by default:
     - true:  Stops receiving all remote users' audio streams by default.
     - false: (Default) Receives all remote users' audio streams by default.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setDefaultMuteAllRemoteAudioStreams(bool mute) {
        return m_parameter ? m_parameter->setBool("rtc.audio.set_default_mute_peers", mute) : -ERR_NOT_INITIALIZED;
    }

    /** Sets the external audio source.

     @param enabled Sets whether to enable/disable the external audio source:
     - true: Enables the external audio source.
     - false: (Default) Disables the external audio source.
     @param sampleRate Sets the sampling rate of the external audio source, which can set be as 8000, 16000, 32000, 44100, or 48000.
     @param channels Sets the audio channels of the external audio source (two channels maximum).
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setExternalAudioSource(bool enabled, int sampleRate, int channels) {
        if (enabled)
            return setParameters("{\"che.audio.external_capture\":true,\"che.audio.external_capture.push\":true,\"che.audio.set_capture_raw_audio_format\":{\"sampleRate\":%d,\"channelCnt\":%d,\"mode\":%d}}", sampleRate, channels, RAW_AUDIO_FRAME_OP_MODE_TYPE::RAW_AUDIO_FRAME_OP_MODE_READ_WRITE);
        else
            return setParameters("{\"che.audio.external_capture\":false,\"che.audio.external_capture.push\":false}");
    }

    /** Sets the external audio sink.

     If you enable the external audio sink, you can pull the audio frame by periodically calling the \ref agora::media::IMediaEngine::pullAudioFrame "pullAudioFrame" method.

     @param enabled
     - true: Enables the external audio sink.
     - false: Disables the external audio sink.
     @param sampleRate Sets the sampling rate for the external audio sink, which can be set as 8000, 16000, 32000, 44100, or 48000.
     @param channels Sets the audio channels of the external audio sink (two channels maximum).

     @note Enabling the external audio sink disables the "Raw Audio Data" method, and the application will not retrieve the audio frame from the \ref agora::media::IAudioFrameObserver::onPlaybackAudioFrame "onPlaybackAudioFrame" callback.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setExternalAudioSink(bool enabled, int sampleRate, int channels) {
        if (enabled)
            return setParameters("{\"che.audio.external_render\":true,\"che.audio.external_render.pull\":true,\"che.audio.set_render_raw_audio_format\":{\"sampleRate\":%d,\"channelCnt\":%d,\"mode\":%d}}", sampleRate, channels, RAW_AUDIO_FRAME_OP_MODE_TYPE::RAW_AUDIO_FRAME_OP_MODE_READ_ONLY);
        else
            return setParameters("{\"che.audio.external_render\":false,\"che.audio.external_render.pull\":false}");
    }

    /** Specifies an SDK output log file.

     The log file records all log data for the SDK’s operation. Ensure that the directory for the log file exists and is writable.

     @note The default log file is located at: C:\Users\<user_name>\AppData\Local\Agora\<process_name>.

     @param filePath File path of the log file. The string of the log file is in the UTF-8 code.

     @return

     - 0: Success.
     - < 0: Failure.
     */
    int setLogFile(const char* filePath) {
        if (!m_parameter) return -ERR_NOT_INITIALIZED;
#if defined(_WIN32)
        util::AString path;
        if (!m_parameter->convertPath(filePath, path))
            filePath = path->c_str();
        else if (!filePath)
            filePath = "";
#endif
        return m_parameter->setString("rtc.log_file", filePath);
    }

    /** Sets the output log level of the SDK.

     You can use one or a combination of the log filter levels. The log level follows the sequence of OFF, CRITICAL, ERROR, WARNING, INFO, and DEBUG. Choose a level to see the logs preceding that level.

     For example, if you set the log level to WARNING, you see the logs within levels CRITICAL, ERROR, and WARNING.

     @param filter Sets the log filter level. See #LOG_FILTER_TYPE.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setLogFilter(unsigned int filter) {
        return m_parameter ? m_parameter->setUInt("rtc.log_filter", filter&LOG_FILTER_MASK) : -ERR_NOT_INITIALIZED;
    }

    /** Sets the local video display mode.

     This method can be called multiple times during a call to change the display mode.

     @param renderMode  Sets the local video display mode. See #RENDER_MODE_TYPE.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setLocalRenderMode(RENDER_MODE_TYPE renderMode) {
        return setRemoteRenderMode(0, renderMode);
    }

    /** Sets the video display mode of a specified remote user.

     This method can be called multiple times during a call to change the display mode.

     @param uid ID of the remote user.
     @param renderMode  Sets the video display mode. See #RENDER_MODE_TYPE.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setRemoteRenderMode(uid_t uid, RENDER_MODE_TYPE renderMode) {
        return setObject("che.video.render_mode", "{\"uid\":%u,\"mode\":%d}", uid, renderMode);
    }


    /** Sets the stream mode to the single-stream (default) or dual-stream mode. (Live broadcast only.)

     If the dual-stream mode is enabled, the receiver can choose to receive the high stream (high-resolution and high-bitrate video stream), or the low stream (low-resolution and low-bitrate video stream).

     @param enabled Sets the stream mode:
     - true: Dual-stream mode.
     - false: (Default) Single-stream mode.
     */
    int enableDualStreamMode(bool enabled) {
        return setParameters("{\"rtc.dual_stream_mode\":%s,\"che.video.enableLowBitRateStream\":%d}", enabled ? "true" : "false", enabled ? 1 : 0);
    }

    /** Sets the remote user’s video stream type received by the local user when the remote user sends dual streams.

     This method allows the application to adjust the corresponding video-stream type based on the size of the video window to reduce the bandwidth and resources.

     - If the remote user enables the dual-stream mode by calling the \ref agora::rtc::RtcEngineParameters::enableDualStreamMode "enableDualStreamMode" method, the SDK receives the high-stream video by default.
     - If the dual-stream mode is not enabled, the SDK receives the high-stream video by default.

     The method result returns in the \ref agora::rtc::IRtcEngineEventHandler::onApiCallExecuted "onApiCallExecuted" callback. The Agora SDK receives the high-stream video by default to reduce the bandwidth. If needed, users may use this method to switch to the low-stream video.
     By default, the aspect ratio of the low-stream video is the same as the high-stream video. Once the resolution of the high-stream video is set, the system automatically sets the resolution, frame rate, and bitrate of the low-stream video.

     @param uid ID of the remote user sending the video stream.
     @param streamType  Sets the video-stream type. See #REMOTE_VIDEO_STREAM_TYPE.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setRemoteVideoStreamType(uid_t uid, REMOTE_VIDEO_STREAM_TYPE streamType) {
        return setParameters("{\"rtc.video.set_remote_video_stream\":{\"uid\":%u,\"stream\":%d}, \"che.video.setstream\":{\"uid\":%u,\"stream\":%d}}", uid, streamType, uid, streamType);
//        return setObject("rtc.video.set_remote_video_stream", "{\"uid\":%u,\"stream\":%d}", uid, streamType);
    }

    /** Sets the default video-stream type for the video received by the local user when the remote user sends dual streams.

     - If the dual-stream mode is enabled by calling the \ref agora::rtc::RtcEngineParameters::enableDualStreamMode "enableDualStreamMode" method, the user receives the high-stream video by default. The @p setRemoteDefaultVideoStreamType method allows the application to adjust the corresponding video-stream type according to the size of the video window, reducing the bandwidth and resources.
     - If the dual-stream mode is not enabled, the user receives the high-stream video by default.

     The result after calling this method is returned in the \ref agora::rtc::IRtcEngineEventHandler::onApiCallExecuted "onApiCallExecuted" callback. The Agora SDK receives the high-stream video by default to reduce the bandwidth. If needed, users can switch to the low-stream video through this method.

     @param streamType Sets the default video-stream type. See #REMOTE_VIDEO_STREAM_TYPE.

     @return
     - 0: Success.
     - < 0: Failure.
    */
    int setRemoteDefaultVideoStreamType(REMOTE_VIDEO_STREAM_TYPE streamType) {
        return m_parameter ? m_parameter->setInt("rtc.video.set_remote_default_video_stream_type", streamType) : -ERR_NOT_INITIALIZED;
    }

    /** Sets the audio recording format for the \ref agora::media::IAudioFrameObserver::onRecordAudioFrame "onRecordAudioFrame" callback.

     @param sampleRate Sets the sampling rate (@p samplesPerSec) returned in the *onRecordAudioFrame* callback, which can set be as 8000, 16000, 32000, 44100, or 48000.
     @param channel Sets the number of audio channels (@p channels) returned in the *onRecordAudioFrame* callback:
     - 1: Mono
     - 2: Stereo
     @param mode Sets the use mode (see #RAW_AUDIO_FRAME_OP_MODE_TYPE) of the *onRecordAudioFrame* callback.
     @param samplesPerCall Sets the sample points (@p samples) returned in the *onRecordAudioFrame* callback. @p samplesPerCall is usually set as 1024 for stream pushing.

    samplesPerCall = (int)(sampleRate &times; sampleInterval), where sampleInterval &ge; 0.01 in seconds.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setRecordingAudioFrameParameters(int sampleRate, int channel, RAW_AUDIO_FRAME_OP_MODE_TYPE mode, int samplesPerCall) {
        return setObject("che.audio.set_capture_raw_audio_format", "{\"sampleRate\":%d,\"channelCnt\":%d,\"mode\":%d,\"samplesPerCall\":%d}", sampleRate, channel, mode, samplesPerCall);
    }
    /** Sets the audio playback format for the \ref agora::media::IAudioFrameObserver::onPlaybackAudioFrame "onPlaybackAudioFrame" callback.

     @param sampleRate Sets the sampling rate (@p samplesPerSec) returned in the *onPlaybackAudioFrame* callback, which can set be as 8000, 16000, 32000, 44100, or 48000.
     @param channel Sets the number of channels (@p channels) returned in the *onPlaybackAudioFrame* callback:
     - 1: Mono
     - 2: Stereo
     @param mode Sets the use mode (see #RAW_AUDIO_FRAME_OP_MODE_TYPE) of the *onPlaybackAudioFrame* callback.
     @param samplesPerCall Sets the sample points (*samples*) returned in the *onPlaybackAudioFrame* callback. @p samplesPerCall is usually set as 1024 for stream pushing.

     samplesPerCall = (int)(sampleRate &times; sampleInterval), where sampleInterval &ge; 0.01 in seconds.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setPlaybackAudioFrameParameters(int sampleRate, int channel, RAW_AUDIO_FRAME_OP_MODE_TYPE mode, int samplesPerCall) {
        return setObject("che.audio.set_render_raw_audio_format", "{\"sampleRate\":%d,\"channelCnt\":%d,\"mode\":%d,\"samplesPerCall\":%d}", sampleRate, channel, mode, samplesPerCall);
    }
    /** Sets the mixed audio format for the \ref agora::media::IAudioFrameObserver::onMixedAudioFrame "onMixedAudioFrame" callback.

     @param sampleRate Sets the sampling rate (@p samplesPerSec) returned in the *onMixedAudioFrame* callback, which can set be as 8000, 16000, 32000, 44100, or 48000.
     @param samplesPerCall Sets the sample points (@p samples) returned in the *onMixedAudioFrame* callback. @p samplesPerCall is usually set as 1024 for stream pushing.

     samplesPerCall = (int)(sampleRate &times; sampleInterval), where sampleInterval &ge; 0.01 in seconds.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setMixedAudioFrameParameters(int sampleRate, int samplesPerCall) {
        return setObject("che.audio.set_mixed_raw_audio_format", "{\"sampleRate\":%d,\"samplesPerCall\":%d}", sampleRate, samplesPerCall);
    }

    /** Enables interoperability with the Agora Web SDK.

     @note This method applies only to the live broadcast profile. In the communication profile, interoperability with the Agora Web SDK is enabled by default.

     @param enabled Sets whether to enable/disable interoperability with the Agora Web SDK:
     - true: Enable.
     - false: (Default) Disable.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int enableWebSdkInteroperability(bool enabled) {//enable interoperability with zero-plugin web sdk
        return setParameters("{\"rtc.video.web_h264_interop_enable\":%s,\"che.video.web_h264_interop_enable\":%s}", enabled ? "true" : "false", enabled ? "true" : "false");
    }

    //only for live broadcast
    /** Sets the preferences for the high-quality video. (Live broadcast only).

     @param preferFrameRateOverImageQuality Sets the video quality preference:
     - true: Frame rate over image quality.
     - false: (Default) Image quality over frame rate.

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setVideoQualityParameters(bool preferFrameRateOverImageQuality) {
        return setParameters("{\"rtc.video.prefer_frame_rate\":%s,\"che.video.prefer_frame_rate\":%s}", preferFrameRateOverImageQuality ? "true" : "false", preferFrameRateOverImageQuality ? "true" : "false");
    }

    /** Sets the local video mirror mode.

     You must call this method before calling the \ref agora::rtc::IRtcEngine::startPreview "startPreview" method, otherwise the mirror mode will not work.

     @param mirrorMode Sets the local video mirror mode. See #VIDEO_MIRROR_MODE_TYPE.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setLocalVideoMirrorMode(VIDEO_MIRROR_MODE_TYPE mirrorMode) {
        if (!m_parameter) return -ERR_NOT_INITIALIZED;
        const char *value;
        switch (mirrorMode) {
            case VIDEO_MIRROR_MODE_AUTO:
                value = "default";
                break;
            case VIDEO_MIRROR_MODE_ENABLED:
                value = "forceMirror";
                break;
            case VIDEO_MIRROR_MODE_DISABLED:
                value = "disableMirror";
                break;
            default:
                return -ERR_INVALID_ARGUMENT;
        }
        return m_parameter->setString("che.video.localViewMirrorSetting", value);
    }

    /** Sets the fallback option for the locally published video stream based on the network conditions.

     The default setting for @p option is #STREAM_FALLBACK_OPTION_DISABLED, where there is no fallback for the locally published video stream when the uplink network conditions are poor.

     If *option* is set to #STREAM_FALLBACK_OPTION_AUDIO_ONLY, the SDK will:

     - Disable the upstream video but enable audio only when the network conditions worsen and cannot support both video and audio.
     - Re-enable the video when the network conditions improve.

     When the locally published stream falls back to audio only or when the audio stream switches back to the video, the \ref agora::rtc::IRtcEngineEventHandler::onLocalPublishFallbackToAudioOnly "onLocalPublishFallbackToAudioOnly" callback is triggered.

     @note Agora does not recommend using this method for CDN live streaming, because the remote CDN live user will have a noticeable lag when the locally publish stream falls back to audio-only.

     @param  option Sets the fallback option for the locally published video stream. See #STREAM_FALLBACK_OPTIONS.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setLocalPublishFallbackOption(STREAM_FALLBACK_OPTIONS option) {
        return m_parameter ? m_parameter->setInt("rtc.local_publish_fallback_option", option) : -ERR_NOT_INITIALIZED;
    }

    /** Sets the fallback option for the remotely subscribed stream based on the network conditions.

     The default setting for @p option is #STREAM_FALLBACK_OPTION_VIDEO_STREAM_LOW, where the remotely subscribed stream falls back to the low-stream video (low resolution and low bitrate) under poor downlink network conditions.

     If *option* is set to #STREAM_FALLBACK_OPTION_AUDIO_ONLY, the SDK automatically switches the video from a high-stream to a low-stream, or disable the video when the downlink network conditions cannot support both audio and video to guarantee the quality of the audio. The SDK monitors the network quality and restores the video stream when the network conditions improve.

     Once the locally published stream falls back to audio only or the audio stream switches back to the video stream, the \ref agora::rtc::IRtcEngineEventHandler::onRemoteSubscribeFallbackToAudioOnly "onRemoteSubscribeFallbackToAudioOnly" callback is triggered.

     @param  option  Sets the fallback option for the remotely subscribed stream. See #STREAM_FALLBACK_OPTIONS.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setRemoteSubscribeFallbackOption(STREAM_FALLBACK_OPTIONS option) {
        return m_parameter ? m_parameter->setInt("rtc.remote_subscribe_fallback_option", option) : -ERR_NOT_INITIALIZED;
    }

    /** Enables loopback recording.

     @param enabled Sets whether to enable/disable loopback recording:
     - true: Enables loopback recording.
     - false: (Default) Disables loopback recording.
     @param deviceName Pointer to the device name of the sound card. The default value is NULL, meaning the default sound card is used.
     If you are using a virtual sound card like "Soundflower", set this parameter as the name of the sound card, like "Soundflower", and the SDK will find the corresponding sound card and start capturing.
     @return
     - 0: Success.
     - < 0: Failure.
     */
    int enableLoopbackRecording(bool enabled, const char* deviceName = NULL) {
        if (!deviceName) {
            return setParameters("{\"che.audio.loopback.recording\":%s}", enabled ? "true" : "false");
        }
        else {
            return setParameters("{\"che.audio.loopback.deviceName\":\"%s\",\"che.audio.loopback.recording\":%s}", deviceName, enabled ? "true" : "false");
        }
    }

    /** Sets the volume of the in-ear monitor.

     @param volume Sets the volume of the in-ear monitor. The value ranges between 0 and 100 (default).

     @return
     - 0: Success.
     - < 0: Failure.
     */
    int setInEarMonitoringVolume(int volume) {
        return m_parameter ? m_parameter->setInt("che.audio.headset.monitoring.parameter", volume) : -ERR_NOT_INITIALIZED;
    }

protected:
    AParameter& parameter() {
        return m_parameter;
    }
    int setParameters(const char* format, ...) {
        char buf[512];
        va_list args;
        va_start(args, format);
        vsnprintf(buf, sizeof(buf)-1, format, args);
        va_end(args);
        return m_parameter ? m_parameter->setParameters(buf) : -ERR_NOT_INITIALIZED;
    }
    int setObject(const char* key, const char* format, ...) {
        char buf[512];
        va_list args;
        va_start(args, format);
        vsnprintf(buf, sizeof(buf)-1, format, args);
        va_end(args);
        return m_parameter ? m_parameter->setObject(key, buf) : -ERR_NOT_INITIALIZED;
    }
    int stopAllRemoteVideo() {
        return m_parameter ? m_parameter->setBool("che.video.peer.stop_render", true) : -ERR_NOT_INITIALIZED;
    }
private:
    AParameter m_parameter;
};

} //namespace rtc
} // namespace agora

/** Retrieves the SDK version number.

 @param build Build number of the Agora SDK.
 @return String of the SDK version.
 */
#define getAgoraRtcEngineVersion getAgoraSdkVersion

////////////////////////////////////////////////////////
/** \addtogroup createAgoraRtcEngine
 @{
 */
////////////////////////////////////////////////////////

/** Creates the RTC engine object and returns the pointer.

 @return Pointer of the RTC engine object.
 */
AGORA_API agora::rtc::IRtcEngine* AGORA_CALL createAgoraRtcEngine();

////////////////////////////////////////////////////////
/** @} */
////////////////////////////////////////////////////////

#define getAgoraRtcEngineErrorDescription getAgoraSdkErrorDescription
#define setAgoraRtcEngineExternalSymbolLoader setAgoraSdkExternalSymbolLoader

#endif
