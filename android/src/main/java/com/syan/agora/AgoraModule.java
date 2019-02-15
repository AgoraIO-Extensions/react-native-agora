package com.syan.agora;

import android.graphics.Rect;
import android.media.MediaRecorder;
import android.net.wifi.p2p.nsd.WifiP2pServiceRequest;
import android.support.annotation.Nullable;
import android.support.v7.widget.LinearLayoutCompat;
import android.telecom.Call;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import io.agora.rtc.Constants;
import io.agora.rtc.IAudioEffectManager;
import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.PublisherConfiguration;
import io.agora.rtc.RtcEngine;
import io.agora.rtc.live.LiveInjectStreamConfig;
import io.agora.rtc.live.LiveTranscoding;
import io.agora.rtc.video.AgoraImage;
import io.agora.rtc.video.VideoEncoderConfiguration;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;
import static io.agora.rtc.Constants.AudioScenario;
import static io.agora.rtc.Constants.AudioProfile;

public class AgoraModule extends ReactContextBaseJavaModule {

    private static String FPS1 = "FPS1";
    private static String FPS7 = "FPS7";
    private static String FPS10 = "FPS10";
    private static String FPS15 = "FPS15";
    private static String FPS24 = "FPS24";
    private static String FPS30 = "FPS30";
    private static String FPS60 = "FPS60";
    private static String Adaptative = "Adaptative";
    private static String FixedLandscape = "FixedLandscape";
    private static String FixedPortrait = "FixedPortrait";
    private static String Host = "Host";
    private static String Audience = "Audience";
    private static String UserOfflineReasonQuit = "UserOfflineReasonQuit";
    private static String UserOfflineReasonDropped = "UserOfflineReasonDropped";
    private static String UserOfflineReasonBecomeAudience = "UserOfflineReasonBecomeAudience";
    private static String AudioSampleRateType32000 = "AudioSampleRateType32000";
    private static String AudioSampleRateType44100 = "AudioSampleRateType44100";
    private static String AudioSampleRateType48000 = "AudioSampleRateType48000";
    private static String CodecTypeBaseLine = "CodecTypeBaseLine";
    private static String CodecTypeMain = "CodecTypeMain";
    private static String CodecTypeHigh = "CodecTypeHigh";
    private static String QualityLow = "QualityLow";
    private static String QualityMedium = "QualityMedium";
    private static String QualityHigh = "QualityHigh";
    private static String Disconnected = "Disconnected";
    private static String Connecting = "Connecting";
    private static String Connected = "Connected";
    private static String Reconnecting = "Reconnecting";
    private static String ConnectionFailed = "ConnectionFailed";
    private static String ConnectionChangedConnecting = "ConnectionChangedConnecting";
    private static String ConnectionChangedJoinSuccess =  "ConnectionChangedJoinSuccess";
    private static String ConnectionChangedInterrupted = "ConnectionChangedInterrupted";
    private static String ConnectionChangedBannedByServer = "ConnectionChangedBannedByServer";
    private static String ConnectionChangedJoinFailed = "ConnectionChangedJoinFailed";
    private static String ConnectionChangedLeaveChannel = "ConnectionChangedLeaveChannel";
    private static String AudioOutputRoutingDefault = "AudioOutputRoutingDefault";
    private static String AudioOutputRoutingHeadset = "AudioOutputRoutingHeadset";
    private static String AudioOutputRoutingEarpiece = "AudioOutputRoutingEarpiece";
    private static String AudioOutputRoutingHeadsetNoMic = "AudioOutputRoutingHeadsetNoMic";
    private static String AudioOutputRoutingSpeakerphone = "AudioOutputRoutingSpeakerphone";
    private static String AudioOutputRoutingLoudspeaker = "AudioOutputRoutingLoudspeaker";
    private static String AudioOutputRoutingHeadsetBluetooth = "AudioOutputRoutingHeadsetBluetooth";
    private static String NetworkQualityUnknown = "NetworkQualityUnknown";
    private static String NetworkQualityExcellent = "NetworkQualityExcellent";
    private static String NetworkQualityGood = "NetworkQualityGood";
    private static String NetworkQualityPoor = "NetworkQualityPoor";
    private static String NetworkQualityBad = "NetworkQualityBad";
    private static String NetworkQualityVBad = "NetworkQualityVBad";
    private static String NetworkQualityDown = "NetworkQualityDown";
    private static String AudioProfileDefault = "AudioProfileDefault";
    private static String AudioProfileSpeechStandard = "AudioProfileSpeechStandard";
    private static String AudioProfileMusicStandard = "AudioProfileMusicStandard";
    private static String AgoraAudioProfileMusicStandardStereo = "AudioProfileMusicStandardStereo";
    private static String AudioProfileMusicHighQuality = "AudioProfileMusicHighQuality";
    private static String AudioProfileMusicHighQualityStereo = "AudioProfileMusicHighQualityStereo";
    private static String AudioScenarioDefault = "AudioScenarioDefault";
    private static String AudioScenarioChatRoomEntertainment = "AudioScenarioChatRoomEntertainment";
    private static String AudioScenarioEducation = "AudioScenarioEducation";
    private static String AudioScenarioGameStreaming = "AudioScenarioGameStreaming";
    private static String AudioScenarioShowRoom = "AudioScenarioShowRoom";
    private static String AudioScenarioChatRoomGaming = "AudioScenarioChatRoomGaming";
    private static String AudioEqualizationBand31 = "AudioEqualizationBand31";
    private static String AudioEqualizationBand62 = "AudioEqualizationBand62";
    private static String AudioEqualizationBand125 = "AudioEqualizationBand125";
    private static String AudioEqualizationBand250 = "AudioEqualizationBand250";
    private static String AudioEqualizationBand500 = "AudioEqualizationBand500";
    private static String AudioEqualizationBand1K = "AudioEqualizationBand1K";
    private static String AudioEqualizationBand2K = "AudioEqualizationBand2K";
    private static String AudioEqualizationBand4K = "AudioEqualizationBand4K";
    private static String AudioEqualizationBand8K = "AudioEqualizationBand8K";
    private static String AudioEqualizationBand16K = "AudioEqualizationBand16K";
    private static String AudioRawFrameOperationModeReadOnly = "AudioRawFrameOperationModeReadOnly";
    private static String AudioRawFrameOperationModeWriteOnly = "AudioRawFrameOperationModeWriteOnly";
    private static String AudioRawFrameOperationModeReadWrite = "AudioRawFrameOperationModeReadWrite";
    private static String VideoStreamTypeHigh = "VideoStreamTypeHigh";
    private static String VideoStreamTypeLow = "VideoStreamTypeLow";
    private static String VideoMirrorModeAuto = "VideoMirrorModeAuto";
    private static String VideoMirrorModeEnabled = "VideoMirrorModeEnabled";
    private static String VideoMirrorModeDisabled = "VideoMirrorModeDisabled";
    private static String ChannelProfileCommunication = "ChannelProfileCommunication";
    private static String ChannelProfileLiveBroadcasting = "ChannelProfileLiveBroadcasting";
    private static String ChannelProfileGame = "ChannelProfileGame";
    private static String ErrorCodeNoError = "ErrorCodeNoError";
    private static String ErrorCodeFailed = "ErrorCodeFailed";
    private static String ErrorCodeInvalidArgument = "ErrorCodeInvalidArgument";
    private static String ErrorCodeTimedOut = "ErrorCodeTimedOut";
    private static String ErrorCodeAlreadyInUse = "ErrorCodeAlreadyInUse";
//    private static String ErrorCodeAbort = "ErrorCodeAbort";
    private static String ErrorCodeEncryptedStreamNotAllowedPublished = "ErrorCodeEncryptedStreamNotAllowedPublished";
//    private static String ErrorCodeResourceLimited = "ErrorCodeResourceLimited";
    private static String InjectStreamStatusStartSuccess = "InjectStreamStatusStartSuccess";
    private static String InjectStreamStatusStartAlreadyExist = "InjectStreamStatusStartAlreadyExist";
    private static String InjectStreamStatusStartUnauthorized = "InjectStreamStatusStartUnauthorized";
    private static String InjectStreamStatusStartTimeout = "InjectStreamStatusStartTimeout";
    private static String InjectStreamStatusStartFailed = "InjectStreamStatusStartFailed";
    private static String InjectStreamStatusStopSuccess = "InjectStreamStatusStopSuccess";
    private static String InjectStreamStatusStopNotFound = "InjectStreamStatusStopNotFound";
    private static String InjectStreamStatusStopUnauthorized = "InjectStreamStatusStopUnauthorized";
    private static String InjectStreamStatusStopTimeout = "InjectStreamStatusStopTimeout";
    private static String InjectStreamStatusStopFailed = "InjectStreamStatusStopFailed";
    private static String InjectStreamStatusBroken = "InjectStreamStatusBroken";

