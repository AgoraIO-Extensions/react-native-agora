package com.syan.agora;

import android.graphics.Rect;
import android.support.annotation.Nullable;
import android.view.SurfaceView;

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


import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import io.agora.rtc.Constants;
import io.agora.rtc.IAudioEffectManager;
import io.agora.rtc.IMetadataObserver;
import io.agora.rtc.IRtcEngineEventHandler;
import io.agora.rtc.RtcEngine;
import io.agora.rtc.RtcEngineEx;
import io.agora.rtc.internal.LastmileProbeConfig;
import io.agora.rtc.live.LiveInjectStreamConfig;
import io.agora.rtc.live.LiveTranscoding;
import io.agora.rtc.models.UserInfo;
import io.agora.rtc.video.AgoraImage;
import io.agora.rtc.video.BeautyOptions;
import io.agora.rtc.video.CameraCapturerConfiguration;
import io.agora.rtc.video.ChannelMediaInfo;
import io.agora.rtc.video.ChannelMediaRelayConfiguration;
import io.agora.rtc.video.VideoEncoderConfiguration;
import io.agora.rtc.video.WatermarkOptions;

import static com.facebook.react.bridge.UiThreadUtil.runOnUiThread;
import static com.syan.agora.AgoraConst.*;

public class AgoraModule extends ReactContextBaseJavaModule {

    private static final String FPS1 = "FPS1";
    private static final String FPS7 = "FPS7";
    private static final String FPS10 = "FPS10";
    private static final String FPS15 = "FPS15";
    private static final String FPS24 = "FPS24";
    private static final String FPS30 = "FPS30";
    private static final String FPS60 = "FPS60";
    private static final String Adaptative = "Adaptative";
    private static final String FixedLandscape = "FixedLandscape";
    private static final String FixedPortrait = "FixedPortrait";
    private static final String Host = "Host";
    private static final String Audience = "Audience";
    private static final String UserOfflineReasonQuit = "UserOfflineReasonQuit";
    private static final String UserOfflineReasonDropped = "UserOfflineReasonDropped";
    private static final String UserOfflineReasonBecomeAudience = "UserOfflineReasonBecomeAudience";
    private static final String AudioSampleRateType32000 = "AudioSampleRateType32000";
    private static final String AudioSampleRateType44100 = "AudioSampleRateType44100";
    private static final String AudioSampleRateType48000 = "AudioSampleRateType48000";
    private static final String CodecTypeBaseLine = "CodecTypeBaseLine";
    private static final String CodecTypeMain = "CodecTypeMain";
    private static final String CodecTypeHigh = "CodecTypeHigh";
    private static final String QualityLow = "QualityLow";
    private static final String QualityMedium = "QualityMedium";
    private static final String QualityHigh = "QualityHigh";
    private static final String Disconnected = "Disconnected";
    private static final String Connecting = "Connecting";
    private static final String Connected = "Connected";
    private static final String Reconnecting = "Reconnecting";
    private static final String ConnectionFailed = "ConnectionFailed";
    private static final String ConnectionChangedConnecting = "ConnectionChangedConnecting";
    private static final String ConnectionChangedJoinSuccess =  "ConnectionChangedJoinSuccess";
    private static final String ConnectionChangedInterrupted = "ConnectionChangedInterrupted";
    private static final String ConnectionChangedBannedByServer = "ConnectionChangedBannedByServer";
    private static final String ConnectionChangedJoinFailed = "ConnectionChangedJoinFailed";
    private static final String ConnectionChangedLeaveChannel = "ConnectionChangedLeaveChannel";
    private static final String AudioOutputRoutingDefault = "AudioOutputRoutingDefault";
    private static final String AudioOutputRoutingHeadset = "AudioOutputRoutingHeadset";
    private static final String AudioOutputRoutingEarpiece = "AudioOutputRoutingEarpiece";
    private static final String AudioOutputRoutingHeadsetNoMic = "AudioOutputRoutingHeadsetNoMic";
    private static final String AudioOutputRoutingSpeakerphone = "AudioOutputRoutingSpeakerphone";
    private static final String AudioOutputRoutingLoudspeaker = "AudioOutputRoutingLoudspeaker";
    private static final String AudioOutputRoutingHeadsetBluetooth = "AudioOutputRoutingHeadsetBluetooth";
    private static final String NetworkQualityUnknown = "NetworkQualityUnknown";
    private static final String NetworkQualityExcellent = "NetworkQualityExcellent";
    private static final String NetworkQualityGood = "NetworkQualityGood";
    private static final String NetworkQualityPoor = "NetworkQualityPoor";
    private static final String NetworkQualityBad = "NetworkQualityBad";
    private static final String NetworkQualityVBad = "NetworkQualityVBad";
    private static final String NetworkQualityDown = "NetworkQualityDown";
    private static final String AudioProfileDefault = "AudioProfileDefault";
    private static final String AudioProfileSpeechStandard = "AudioProfileSpeechStandard";
    private static final String AudioProfileMusicStandard = "AudioProfileMusicStandard";
    private static final String AgoraAudioProfileMusicStandardStereo = "AudioProfileMusicStandardStereo";
    private static final String AudioProfileMusicHighQuality = "AudioProfileMusicHighQuality";
    private static final String AudioProfileMusicHighQualityStereo = "AudioProfileMusicHighQualityStereo";
    private static final String AudioScenarioDefault = "AudioScenarioDefault";
    private static final String AudioScenarioChatRoomEntertainment = "AudioScenarioChatRoomEntertainment";
    private static final String AudioScenarioEducation = "AudioScenarioEducation";
    private static final String AudioScenarioGameStreaming = "AudioScenarioGameStreaming";
    private static final String AudioScenarioShowRoom = "AudioScenarioShowRoom";
    private static final String AudioScenarioChatRoomGaming = "AudioScenarioChatRoomGaming";
    private static final String AudioEqualizationBand31 = "AudioEqualizationBand31";
    private static final String AudioEqualizationBand62 = "AudioEqualizationBand62";
    private static final String AudioEqualizationBand125 = "AudioEqualizationBand125";
    private static final String AudioEqualizationBand250 = "AudioEqualizationBand250";
    private static final String AudioEqualizationBand500 = "AudioEqualizationBand500";
    private static final String AudioEqualizationBand1K = "AudioEqualizationBand1K";
    private static final String AudioEqualizationBand2K = "AudioEqualizationBand2K";
    private static final String AudioEqualizationBand4K = "AudioEqualizationBand4K";
    private static final String AudioEqualizationBand8K = "AudioEqualizationBand8K";
    private static final String AudioEqualizationBand16K = "AudioEqualizationBand16K";
    private static final String AudioRawFrameOperationModeReadOnly = "AudioRawFrameOperationModeReadOnly";
    private static final String AudioRawFrameOperationModeWriteOnly = "AudioRawFrameOperationModeWriteOnly";
    private static final String AudioRawFrameOperationModeReadWrite = "AudioRawFrameOperationModeReadWrite";
    private static final String VideoStreamTypeHigh = "VideoStreamTypeHigh";
    private static final String VideoStreamTypeLow = "VideoStreamTypeLow";
    private static final String VideoMirrorModeAuto = "VideoMirrorModeAuto";
    private static final String VideoMirrorModeEnabled = "VideoMirrorModeEnabled";
    private static final String VideoMirrorModeDisabled = "VideoMirrorModeDisabled";
    private static final String ChannelProfileCommunication = "ChannelProfileCommunication";
    private static final String ChannelProfileLiveBroadcasting = "ChannelProfileLiveBroadcasting";
    private static final String ChannelProfileGame = "ChannelProfileGame";
    private static final String ErrorCodeNoError = "ErrorCodeNoError";
    private static final String ErrorCodeFailed = "ErrorCodeFailed";
    private static final String ErrorCodeInvalidArgument = "ErrorCodeInvalidArgument";
    private static final String ErrorCodeTimedOut = "ErrorCodeTimedOut";
    private static final String ErrorCodeAlreadyInUse = "ErrorCodeAlreadyInUse";
    private static final String ErrorCodeEncryptedStreamNotAllowedPublished = "ErrorCodeEncryptedStreamNotAllowedPublished";
    private static final String InjectStreamStatusStartSuccess = "InjectStreamStatusStartSuccess";
    private static final String InjectStreamStatusStartAlreadyExist = "InjectStreamStatusStartAlreadyExist";
    private static final String InjectStreamStatusStartUnauthorized = "InjectStreamStatusStartUnauthorized";
    private static final String InjectStreamStatusStartTimeout = "InjectStreamStatusStartTimeout";
    private static final String InjectStreamStatusStartFailed = "InjectStreamStatusStartFailed";
    private static final String InjectStreamStatusStopSuccess = "InjectStreamStatusStopSuccess";
    private static final String InjectStreamStatusStopNotFound = "InjectStreamStatusStopNotFound";
    private static final String InjectStreamStatusStopUnauthorized = "InjectStreamStatusStopUnauthorized";
    private static final String InjectStreamStatusStopTimeout = "InjectStreamStatusStopTimeout";
    private static final String InjectStreamStatusStopFailed = "InjectStreamStatusStopFailed";
    private static final String InjectStreamStatusBroken = "InjectStreamStatusBroken";
    private static final String AgoraAudioMode = "AudioMode";
    private static final String AgoraVideoMode = "VideoMode";

    private RtcEngine rtcEngine;
    private String appId;

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
        constants.put(ChannelProfileCommunication, Constants.CHANNEL_PROFILE_COMMUNICATION);
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
        constants.put(AgoraAudioMode, 0);
        constants.put(AgoraVideoMode, 1);
        return constants;
    }


//    private final static String AGIntervalTest = "startEchoTestWithInterval";

    private MediaObserver mediaObserver = null;

    private IRtcEngineEventHandler mRtcEventHandler = new IRtcEngineEventHandler() {

        @Override
        public void onWarning(final int code) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "AgoraWarning");
                    map.putInt("errorCode", code);
                    sendEvent(getReactApplicationContext(), AGWarning, map);
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
                    map.putInt("errorCode", code);
                    sendEvent(getReactApplicationContext(), AGError, map);
                }
            });
        }

        @Override
        public void onApiCallExecuted(final int code, final String api, final String result) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("errorCode", code);
                    map.putString("api", api);
                    map.putString("result", result);
                    if (code != 0) {
                        sendEvent(getReactApplicationContext(), AGError, map);
                    } else {
                        sendEvent(getReactApplicationContext(), AGApiCallExecute, map);
                    }
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
                    sendEvent(getReactApplicationContext(), AGJoinChannelSuccess, map);
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
                    sendEvent(getReactApplicationContext(), AGRejoinChannelSuccess, map);
                }
            });
        }

        @Override
        public void onLeaveChannel(final RtcStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("duration", stats.totalDuration);
                    statsMap.putInt("txBytes", stats.txBytes);
                    statsMap.putInt("rxBytes", stats.rxBytes);
                    statsMap.putInt("txAudioBytes", stats.txAudioBytes);
                    statsMap.putInt("txVideoBytes", stats.txVideoBytes);
                    statsMap.putInt("rxAudioBytes", stats.rxAudioBytes);
                    statsMap.putInt("rxVideoBytes", stats.rxVideoBytes);
                    statsMap.putInt("txKBitRate", stats.txKBitRate);
                    statsMap.putInt("rxKBitRate", stats.rxKBitRate);
                    statsMap.putInt("txAudioKBitRate", stats.txAudioKBitRate);
                    statsMap.putInt("rxAudioKBitRate", stats.rxAudioKBitRate);
                    statsMap.putInt("txVideoKBitRate", stats.txVideoKBitRate);
                    statsMap.putInt("rxVideoKBitRate", stats.rxVideoKBitRate);
                    statsMap.putInt("lastmileDelay", stats.lastmileDelay);
                    statsMap.putInt("userCount", stats.users);
                    statsMap.putDouble("cpuAppUsage", stats.cpuAppUsage);
                    statsMap.putDouble("cpuTotalUsage", stats.cpuTotalUsage);
                    statsMap.putInt("txPacketLossRate", stats.txPacketLossRate);
                    statsMap.putInt("rxPacketLossRate", stats.rxPacketLossRate);

                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), AGLeaveChannel, map);
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
                    sendEvent(getReactApplicationContext(), AGClientRoleChanged, map);
                }
            });
        }

        @Override
        public void onLocalUserRegistered(final int uid, final String userAccount) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putString("userAccount", userAccount);
                    sendEvent(getReactApplicationContext(), AGLocalUserRegistered, map);
                }
            });
        }

        @Override
        public void onUserInfoUpdated(final int uid, final UserInfo peer) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    WritableMap peerInfo = Arguments.createMap();
                    peerInfo.putInt("uid", peer.uid);
                    peerInfo.putString("userAccount", peer.userAccount);
                    map.putMap("peer", peerInfo);
                    sendEvent(getReactApplicationContext(), AGUserInfoUpdated, map);
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
                    sendEvent(getReactApplicationContext(), AGUserJoined, map);
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
                    sendEvent(getReactApplicationContext(), AGUserOffline, map);
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
                    sendEvent(getReactApplicationContext(), AGConnectionStateChanged, map);
                }
            });
        }


        @Override
        public void onConnectionLost() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "connectionLost");
                    sendEvent(getReactApplicationContext(), AGConnectionLost, map);
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
                    sendEvent(getReactApplicationContext(), AGTokenPrivilegeWillExpire, map);
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
                    sendEvent(getReactApplicationContext(), AGRequestToken, map);
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
                        obj.putInt("vad", speakers[i].vad);
                        arr.pushMap(obj);
                    }

                    WritableMap map = Arguments.createMap();
                    map.putArray("speakers", arr);
                    map.putInt("totalVolume", totalVolume);
                    sendEvent(getReactApplicationContext(), AGAudioVolumeIndication, map);
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
                    sendEvent(getReactApplicationContext(), AGActiveSpeaker, map);
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
                    sendEvent(getReactApplicationContext(), AGFirstLocalAudioFrame, map);
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
                    sendEvent(getReactApplicationContext(), AGFirstRemoteAudioFrame, map);
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
                    sendEvent(getReactApplicationContext(), AGFirstLocalVideoFrame, map);
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
                    sendEvent(getReactApplicationContext(), AGFirstRemoteVideoFrame, map);
                }
            });
        }

        @Override
        public void onUserMuteAudio(final int uid, final boolean muted) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putBoolean("muted", muted);
                    map.putInt("uid", uid);
                    sendEvent(getReactApplicationContext(), AGUserMuteAudio, map);
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
                    sendEvent(getReactApplicationContext(), AGVideoSizeChanged, map);
                }
            });
        }

        @Override
        public void onRtmpStreamingStateChanged(final String url, final int state, final int errCode) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("url", url);
                    map.putInt("state", state);
                    map.putInt("errorCode", errCode);
                    sendEvent(getReactApplicationContext(), AGRtmpStreamingStateChanged, map);
                }
            });
        }

        @Override
        public void onNetworkTypeChanged(final int type) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("type", type);
                    sendEvent(getReactApplicationContext(), AGNetworkTypeChanged, map);
                }
            });
        }


        @Override
        public void onLocalAudioStateChanged(final int state, final int errCode) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("state", state);
                    map.putInt("errorCode", errCode);
                    sendEvent(getReactApplicationContext(), AGLocalAudioStateChanged, map);
                }
            });
        }
        @Override
        public void onRemoteAudioStateChanged(final int uid,
                                              final int state,
                                              final int reason,
                                              final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("state", state);
                    map.putInt("reason", reason);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), AGRemoteAudioStateChanged, map);
                }
            });
        }

        @Override
        public void onFirstRemoteAudioDecoded(final int uid, final int elapsed) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), AGFirstRemoteAudioDecoded, map);
                }
            });
        }

        @Override
        public void onRemoteVideoStateChanged(final int uid,
                                              final int state,
                                              final int reason,
                                              final int elapsed)  {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("state", state);
                    map.putInt("reason", reason);
                    map.putInt("elapsed", elapsed);
                    sendEvent(getReactApplicationContext(), AGRemoteVideoStateChanged, map);
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
                    sendEvent(getReactApplicationContext(), AGLocalPublishFallbackToAudioOnly, map);
                }
            });
        }

        @Override
        public void onRemoteSubscribeFallbackToAudioOnly(final int uid, final boolean isFallbackOrRecover) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putBoolean("isFallbackOrRecover", isFallbackOrRecover);
                    map.putInt("uid", uid);
                    sendEvent(getReactApplicationContext(), AGRemoteSubscribeFallbackToAudioOnly, map);
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
                    sendEvent(getReactApplicationContext(), AGAudioRouteChanged, map);
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
                    sendEvent(getReactApplicationContext(), AGCameraFocusAreaChanged, map);
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
                    sendEvent(getReactApplicationContext(), AGCameraExposureAreaChanged, map);
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
                    statsMap.putInt("totalFrozenTime", stats.totalFrozenTime);
                    statsMap.putInt("frozenRate", stats.frozenRate);
                    statsMap.putInt("numChannels", stats.numChannels);
                    statsMap.putInt("receivedSampleRate", stats.receivedSampleRate);
                    statsMap.putInt("receivedBitrate", stats.receivedBitrate);
                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), AGRemoteAudioStats, map);
                }
            });
        }

        @Override
        public void onRtcStats(final RtcStats stats) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap statsMap = Arguments.createMap();
                    statsMap.putInt("duration", stats.totalDuration);
                    statsMap.putInt("txBytes", stats.txBytes);
                    statsMap.putInt("rxBytes", stats.rxBytes);
                    statsMap.putInt("txAudioBytes", stats.txAudioBytes);
                    statsMap.putInt("txVideoBytes", stats.txVideoBytes);
                    statsMap.putInt("rxAudioBytes", stats.rxAudioBytes);
                    statsMap.putInt("rxVideoBytes", stats.rxVideoBytes);
                    statsMap.putInt("txKBitRate", stats.txKBitRate);
                    statsMap.putInt("rxKBitRate", stats.rxKBitRate);
                    statsMap.putInt("txAudioKBitRate", stats.txAudioKBitRate);
                    statsMap.putInt("rxAudioKBitRate", stats.rxAudioKBitRate);
                    statsMap.putInt("txVideoKBitRate", stats.txVideoKBitRate);
                    statsMap.putInt("rxVideoKBitRate", stats.rxVideoKBitRate);
                    statsMap.putInt("lastmileDelay", stats.lastmileDelay);
                    statsMap.putInt("userCount", stats.users);
                    statsMap.putDouble("cpuAppUsage", stats.cpuAppUsage);
                    statsMap.putDouble("cpuTotalUsage", stats.cpuTotalUsage);
                    statsMap.putInt("txPacketLossRate", stats.txPacketLossRate);
                    statsMap.putInt("rxPacketLossRate", stats.rxPacketLossRate);

                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), AGRtcStats, map);
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
                    sendEvent(getReactApplicationContext(), AGLastmileQuality, map);
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
                    sendEvent(getReactApplicationContext(), AGNetworkQuality, map);
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
                    statsMap.putInt("encoderOutputFrameRate", stats.encoderOutputFrameRate);
                    statsMap.putInt("rendererOutputFrameRate", stats.rendererOutputFrameRate);
                    statsMap.putInt("targetBitrate", stats.targetBitrate);
                    statsMap.putInt("targetFrameRate", stats.targetFrameRate);
                    statsMap.putInt("qualityAdaptIndication", stats.qualityAdaptIndication);
                    statsMap.putInt("encodedBitrate", stats.encodedBitrate);
                    statsMap.putInt("encodedFrameWidth", stats.encodedFrameWidth);
                    statsMap.putInt("encodedFrameHeight", stats.encodedFrameHeight);
                    statsMap.putInt("encodedFrameCount", stats.encodedFrameCount);
                    statsMap.putInt("codecType", stats.codecType);
                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), AGLocalVideoStats, map);
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
                    statsMap.putInt("width", stats.width);
                    statsMap.putInt("height", stats.height);
                    statsMap.putInt("receivedBitrate", stats.receivedBitrate);
                    statsMap.putInt("decoderOutputFrameRate", stats.decoderOutputFrameRate);
                    statsMap.putInt("rendererOutputFrameRate", stats.rendererOutputFrameRate);
                    statsMap.putInt("packetLossRate", stats.packetLossRate);
                    statsMap.putInt("rxStreamType", stats.rxStreamType);
                    statsMap.putInt("totalFrozenTime", stats.totalFrozenTime);
                    statsMap.putInt("frozenRate", stats.frozenRate);
                    WritableMap map = Arguments.createMap();
                    map.putMap("stats", statsMap);
                    sendEvent(getReactApplicationContext(), AGRemoteVideoStats, map);
                }
            });
        }

        @Override
        public void onAudioMixingStateChanged(final int state, final int errorCode) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("state", state);
                    map.putInt("errorCode", errorCode);
                    sendEvent(getReactApplicationContext(), AGAudioMixingStateChanged, map);
                }
            });
        }

        @Override
        public void onAudioEffectFinished(final int soundId) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("soundid", soundId);
                    sendEvent(getReactApplicationContext(), AGAudioEffectFinish, map);
                }
            });
        }

        @Override
        public void onStreamPublished(final String url, final int errorCode) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("url", url);
                    map.putInt("errorCode", errorCode);
                    sendEvent(getReactApplicationContext(), AGStreamPublished, map);
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
                    sendEvent(getReactApplicationContext(), AGStreamUnpublish, map);
                }
            });
        }

        @Override
        public void onTranscodingUpdated() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "AGTranscodingUpdate");
                    sendEvent(getReactApplicationContext(), AGTranscodingUpdate, map);
                }
            });
        }

        @Override
        public void onStreamInjectedStatus(final String url, final int uid, final int status) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putString("url", url);
                    map.putInt("status", status);
                    sendEvent(getReactApplicationContext(), AGStreamInjectedStatus, map);
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
                    String msg = new String(data, Charset.forName("UTF-8"));
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("streamId", streamId);
                    map.putString("data", msg);
                    sendEvent(getReactApplicationContext(), AGReceiveStreamMessage, map);
                }
            });
        }

        @Override
        public void onStreamMessageError(final int uid, final int streamId, final int error, final int missed, final int cached) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("uid", uid);
                    map.putInt("streamId", streamId);
                    map.putInt("errorCode", error);
                    map.putInt("missed", missed);
                    map.putInt("cached", cached);
                    sendEvent(getReactApplicationContext(), AGOccurStreamMessageError, map);
                }
            });
        }

        @Override
        public void onMediaEngineLoadSuccess() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "MediaEngineLoaded");
                    sendEvent(getReactApplicationContext(), AGMediaEngineLoaded, map);
                }
            });
        }

        @Override
        public void onMediaEngineStartCallSuccess() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "MediaEngineStartCall");
                    sendEvent(getReactApplicationContext(), AGMediaEngineStartCall, map);
                }
            });
        }

        @Override
        public void onLastmileProbeResult(LastmileProbeResult result) {
            super.onLastmileProbeResult(result);
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "LastmileProbeTestResult");
                    sendEvent(getReactApplicationContext(), AGLastmileProbeResult, map);
                }
            });
        }

        @Override
        public void onLocalVideoStateChanged(final int localVideoState, final int error) {
            super.onLocalVideoStateChanged(localVideoState, error);
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putString("message", "LocalVideoChanged");
                    map.putInt("state", localVideoState);
                    sendEvent(getReactApplicationContext(), AGLocalVideoChanged, map);
                }
            });
        }

        @Override
        public void onChannelMediaRelayEvent(final int code) {
            super.onChannelMediaRelayEvent(code);
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("errorCode", code);
                    sendEvent(getReactApplicationContext(), AGReceivedChannelMediaRelay, map);
                }
            });
        }

        @Override
        public void onChannelMediaRelayStateChanged(final int state, final int code) {
            super.onChannelMediaRelayStateChanged(state, code);
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("state", state);
                    map.putInt("errorCode", code);
                    sendEvent(getReactApplicationContext(), AGMediaRelayStateChanged, map);
                }
            });
        }

        @Override
        public void onLocalAudioStats(final LocalAudioStats rtcStats) {
            super.onLocalAudioStats(rtcStats);
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    WritableMap map = Arguments.createMap();
                    map.putInt("numChannels", rtcStats.numChannels);
                    map.putInt("sentSampleRate", rtcStats.sentSampleRate);
                    map.putInt("sentBitrate", rtcStats.sentBitrate);
                    sendEvent(getReactApplicationContext(), AGLocalAudioStats, map);
                }
            });
        }
    };

    public void setAppType(RtcEngineEx engineEx) {
        engineEx.setAppType(8);
    }

    @ReactMethod
    public void init(ReadableMap options) {
        AgoraManager.getInstance().init(getReactApplicationContext(), mRtcEventHandler, options);
        appId = options.getString("appid");
        rtcEngine = AgoraManager.getInstance().mRtcEngine;
        setAppType((RtcEngineEx) rtcEngine);
    }

    @ReactMethod
    public void renewToken(String token,
                           Promise promise) {
        Integer res = AgoraManager.getInstance().renewToken(token);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableWebSdkInteroperability(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().enableWebSdkInteroperability(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getConnectionState(Promise promise) {
        Integer res = AgoraManager.getInstance().getConnectionState();
        if (res == 0) {
            promise.resolve(null);
        } else  {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setClientRole(int role, Promise promise) {
        Integer res = AgoraManager.getInstance().setClientRole(role);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    private String channelName = null;

    @ReactMethod
    public void joinChannel(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().joinChannel(options);
        if (res == 0) {
            String channelName = options.getString("channelName");
            this.channelName = channelName;
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void registerLocalUserAccount(ReadableMap options, Promise promise) {
        Integer res = rtcEngine.registerLocalUserAccount(appId, options.getString("userAccount"));
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void joinChannelWithUserAccount(ReadableMap options, Promise promise) {
        String token = null;
        if (options.hasKey("token")) {
            token = options.getString("token");
        }
        String channelName = options.getString("channelName");
        Integer res = rtcEngine.joinChannelWithUserAccount(token, options.getString("channelName"), options.getString("userAccount"));
        if (res == 0) {
            this.channelName = channelName;
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getUserInfoByUid(Integer uid, Promise promise) {
        UserInfo info = new UserInfo();
        Integer res = rtcEngine.getUserInfoByUid(uid, info);
        if (res == 0) {
            WritableMap map = Arguments.createMap();
            map.putInt("uid", info.uid);
            map.putString("userAccount", info.userAccount);
            promise.resolve(map);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getUserInfoByUserAccount(String userAccount, Promise promise) {
        UserInfo info = new UserInfo();
        Integer res = rtcEngine.getUserInfoByUserAccount(userAccount, info);
        if (res == 0) {
            WritableMap map = Arguments.createMap();
            map.putInt("uid", info.uid);
            map.putString("userAccount", info.userAccount);
            promise.resolve(map);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void switchChannel(ReadableMap options, Promise promise) {
        String token = null;
        String channel = null;
        if (options.hasKey("token")) {
            token = options.getString("token");
        }
        if (options.hasKey("channelName")) {
            channel = options.getString("channelName");
        }
        Integer res = AgoraManager.getInstance().mRtcEngine.switchChannel(token, channel);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void leaveChannel(Promise promise) {
        Integer res = AgoraManager.getInstance().leaveChannel();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void destroy() {
        RtcEngine.destroy();
    }

    @ReactMethod
    public void startChannelMediaRelay(ReadableMap options, Promise promise) {
        ChannelMediaRelayConfiguration config = new ChannelMediaRelayConfiguration();
        ChannelMediaInfo src = config.getSrcChannelMediaInfo();
        if (options.hasKey("src")) {
            ReadableMap srcOption = options.getMap("src");
            if (srcOption.hasKey("token")) {
                src.token = srcOption.getString("token");
            }
            if (srcOption.hasKey("channelName")) {
                src.channelName = srcOption.getString("channelName");
            }
        }
        ReadableArray dstMediaInfo = options.getArray("channels");
        for (int i = 0; i < dstMediaInfo.size(); i++) {
            ReadableMap dst = dstMediaInfo.getMap(i);
            String channelName = null;
            String token = null;
            Integer uid = 0;
            if (dst.hasKey("token")) {
                token = token;
            }
            if (dst.hasKey("channelName")) {
                channelName = dst.getString("channelName");
            }
            if (dst.hasKey("uid")) {
                uid = dst.getInt("uid");
            }
            config.setDestChannelInfo(channelName, new ChannelMediaInfo(channelName, token, uid));
        }
        Integer res = AgoraManager.getInstance().mRtcEngine.startChannelMediaRelay(config);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void removeChannelMediaRelay(ReadableMap options, Promise promise) {
        ChannelMediaRelayConfiguration config = new ChannelMediaRelayConfiguration();
        ChannelMediaInfo src = config.getSrcChannelMediaInfo();
        if (options.hasKey("src")) {
            ReadableMap srcOption = options.getMap("src");
            if (srcOption.hasKey("token")) {
                src.token = srcOption.getString("token");
            }
            if (srcOption.hasKey("channelName")) {
                src.channelName = srcOption.getString("channelName");
            }
        }
        ReadableArray dstMediaInfo = options.getArray("channels");
        for (int i = 0; i < dstMediaInfo.size(); i++) {
            ReadableMap dst = dstMediaInfo.getMap(i);
            if (dst.hasKey("channelName")) {
                channelName = dst.getString("channelName");
                config.removeDestChannelInfo(channelName);
            }
        }
        Integer res = AgoraManager.getInstance().mRtcEngine.updateChannelMediaRelay(config);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void updateChannelMediaRelay(ReadableMap options, Promise promise) {
        ChannelMediaRelayConfiguration config = new ChannelMediaRelayConfiguration();
        ChannelMediaInfo src = config.getSrcChannelMediaInfo();
        if (options.hasKey("src")) {
            ReadableMap srcOption = options.getMap("src");
            if (srcOption.hasKey("token")) {
                src.token = srcOption.getString("token");
            }
            if (srcOption.hasKey("channelName")) {
                src.channelName = srcOption.getString("channelName");
            }
        }
        ReadableArray dstMediaInfo = options.getArray("channels");
        for (int i = 0; i < dstMediaInfo.size(); i++) {
            ReadableMap dst = dstMediaInfo.getMap(i);
            String channelName = null;
            String token = null;
            Integer uid = 0;
            if (dst.hasKey("token")) {
                token = token;
            }
            if (dst.hasKey("channelName")) {
                channelName = dst.getString("channelName");
            }
            if (dst.hasKey("uid")) {
                uid = dst.getInt("uid");
            }
            config.setDestChannelInfo(src.channelName, new ChannelMediaInfo(channelName, token, uid));
        }
        Integer res = AgoraManager.getInstance().mRtcEngine.updateChannelMediaRelay(config);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void stopChannelMediaRelay(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.stopChannelMediaRelay();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void startPreview(Promise promise) {
        Integer res = AgoraManager.getInstance().startPreview();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void stopPreview(Promise promise) {
        Integer res = AgoraManager.getInstance().stopPreview();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setEnableSpeakerphone(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().setEnableSpeakerphone(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setDefaultAudioRouteToSpeakerphone(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().setDefaultAudioRouteToSpeakerphone(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableVideo(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.enableVideo();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void disableVideo(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.disableVideo();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableLocalVideo(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.enableLocalVideo(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void muteLocalVideoStream(boolean muted, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.muteLocalVideoStream(muted);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void muteAllRemoteVideoStreams(boolean muted, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.muteAllRemoteVideoStreams(muted);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void muteRemoteVideoStream(int uid, boolean muted, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.muteRemoteVideoStream(uid, muted);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }
    @ReactMethod
    public void setDefaultMuteAllRemoteVideoStreams(boolean muted, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setDefaultMuteAllRemoteVideoStreams(muted);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void switchCamera(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.switchCamera();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getCameraInfo(Promise promise) {
        WritableMap map = Arguments.createMap();
        WritableMap supportMap = Arguments.createMap();
        supportMap.putBoolean("zoom", AgoraManager.getInstance().mRtcEngine.isCameraZoomSupported());
        supportMap.putBoolean("torch", AgoraManager.getInstance().mRtcEngine.isCameraTorchSupported());
        supportMap.putBoolean("focusPositionInPreview", AgoraManager.getInstance().mRtcEngine.isCameraTorchSupported());
        supportMap.putBoolean("exposurePosition", AgoraManager.getInstance().mRtcEngine.isCameraTorchSupported());
        supportMap.putBoolean("autoFocusFaceMode", AgoraManager.getInstance().mRtcEngine.isCameraAutoFocusFaceModeSupported());
//        supportMap.putDouble("maxZoomFactor", AgoraManager.getInstance().mRtcEngine.getCameraMaxZoomFactor());
        map.putMap("support", supportMap);
        promise.resolve(map);
    }

    @ReactMethod
    public void setCameraZoomFactor(float factor, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setCameraZoomFactor(factor);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setCameraFocusPositionInPreview(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setCameraFocusPositionInPreview(
                (float)options.getDouble("x"),
                (float)options.getDouble("y")
        );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setCameraExposurePosition(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setCameraExposurePosition(
                (float)options.getDouble("x"),
                (float)options.getDouble("y")
        );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setCameraTorchOn(boolean isOn, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setCameraTorchOn(isOn);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setCameraAutoFocusFaceModeEnabled(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setCameraAutoFocusFaceModeEnabled(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getCallId(Promise promise) {
        String res = AgoraManager.getInstance().mRtcEngine.getCallId();
        WritableMap map = Arguments.createMap();
        map.putString("id", res);
        promise.resolve(map);
    }

    @ReactMethod
    public void setLog(String filePath, int level, int size, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLogFileSize(size);
        if (res < 0) {
            promise.reject("-1", res.toString());
            return;
        }
        res = AgoraManager.getInstance().mRtcEngine.setLogFilter(level);
        if (res < 0) {
            promise.reject("-1", res.toString());
            return;
        }
        res = AgoraManager.getInstance().mRtcEngine.setLogFile(filePath);
        if (res < 0) {
            promise.reject("-1", res.toString());
            return;
        }
        promise.resolve(null);
    }


    @ReactMethod
    public void enableAudio(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.enableAudio();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void disableAudio(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.disableAudio();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void muteAllRemoteAudioStreams(boolean muted, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.muteAllRemoteAudioStreams(muted);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void muteRemoteAudioStream(int uid, boolean muted, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.muteRemoteAudioStream(uid, muted);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setDefaultMuteAllRemoteAudioStreams(boolean muted, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setDefaultMuteAllRemoteAudioStreams(muted);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void adjustRecordingSignalVolume(int volume, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.adjustRecordingSignalVolume(volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void adjustPlaybackSignalVolume(int volume, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.adjustPlaybackSignalVolume(volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableAudioVolumeIndication(int interval, int smooth, boolean vad, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.enableAudioVolumeIndication(interval, smooth, vad);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableLocalAudio(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.enableLocalAudio(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void muteLocalAudioStream(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.muteLocalAudioStream(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void createDataStream(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .createDataStream(
                        options.getBoolean("ordered"),
                        options.getBoolean("reliable")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void isSpeakerphoneEnabled(Callback callback) {
        WritableMap map = Arguments.createMap();
        map.putBoolean("status", AgoraManager.getInstance().mRtcEngine.isSpeakerphoneEnabled());
        callback.invoke(map);
    }

    @ReactMethod
    public void enableInEarMonitoring(boolean enabled, Promise promise) {
        Integer res  = AgoraManager.getInstance().mRtcEngine.enableInEarMonitoring(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setInEarMonitoringVolume(int volume, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setInEarMonitoringVolume(volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setLocalVoicePitch(double pitch, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLocalVoicePitch(pitch);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setLocalVoiceEqualization(int band, int gain, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLocalVoiceEqualization(band, gain);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setLocalVoiceReverb(int reverb, int value, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLocalVoiceReverb(reverb, value);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void startAudioMixing(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.startAudioMixing(
                options.getString("filepath"),
                options.getBoolean("loopback"),
                options.getBoolean("replace"),
                options.getInt("cycle")
        );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void stopAudioMixing(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.stopAudioMixing();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void pauseAudioMixing(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.pauseAudioMixing();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void resumeAudioMixing(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.resumeAudioMixing();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void adjustAudioMixingVolume(int volume, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.adjustAudioMixingVolume(volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void adjustAudioMixingPlayoutVolume(int volume, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.adjustAudioMixingPlayoutVolume(volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void adjustAudioMixingPublishVolume(int volume, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.adjustAudioMixingPublishVolume(volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getAudioMixingPlayoutVolume(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.getAudioMixingPlayoutVolume();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getAudioMixingPublishVolume(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.getAudioMixingPlayoutVolume();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getAudioMixingDuration(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.getAudioMixingDuration();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getAudioMixingCurrentPosition(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.getAudioMixingCurrentPosition();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setAudioMixingPosition(int pos, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setAudioMixingPosition(pos);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void startAudioRecording(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .startAudioRecording(
                        options.getString("filepath"),
                        options.getInt("sampleRate"),
                        options.getInt("quality")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void stopAudioRecording(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .stopAudioRecording();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void stopEchoTest(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .stopEchoTest();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableLastmileTest(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .enableLastmileTest();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void disableLastmileTest(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .disableLastmileTest();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setRecordingAudioFrameParameters(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .setRecordingAudioFrameParameters(
                        options.getInt("sampleRate"),
                        options.getInt("channel"),
                        options.getInt("mode"),
                        options.getInt("samplesPerCall")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setPlaybackAudioFrameParameters(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .setPlaybackAudioFrameParameters(
                        options.getInt("sampleRate"),
                        options.getInt("channel"),
                        options.getInt("mode"),
                        options.getInt("samplesPerCall")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setMixedAudioFrameParameters(WritableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .setMixedAudioFrameParameters(
                        options.getInt("sampleRate"),
                        options.getInt("samplesPerCall")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
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
    public void addVideoWatermark(ReadableMap options, Promise promise) {
        String url = options.getString("url");
        ReadableMap watermarkOptions = options.getMap("options");
        ReadableMap positionLandscapeOptions = watermarkOptions.getMap("positionInPortraitMode");
        WatermarkOptions watermarkOpts = new WatermarkOptions();
        WatermarkOptions.Rectangle landscapePosition = new WatermarkOptions.Rectangle();
        landscapePosition.height = positionLandscapeOptions.getInt("height");
        landscapePosition.width = positionLandscapeOptions.getInt("width");
        landscapePosition.x = positionLandscapeOptions.getInt("x");
        landscapePosition.y = positionLandscapeOptions.getInt("y");

        ReadableMap positionPortraitOptions = watermarkOptions.getMap("positionInPortraitMode");
        WatermarkOptions.Rectangle portraitPosition = new WatermarkOptions.Rectangle();
        portraitPosition.height = positionPortraitOptions.getInt("height");
        portraitPosition.width = positionPortraitOptions.getInt("width");
        portraitPosition.x = positionPortraitOptions.getInt("x");
        portraitPosition.y = positionPortraitOptions.getInt("y");

        watermarkOpts.positionInLandscapeMode = landscapePosition;
        watermarkOpts.visibleInPreview = watermarkOptions.getBoolean("visibleInPreview");
        watermarkOpts.positionInPortraitMode = portraitPosition;
        Integer res = AgoraManager.getInstance().mRtcEngine
                .addVideoWatermark(url, watermarkOpts);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void clearVideoWatermarks(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .clearVideoWatermarks();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setLocalPublishFallbackOption(int option, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .setLocalPublishFallbackOption(option);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setRemoteSubscribeFallbackOption(int option, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .setRemoteSubscribeFallbackOption(option);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableDualStreamMode(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .enableDualStreamMode(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }


    @ReactMethod
    public void setRemoteVideoStreamType(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .setRemoteVideoStreamType(
                        options.getInt("uid"),
                        options.getInt("streamType")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setRemoteDefaultVideoStreamType(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .setRemoteDefaultVideoStreamType(
                        options.getInt("streamType")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void sendMediaData(String data, final Promise promise) {
        if (null == mediaObserver) {
            promise.reject("-1", "-1");
        } else {
            mediaObserver.setMetadata(data.getBytes(Charset.forName("UTF-8")));
            promise.resolve(null);
        }
    }

    @ReactMethod
    public void registerMediaMetadataObserver(final Promise promise) {
        mediaObserver = new MediaObserver(getReactApplicationContext());
        Integer res = AgoraManager.getInstance().mRtcEngine
                .registerMediaMetadataObserver(mediaObserver, IMetadataObserver.VIDEO_METADATA);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    private static boolean recording = false;

    // TODO: need implementation
    @ReactMethod
    public void startAVRecording(final ReadableMap option, final Promise promise) {
        String path = option.getString("path");
        Integer uid = option.getInt("uid");
        String format = option.getString("format");
        if (true == recording) {
            promise.reject("-1", "recording already started");
        }
        SurfaceView view = AgoraManager.getInstance().getSurfaceView(uid);
        if (null == view) {
            promise.reject("-1", "recording already started");
        }
    }

    // TODO: need implementation
    @ReactMethod
    public void stopAVRecording(final Promise promise) {
        if (false == recording) {
            promise.reject("-1", "recording didn't start");
        } else {
            promise.resolve(null);
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

    public LiveTranscoding.AudioCodecProfileType getLiveTranscodingAudioCodecProfileEnum (int val) {
        LiveTranscoding.AudioCodecProfileType type = LiveTranscoding.AudioCodecProfileType.LC_AAC;
        switch (Integer.valueOf(val)) {
            case 0:
                type = LiveTranscoding.AudioCodecProfileType.LC_AAC;
                break;
            case 1:
                type = LiveTranscoding.AudioCodecProfileType.HE_AAC;
                break;
        }
        return type;
    }



    @ReactMethod
    public void addInjectStreamUrl(ReadableMap options, Promise promise) {
        LiveInjectStreamConfig injectstream = new LiveInjectStreamConfig();
        ReadableMap config = options.getMap("config");
        ReadableMap size = config.getMap("size");
        injectstream.width = size.getInt("width");
        injectstream.height = size.getInt("height");
        injectstream.videoGop = config.getInt("videoGop");
        injectstream.videoBitrate = config.getInt("videoBitrate");
        injectstream.videoFramerate = config.getInt("videoFramerate");
        injectstream.audioBitrate = config.getInt("audioBitrate");
        injectstream.audioSampleRate = getAudioSampleRateEnum(config.getInt("audioSampleRate"));
        injectstream.audioChannels = config.getInt("audioChannels");

        Integer res = AgoraManager.getInstance().mRtcEngine
                .addInjectStreamUrl(
                        options.getString("url"),
                        injectstream
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void removeInjectStreamUrl(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .removeInjectStreamUrl(options.getString("url"));
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void addPublishStreamUrl(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .addPublishStreamUrl(
                        options.getString("url"),
                        options.getBoolean("enable")
                );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void removePublishStreamUrl(ReadableMap options, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine
                .removePublishStreamUrl(options.getString("url"));
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setLiveTranscoding(ReadableMap options, Promise promise) {
        LiveTranscoding transcoding = new LiveTranscoding();
        if (options.hasKey("size")) {
            ReadableMap size = options.getMap("size");
            transcoding.width = size.getInt("width");
            transcoding.height = size.getInt("height");
        }
        if (options.hasKey("videoBitrate")) {
            transcoding.videoBitrate = options.getInt("videoBitrate");
        }
        if (options.hasKey("videoFramerate")) {
            transcoding.videoFramerate = options.getInt("videoFramerate");
        }
        if (options.hasKey("videoGop")) {
            transcoding.videoGop = options.getInt("videoGop");
        }
        if (options.hasKey("videoCodecProfile")) {
            transcoding.videoCodecProfile = getLiveTranscodingVideoCodecProfileEnum(options.getInt("videoCodecProfile"));
        }
        if (options.hasKey("audioCodecProfile")) {
            transcoding.audioCodecProfile = getLiveTranscodingAudioCodecProfileEnum(options.getInt("audioCodecProfile"));
        }
        if (options.hasKey("audioSampleRate")) {
            transcoding.audioSampleRate = getLiveTranscodingAudioSampleRateEnum(options.getInt("audioSampleRate"));
        }
        if (options.hasKey("watermark")) {
            ReadableMap watermark = options.getMap("watermark");
            WritableMap map = Arguments.createMap();
            map.putString("url", watermark.getString("url"));
            map.putInt("x", watermark.getInt("x"));
            map.putInt("y", watermark.getInt("y"));
            map.putInt("width", watermark.getInt("width"));
            map.putInt("height", watermark.getInt("height"));
            transcoding.watermark = createAgoraImage(map);
        }
        if (options.hasKey("backgroundImage")) {
            ReadableMap image = options.getMap("backgroundImage");
            WritableMap map = Arguments.createMap();
            map.putString("url", image.getString("url"));
            map.putInt("x", image.getInt("x"));
            map.putInt("y", image.getInt("y"));
            map.putInt("width", image.getInt("width"));
            map.putInt("height", image.getInt("height"));
            transcoding.backgroundImage = createAgoraImage(map);
        }
        if (options.hasKey("backgroundColor")) {
            transcoding.setBackgroundColor(options.getInt("backgroundColor"));
        }
        if (options.hasKey("audioBitrate")) {
            transcoding.audioBitrate = options.getInt("audioBitrate");
        }
        if (options.hasKey("audioChannels")) {
            transcoding.audioChannels = options.getInt("audioChannels");
        }
        if (options.hasKey("transcodingUsers")) {
            ArrayList<LiveTranscoding.TranscodingUser> users = new ArrayList<LiveTranscoding.TranscodingUser>();
            ReadableArray transcodingUsers = options.getArray("transcodingUsers");
            for (int i = 0; i < transcodingUsers.size(); i++) {
                ReadableMap optionUser = transcodingUsers.getMap(i);
                LiveTranscoding.TranscodingUser user = new LiveTranscoding.TranscodingUser();
                user.uid = optionUser.getInt("uid");
                user.x = optionUser.getInt("x");
                user.y = optionUser.getInt("y");
                user.width = optionUser.getInt("width");
                user.height = optionUser.getInt("height");
                user.zOrder = optionUser.getInt("zOrder");
                user.alpha = (float) optionUser.getDouble("alpha");
                user.audioChannel = optionUser.getInt("audioChannel");
                users.add(user);
            }
            transcoding.setUsers(users);
        }
        if (options.hasKey("transcodingExtraInfo")) {
            transcoding.userConfigExtraInfo = options.getString("transcodingExtraInfo");
        }
        Integer res = AgoraManager.getInstance().mRtcEngine.setLiveTranscoding(transcoding);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getEffectsVolume(Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Double res = manager.getEffectsVolume();
        if (res < 0) {
            promise.reject("-1", res.toString());
        } else {
            WritableMap map = Arguments.createMap();
            map.putDouble("value", res);
            promise.resolve(map);
        }
    }

    @ReactMethod
    public void setEffectsVolume(double volume, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.setEffectsVolume(volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }


    @ReactMethod
    public void setVolumeOfEffect(int soundId, double volume, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.setVolumeOfEffect(soundId, volume);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void playEffect(ReadableMap options, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.playEffect(
                options.getInt("soundid"),
                options.getString("filepath"),
                options.getInt("loopcount"),
                options.getDouble("pitch"),
                options.getDouble("pan"),
                options.getDouble("gain"),
                options.getBoolean("publish")
        );
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }


    @ReactMethod
    public void stopEffect(int soundId, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.stopEffect(soundId);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void stopAllEffects(Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.stopAllEffects();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void preloadEffect(int soundId, String filePath, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.preloadEffect(soundId, filePath);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void unloadEffect(int soundId, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.unloadEffect(soundId);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void pauseEffect(int soundId, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.pauseEffect(soundId);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void pauseAllEffects(Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.pauseAllEffects();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void resumeEffect(int soundId, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.resumeEffect(soundId);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void resumeAllEffects(int soundId, Promise promise) {
        IAudioEffectManager manager = AgoraManager.getInstance().mRtcEngine.getAudioEffectManager();
        Integer res = manager.resumeAllEffects();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    // set local video render mode
    @ReactMethod
    public void setLocalRenderMode(int mode, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLocalRenderMode(mode);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    // set remote video render mode
    @ReactMethod
    public void setRemoteRenderMode(int uid, int mode, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setRemoteRenderMode(uid, mode);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
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
    public void setLocalVideoMirrorMode(int mode, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLocalVideoMirrorMode(mode);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setBeautyEffectOptions(boolean enabled, ReadableMap options, Promise promise) {
        BeautyOptions beautyOption = new BeautyOptions();
        beautyOption.lighteningContrastLevel = options.getInt("lighteningContrastLevel");
        beautyOption.lighteningLevel = (float) options.getDouble("lighteningLevel");
        beautyOption.smoothnessLevel = (float) options.getDouble("smoothnessLevel");
        beautyOption.rednessLevel = (float) options.getDouble("rednessLevel");
        Integer res = AgoraManager.getInstance().mRtcEngine.setBeautyEffectOptions(enabled, beautyOption);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setLocalVoiceChanger(int voiceChanger, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLocalVoiceChanger(voiceChanger);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setLocalVoiceReverbPreset(int preset, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setLocalVoiceReverbPreset(preset);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void enableSoundPositionIndication(boolean enabled, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.enableSoundPositionIndication(enabled);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setRemoteVoicePosition(int uid, int pan, int gain, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setRemoteVoicePosition(uid, pan, gain);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void startLastmileProbeTest(ReadableMap config, Promise promise) {
        LastmileProbeConfig probeConfig = new LastmileProbeConfig();
        probeConfig.probeUplink = config.getBoolean("probeUplink");
        probeConfig.probeDownlink = config.getBoolean("probeDownlink");
        probeConfig.expectedDownlinkBitrate = config.getInt("expectedDownlinkBitrate");
        probeConfig.expectedUplinkBitrate = config.getInt("expectedUplinkBitrate");
        Integer res = AgoraManager.getInstance().mRtcEngine.startLastmileProbeTest(probeConfig);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void stopLastmileProbeTest(Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.stopLastmileProbeTest();
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setRemoteUserPriority(int uid, int userPrority, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setRemoteUserPriority(uid, userPrority);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void startEchoTestWithInterval(int interval, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.startEchoTest(interval);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setCameraCapturerConfiguration(ReadableMap options, Promise promise) {
        CameraCapturerConfiguration.CAPTURER_OUTPUT_PREFERENCE preference = CameraCapturerConfiguration.CAPTURER_OUTPUT_PREFERENCE.CAPTURER_OUTPUT_PREFERENCE_AUTO;
        switch (options.getInt("preference")) {
            case 0: {
                preference = CameraCapturerConfiguration.CAPTURER_OUTPUT_PREFERENCE.CAPTURER_OUTPUT_PREFERENCE_AUTO;
                break;
            }
            case 1: {
                preference = CameraCapturerConfiguration.CAPTURER_OUTPUT_PREFERENCE.CAPTURER_OUTPUT_PREFERENCE_PERFORMANCE;
                break;
            }
            case 2: {
                preference = CameraCapturerConfiguration.CAPTURER_OUTPUT_PREFERENCE.CAPTURER_OUTPUT_PREFERENCE_PREVIEW;
                break;
            }
        }
        CameraCapturerConfiguration.CAMERA_DIRECTION cameraDirection = CameraCapturerConfiguration.CAMERA_DIRECTION.CAMERA_REAR;
        switch (options.getInt("cameraDirection")) {
            case 0: {
                cameraDirection = CameraCapturerConfiguration.CAMERA_DIRECTION.CAMERA_REAR;
                break;
            }
            case 1: {
                cameraDirection = CameraCapturerConfiguration.CAMERA_DIRECTION.CAMERA_FRONT;
                break;
            }
        }
        CameraCapturerConfiguration config = new CameraCapturerConfiguration(preference, cameraDirection);
        Integer res = AgoraManager.getInstance().mRtcEngine.setCameraCapturerConfiguration(config);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void setParameters(String paramStr, Promise promise) {
        Integer res = AgoraManager.getInstance().mRtcEngine.setParameters(paramStr);
        if (res == 0) {
            promise.resolve(null);
        } else {
            promise.reject("-1", res.toString());
        }
    }

    @ReactMethod
    public void getParameter(String paramStr, String args, Promise promise) {
        String res = AgoraManager.getInstance().mRtcEngine.getParameter(paramStr, args);
        promise.resolve(res);
    }

    @ReactMethod
    public void getParameters(String str, Promise promise) {
        String res = AgoraManager.getInstance().mRtcEngine.getParameters(str);
        promise.resolve(res);
    }

    private void sendEvent(ReactContext reactContext,
                           String eventName,
                           @Nullable WritableMap params) {
        StringBuffer agoraEvtName = new StringBuffer(AG_PREFIX);
        agoraEvtName.append(eventName);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(agoraEvtName.toString(), params);
    }
}