    public AgoraModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "RCTAgora";
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();

        constants.put(Adaptative, VideoEncoderConfiguration.ORIENTATION_MODE.ORIENTATION_MODE_ADAPTIVE.getValue());
        constants.put(FixedLandscape, VideoEncoderConfiguration.ORIENTATION_MODE.ORIENTATION_MODE_FIXED_LANDSCAPE.getValue());
        constants.put(FixedPortrait, VideoEncoderConfiguration.ORIENTATION_MODE.ORIENTATION_MODE_FIXED_PORTRAIT.getValue());
        constants.put(Host, IRtcEngineEventHandler.ClientRole.CLIENT_ROLE_BROADCASTER);
        constants.put(Audience, IRtcEngineEventHandler.ClientRole.CLIENT_ROLE_AUDIENCE);
        constants.put(ChannelProfileCommunication, Constants.CHANNEL_PROFILE_LIVE_BROADCASTING);
        constants.put(ChannelProfileLiveBroadcasting, Constants.CHANNEL_PROFILE_LIVE_BROADCASTING);
        constants.put(ChannelProfileGame, Constants.CHANNEL_PROFILE_GAME);
        constants.put(UserOfflineReasonQuit, Constants.USER_OFFLINE_QUIT);
        constants.put(UserOfflineReasonDropped, Constants.USER_OFFLINE_DROPPED);
        constants.put(UserOfflineReasonBecomeAudience, Constants.USER_OFFLINE_BECOME_AUDIENCE);
        constants.put(Disconnected, Constants.CONNECTION_STATE_DISCONNECTED);
        constants.put(Connecting, Constants.CONNECTION_STATE_CONNECTING);
        constants.put(Connected, Constants.CONNECTION_STATE_CONNECTED);
        constants.put(Reconnecting, Constants.CONNECTION_STATE_RECONNECTING);
        constants.put(ConnectionFailed, Constants.CONNECTION_STATE_FAILED);
        constants.put(ConnectionChangedConnecting, Constants.CONNECTION_CHANGED_CONNECTING);
        constants.put(ConnectionChangedJoinSuccess, Constants.CONNECTION_CHANGED_JOIN_SUCCESS);
        constants.put(ConnectionChangedInterrupted, Constants.CONNECTION_CHANGED_INTERRUPTED);
        constants.put(ConnectionChangedBannedByServer, Constants.CONNECTION_CHANGED_BANNED_BY_SERVER);
        constants.put(ConnectionChangedJoinFailed, Constants.CONNECTION_CHANGED_JOIN_FAILED);
        constants.put(ConnectionChangedLeaveChannel, Constants.CONNECTION_CHANGED_LEAVE_CHANNEL);
        constants.put(AudioOutputRoutingDefault, Constants.AUDIO_ROUTE_DEFAULT);
        constants.put(AudioOutputRoutingHeadset, Constants.AUDIO_ROUTE_HEADSET);
        constants.put(AudioOutputRoutingEarpiece, Constants.AUDIO_ROUTE_EARPIECE);
        constants.put(AudioOutputRoutingHeadsetNoMic, Constants.AUDIO_ROUTE_HEADSETNOMIC);
        constants.put(AudioOutputRoutingSpeakerphone, Constants.AUDIO_ROUTE_SPEAKERPHONE);
        constants.put(AudioOutputRoutingLoudspeaker, Constants.AUDIO_ROUTE_LOUDSPEAKER);
        constants.put(AudioOutputRoutingHeadsetBluetooth, Constants.AUDIO_ROUTE_HEADSETBLUETOOTH);
        constants.put(NetworkQualityUnknown, Constants.QUALITY_UNKNOWN);
        constants.put(NetworkQualityExcellent, Constants.QUALITY_EXCELLENT);
        constants.put(NetworkQualityGood, Constants.QUALITY_GOOD);
        constants.put(NetworkQualityPoor, Constants.QUALITY_POOR);
        constants.put(NetworkQualityBad, Constants.QUALITY_BAD);
        constants.put(NetworkQualityVBad, Constants.QUALITY_VBAD);
        constants.put(NetworkQualityDown, Constants.QUALITY_DOWN);
        constants.put(ErrorCodeNoError, Constants.ERR_OK);
        constants.put(ErrorCodeFailed, Constants.ERR_FAILED);
        constants.put(ErrorCodeInvalidArgument, Constants.ERR_INVALID_ARGUMENT);
        constants.put(ErrorCodeTimedOut, Constants.ERR_TIMEDOUT);
        constants.put(ErrorCodeAlreadyInUse, Constants.ERR_ALREADY_IN_USE);
        constants.put(ErrorCodeEncryptedStreamNotAllowedPublished, Constants.ERR_ENCRYPTED_STREAM_NOT_ALLOWED_PUBLISHED);
        constants.put(InjectStreamStatusStartSuccess, Constants.INJECT_STREAM_STATUS_START_SUCCESS);
        constants.put(InjectStreamStatusStartAlreadyExist, Constants.INJECT_STREAM_STATUS_START_ALREADY_EXISTS);
        constants.put(InjectStreamStatusStartUnauthorized, Constants.INJECT_STREAM_STATUS_START_UNAUTHORIZED);
        constants.put(InjectStreamStatusStartTimeout, Constants.INJECT_STREAM_STATUS_START_TIMEDOUT);
        constants.put(InjectStreamStatusStartFailed, Constants.INJECT_STREAM_STATUS_START_FAILED);
        constants.put(InjectStreamStatusStopSuccess, Constants.INJECT_STREAM_STATUS_STOP_SUCCESS);
        constants.put(InjectStreamStatusStopNotFound, Constants.INJECT_STREAM_STATUS_STOP_NOT_FOUND);
        constants.put(InjectStreamStatusStopUnauthorized, Constants.INJECT_STREAM_STATUS_STOP_UNAUTHORIZED);
        constants.put(InjectStreamStatusStopTimeout, Constants.INJECT_STREAM_STATUS_STOP_TIMEDOUT);
        constants.put(InjectStreamStatusStopFailed, Constants.INJECT_STREAM_STATUS_STOP_FAILED);
        constants.put(InjectStreamStatusBroken, Constants.INJECT_STREAM_STATUS_BROKEN);
        constants.put(AudioSampleRateType32000, 32000);
        constants.put(AudioSampleRateType44100, 44100);
        constants.put(AudioSampleRateType48000, 48000);
        constants.put(FPS1, VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_1.getValue());
        constants.put(FPS7, VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_7.getValue());
        constants.put(FPS10, VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_10.getValue());
        constants.put(FPS15, VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_15.getValue());
        constants.put(FPS24, VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_24.getValue());
        constants.put(FPS30, VideoEncoderConfiguration.FRAME_RATE.FRAME_RATE_FPS_30.getValue());
        constants.put(AudioProfileDefault, Constants.AUDIO_PROFILE_DEFAULT);
        constants.put(AudioProfileSpeechStandard, Constants.AUDIO_PROFILE_SPEECH_STANDARD);
        constants.put(AudioProfileMusicStandard, Constants.AUDIO_PROFILE_MUSIC_STANDARD);
        constants.put(AgoraAudioProfileMusicStandardStereo, Constants.AUDIO_PROFILE_MUSIC_STANDARD_STEREO);
        constants.put(AudioProfileMusicHighQuality, Constants.AUDIO_PROFILE_MUSIC_HIGH_QUALITY);
        constants.put(AudioProfileMusicHighQualityStereo, Constants.AUDIO_PROFILE_MUSIC_HIGH_QUALITY_STEREO);
        constants.put(AudioScenarioDefault, Constants.AUDIO_SCENARIO_DEFAULT);
        constants.put(AudioScenarioChatRoomEntertainment, Constants.AUDIO_SCENARIO_CHATROOM_ENTERTAINMENT);
        constants.put(AudioScenarioEducation, Constants.AUDIO_SCENARIO_EDUCATION);
        constants.put(AudioScenarioGameStreaming, Constants.AUDIO_SCENARIO_GAME_STREAMING);
        constants.put(AudioScenarioShowRoom, Constants.AUDIO_SCENARIO_SHOWROOM);
        constants.put(AudioScenarioChatRoomGaming, Constants.AUDIO_SCENARIO_CHATROOM_GAMING);
        constants.put(AudioEqualizationBand31, Constants.AUDIO_EQUALIZATION_BAND_31);
        constants.put(AudioEqualizationBand62, Constants.AUDIO_EQUALIZATION_BAND_62);
        constants.put(AudioEqualizationBand125, Constants.AUDIO_EQUALIZATION_BAND_125);
        constants.put(AudioEqualizationBand250, Constants.AUDIO_EQUALIZATION_BAND_250);
        constants.put(AudioEqualizationBand500, Constants.AUDIO_EQUALIZATION_BAND_500);
        constants.put(AudioEqualizationBand1K, Constants.AUDIO_EQUALIZATION_BAND_1K);
        constants.put(AudioEqualizationBand2K, Constants.AUDIO_EQUALIZATION_BAND_2K);
        constants.put(AudioEqualizationBand4K, Constants.AUDIO_EQUALIZATION_BAND_4K);
        constants.put(AudioEqualizationBand8K, Constants.AUDIO_EQUALIZATION_BAND_8K);
        constants.put(AudioEqualizationBand16K, Constants.AUDIO_EQUALIZATION_BAND_16K);
        constants.put(AudioRawFrameOperationModeReadOnly, Constants.RAW_AUDIO_FRAME_OP_MODE_READ_ONLY);
        constants.put(AudioRawFrameOperationModeWriteOnly, Constants.RAW_AUDIO_FRAME_OP_MODE_WRITE_ONLY);
        constants.put(AudioRawFrameOperationModeReadWrite, Constants.RAW_AUDIO_FRAME_OP_MODE_READ_WRITE);
        constants.put(VideoStreamTypeHigh, Constants.VIDEO_STREAM_HIGH);
        constants.put(VideoStreamTypeLow, Constants.VIDEO_STREAM_LOW);
        constants.put(VideoMirrorModeAuto, Constants.VIDEO_MIRROR_MODE_AUTO);
        constants.put(VideoMirrorModeEnabled, Constants.VIDEO_MIRROR_MODE_ENABLED);
        constants.put(VideoMirrorModeDisabled, Constants.VIDEO_MIRROR_MODE_DISABLED);
        constants.put(CodecTypeBaseLine, 66);
        constants.put(CodecTypeMain, 77);
        constants.put(CodecTypeHigh, 100);
        constants.put(QualityLow, Constants.AUDIO_RECORDING_QUALITY_LOW);
        constants.put(QualityMedium, Constants.AUDIO_RECORDING_QUALITY_MEDIUM);
        constants.put(QualityHigh, Constants.AUDIO_RECORDING_QUALITY_HIGH);
        return constants;
    }

    private IRtcEngineEventHandler mRtcEventHandler = new IRtcEngineEventHandler() {

        @Override
        public void onWarning(final int code) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "AgoraWarning");
                    map.putInt("code", code);
                }
            });
        }

        @Override
        public void onError(final int code) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "AgoraError");
                    map.putInt("code", code);
                    sendEvent(getReactApplicationContext(), "onError", map);
                }
            });
        }

        @Override
        public void onJoinChannelSuccess(final String channel, final int uid, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("channel", channel);
                    map.putInt("uid", uid);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onJoinChannelSuccess", map);
                }
            });
        }

        @Override
        public void onRejoinChannelSuccess(final String channel, final int uid, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("channel", channel);
                    map.putInt("uid", uid);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onReJoinChannelSuccess", map);                }
            });
        }

        @Override
        public void onLeaveChannel(final RtcStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("totalDuration", stats.totalDuration);
                    statsMap.putInt("txBytes", stats.txBytes);
                    statsMap.putInt("rxBytes", stats.rxBytes);
                    statsMap.putInt("txKBitRate", stats.txKBitRate);
                    statsMap.putInt("rxKBitRate", stats.rxKBitRate);
                    statsMap.putInt("txAudioKBitRate", stats.txAudioKBitRate);
                    statsMap.putInt("rxAudioKBitRate", stats.rxAudioKBitRate);
                    statsMap.putInt("txVideoKBitRate", stats.txVideoKBitRate);
                    statsMap.putInt("rxVideoKBitRate", stats.rxVideoKBitRate);
                    statsMap.putInt("users", stats.users);
                    statsMap.putInt("lastmileDelay", stats.lastmileDelay);
                    statsMap.putDouble("cpuTotalUsage", stats.cpuTotalUsage);
                    statsMap.putDouble("cpuAppUsage", stats.cpuAppUsage);

                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), "onLeaveChannel", map);
                }
            });
        }

        @Override
        public void onClientRoleChanged(final int oldRole, final int newRole) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("oldRole", oldRole);
                    map.putInt("newRole", newRole);
                    sendEvent(getReactApplicationContext(), "onClientRoleChanged", map);
                }
            });
        }

        @Override
        public void onUserJoined(final int uid, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onUserJoined", map);
                }
            });
        }

        @Override
        public void onUserOffline(final int uid, final int reason) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("reason", reason);
                    sendEvent(getReactApplicationContext(), "onUserOffline", map);
                }
            });
        }

        @Override
        public void onConnectionStateChanged(final int state, final int reason) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("state", state);
                    map.putInt("reason", reason);
                    sendEvent(getReactApplicationContext(), "onConnectionStateChanged", map);
                }
            });
        }


        @Override
        public void onConnectionLost() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "onConnectionLost");
                    sendEvent(getReactApplicationContext(), "onConnectionLost", map);
                }
            });
        }

        @Override
        public void onApiCallExecuted(final int code, final String api, final String result) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    if (code != 0) {
                        WritableMap map = Arguments.createMap();
                        map.putInt("error", code);
                        map.putString("api", api);
                        map.putString("result", result);
                        sendEvent(getReactApplicationContext(), "onApiCallExecuted", map);
                    }
                }
            });
        }

        @Override
        public void onTokenPrivilegeWillExpire(final String token) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("token", token);
                    sendEvent(getReactApplicationContext(), "onTokenPrivilegeWillExpire", map);
                }
            });
        }

        @Override
        public void onRequestToken() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "RequestToken");
                    sendEvent(getReactApplicationContext(), "onRequestToken", map);
                }
            });
        }

        @Override
        public void onMicrophoneEnabled(final boolean enabled) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putBoolean("enabled", enabled);
                    sendEvent(getReactApplicationContext(), "onMicrophoneEnabled", map);
                }

            });
        }

        @Override
        public void onAudioVolumeIndication(final AudioVolumeInfo [] speakers, final int totalVolume) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {

                    WritableArray arr = Arguments.createArray();
                    for (int i = 0; i < speakers.length; i++) {
                        WritableMap obj = Arguments.createMap();
                        obj.putInt("uid", speakers[i].uid);
                        obj.putInt("volume", speakers[i].volume);
                        arr.pushMap(obj);
                    }

                    WritableMap map = Arguments.createMap();
                    map.putArray("speakers", arr);
                    map.putInt("totalVolume", totalVolume);
                    sendEvent(getReactApplicationContext(), "onAudioVolumeIndication", map);
                }
            });
        }

        @Override
        public void onActiveSpeaker(final int uid) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    sendEvent(getReactApplicationContext(), "onActiveSpeaker", map);
                }
            });
        }

        @Override
        public void onFirstLocalAudioFrame(final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onFirstLocalAudioFrame", map);
                }
            });
        }

        @Override
        public void onFirstRemoteAudioFrame(final int uid, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onFirstRemoteAudioFrame", map);
                }
            });
        }

        @Override
        public void onVideoStopped() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "VideoStopped");
                    sendEvent(getReactApplicationContext(), "onVideoStopped", map);
                }
            });
        }

        @Override
        public void onFirstLocalVideoFrame(final int width, final int height, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("width", width);
                    map.putInt("height", height);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onFirstLocalVideoFrame", map);
                }
            });
        }

        /**
         * onFirstRemoteVideoDecoded
         */
        @Override
        public void onFirstRemoteVideoDecoded(final int uid, final int width, final int height, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("width", width);
                    map.putInt("height", height);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onFirstRemoteVideoDecoded", map);
                }
            });
        }

        @Override
        public void onFirstRemoteVideoFrame(final int uid, final int width, final int height, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("width", width);
                    map.putInt("height", height);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), "onFirstRemoteVideoFrame", map);
                }
            });
        }

        @Override
        public void onUserMuteAudio(final int uid, final boolean muted) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putBoolean("muted", muted);
                    sendEvent(getReactApplicationContext(), "onUserMuteAudio", map);
                }
            });
        }

        @Override
        public void onUserMuteVideo(final int uid, final boolean muted) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putBoolean("muted", muted);
                    sendEvent(getReactApplicationContext(), "onUserMuteVideo", map);
                }
            });
        }

        @Override
        public void onUserEnableVideo(final int uid, final boolean muted) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putBoolean("muted", muted);
                    sendEvent(getReactApplicationContext(), "onUserEnableVideo", map);
                }
            });
        }

        @Override
        public void onUserEnableLocalVideo(final int uid, final boolean muted) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putBoolean("muted", muted);
                    sendEvent(getReactApplicationContext(), "onUserEnableLocalVideo", map);
                }
            });
        }

        @Override
        public void onVideoSizeChanged(final int uid, final int width, final int height, final int rotation) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("width", width);
                    map.putInt("height", height);
                    map.putInt("rotation", rotation);
                    sendEvent(getReactApplicationContext(), "onVideoSizeChanged", map);
                }
            });
        }

        @Override
        public void onRemoteVideoStateChanged(final int uid, final int state) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("state", state);
                    sendEvent(getReactApplicationContext(), "onRemoteVideoStateChanged", map);
                }
            });
        }

        @Override
        public void onLocalPublishFallbackToAudioOnly(final boolean isFallbackOrRecover) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putBoolean("isFallbackOrRecover", isFallbackOrRecover);
                    sendEvent(getReactApplicationContext(), "onLocalPublishFallbackToAudioOnly", map);
                }
            });
        }

        @Override
        public void onRemoteSubscribeFallbackToAudioOnly(final int uid, final boolean isFallbackOrRecover) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putBoolean("isFallbackOrRecover", isFallbackOrRecover);
                    sendEvent(getReactApplicationContext(), "onRemoteSubscribeFallbackToAudioOnly", map);
                }
            });
        }

        @Override
        public void onAudioRouteChanged(final int routing) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("routing", routing);
                    sendEvent(getReactApplicationContext(), "onAudioRouteChanged", map);
                }
            });
        }

        @Override
        public void onCameraReady() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "CameraDidReady");
                    sendEvent(getReactApplicationContext(), "onCameraReady", map);
                }
            });
        }

        @Override
        public void onCameraFocusAreaChanged(final Rect rect) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap rectMap = Arguments.createMap();
                    rectMap.putInt("top", rect.top);
                    rectMap.putInt("right", rect.right);
                    rectMap.putInt("bottom", rect.bottom);
                    rectMap.putInt("left", rect.left);
                    WritableMap map = Arguments.createMap();
                    map.putMap("rect", rectMap);
                    sendEvent(getReactApplicationContext(), "onCameraFocusAreaChanged", map);
                }
            });
        }

        @Override
        public void onCameraExposureAreaChanged(final Rect rect) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap rectMap = Arguments.createMap();
                    rectMap.putInt("top", rect.top);
                    rectMap.putInt("right", rect.right);
                    rectMap.putInt("bottom", rect.bottom);
                    rectMap.putInt("left", rect.left);
                    WritableMap map = Arguments.createMap();
                    map.putMap("rect", rectMap);
                    sendEvent(getReactApplicationContext(), "onCameraExposureAreaChanged", map);
                }
            });
        }

        @Override
        public void onRtcStats(final RtcStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("totalDuration", stats.totalDuration);
                    statsMap.putInt("txBytes", stats.txBytes);
                    statsMap.putInt("rxBytes", stats.rxBytes);
                    statsMap.putInt("txKBitRate", stats.txKBitRate);
                    statsMap.putInt("rxKBitRate", stats.rxKBitRate);
                    statsMap.putInt("txAudioKBitRate", stats.txAudioKBitRate);
                    statsMap.putInt("rxAudioKBitRate", stats.rxAudioKBitRate);
                    statsMap.putInt("txVideoKBitRate", stats.txVideoKBitRate);
                    statsMap.putInt("rxVideoKBitRate", stats.rxVideoKBitRate);
                    statsMap.putInt("users", stats.users);
                    statsMap.putInt("lastmileDelay", stats.lastmileDelay);
                    statsMap.putDouble("cpuTotalUsage", stats.cpuTotalUsage);
                    statsMap.putDouble("cpuAppUsage", stats.cpuAppUsage);

                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), "onRtcStats", map);
                }
            });
        }

        @Override
        public void onLastmileQuality(final int quality) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("quality", quality);
                    sendEvent(getReactApplicationContext(), "onLastmileQuality", map);
                }
            });
        }

        @Override
        public void onNetworkQuality(final int uid, final int txQuality, final int rxQuality) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("txQuality", txQuality);
                    map.putInt("rxQuality", rxQuality);
                    sendEvent(getReactApplicationContext(), "onNetworkQuality", map);
                }
            });
        }


        @Override
        public void onLocalVideoStats(final LocalVideoStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("sentBitrate", stats.sentBitrate);
                    statsMap.putInt("sentFrameRate", stats.sentFrameRate);

                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), "onLocalVideoStats", map);
                }
            });
        }

        @Override
        public void onRemoteVideoStats(final RemoteVideoStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("uid", stats.uid);
                    statsMap.putInt("delay", stats.delay);
                    statsMap.putInt("receivedBitrate", stats.receivedBitrate);
                    statsMap.putInt("receivedFrameRate", stats.receivedFrameRate);
                    statsMap.putInt("rxStreamType", stats.rxStreamType);
                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), "onRemoteVideoStats", map);
                }
            });
        }

        @Override
        public void onRemoteAudioStats(final RemoteAudioStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("uid", stats.uid);
                    statsMap.putInt("quality", stats.quality);
                    statsMap.putInt("networkTransportDelay", stats.networkTransportDelay);
                    statsMap.putInt("jitterBufferDelay", stats.jitterBufferDelay);
                    statsMap.putInt("audioLossRate", stats.audioLossRate);
                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), "onRemoteAudioStats", map);
                }
            });
        }

        @Override
        public void onRemoteAudioTransportStats(final int uid,
                                                final int delay,
                                                final int lost,
                                                final int rxKBitRate) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("uid", uid);
                    statsMap.putInt("delay", delay);
                    statsMap.putInt("lost", lost);
                    statsMap.putInt("rxKBitRate", rxKBitRate);
                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), "onRemoteAudioTransportStats", map);
                }
            });
        }

        @Override
        public void onRemoteVideoTransportStats(final int uid,
                                                final int delay,
                                                final int lost,
                                                final int rxKBitRate) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("uid", uid);
                    statsMap.putInt("delay", delay);
                    statsMap.putInt("lost", lost);
                    statsMap.putInt("rxKBitRate", rxKBitRate);
                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), "onRemoteVideoTransportStats", map);
                }
            });
        }

        @Override
        public void onAudioMixingFinished() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "LocalAudioMixingSucceedFinish");
                    sendEvent(getReactApplicationContext(), "onAudioMixingFinish", map);
                }
            });
        }

        @Override
        public void onAudioEffectFinished(final int soundId) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("soundId", soundId);
                    sendEvent(getReactApplicationContext(), "onAudioEffectFinished", map);
                }
            });
        }

        @Override
        public void onStreamPublished(final String url, final int error) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("url", url);
                    map.putInt("error", error);
                    sendEvent(getReactApplicationContext(), "onStreamPublished", map);
                }
            });
        }

        @Override
        public void onStreamUnpublished(final String url) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("url", url);
                    sendEvent(getReactApplicationContext(), "onStreamUnpublished", map);
                }
            });
        }

        @Override
        public void onTranscodingUpdated() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "TranscodingUpdated");
                    sendEvent(getReactApplicationContext(), "onTranscodingUpdated", map);
                }
            });
        }

        @Override
        public void onStreamInjectedStatus(final String url, final int uid, final int status) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("url", url);
                    map.putInt("uid", uid);
                    map.putInt("status", status);
                    sendEvent(getReactApplicationContext(), "onStreamInjectedStatus", map);
                }
            });
        }

        /**
         * onStreamMessage
         */
        @Override
        public void onStreamMessage(final int uid, final int streamId, final byte[] data) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    String msg = new String(data);
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("streamId", streamId);
                    map.putString("data", msg);
                    sendEvent(getReactApplicationContext(), "onStreamMessage", map);
                }
            });
        }

        @Override
        public void onStreamMessageError(final int uid, final int streamId, final int code, final int missed, final int cached) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("type", "onStreamMessageError");
                    map.putInt("uid", uid);
                    map.putInt("streamId", streamId);
                    map.putInt("error", code);
                    map.putInt("missed", missed);
                    map.putInt("cached", cached);
                    sendEvent(getReactApplicationContext(), "onStreamMessageError", map);
                }
            });
        }

        @Override
        public void onMediaEngineLoadSuccess() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "onMediaEngineLoadSuccess");
                    sendEvent(getReactApplicationContext(), "onMediaEngineLoadSuccess", map);
                }
            });
        }

        @Override
        public void onMediaEngineStartCallSuccess() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "onMediaEngineStartCallSuccess");
                    sendEvent(getReactApplicationContext(), "onMediaEngineStartCallSuccess", map);
                }
            });
        }
    };

    @ReactMethod
    public void init(ReadableMap options) {
        AgoraManager.getInstance().init(getReactApplicationContext(), mRtcEventHandler, options);
    }

    @ReactMethod
    public void renewToken(String token,
                           Promise promise) {
        try {
            int res = AgoraManager.getInstance().renewToken(token);
            if (res != 0) throw new ReactNativeAgoraException("renewToken Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131002", e);
        }
    }

    @ReactMethod
    public void enableWebSdkInteroperability(boolean enabled, Promise promise) {
        try {
            int res = AgoraManager.getInstance().enableWebSdkInteroperability(enabled);
            if (res != 0) throw new ReactNativeAgoraException("enableWebSdkInteroperability Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131003", e);
        }
    }

    @ReactMethod
    public void getConnectionState(Promise promise) {
        try {
            int res = AgoraManager.getInstance().getConnectionState();
            if (res != 0) throw new ReactNativeAgoraException("getConnectionState Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("state", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("141001", e);
        }
    }

    @ReactMethod
    public void setClientRole(int role) {
        try {
            int res = AgoraManager.getInstance().setClientRole(role);
            if (res != 0) throw new ReactNativeAgoraException("setClientRole Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void joinChannel(ReadableMap options) {
        try {
            int res = AgoraManager.getInstance().joinChannel(options);
            if (res != 0) throw new ReactNativeAgoraException("joinChannel Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            err.putInt("code", ((ReactNativeAgoraException) e).getCode());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void leaveChannel(Promise promise) {
        try {
            int res = AgoraManager.getInstance().leaveChannel();
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("141002", e);
        }
    }

    @ReactMethod
    public void destroy() {
        RtcEngine.destroy();
    }

    @ReactMethod
    public void setupLocalVideo() {
        try {
            int res = AgoraManager.getInstance().setupLocalVideo();
            if (res != 0) throw new ReactNativeAgoraException("setupLocalVideo Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void setupRemoteVideo(ReadableMap options) {
        try {
            int uid = options.getInt("uid");
            int res = AgoraManager.getInstance().setupRemoteVideo(uid);
            if (res != 0) throw new ReactNativeAgoraException("setupRemoteVideo Failed", res);
        } catch(Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void startPreview() {
        AgoraManager.getInstance().startPreview();
    }

    @ReactMethod
    public void stopPreview() {
        AgoraManager.getInstance().stopPreview();
    }

    @ReactMethod
    public void setEnableSpeakerphone(boolean enabled) {
        try {
            int res = AgoraManager.getInstance().setEnableSpeakerphone(enabled);
            if (res != 0) throw new ReactNativeAgoraException("setEnableSpeakerphone Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void setDefaultAudioRouteToSpeakerphone(boolean enabled) {
        try {
            int res = AgoraManager.getInstance().setDefaultAudioRouteToSpeakerphone(enabled);
            if (res != 0) throw new ReactNativeAgoraException("setDefaultAudioRouteToSpeakerphone Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void enableVideo() {
        AgoraManager.getInstance().mRtcEngine.enableVideo();
    }

    @ReactMethod
    public void disableVideo() {
        AgoraManager.getInstance().mRtcEngine.disableVideo();
    }

    @ReactMethod
    public void enableLocalVideo(boolean enabled) {
        AgoraManager.getInstance().mRtcEngine.enableLocalVideo(enabled);
    }

    @ReactMethod
    public void muteLocalVideoStream(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteLocalVideoStream(muted);
    }

    @ReactMethod
    public void muteAllRemoteVideoStreams(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteAllRemoteVideoStreams(muted);
    }

    @ReactMethod
    public void muteRemoteVideoStream(int uid, boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteRemoteVideoStream(uid, muted);
    }
    @ReactMethod
    public void setDefaultMuteAllRemoteVideoStreams(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.setDefaultMuteAllRemoteVideoStreams(muted);
    }

    @ReactMethod
    public void switchCamera(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.switchCamera();
            if (res != 0) throw new ReactNativeAgoraException("switchCamera Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void isCameraZoomSupported(Promise promise) {
        try {
            boolean res = AgoraManager.getInstance().mRtcEngine.isCameraZoomSupported();
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putBoolean("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    @ReactMethod
    public void isCameraTorchSupported(Promise promise) {
        try {
            boolean res = AgoraManager.getInstance().mRtcEngine.isCameraTorchSupported();
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putBoolean("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void isCameraFocusSupported(Promise promise) {
        try {
            boolean res = AgoraManager.getInstance().mRtcEngine.isCameraFocusSupported();
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putBoolean("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void isCameraExposurePositionSupported(Promise promise) {
        try {
            boolean res = AgoraManager.getInstance().mRtcEngine.isCameraExposurePositionSupported();
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putBoolean("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    @ReactMethod
    public void isCameraAutoFocusFaceModeSupported(Promise promise) {
        try {
            boolean res = AgoraManager.getInstance().mRtcEngine.isCameraAutoFocusFaceModeSupported();
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putBoolean("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setCameraZoomFactor(float factor, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setCameraZoomFactor(factor);
            if (res != 0) throw new ReactNativeAgoraException("setCameraZoomFactor Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setCameraFocusPositionInPreview(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setCameraFocusPositionInPreview(
                    (float)options.getDouble("x"),
                    (float)options.getDouble("y")
            );
            if (res != 0) throw new ReactNativeAgoraException("setCameraFocusPositionInPreview Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setCameraExposurePosition(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setCameraExposurePosition(
                    (float)options.getDouble("x"),
                    (float)options.getDouble("y")
            );
            if (res != 0) throw new ReactNativeAgoraException("setCameraExposurePosition Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setCameraTorchOn(boolean isOn, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setCameraTorchOn(isOn);
            if (res != 0) throw new ReactNativeAgoraException("setCameraTorchOn Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setCameraAutoFocusFaceModeEnabled(boolean enabled, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setCameraAutoFocusFaceModeEnabled(enabled);
            if (res != 0) throw new ReactNativeAgoraException("setCameraTorchOn Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getCallId(Promise promise) {
        try {
            String res = AgoraManager.getInstance().mRtcEngine.getCallId();
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putString("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setLog(String filePath, int level, Promise promise) {
        try {
            int res = 0;
            res = AgoraManager.getInstance().mRtcEngine.setLogFilter(level);
            if (res != 0) throw new ReactNativeAgoraException("setLogFilter Failed", res);
            res = AgoraManager.getInstance().mRtcEngine.setLogFile(filePath);
            if (res != 0) throw new ReactNativeAgoraException("setLogFile Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    @ReactMethod
    public void enableAudio() {
        AgoraManager.getInstance().mRtcEngine.enableAudio();
    }

    @ReactMethod
    public void disableAudio() {
        AgoraManager.getInstance().mRtcEngine.disableAudio();
    }

    @ReactMethod
    public void muteAllRemoteAudioStreams(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteAllRemoteAudioStreams(muted);
    }

    @ReactMethod
    public void muteRemoteAudioStream(int uid, boolean muted) {
        AgoraManager.getInstance().mRtcEngine.muteRemoteAudioStream(uid, muted);
    }

    @ReactMethod
    public void setDefaultMuteAllRemoteAudioStreams(boolean muted) {
        AgoraManager.getInstance().mRtcEngine.setDefaultMuteAllRemoteAudioStreams(muted);
    }

    @ReactMethod
    public void adjustRecordingSignalVolume(int volume) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.adjustRecordingSignalVolume(volume);
            if (res != 0) throw new ReactNativeAgoraException("adjustRecordingSignalVolume Failed", res);
        } catch(Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void adjustPlaybackSignalVolume(int volume) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.adjustPlaybackSignalVolume(volume);
            if (res != 0) throw new ReactNativeAgoraException("adjustPlaybackSignalVolume Failed", res);
        } catch(Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void enableAudioVolumeIndication(int interval, int smooth) {
        AgoraManager.getInstance().mRtcEngine.enableAudioVolumeIndication(interval, smooth);
    }

    @ReactMethod
    public void enableLocalAudio(boolean enabled) {
        AgoraManager.getInstance().mRtcEngine.enableLocalAudio(enabled);
    }

    @ReactMethod
    public void muteLocalAudioStream(boolean enabled) {
        AgoraManager.getInstance().mRtcEngine.muteLocalAudioStream(enabled);
    }

    @ReactMethod
    public void createDataStream(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .createDataStream(
                            options.getBoolean("ordered"),
                            options.getBoolean("reliable")
                            );
            if (res != 0) throw new ReactNativeAgoraException("adjustPlaybackSignalVolume Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putString("message", "createDataStream");
            promise.resolve(map);
        } catch(Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void methodisSpeakerphoneEnabled(Callback callback) {
        WritableMap map = Arguments.createMap();
        map.putBoolean("status", AgoraManager.getInstance().mRtcEngine.isSpeakerphoneEnabled());
        callback.invoke(map);
    }

    @ReactMethod
    public void enableInEarMonitoring(boolean enabled) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.enableInEarMonitoring(enabled);
            if (res != 0) throw new ReactNativeAgoraException("enableInEarMonitoring Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void setInEarMonitoringVolume(int volume) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setInEarMonitoringVolume(volume);
            if (res != 0) throw new ReactNativeAgoraException("setInEarMonitoringVolume Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void setLocalVoicePitch(double pitch) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setLocalVoicePitch(pitch);
            if (res != 0) throw new ReactNativeAgoraException("setLocalVoicePitch Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void setLocalVoiceEqualization(int band, int gain) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setLocalVoiceEqualization(band, gain);
            if (res != 0) throw new ReactNativeAgoraException("setLocalVoiceEqualization Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void setLocalVoiceReverb(int reverb, int value) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setLocalVoiceReverb(reverb, value);
            if (res != 0) throw new ReactNativeAgoraException("setLocalVoiceReverb Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void startAudioMixing(ReadableMap options) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.startAudioMixing(
                    options.getString("filepath"),
                    options.getBoolean("loopback"),
                    options.getBoolean("replace"),
                    options.getInt("cycle")
            );
            if (res != 0) throw new ReactNativeAgoraException("startAudioMixing Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void stopAudioMixing() {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.stopAudioMixing();
            if (res != 0) throw new ReactNativeAgoraException("stopAudioMixing Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void pauseAudioMixing() {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.pauseAudioMixing();
            if (res != 0) throw new ReactNativeAgoraException("pauseAudioMixing Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void resumeAudioMixing() {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.resumeAudioMixing();
            if (res != 0) throw new ReactNativeAgoraException("resumeAudioMixing Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void adjustAudioMixingVolume(int volume) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.adjustAudioMixingVolume(volume);
            if (res != 0) throw new ReactNativeAgoraException("adjustAudioMixingVolume Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void adjustAudioMixingPlayoutVolume(int volume) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.adjustAudioMixingPlayoutVolume(volume);
            if (res != 0) throw new ReactNativeAgoraException("adjustAudioMixingPlayoutVolume Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void adjustAudioMixingPublishVolume(int volume) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.adjustAudioMixingPublishVolume(volume);
            if (res != 0) throw new ReactNativeAgoraException("adjustAudioMixingPublishVolume Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void getAudioMixingDuration(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.getAudioMixingDuration();
            if (res != 0) throw new ReactNativeAgoraException("getAudioMixingDuration Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131004", e);
        }
    }

    @ReactMethod
    public void getAudioMixingCurrentPosition(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.getAudioMixingCurrentPosition();
            if (res != 0) throw new ReactNativeAgoraException("getAudioMixingCurrentPosition Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131005", e);
        }
    }

    @ReactMethod
    public void setAudioMixingPosition(int pos, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setAudioMixingPosition(pos);
            if (res != 0) throw new ReactNativeAgoraException("setAudioMixingPosition Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131006", e);
        }
    }

    @ReactMethod
    public void startAudioRecording(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .startAudioRecording(
                            options.getString("filePath"),
                            options.getInt("quality")
                    );
            if (res != 0) throw new ReactNativeAgoraException("startAudioRecording Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131007", e);
        }
    }

    @ReactMethod
    public void stopAudioRecording(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .stopAudioRecording();
            if (res != 0) throw new ReactNativeAgoraException("stopAudioRecording Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131008", e);
        }
    }

    @ReactMethod
    public void startEchoTest(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .startEchoTest();
            if (res != 0) throw new ReactNativeAgoraException("startEchoTest Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131009", e);
        }
    }

    @ReactMethod
    public void stopEchoTest(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .stopEchoTest();
            if (res != 0) throw new ReactNativeAgoraException("stopEchoTest Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131010", e);
        }
    }

    @ReactMethod
    public void enableLastmileTest(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .enableLastmileTest();
            if (res != 0) throw new ReactNativeAgoraException("enableLastmileTest Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131021", e);
        }
    }

    @ReactMethod
    public void disableLastmileTest(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .enableLastmileTest();
            if (res != 0) throw new ReactNativeAgoraException("disableLastmileTest Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131022", e);
        }
    }

    @ReactMethod
    public void setRecordingAudioFrameParameters(WritableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .setRecordingAudioFrameParameters(
                            options.getInt("sampleRate"),
                            options.getInt("channel"),
                            options.getInt("mode"),
                            options.getInt("samplesPerCall")
                    );
            if (res != 0) throw new ReactNativeAgoraException("setRecordingAudioFrameParameters Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131023", e);
        }
    }

    @ReactMethod
    public void setPlaybackAudioFrameParameters(WritableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .setPlaybackAudioFrameParameters(
                            options.getInt("sampleRate"),
                            options.getInt("channel"),
                            options.getInt("mode"),
                            options.getInt("samplesPerCall")
                    );
            if (res != 0) throw new ReactNativeAgoraException("setPlaybackAudioFrameParameters Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131024", e);
        }
    }

    @ReactMethod
    public void setMixedAudioFrameParameters(WritableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .setMixedAudioFrameParameters(
                            options.getInt("sampleRate"),
                            options.getInt("samplesPerCall")
                    );
            if (res != 0) throw new ReactNativeAgoraException("setMixedAudioFrameParameters Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131025", e);
        }
    }

    public AgoraImage createAgoraImage(ReadableMap options) {
        AgoraImage image = new AgoraImage();
        image.url = options.getString("url");
        image.height = options.getInt("height");
        image.width = options.getInt("width");
        image.x = options.getInt("x");
        image.y = options.getInt("y");
        return image;
    }

    @ReactMethod
    public void addVideoWatermark(WritableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .addVideoWatermark(createAgoraImage(options));
            if (res != 0) throw new ReactNativeAgoraException("addVideoWatermark Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131026", e);
        }
    }

    @ReactMethod
    public void clearVideoWatermarks(Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .clearVideoWatermarks();
            if (res != 0) throw new ReactNativeAgoraException("clearVideoWatermarks Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131027", e);
        }
    }

    @ReactMethod
    public void setLocalPublishFallbackOption(int option, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .setLocalPublishFallbackOption(option);
            if (res != 0) throw new ReactNativeAgoraException("setLocalPublishFallbackOption Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131028", e);
        }
    }

    @ReactMethod
    public void setRemoteSubscribeFallbackOption(int option, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .setRemoteSubscribeFallbackOption(option);
            if (res != 0) throw new ReactNativeAgoraException("setRemoteSubscribeFallbackOption Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131029", e);
        }
    }

    @ReactMethod
    public void enableDualStreamMode(boolean enabled, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .enableDualStreamMode(enabled);
            if (res != 0) throw new ReactNativeAgoraException("enableDualStreamMode Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131028", e);
        }
    }


    @ReactMethod
    public void setRemoteVideoStreamType(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .setRemoteVideoStreamType(
                            options.getInt("uid"),
                            options.getInt("streamType")
                        );
            if (res != 0) throw new ReactNativeAgoraException("setRemoteVideoStreamType Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131029", e);
        }
    }

    @ReactMethod
    public void setRemoteDefaultVideoStreamType(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .setRemoteDefaultVideoStreamType(
                            options.getInt("streamType")
                    );
            if (res != 0) throw new ReactNativeAgoraException("setRemoteDefaultVideoStreamType Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131030", e);
        }
    }

    public LiveInjectStreamConfig.AudioSampleRateType getAudioSampleRateEnum (int val) {
        LiveInjectStreamConfig.AudioSampleRateType type = LiveInjectStreamConfig.AudioSampleRateType.TYPE_32000;
        switch (Integer.valueOf(val)) {
            case 32000:
                type = LiveInjectStreamConfig.AudioSampleRateType.TYPE_32000;
                break;
            case 44100:
                type = LiveInjectStreamConfig.AudioSampleRateType.TYPE_44100;
                break;
            case 48000:
                type = LiveInjectStreamConfig.AudioSampleRateType.TYPE_48000;
                break;
        }
        return type;
    }

    public LiveTranscoding.AudioSampleRateType getLiveTranscodingAudioSampleRateEnum (int val) {
        LiveTranscoding.AudioSampleRateType type = LiveTranscoding.AudioSampleRateType.TYPE_32000;
        switch (Integer.valueOf(val)) {
            case 32000:
                type = LiveTranscoding.AudioSampleRateType.TYPE_32000;
                break;
            case 44100:
                type = LiveTranscoding.AudioSampleRateType.TYPE_44100;
                break;
            case 48000:
                type = LiveTranscoding.AudioSampleRateType.TYPE_48000;
                break;
        }
        return type;
    }


    public LiveTranscoding.VideoCodecProfileType getLiveTranscodingVideoCodecProfileEnum (int val) {
        LiveTranscoding.VideoCodecProfileType type = LiveTranscoding.VideoCodecProfileType.BASELINE;
        switch (Integer.valueOf(val)) {
            case 66:
                type = LiveTranscoding.VideoCodecProfileType.BASELINE;
                break;
            case 77:
                type = LiveTranscoding.VideoCodecProfileType.MAIN;
                break;
            case 100:
                type = LiveTranscoding.VideoCodecProfileType.HIGH;
                break;
        }
        return type;
    }



    @ReactMethod
    public void addInjectStreamUrl(ReadableMap options, Promise promise) {
        try {
            LiveInjectStreamConfig config = new LiveInjectStreamConfig();
            config.width = options.getInt("width");
            config.height = options.getInt("height");
            config.videoGop = options.getInt("videoGop");
            config.videoBitrate = options.getInt("videoBitrate");
            config.videoFramerate = options.getInt("videoFramerate");
            config.audioBitrate = options.getInt("audioBitrate");
            config.audioSampleRate = getAudioSampleRateEnum(options.getInt("audioSampleRate"));
            config.audioChannels = options.getInt("audioChannels");


            int res = AgoraManager.getInstance().mRtcEngine
                    .addInjectStreamUrl(
                            options.getString("url"),
                            config
                    );
            if (res != 0) throw new ReactNativeAgoraException("addInjectStreamUrl Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131031", e);
        }
    }

    @ReactMethod
    public void removeInjectStreamUrl(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .removeInjectStreamUrl(options.getString("url"));
            if (res != 0) throw new ReactNativeAgoraException("removeInjectStreamUrl Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131032", e);
        }
    }

    @ReactMethod
    public void addPublishStreamUrl(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .addPublishStreamUrl(
                            options.getString("url"),
                            options.getBoolean("enable")
                    );
            if (res != 0) throw new ReactNativeAgoraException("addPublishStreamUrl Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131033", e);
        }
    }

    @ReactMethod
    public void removePublishStreamUrl(ReadableMap options, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine
                    .removePublishStreamUrl(options.getString("url"));
            if (res != 0) throw new ReactNativeAgoraException("removePublishStreamUrl Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject("131034", e);
        }
    }

    @ReactMethod
    public void setLiveTranscoding(ReadableMap options) {
        try {
            LiveTranscoding transcoding = new LiveTranscoding();
            ReadableMap size = options.getMap("size");
            if (size != null) {
                transcoding.width = size.getInt("width");
                transcoding.height = size.getInt("height");
            }
            if (options.hasKey("videoBitrate")) {
                transcoding.videoBitrate = options.getInt("videoBitrate");
            }
            if (options.hasKey("videoFramerate")) {
                transcoding.videoFramerate = options.getInt("videoFramerate");
            }
            if (options.hasKey("lowLatency")) {
                transcoding.lowLatency = options.getBoolean("lowLatency");
            }
            if (options.hasKey("videoGop")) {
                transcoding.videoGop = options.getInt("videoGop");
            }
            if (options.hasKey("videoCodecProfile")) {
                transcoding.videoCodecProfile = getLiveTranscodingVideoCodecProfileEnum(options.getInt("videoCodecProfile"));
            }
            if (options.hasKey("transcodingUsers")) {
                ArrayList<LiveTranscoding.TranscodingUser> users = new ArrayList<LiveTranscoding.TranscodingUser>();
                ReadableArray transcodingUsers = options.getArray("transcodingUsers");
                for (int i = 0; i < transcodingUsers.size(); i++) {
                    ReadableMap _map = transcodingUsers.getMap(i);
                    LiveTranscoding.TranscodingUser user = new LiveTranscoding.TranscodingUser();
                    user.uid = _map.getInt("uid");
                    ReadableMap backgroundColor = _map.getMap("backgroundColor");
                    user.x = backgroundColor.getInt("x");
                    user.y = backgroundColor.getInt("y");
                    user.width = backgroundColor.getInt("width");
                    user.height = backgroundColor.getInt("height");
                    user.zOrder = _map.getInt("zOrder");
                    user.alpha = _map.getInt("alpha");
                    user.audioChannel = _map.getInt("audioChannel");
                    users.add(user);
                }
                transcoding.setUsers(users);
            }
            if (options.hasKey("transcodingExtraInfo")) {
                transcoding.userConfigExtraInfo = options.getString("transcodingExtraInfo");
            }
            if (options.hasKey("watermark")) {
                ReadableMap watermark = options.getMap("watermark");
                WritableMap map = Arguments.createMap();
                map.putString("url", watermark.getString("url"));
                map.putString("x", watermark.getString("x"));
                map.putString("y", watermark.getString("y"));
                map.putString("width", watermark.getString("width"));
                map.putString("height", watermark.getString("height"));
                transcoding.watermark = createAgoraImage(map);
            }
            if (options.hasKey("backgroundImage")) {
                ReadableMap watermark = options.getMap("backgroundImage");
                WritableMap map = Arguments.createMap();
                map.putString("url", watermark.getString("url"));
                map.putString("x", watermark.getString("x"));
                map.putString("y", watermark.getString("y"));
                map.putString("width", watermark.getString("width"));
                map.putString("height", watermark.getString("height"));
                transcoding.backgroundImage = createAgoraImage(map);
            }
            if (options.hasKey("backgroundColor")) {
                ReadableMap backgroundColor = options.getMap("backgroundColor");
                transcoding.setBackgroundColor(
                        backgroundColor.getInt("red"),
                        backgroundColor.getInt("green"),
                        backgroundColor.getInt("blue")
                );
            }
            if (options.hasKey("audioSampleRate")) {
                transcoding.audioSampleRate = getLiveTranscodingAudioSampleRateEnum(options.getInt("audioSampleRate"));
            }
            if (options.hasKey("audioBitrate")) {
                transcoding.audioChannels = options.getInt("audioBitrate");
            }
            if (options.hasKey("audioChannels")) {
                transcoding.audioChannels = options.getInt("audioChannel");
            }
            int res = AgoraManager.getInstance().mRtcEngine.setLiveTranscoding(transcoding);
            if (res != 0) throw new ReactNativeAgoraException("setLiveTranscoding Failed", res);
        } catch (Exception e) {
            WritableMap err = Arguments.createMap();
            err.putBoolean("success", false);
            err.putString("message", e.toString());
            sendEvent(getReactApplicationContext(), "onError", err);
        }
    }

    @ReactMethod
    public void getEffectsVolume(Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            double res = manager.getEffectsVolume();
            if (res < 0) throw new ReactNativeAgoraException("getEffectsVolume Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putDouble("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setEffectsVolume(double volume, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.setEffectsVolume(volume);
            if (res != 0) throw new ReactNativeAgoraException("setEffectsVolume Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    @ReactMethod
    public void setVolumeOfEffect(int soundId, double volume, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.setVolumeOfEffect(soundId, volume);
            if (res != 0) throw new ReactNativeAgoraException("setVolumeOfEffect Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putDouble("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void playEffect(ReadableMap options, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.playEffect(
                    options.getInt("soundId"),
                    options.getString("filePath"),
                    options.getInt("loopCount"),
                    options.getDouble("pitch"),
                    options.getDouble("pan"),
                    options.getDouble("gain"),
                    options.getBoolean("publish")
            );
            if (res != 0) throw new ReactNativeAgoraException("playEffect Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    @ReactMethod
    public void stopEffect(int soundId, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.stopEffect(soundId);
            if (res != 0) throw new ReactNativeAgoraException("stopEffect Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void stopAllEffects(Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.stopAllEffects();
            if (res != 0) throw new ReactNativeAgoraException("stopAllEffects Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void preloadEffect(int soundId, String filePath, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.preloadEffect(soundId, filePath);
            if (res != 0) throw new ReactNativeAgoraException("preloadEffect Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void unloadEffect(int soundId, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.unloadEffect(soundId);
            if (res != 0) throw new ReactNativeAgoraException("unloadEffect Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void pauseEffect(int soundId, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.pauseEffect(soundId);
            if (res != 0) throw new ReactNativeAgoraException("pauseEffect Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void pauseAllEffects(Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.pauseAllEffects();
            if (res != 0) throw new ReactNativeAgoraException("pauseAllEffects Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void resumeEffect(int soundId, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.resumeEffect(soundId);
            if (res != 0) throw new ReactNativeAgoraException("resumeEffect Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void resumeAllEffects(int soundId, Promise promise) {
        try {
            IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
            int res = manager.resumeAllEffects();
            if (res != 0) throw new ReactNativeAgoraException("resumeAllEffects Failed", (int)res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }


    //配置旁路直播推流
    @ReactMethod
    public void configPublisher(ReadableMap options) {
        PublisherConfiguration config = new PublisherConfiguration.Builder()
                .owner(options.getBoolean("owner"))
                .size(options.getInt("width"), options.getInt("height"))
                .frameRate(options.getInt("framerate"))
//                .biteRate(options.getInt("bitrate"))
                .defaultLayout(options.getInt("defaultLayout"))
                .streamLifeCycle(options.getInt("lifeCycle"))
                .rawStreamUrl(options.getString("rawStreamUrl"))
                .publishUrl(options.getString("publishUrl"))
                .extraInfo(options.getString("extraInfo"))
                .build();

        AgoraManager.getInstance().mRtcEngine.configPublisher(config);
    }

    //设置本地视频显示模式
    @ReactMethod
    public void setLocalRenderMode(int mode) {
        AgoraManager.getInstance().mRtcEngine.setLocalRenderMode(mode);
    }

    //设置远端视频显示模式
    @ReactMethod
    public void setRemoteRenderMode(int uid, int mode) {
        AgoraManager.getInstance().mRtcEngine.setRemoteRenderMode(uid, mode);
    }

    @ReactMethod
    public void sendStreamMessage(int streamId, String data, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.sendStreamMessage(streamId, data.getBytes());
            if (res != 0) throw new ReactNativeAgoraException("sendStreamMessage Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void getSdkVersion(Promise promise) {
        try {
            String res = AgoraManager.getInstance().mRtcEngine.getSdkVersion();
            promise.resolve(res);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setVideoQualityParameters(boolean quality, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setVideoQualityParameters(quality);
            if (res != 0) throw new ReactNativeAgoraException("sendStreamMessage Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            map.putInt("value", res);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    @ReactMethod
    public void setLocalVideoMirrorMode(int mode, Promise promise) {
        try {
            int res = AgoraManager.getInstance().mRtcEngine.setLocalVideoMirrorMode(mode);
            if (res != 0) throw new ReactNativeAgoraException("setLocalVideoMirrorMode Failed", res);
            WritableMap map = Arguments.createMap();
            map.putBoolean("success", true);
            promise.resolve(map);
        } catch (Exception e) {
            promise.reject(e);
        }
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

}
