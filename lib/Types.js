"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Audio codec profile.
 * @enum {number}
 */
var AudioCodecProfileType;
(function (AudioCodecProfileType) {
    /**
     * (Default) LC-AAC, the low-complexity audio codec profile.
     */
    AudioCodecProfileType[AudioCodecProfileType["LCAAC"] = 0] = "LCAAC";
    /**
     * HE-AAC, the high-efficiency audio codec profile.
     */
    AudioCodecProfileType[AudioCodecProfileType["HEAAC"] = 1] = "HEAAC";
})(AudioCodecProfileType = exports.AudioCodecProfileType || (exports.AudioCodecProfileType = {}));
/**
 * Audio equalization band frequency.
 * @enum {number}
 */
var AudioEqualizationBandFrequency;
(function (AudioEqualizationBandFrequency) {
    /**
     * 31 Hz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band31"] = 0] = "Band31";
    /**
     * 62 Hz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band62"] = 1] = "Band62";
    /**
     * 125 Hz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band125"] = 2] = "Band125";
    /**
     * 250 Hz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band250"] = 3] = "Band250";
    /**
     * 500 Hz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band500"] = 4] = "Band500";
    /**
     * 1 kHz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band1K"] = 5] = "Band1K";
    /**
     * 2 kHz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band2K"] = 6] = "Band2K";
    /**
     * 4 kHz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band4K"] = 7] = "Band4K";
    /**
     * 8 kHz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band8K"] = 8] = "Band8K";
    /**
     * 16 kHz.
     */
    AudioEqualizationBandFrequency[AudioEqualizationBandFrequency["Band16K"] = 9] = "Band16K";
})(AudioEqualizationBandFrequency = exports.AudioEqualizationBandFrequency || (exports.AudioEqualizationBandFrequency = {}));
/**
 * The error information of the local audio.
 * @enum {number}
 */
var AudioLocalError;
(function (AudioLocalError) {
    /**
     * The local audio is normal.
     */
    AudioLocalError[AudioLocalError["Ok"] = 0] = "Ok";
    /**
     * No specified reason for the local audio failure.
     */
    AudioLocalError[AudioLocalError["Failure"] = 1] = "Failure";
    /**
     * No permission to use the local audio device.
     */
    AudioLocalError[AudioLocalError["DeviceNoPermission"] = 2] = "DeviceNoPermission";
    /**
     * The microphone is in use.
     */
    AudioLocalError[AudioLocalError["DeviceBusy"] = 3] = "DeviceBusy";
    /**
     * The local audio recording fails. Check whether the recording device is working properly.
     */
    AudioLocalError[AudioLocalError["RecordFailure"] = 4] = "RecordFailure";
    /**
     * The local audio encoding fails.
     */
    AudioLocalError[AudioLocalError["EncodeFailure"] = 5] = "EncodeFailure";
})(AudioLocalError = exports.AudioLocalError || (exports.AudioLocalError = {}));
/**
 * The state of the local audio.
 * @enum {number}
 */
var AudioLocalState;
(function (AudioLocalState) {
    /**
     * The local audio is in the initial state.
     */
    AudioLocalState[AudioLocalState["Stopped"] = 0] = "Stopped";
    /**
     * The recording device starts successfully.
     */
    AudioLocalState[AudioLocalState["Recording"] = 1] = "Recording";
    /**
     * The first audio frame encodes successfully.
     */
    AudioLocalState[AudioLocalState["Encoding"] = 2] = "Encoding";
    /**
     * The local audio fails to start.
     */
    AudioLocalState[AudioLocalState["Failed"] = 3] = "Failed";
})(AudioLocalState = exports.AudioLocalState || (exports.AudioLocalState = {}));
/**
 * The error code of the audio mixing file.
 * @enum {number}
 */
var AudioMixingErrorCode;
(function (AudioMixingErrorCode) {
    /**
     * The SDK cannot open the audio mixing file.
     */
    AudioMixingErrorCode[AudioMixingErrorCode["CanNotOpen"] = 701] = "CanNotOpen";
    /**
     * The SDK opens the audio mixing file too frequently.
     */
    AudioMixingErrorCode[AudioMixingErrorCode["TooFrequentCall"] = 702] = "TooFrequentCall";
    /**
     * The opening of the audio mixing file is interrupted.
     */
    AudioMixingErrorCode[AudioMixingErrorCode["InterruptedEOF"] = 703] = "InterruptedEOF";
    /**
     * No error.
     */
    AudioMixingErrorCode[AudioMixingErrorCode["OK"] = 0] = "OK";
})(AudioMixingErrorCode = exports.AudioMixingErrorCode || (exports.AudioMixingErrorCode = {}));
/**
 * The state of the audio mixing file.
 * @enum {number}
 */
var AudioMixingStateCode;
(function (AudioMixingStateCode) {
    /**
     * The audio mixing file is playing.
     */
    AudioMixingStateCode[AudioMixingStateCode["Playing"] = 710] = "Playing";
    /**
     * The audio mixing file pauses playing.
     */
    AudioMixingStateCode[AudioMixingStateCode["Paused"] = 711] = "Paused";
    /**
     * The audio mixing file stops playing.
     */
    AudioMixingStateCode[AudioMixingStateCode["Stopped"] = 713] = "Stopped";
    /**
     * An exception occurs when playing the audio mixing file.
     */
    AudioMixingStateCode[AudioMixingStateCode["Failed"] = 714] = "Failed";
})(AudioMixingStateCode = exports.AudioMixingStateCode || (exports.AudioMixingStateCode = {}));
/**
 * Audio output routing.
 * @enum {number}
 */
var AudioOutputRouting;
(function (AudioOutputRouting) {
    /**
     * Default.
     */
    AudioOutputRouting[AudioOutputRouting["Default"] = -1] = "Default";
    /**
     * Headset.
     */
    AudioOutputRouting[AudioOutputRouting["Headset"] = 0] = "Headset";
    /**
     * Earpiece.
     */
    AudioOutputRouting[AudioOutputRouting["Earpiece"] = 1] = "Earpiece";
    /**
     * Headset with no microphone.
     */
    AudioOutputRouting[AudioOutputRouting["HeadsetNoMic"] = 2] = "HeadsetNoMic";
    /**
     * Speakerphone.
     */
    AudioOutputRouting[AudioOutputRouting["Speakerphone"] = 3] = "Speakerphone";
    /**
     * Loudspeaker.
     */
    AudioOutputRouting[AudioOutputRouting["Loudspeaker"] = 4] = "Loudspeaker";
    /**
     * Bluetooth headset.
     */
    AudioOutputRouting[AudioOutputRouting["HeadsetBluetooth"] = 5] = "HeadsetBluetooth";
})(AudioOutputRouting = exports.AudioOutputRouting || (exports.AudioOutputRouting = {}));
/**
 * Audio profile.
 * @enum {number}
 */
var AudioProfile;
(function (AudioProfile) {
    /**
     * Default audio profile.
     * - In the Communication profile: A sample rate of 32 KHz, audio encoding, mono, and a bitrate of up to 18 Kbps.
     * - In the Live-broadcast profile: A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 52 Kbps.
     */
    AudioProfile[AudioProfile["Default"] = 0] = "Default";
    /**
     * A sample rate of 32 KHz, audio encoding, mono, and a bitrate of up to 18 Kbps.
     */
    AudioProfile[AudioProfile["SpeechStandard"] = 1] = "SpeechStandard";
    /**
     * A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 48 Kbps.
     */
    AudioProfile[AudioProfile["MusicStandard"] = 2] = "MusicStandard";
    /**
     * A sample rate of 48 KHz, music encoding, stereo, and a bitrate of up to 56 Kbps.
     */
    AudioProfile[AudioProfile["MusicStandardStereo"] = 3] = "MusicStandardStereo";
    /**
     * A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 128 Kbps.
     */
    AudioProfile[AudioProfile["MusicHighQuality"] = 4] = "MusicHighQuality";
    /**
     * A sample rate of 48 KHz, music encoding, stereo, and a bitrate of up to 192 Kbps.
     */
    AudioProfile[AudioProfile["MusicHighQualityStereo"] = 5] = "MusicHighQualityStereo";
})(AudioProfile = exports.AudioProfile || (exports.AudioProfile = {}));
/**
 * Use mode of the onRecordAudioFrame callback.
 * @enum {number}
 */
var AudioRawFrameOperationMode;
(function (AudioRawFrameOperationMode) {
    /**
     * Users only read the AudioFrame data without modifying anything. For example, when users acquire data with the Agora SDK then push the RTMP streams.
     */
    AudioRawFrameOperationMode[AudioRawFrameOperationMode["ReadOnly"] = 0] = "ReadOnly";
    /**
     * Users replace the AudioFrame data with their own data and pass them to the SDK for encoding. For example, when users acquire data.
     */
    AudioRawFrameOperationMode[AudioRawFrameOperationMode["WriteOnly"] = 1] = "WriteOnly";
    /**
     * Users read the data from AudioFrame, modify it, and then play it. For example, when users have their own sound-effect processing module and perform some voice pre-processing such as a voice change.
     */
    AudioRawFrameOperationMode[AudioRawFrameOperationMode["ReadWrite"] = 2] = "ReadWrite";
})(AudioRawFrameOperationMode = exports.AudioRawFrameOperationMode || (exports.AudioRawFrameOperationMode = {}));
/**
 * Audio recording quality.
 */
var AudioRecordingQuality;
(function (AudioRecordingQuality) {
    /**
     * The sample rate is 32 KHz, and the file size is around 1.2 MB after 10 minutes of recording.
     */
    AudioRecordingQuality[AudioRecordingQuality["Low"] = 0] = "Low";
    /**
     * The sample rate is 32 KHz, and the file size is around 2 MB after 10 minutes of recording.
     */
    AudioRecordingQuality[AudioRecordingQuality["Medium"] = 1] = "Medium";
    /**
     * The sample rate is 32 KHz, and the file size is around 3.75 MB after 10 minutes of recording.
     */
    AudioRecordingQuality[AudioRecordingQuality["High"] = 2] = "High";
})(AudioRecordingQuality = exports.AudioRecordingQuality || (exports.AudioRecordingQuality = {}));
/**
 * The state of the remote audio.
 * @enum {number}
 */
var AudioRemoteState;
(function (AudioRemoteState) {
    /**
     * The remote audio is in the default state, probably due to:
     * @see AudioRemoteStateReason.LocalMuted
     * @see AudioRemoteStateReason.RemoteMuted
     * @see AudioRemoteStateReason.RemoteOffline
     */
    AudioRemoteState[AudioRemoteState["Stopped"] = 0] = "Stopped";
    /**
     * The first remote audio packet is received.
     */
    AudioRemoteState[AudioRemoteState["Starting"] = 1] = "Starting";
    /**
     * The remote audio stream is decoded and plays normally, probably due to:
     * @see AudioRemoteStateReason.NetworkRecovery
     * @see AudioRemoteStateReason.LocalUnmuted
     * @see AudioRemoteStateReason.RemoteUnmuted
     */
    AudioRemoteState[AudioRemoteState["Decoding"] = 2] = "Decoding";
    /**
     * The remote audio is frozen, probably due to:
     * @see AudioRemoteStateReason.NetworkCongestion
     */
    AudioRemoteState[AudioRemoteState["Frozen"] = 3] = "Frozen";
    /**
     * The remote audio fails to start, probably due to:
     * @see AudioRemoteStateReason.Internal
     */
    AudioRemoteState[AudioRemoteState["Failed"] = 4] = "Failed";
})(AudioRemoteState = exports.AudioRemoteState || (exports.AudioRemoteState = {}));
/**
 * The reason of the remote audio state change.
 * @enum {number}
 */
var AudioRemoteStateReason;
(function (AudioRemoteStateReason) {
    /**
     * Internal reasons.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["Internal"] = 0] = "Internal";
    /**
     * Network congestion.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["NetworkCongestion"] = 1] = "NetworkCongestion";
    /**
     * Network recovery.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["NetworkRecovery"] = 2] = "NetworkRecovery";
    /**
     * The local user stops receiving the remote audio stream or disables the audio module.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["LocalMuted"] = 3] = "LocalMuted";
    /**
     * The local user resumes receiving the remote audio stream or enables the audio module.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["LocalUnmuted"] = 4] = "LocalUnmuted";
    /**
     * The remote user stops sending the audio stream or disables the audio module.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["RemoteMuted"] = 5] = "RemoteMuted";
    /**
     * The remote user resumes sending the audio stream or enables the audio module.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["RemoteUnmuted"] = 6] = "RemoteUnmuted";
    /**
     * The remote user leaves the channel.
     */
    AudioRemoteStateReason[AudioRemoteStateReason["RemoteOffline"] = 7] = "RemoteOffline";
})(AudioRemoteStateReason = exports.AudioRemoteStateReason || (exports.AudioRemoteStateReason = {}));
/**
 * The preset local voice reverberation option.
 * @enum {number}
 */
var AudioReverbPreset;
(function (AudioReverbPreset) {
    /**
     * The original voice (no local voice reverberation).
     */
    AudioReverbPreset[AudioReverbPreset["Off"] = 0] = "Off";
    /**
     * Pop music
     */
    AudioReverbPreset[AudioReverbPreset["Popular"] = 1] = "Popular";
    /**
     * R&B
     */
    AudioReverbPreset[AudioReverbPreset["RnB"] = 2] = "RnB";
    /**
     * Rock music
     */
    AudioReverbPreset[AudioReverbPreset["Rock"] = 3] = "Rock";
    /**
     * Hip-hop music
     */
    AudioReverbPreset[AudioReverbPreset["HipHop"] = 4] = "HipHop";
    /**
     * Pop concert
     */
    AudioReverbPreset[AudioReverbPreset["VocalConcert"] = 5] = "VocalConcert";
    /**
     * Karaoke
     */
    AudioReverbPreset[AudioReverbPreset["KTV"] = 6] = "KTV";
    /**
     * Recording studio
     */
    AudioReverbPreset[AudioReverbPreset["Studio"] = 7] = "Studio";
})(AudioReverbPreset = exports.AudioReverbPreset || (exports.AudioReverbPreset = {}));
/**
 * Audio reverberation type.
 * @enum {number}
 */
var AudioReverbType;
(function (AudioReverbType) {
    /**
     * The level of the dry signal (dB). The value ranges between -20 and 10.
     */
    AudioReverbType[AudioReverbType["DryLevel"] = 0] = "DryLevel";
    /**
     * The level of the early reflection signal (wet signal) in dB. The value ranges between -20 and 10.
     */
    AudioReverbType[AudioReverbType["WetLevel"] = 1] = "WetLevel";
    /**
     * The room size of the reverberation. A larger room size means a stronger reverberation. The value ranges between 0 and 100.
     */
    AudioReverbType[AudioReverbType["RoomSize"] = 2] = "RoomSize";
    /**
     * The length of the initial delay of the wet signal (ms). The value ranges between 0 and 200.
     */
    AudioReverbType[AudioReverbType["WetDelay"] = 3] = "WetDelay";
    /**
     * The reverberation strength. The value ranges between 0 and 100.
     */
    AudioReverbType[AudioReverbType["Strength"] = 4] = "Strength";
})(AudioReverbType = exports.AudioReverbType || (exports.AudioReverbType = {}));
/**
 * Audio sample rate.
 * @enum {number}
 */
var AudioSampleRateType;
(function (AudioSampleRateType) {
    /**
     * 32 kHz.
     */
    AudioSampleRateType[AudioSampleRateType["Type32000"] = 32000] = "Type32000";
    /**
     * 44.1 kHz.
     */
    AudioSampleRateType[AudioSampleRateType["Type44100"] = 44100] = "Type44100";
    /**
     * 48 kHz.
     */
    AudioSampleRateType[AudioSampleRateType["Type48000"] = 48000] = "Type48000";
})(AudioSampleRateType = exports.AudioSampleRateType || (exports.AudioSampleRateType = {}));
/**
 * Audio scenario.
 * @enum {number}
 */
var AudioScenario;
(function (AudioScenario) {
    /**
     * Default.
     */
    AudioScenario[AudioScenario["Default"] = 0] = "Default";
    /**
     * Entertainment scenario, supporting voice during gameplay.
     */
    AudioScenario[AudioScenario["ChatRoomEntertainment"] = 1] = "ChatRoomEntertainment";
    /**
     * Education scenario, prioritizing fluency and stability.
     */
    AudioScenario[AudioScenario["Education"] = 2] = "Education";
    /**
     * Live gaming scenario, enabling the gaming audio effects in the speaker mode in a live broadcast scenario. Choose this scenario for high-fidelity music playback.
     */
    AudioScenario[AudioScenario["GameStreaming"] = 3] = "GameStreaming";
    /**
     * Showroom scenario, optimizing the audio quality with external professional equipment.
     */
    AudioScenario[AudioScenario["ShowRoom"] = 4] = "ShowRoom";
    /**
     * Gaming scenario.
     */
    AudioScenario[AudioScenario["ChatRoomGaming"] = 5] = "ChatRoomGaming";
})(AudioScenario = exports.AudioScenario || (exports.AudioScenario = {}));
/**
 * Audio session restriction.
 * @enum {number}
 */
var AudioSessionOperationRestriction;
(function (AudioSessionOperationRestriction) {
    /**
     * No restriction, the SDK has full control of the audio session operations.
     */
    AudioSessionOperationRestriction[AudioSessionOperationRestriction["None"] = 0] = "None";
    /**
     * The SDK does not change the audio session category.
     */
    AudioSessionOperationRestriction[AudioSessionOperationRestriction["SetCategory"] = 1] = "SetCategory";
    /**
     * The SDK does not change any setting of the audio session (category, mode, categoryOptions).
     */
    AudioSessionOperationRestriction[AudioSessionOperationRestriction["ConfigureSession"] = 2] = "ConfigureSession";
    /**
     * The SDK keeps the audio session active when leaving a channel.
     */
    AudioSessionOperationRestriction[AudioSessionOperationRestriction["DeactivateSession"] = 4] = "DeactivateSession";
    /**
     * The SDK does not configure the audio session anymore.
     */
    AudioSessionOperationRestriction[AudioSessionOperationRestriction["All"] = 128] = "All";
})(AudioSessionOperationRestriction = exports.AudioSessionOperationRestriction || (exports.AudioSessionOperationRestriction = {}));
/**
 * The preset audio voice configuration used to change the voice effect.
 * @enum {number}
 */
var AudioVoiceChanger;
(function (AudioVoiceChanger) {
    /**
     * The original voice (no local voice change).
     */
    AudioVoiceChanger[AudioVoiceChanger["Off"] = 0] = "Off";
    /**
     * An old man’s voice.
     */
    AudioVoiceChanger[AudioVoiceChanger["OldMan"] = 1] = "OldMan";
    /**
     * A little boy’s voice.
     */
    AudioVoiceChanger[AudioVoiceChanger["BabyBoy"] = 2] = "BabyBoy";
    /**
     * A little girl’s voice.
     */
    AudioVoiceChanger[AudioVoiceChanger["BabyGirl"] = 3] = "BabyGirl";
    /**
     * TBD
     */
    AudioVoiceChanger[AudioVoiceChanger["ZhuBaJie"] = 4] = "ZhuBaJie";
    /**
     * Ethereal vocal effects.
     */
    AudioVoiceChanger[AudioVoiceChanger["Ethereal"] = 5] = "Ethereal";
    /**
     * Hulk’s voice.
     */
    AudioVoiceChanger[AudioVoiceChanger["Hulk"] = 6] = "Hulk";
})(AudioVoiceChanger = exports.AudioVoiceChanger || (exports.AudioVoiceChanger = {}));
/**
 * The camera capturer configuration.
 * @enum {number}
 */
var CameraCaptureOutputPreference;
(function (CameraCaptureOutputPreference) {
    /**
     * (default) Self-adapts the camera output parameters to the system performance and network conditions to balance CPU consumption and video preview quality.
     */
    CameraCaptureOutputPreference[CameraCaptureOutputPreference["Auto"] = 0] = "Auto";
    /**
     * Prioritizes the system performance. The SDK chooses the dimension and frame rate of the local camera capture closest to those set by setVideoEncoderConfiguration.
     * @see RtcEngine.setVideoEncoderConfiguration
     */
    CameraCaptureOutputPreference[CameraCaptureOutputPreference["Performance"] = 1] = "Performance";
    /**
     * Prioritizes the local preview quality. The SDK chooses higher camera output parameters to improve the local video preview quality. This option requires extra CPU and RAM usage for video pre-processing.
     */
    CameraCaptureOutputPreference[CameraCaptureOutputPreference["Preview"] = 2] = "Preview";
    /**
     * Internal use only
     */
    CameraCaptureOutputPreference[CameraCaptureOutputPreference["Unkown"] = 3] = "Unkown";
})(CameraCaptureOutputPreference = exports.CameraCaptureOutputPreference || (exports.CameraCaptureOutputPreference = {}));
/**
 * The camera direction.
 * @enum {number}
 */
var CameraDirection;
(function (CameraDirection) {
    /**
     * The rear camera.
     */
    CameraDirection[CameraDirection["Rear"] = 0] = "Rear";
    /**
     * The front camera.
     */
    CameraDirection[CameraDirection["Front"] = 1] = "Front";
})(CameraDirection = exports.CameraDirection || (exports.CameraDirection = {}));
/**
 * The error code in AgoraChannelMediaRelayError.
 * @enum {number}
 */
var ChannelMediaRelayError;
(function (ChannelMediaRelayError) {
    /**
     * The state is normal.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["None"] = 0] = "None";
    /**
     * An error occurs in the server response.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["ServerErrorResponse"] = 1] = "ServerErrorResponse";
    /**
     * No server response. You can call the leaveChannel method to leave the channel.
     * @see RtcEngine.leaveChannel
     */
    ChannelMediaRelayError[ChannelMediaRelayError["ServerNoResponse"] = 2] = "ServerNoResponse";
    /**
     * The SDK fails to access the service, probably due to limited resources of the server.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["NoResourceAvailable"] = 3] = "NoResourceAvailable";
    /**
     * Fails to send the relay request.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["FailedJoinSourceChannel"] = 4] = "FailedJoinSourceChannel";
    /**
     * Fails to accept the relay request.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["FailedJoinDestinationChannel"] = 5] = "FailedJoinDestinationChannel";
    /**
     * The server fails to receive the media stream.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["FailedPacketReceivedFromSource"] = 6] = "FailedPacketReceivedFromSource";
    /**
     * The server fails to send the media stream.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["FailedPacketSentToDestination"] = 7] = "FailedPacketSentToDestination";
    /**
     * The SDK disconnects from the server due to poor network connections. You can call the leaveChannel method to leave the channel.
     * @see RtcEngine.leaveChannel
     */
    ChannelMediaRelayError[ChannelMediaRelayError["ServerConnectionLost"] = 8] = "ServerConnectionLost";
    /**
     * An internal error occurs in the server.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["InternalError"] = 9] = "InternalError";
    /**
     * The token of the source channel has expired.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["SourceTokenExpired"] = 10] = "SourceTokenExpired";
    /**
     * The token of the destination channel has expired.
     */
    ChannelMediaRelayError[ChannelMediaRelayError["DestinationTokenExpired"] = 11] = "DestinationTokenExpired";
})(ChannelMediaRelayError = exports.ChannelMediaRelayError || (exports.ChannelMediaRelayError = {}));
/**
 * The event code in AgoraChannelMediaRelayEvent.
 * @enum {number}
 */
var ChannelMediaRelayEvent;
(function (ChannelMediaRelayEvent) {
    /**
     * The user disconnects from the server due to poor network connections.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["Disconnect"] = 0] = "Disconnect";
    /**
     * The network reconnects.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["Connected"] = 1] = "Connected";
    /**
     * The user joins the source channel.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["JoinedSourceChannel"] = 2] = "JoinedSourceChannel";
    /**
     * The user joins the destination channel.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["JoinedDestinationChannel"] = 3] = "JoinedDestinationChannel";
    /**
     * The SDK starts relaying the media stream to the destination channel.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["SentToDestinationChannel"] = 4] = "SentToDestinationChannel";
    /**
     * The server receives the video stream from the source channel.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["ReceivedVideoPacketFromSource"] = 5] = "ReceivedVideoPacketFromSource";
    /**
     * The server receives the audio stream from the source channel.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["ReceivedAudioPacketFromSource"] = 6] = "ReceivedAudioPacketFromSource";
    /**
     * The destination channel is updated.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannel"] = 7] = "UpdateDestinationChannel";
    /**
     * The destination channel update fails due to internal reasons.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelRefused"] = 8] = "UpdateDestinationChannelRefused";
    /**
     * The destination channel does not change, which means that the destination channel fails to be updated.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelNotChange"] = 9] = "UpdateDestinationChannelNotChange";
    /**
     * The destination channel name is NULL.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["UpdateDestinationChannelIsNil"] = 10] = "UpdateDestinationChannelIsNil";
    /**
     * The video profile is sent to the server.
     */
    ChannelMediaRelayEvent[ChannelMediaRelayEvent["VideoProfileUpdate"] = 11] = "VideoProfileUpdate";
})(ChannelMediaRelayEvent = exports.ChannelMediaRelayEvent || (exports.ChannelMediaRelayEvent = {}));
/**
 * The state code in AgoraChannelMediaRelayState.
 * @enum {number}
 */
var ChannelMediaRelayState;
(function (ChannelMediaRelayState) {
    /**
     * The SDK is initializing.
     */
    ChannelMediaRelayState[ChannelMediaRelayState["Idle"] = 0] = "Idle";
    /**
     * The SDK tries to relay the media stream to the destination channel.
     */
    ChannelMediaRelayState[ChannelMediaRelayState["Connecting"] = 1] = "Connecting";
    /**
     * The SDK successfully relays the media stream to the destination channel.
     */
    ChannelMediaRelayState[ChannelMediaRelayState["Running"] = 2] = "Running";
    /**
     * A failure occurs. See the details in error.
     */
    ChannelMediaRelayState[ChannelMediaRelayState["Failure"] = 3] = "Failure";
})(ChannelMediaRelayState = exports.ChannelMediaRelayState || (exports.ChannelMediaRelayState = {}));
/**
 * Channel profile.
 * @enum {number}
 */
var ChannelProfile;
(function (ChannelProfile) {
    /**
     * (Default) The Communication profile.
     * Use this profile in one-on-one calls or group calls, where all users can talk freely.
     */
    ChannelProfile[ChannelProfile["Communication"] = 0] = "Communication";
    /**
     * The Live-Broadcast profile.
     * Users in a live-broadcast channel have a role as either broadcaster or audience. A broadcaster can both send and receive streams; an audience can only receive streams.
     */
    ChannelProfile[ChannelProfile["LiveBroadcasting"] = 1] = "LiveBroadcasting";
    /**
     * The Gaming profile.
     * This profile uses a codec with a lower bitrate and consumes less power. Applies to the gaming scenario, where all game players can talk freely.
     */
    ChannelProfile[ChannelProfile["Game"] = 2] = "Game";
})(ChannelProfile = exports.ChannelProfile || (exports.ChannelProfile = {}));
/**
 * Client role in a live broadcast.
 * @enum {number}
 */
var ClientRole;
(function (ClientRole) {
    /**
     * A broadcaster can both send and receive streams.
     */
    ClientRole[ClientRole["Broadcaster"] = 1] = "Broadcaster";
    /**
     * The default role. An audience can only receive streams.
     */
    ClientRole[ClientRole["Audience"] = 2] = "Audience";
})(ClientRole = exports.ClientRole || (exports.ClientRole = {}));
/**
 * Reasons for the connection state change.
 * @enum {number}
 */
var ConnectionChangedReason;
(function (ConnectionChangedReason) {
    /**
     * The SDK is connecting to Agora’s edge server.
     */
    ConnectionChangedReason[ConnectionChangedReason["Connecting"] = 0] = "Connecting";
    /**
     * The SDK has joined the channel successfully.
     */
    ConnectionChangedReason[ConnectionChangedReason["JoinSuccess"] = 1] = "JoinSuccess";
    /**
     * The connection between the SDK and Agora’s edge server is interrupted.
     */
    ConnectionChangedReason[ConnectionChangedReason["Interrupted"] = 2] = "Interrupted";
    /**
     * The connection between the SDK and Agora’s edge server is banned by Agora’s edge server.
     */
    ConnectionChangedReason[ConnectionChangedReason["BannedByServer"] = 3] = "BannedByServer";
    /**
     * The SDK fails to join the channel for more than 20 minutes and stops reconnecting to the channel.
     */
    ConnectionChangedReason[ConnectionChangedReason["JoinFailed"] = 4] = "JoinFailed";
    /**
     * The SDK has left the channel.
     */
    ConnectionChangedReason[ConnectionChangedReason["LeaveChannel"] = 5] = "LeaveChannel";
    /**
     * The specified App ID is invalid. Try to rejoin the channel with a valid App ID.
     */
    ConnectionChangedReason[ConnectionChangedReason["InvalidAppId"] = 6] = "InvalidAppId";
    /**
     * The specified channel name is invalid. Try to rejoin the channel with a valid channel name.
     */
    ConnectionChangedReason[ConnectionChangedReason["InvalidChannelName"] = 7] = "InvalidChannelName";
    /**
     * The generated token is invalid probably due to the following reasons:
     * - The App Certificate for the project is enabled in Console, but you do not use Token when joining the channel. If you enable the App Certificate, you must use a token to join the channel.
     * - The uid that you specify in the joinChannel method is different from the uid that you pass for generating the token.
     * @see RtcEngine.joinChannel
     */
    ConnectionChangedReason[ConnectionChangedReason["InvalidToken"] = 8] = "InvalidToken";
    /**
     * The token has expired. Generate a new token from your server.
     */
    ConnectionChangedReason[ConnectionChangedReason["TokenExpired"] = 9] = "TokenExpired";
    /**
     * The user is banned by the server.
     */
    ConnectionChangedReason[ConnectionChangedReason["RejectedByServer"] = 10] = "RejectedByServer";
    /**
     * The SDK tries to reconnect after setting a proxy server.
     */
    ConnectionChangedReason[ConnectionChangedReason["SettingProxyServer"] = 11] = "SettingProxyServer";
    /**
     * The token renews.
     */
    ConnectionChangedReason[ConnectionChangedReason["RenewToken"] = 12] = "RenewToken";
    /**
     * The client IP address has changed, probably due to a change of the network type, IP address, or network port.
     */
    ConnectionChangedReason[ConnectionChangedReason["ClientIpAddressChanged"] = 13] = "ClientIpAddressChanged";
    /**
     * Timeout for the keep-alive of the connection between the SDK and Agora’s edge server. The connection state changes to:
     * @see ConnectionStateType.Reconnecting
     */
    ConnectionChangedReason[ConnectionChangedReason["KeepAliveTimeout"] = 14] = "KeepAliveTimeout";
})(ConnectionChangedReason = exports.ConnectionChangedReason || (exports.ConnectionChangedReason = {}));
/**
 * Connection states.
 * @enum {number}
 */
var ConnectionStateType;
(function (ConnectionStateType) {
    /**
     * The SDK is disconnected from Agora's edge server.
     * - This is the initial state before joinChannel.
     * @see RtcEngine.joinChannel
     * - The SDK also enters this state when the app calls leaveChannel.
     * @see RtcEngine.leaveChannel
     */
    ConnectionStateType[ConnectionStateType["Disconnected"] = 1] = "Disconnected";
    /**
     * The SDK is connecting to Agora's edge server.
     * - When the app calls joinChannel, the SDK starts to establish a connection to the specified channel, triggers the onConnectionStateChanged callback, and switches to the Connecting state.
     * @see RtcEngine.joinChannel
     * @see RtcEngineEvents.onConnectionStateChanged
     * @see ConnectionStateType.Connecting
     * - When the SDK successfully joins the channel, the SDK triggers the onConnectionStateChanged callback and switches to the Connected state.
     * @see RtcEngineEvents.onConnectionStateChanged
     * @see ConnectionStateType.Connected
     * - After the SDK joins the channel and when it finishes initializing the media engine, the SDK triggers the onJoinChannelSuccess callback.
     * @see RtcEngineEvents.onJoinChannelSuccess
     */
    ConnectionStateType[ConnectionStateType["Connecting"] = 2] = "Connecting";
    /**
     * The SDK is connected to Agora's edge server and joins a channel. You can now publish or subscribe to a media stream in the channel.
     * If the connection to the channel is lost because, for example, the network is down or switched, the SDK automatically tries to reconnect and triggers:
     * - The onConnectionStateChanged callback, and switches to the Reconnecting state.
     * @see RtcEngineEvents.onConnectionStateChanged
     * @see ConnectionStateType.Reconnecting
     */
    ConnectionStateType[ConnectionStateType["Connected"] = 3] = "Connected";
    /**
     * The SDK keeps rejoining the channel after being disconnected from a joined channel because of network issues.
     * - If the SDK cannot rejoin the channel within 10 seconds after being disconnected from Agora’s edge server, the SDK triggers the onConnectionLost callback, stays in the Reconnecting state, and keeps rejoining the channel.
     * @see RtcEngineEvents.onConnectionLost
     * - If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora’s edge server, the SDK triggers the onConnectionStateChanged callback, switches to the Failed state, and stops rejoining the channel.
     * @see RtcEngineEvents.onConnectionStateChanged
     * @see ConnectionStateType.Failed
     */
    ConnectionStateType[ConnectionStateType["Reconnecting"] = 4] = "Reconnecting";
    /**
     * The SDK fails to connect to Agora's edge server or join the channel.
     * You must call leaveChannel to leave this state, and call joinChannel again to rejoin the channel.
     * @see RtcEngine.leaveChannel
     * @see RtcEngine.joinChannel
     * If the SDK is banned from joining the channel by Agora’s edge server (through the RESTful API), the SDK triggers the onConnectionStateChanged callbacks.
     * @see RtcEngineEvents.onConnectionStateChanged
     */
    ConnectionStateType[ConnectionStateType["Failed"] = 5] = "Failed";
})(ConnectionStateType = exports.ConnectionStateType || (exports.ConnectionStateType = {}));
/**
 * The video encoding degradation preference under limited bandwidth.
 * @enum {number}
 */
var DegradationPreference;
(function (DegradationPreference) {
    /**
     * (Default) Degrades the frame rate to guarantee the video quality.
     */
    DegradationPreference[DegradationPreference["MaintainQuality"] = 0] = "MaintainQuality";
    /**
     * Degrades the video quality to guarantee the frame rate.
     */
    DegradationPreference[DegradationPreference["MaintainFramerate"] = 1] = "MaintainFramerate";
    /**
     * Reserved for future use.
     */
    DegradationPreference[DegradationPreference["Balanced"] = 2] = "Balanced";
})(DegradationPreference = exports.DegradationPreference || (exports.DegradationPreference = {}));
/**
 * Encryption mode
 * @enum {number}
 */
var EncryptionMode;
(function (EncryptionMode) {
    /**
     * (Default) 128-bit AES encryption, XTS mode.
     */
    EncryptionMode[EncryptionMode["AES128XTS"] = 1] = "AES128XTS";
    /**
     * 256-bit AES encryption, XTS mode.
     */
    EncryptionMode[EncryptionMode["AES256XTS"] = 2] = "AES256XTS";
    /**
     * 128-bit AES encryption, ECB mode.
     */
    EncryptionMode[EncryptionMode["AES128ECB"] = 3] = "AES128ECB";
})(EncryptionMode = exports.EncryptionMode || (exports.EncryptionMode = {}));
/**
 * Error codes occur when the SDK encounters an error that cannot be recovered automatically without any app intervention.
 * @enum {number}
 */
var ErrorCode;
(function (ErrorCode) {
    /**
     * No error occurs.
     */
    ErrorCode[ErrorCode["NoError"] = 0] = "NoError";
    /**
     * A general error occurs (no specified reason).
     */
    ErrorCode[ErrorCode["Failed"] = 1] = "Failed";
    /**
     * An invalid parameter is used. For example, the specific channel name includes illegal characters.
     */
    ErrorCode[ErrorCode["InvalidArgument"] = 2] = "InvalidArgument";
    /**
     * The SDK module is not ready.
     * Possible solutions:
     * - Check the audio device.
     * - Check the completeness of the app.
     * - Re-initialize the SDK.
     */
    ErrorCode[ErrorCode["NotReady"] = 3] = "NotReady";
    /**
     * The current state of the SDK does not support this function.
     */
    ErrorCode[ErrorCode["NotSupported"] = 4] = "NotSupported";
    /**
     * The request is rejected. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    ErrorCode[ErrorCode["Refused"] = 5] = "Refused";
    /**
     * The buffer size is not big enough to store the returned data.
     */
    ErrorCode[ErrorCode["BufferTooSmall"] = 6] = "BufferTooSmall";
    /**
     * The SDK is not initialized before calling this method.
     */
    ErrorCode[ErrorCode["NotInitialized"] = 7] = "NotInitialized";
    /**
     * No permission exists. Check if the user has granted access to the audio or video device.
     */
    ErrorCode[ErrorCode["NoPermission"] = 9] = "NoPermission";
    /**
     * An API method timeout occurs. Some API methods require the SDK to return the execution result, and this error occurs if the request takes too long (over 10 seconds) for the SDK to process.
     */
    ErrorCode[ErrorCode["TimedOut"] = 10] = "TimedOut";
    /**
     * The request is canceled. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    ErrorCode[ErrorCode["Canceled"] = 11] = "Canceled";
    /**
     * The method is called too often. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    ErrorCode[ErrorCode["TooOften"] = 12] = "TooOften";
    /**
     * The SDK fails to bind to the network socket. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    ErrorCode[ErrorCode["BindSocket"] = 13] = "BindSocket";
    /**
     * The network is unavailable. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    ErrorCode[ErrorCode["NetDown"] = 14] = "NetDown";
    /**
     * No network buffers are available. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    ErrorCode[ErrorCode["NoBufs"] = 15] = "NoBufs";
    /**
     * The request to join the channel is rejected.
     * Possible reasons are:
     * - The user is already in the channel, and still calls the API method to join the channel, for example, joinChannel
     * @see RtcEngine.joinChannel
     * - The user tries joining the channel during the echo test. Please join the channel after the echo test ends.
     */
    ErrorCode[ErrorCode["JoinChannelRejected"] = 17] = "JoinChannelRejected";
    /**
     * The request to leave the channel is rejected.
     * Possible reasons are:
     * - The user left the channel and still calls the API method to leave the channel, for example, leaveChannel.
     * @see RtcEngine.leaveChannel
     * - The user has not joined the channel and calls the API method to leave the channel.
     */
    ErrorCode[ErrorCode["LeaveChannelRejected"] = 18] = "LeaveChannelRejected";
    /**
     * The resources are occupied and cannot be used.
     */
    ErrorCode[ErrorCode["AlreadyInUse"] = 19] = "AlreadyInUse";
    /**
     * The SDK gave up the request due to too many requests.
     */
    ErrorCode[ErrorCode["Abort"] = 20] = "Abort";
    /**
     * In Windows, specific firewall settings cause the SDK to fail to initialize and crash.
     */
    ErrorCode[ErrorCode["InitNetEngine"] = 21] = "InitNetEngine";
    /**
     * The app uses too much of the system resources and the SDK fails to allocate the resources.
     */
    ErrorCode[ErrorCode["ResourceLimited"] = 22] = "ResourceLimited";
    /**
     * The specified App ID is invalid. Please try to rejoin the channel with a valid App ID.
     */
    ErrorCode[ErrorCode["InvalidAppId"] = 101] = "InvalidAppId";
    /**
     * The specified channel name is invalid. Please try to rejoin the channel with a valid channel name.
     */
    ErrorCode[ErrorCode["InvalidChannelId"] = 102] = "InvalidChannelId";
    /**
     * The token expired. DEPRECATED as of v2.4.1. Use TokenExpired(9) in the reason parameter of onConnectionStateChanged.
     * @see ConnectionChangedReason.TokenExpired
     * @see RtcEngineEvents.onConnectionStateChanged
     * Possible reasons are:
     * - Authorized Timestamp expired: The timestamp is represented by the number of seconds elapsed since 1/1/1970. The user can use the token to access the Agora service within five minutes after the token is generated. If the user does not access the Agora service after five minutes, this token is no longer valid.
     * - Call Expiration Timestamp expired: The timestamp is the exact time when a user can no longer use the Agora service (for example, when a user is forced to leave an ongoing call). When a value is set for the Call Expiration Timestamp, it does not mean that the token will expire, but that the user will be banned from the channel.
     * @deprecated
     */
    ErrorCode[ErrorCode["TokenExpired"] = 109] = "TokenExpired";
    /**
     * The token is invalid. DEPRECATED as of v2.4.1. Use InvalidToken(8) in the reason parameter of onConnectionStateChanged.
     * @see ConnectionChangedReason.InvalidToken
     * @see RtcEngineEvents.onConnectionStateChanged
     * Possible reasons are:
     * - The App Certificate for the project is enabled in Console, but the user is using the App ID. Once the App Certificate is enabled, the user must use a token.
     * - The uid is mandatory, and users must set the same uid as the one set in the joinChannel method.
     * @see RtcEngine.joinChannel
     * @deprecated
     */
    ErrorCode[ErrorCode["InvalidToken"] = 110] = "InvalidToken";
    /**
     * The Internet connection is interrupted. This applies to the Agora Web SDK only.
     */
    ErrorCode[ErrorCode["ConnectionInterrupted"] = 111] = "ConnectionInterrupted";
    /**
     * The Internet connection is lost. This applies to the Agora Web SDK only.
     */
    ErrorCode[ErrorCode["ConnectionLost"] = 112] = "ConnectionLost";
    /**
     * The user is not in the channel when calling the sendStreamMessage or getUserInfoByUserAccount method.
     * @see RtcEngine.sendStreamMessage
     * @see RtcEngine.getUserInfoByUserAccount
     */
    ErrorCode[ErrorCode["NotInChannel"] = 113] = "NotInChannel";
    /**
     * The size of the sent data is over 1024 bytes when the user calls the sendStreamMessage method.
     * @see RtcEngine.sendStreamMessage
     */
    ErrorCode[ErrorCode["SizeTooLarge"] = 114] = "SizeTooLarge";
    /**
     * The bitrate of the sent data exceeds the limit of 6 Kbps when the user calls the sendStreamMessage method.
     * @see RtcEngine.sendStreamMessage
     */
    ErrorCode[ErrorCode["BitrateLimit"] = 115] = "BitrateLimit";
    /**
     * Too many data streams (over five streams) are created when the user calls the createDataStream method.
     * @see RtcEngine.createDataStream
     */
    ErrorCode[ErrorCode["TooManyDataStreams"] = 116] = "TooManyDataStreams";
    /**
     * Decryption fails. The user may have used a different encryption password to join the channel. Check your settings or try rejoining the channel.
     */
    ErrorCode[ErrorCode["DecryptionFailed"] = 120] = "DecryptionFailed";
    /**
     * The client is banned by the server.
     */
    ErrorCode[ErrorCode["ClientIsBannedByServer"] = 123] = "ClientIsBannedByServer";
    /**
     * Incorrect watermark file parameter.
     */
    ErrorCode[ErrorCode["WatermarkParam"] = 124] = "WatermarkParam";
    /**
     * Incorrect watermark file path.
     */
    ErrorCode[ErrorCode["WatermarkPath"] = 125] = "WatermarkPath";
    /**
     * Incorrect watermark file format.
     */
    ErrorCode[ErrorCode["WatermarkPng"] = 126] = "WatermarkPng";
    /**
     * Incorrect watermark file information.
     */
    ErrorCode[ErrorCode["WatermarkInfo"] = 127] = "WatermarkInfo";
    /**
     * Incorrect watermark file data format.
     */
    ErrorCode[ErrorCode["WatermarkAGRB"] = 128] = "WatermarkAGRB";
    /**
     * An error occurs in reading the watermark file.
     */
    ErrorCode[ErrorCode["WatermarkRead"] = 129] = "WatermarkRead";
    /**
     * The encrypted stream is not allowed to publish.
     */
    ErrorCode[ErrorCode["EncryptedStreamNotAllowedPublish"] = 130] = "EncryptedStreamNotAllowedPublish";
    /**
     * The user account is invalid.
     */
    ErrorCode[ErrorCode["InvalidUserAccount"] = 134] = "InvalidUserAccount";
    /**
     * CDN related errors. Remove the original URL address and add a new one by calling the removePublishStreamUrl and addPublishStreamUrl methods.
     * @see RtcEngine.removePublishStreamUrl
     * @see RtcEngine.addPublishStreamUrl
     */
    ErrorCode[ErrorCode["PublishStreamCDNError"] = 151] = "PublishStreamCDNError";
    /**
     * The host publishes more than 10 URLs. Delete the unnecessary URLs before adding new ones.
     */
    ErrorCode[ErrorCode["PublishStreamNumReachLimit"] = 152] = "PublishStreamNumReachLimit";
    /**
     * The host manipulates other hosts' URLs. Check your app logic.
     */
    ErrorCode[ErrorCode["PublishStreamNotAuthorized"] = 153] = "PublishStreamNotAuthorized";
    /**
     * An error occurs in Agora’s streaming server. Call the addPublishStreamUrl method to publish the stream again.
     * @see RtcEngine.addPublishStreamUrl
     */
    ErrorCode[ErrorCode["PublishStreamInternalServerError"] = 154] = "PublishStreamInternalServerError";
    /**
     * The server fails to find the stream.
     */
    ErrorCode[ErrorCode["PublishStreamNotFound"] = 155] = "PublishStreamNotFound";
    /**
     * The format of the RTMP stream URL is not supported. Check whether the URL format is correct.
     */
    ErrorCode[ErrorCode["PublishStreamFormatNotSuppported"] = 156] = "PublishStreamFormatNotSuppported";
    /**
     * Fails to load the media engine.
     */
    ErrorCode[ErrorCode["LoadMediaEngine"] = 1001] = "LoadMediaEngine";
    /**
     * Fails to start the call after enabling the media engine.
     */
    ErrorCode[ErrorCode["StartCall"] = 1002] = "StartCall";
    /**
     * Fails to start the camera. DEPRECATED as of v2.4.1. Use CaptureFailure(4) in the error parameter of onLocalVideoStateChanged.
     * @see LocalVideoStreamError.CaptureFailure
     * @see RtcEngineEvents.onLocalVideoStateChanged
     * @deprecated
     */
    ErrorCode[ErrorCode["StartCamera"] = 1003] = "StartCamera";
    /**
     * Fails to start the video rendering module.
     */
    ErrorCode[ErrorCode["StartVideoRender"] = 1004] = "StartVideoRender";
    /**
     * Audio Device Module: A general error occurs in the Audio Device Module (the reason is not classified specifically). Check if the audio device is used by another app, or try rejoining the channel.
     */
    ErrorCode[ErrorCode["AdmGeneralError"] = 1005] = "AdmGeneralError";
    /**
     * Audio Device Module: An error occurs in using the Java resources.
     */
    ErrorCode[ErrorCode["AdmJavaResource"] = 1006] = "AdmJavaResource";
    /**
     * Audio Device Module: An error occurs in setting the sampling frequency.
     */
    ErrorCode[ErrorCode["AdmSampleRate"] = 1007] = "AdmSampleRate";
    /**
     * Audio Device Module: An error occurs in initializing the playback device.
     */
    ErrorCode[ErrorCode["AdmInitPlayout"] = 1008] = "AdmInitPlayout";
    /**
     * Audio Device Module: An error occurs in starting the playback device.
     */
    ErrorCode[ErrorCode["AdmStartPlayout"] = 1009] = "AdmStartPlayout";
    /**
     * Audio Device Module: An error occurs in stopping the playback device.
     */
    ErrorCode[ErrorCode["AdmStopPlayout"] = 1010] = "AdmStopPlayout";
    /**
     * Audio Device Module: An error occurs in initializing the recording device.
     */
    ErrorCode[ErrorCode["AdmInitRecording"] = 1011] = "AdmInitRecording";
    /**
     * Audio Device Module: An error occurs in starting the recording device.
     */
    ErrorCode[ErrorCode["AdmStartRecording"] = 1012] = "AdmStartRecording";
    /**
     * Audio Device Module: An error occurs in stopping the recording device.
     */
    ErrorCode[ErrorCode["AdmStopRecording"] = 1013] = "AdmStopRecording";
    /**
     * Audio Device Module: A playback error occurs. Check your playback device, or try rejoining the channel.
     */
    ErrorCode[ErrorCode["AdmRuntimePlayoutError"] = 1015] = "AdmRuntimePlayoutError";
    /**
     * Audio Device Module: A recording error occurs.
     */
    ErrorCode[ErrorCode["AdmRuntimeRecordingError"] = 1017] = "AdmRuntimeRecordingError";
    /**
     * Audio Device Module: Fails to record.
     */
    ErrorCode[ErrorCode["AdmRecordAudioFailed"] = 1018] = "AdmRecordAudioFailed";
    /**
     * Audio Device Module: Abnormal audio playback frequency.
     */
    ErrorCode[ErrorCode["AdmPlayAbnormalFrequency"] = 1020] = "AdmPlayAbnormalFrequency";
    /**
     * Audio Device Module: Abnormal audio recording frequency.
     */
    ErrorCode[ErrorCode["AdmRecordAbnormalFrequency"] = 1021] = "AdmRecordAbnormalFrequency";
    /**
     * Audio Device Module: An error occurs in initializing the loopback device.
     */
    ErrorCode[ErrorCode["AdmInitLoopback"] = 1022] = "AdmInitLoopback";
    /**
     * Audio Device Module: An error occurs in starting the loopback device.
     */
    ErrorCode[ErrorCode["AdmStartLoopback"] = 1023] = "AdmStartLoopback";
    /**
     * Audio Device Module: An error occurs in no recording Permission.
     */
    ErrorCode[ErrorCode["AdmNoPermission"] = 1027] = "AdmNoPermission";
    /**
     * Audio Routing: Fails to route the audio to the connected Bluetooth device. The default route is used.
     */
    ErrorCode[ErrorCode["AudioBtScoFailed"] = 1030] = "AudioBtScoFailed";
    /**
     * Audio Device Module: No recording device exists.
     */
    ErrorCode[ErrorCode["AdmNoRecordingDevice"] = 1359] = "AdmNoRecordingDevice";
    /**
     * No playback device exists.
     */
    ErrorCode[ErrorCode["AdmNoPlayoutDevice"] = 1360] = "AdmNoPlayoutDevice";
    /**
     * Video Device Module: The camera is unauthorized.
     */
    ErrorCode[ErrorCode["VdmCameraNotAuthorized"] = 1501] = "VdmCameraNotAuthorized";
    /**
     * Video Device Module: An unknown error occurs.
     */
    ErrorCode[ErrorCode["VcmUnknownError"] = 1600] = "VcmUnknownError";
    /**
     * Video Device Module: An error occurs in initializing the video encoder.
     */
    ErrorCode[ErrorCode["VcmEncoderInitError"] = 1601] = "VcmEncoderInitError";
    /**
     * Video Device Module: An error occurs in video encoding.
     */
    ErrorCode[ErrorCode["VcmEncoderEncodeError"] = 1602] = "VcmEncoderEncodeError";
    /**
     * Video Device Module: An error occurs in setting the video encoder.
     * @deprecated
     */
    ErrorCode[ErrorCode["VcmEncoderSetError"] = 1603] = "VcmEncoderSetError";
})(ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}));
/**
 * State of importing an external video stream in a live broadcast.
 * @enum {number}
 */
var InjectStreamStatus;
(function (InjectStreamStatus) {
    /**
     * The external video stream imported successfully.
     */
    InjectStreamStatus[InjectStreamStatus["StartSuccess"] = 0] = "StartSuccess";
    /**
     * The external video stream already exists.
     */
    InjectStreamStatus[InjectStreamStatus["StartAlreadyExists"] = 1] = "StartAlreadyExists";
    /**
     * The external video stream import is unauthorized.
     */
    InjectStreamStatus[InjectStreamStatus["StartUnauthorized"] = 2] = "StartUnauthorized";
    /**
     * Import external video stream timeout.
     */
    InjectStreamStatus[InjectStreamStatus["StartTimedout"] = 3] = "StartTimedout";
    /**
     * The external video stream failed to import.
     */
    InjectStreamStatus[InjectStreamStatus["StartFailed"] = 4] = "StartFailed";
    /**
     * The external video stream imports successfully.
     */
    InjectStreamStatus[InjectStreamStatus["StopSuccess"] = 5] = "StopSuccess";
    /**
     * No external video stream is found.
     */
    InjectStreamStatus[InjectStreamStatus["StopNotFound"] = 6] = "StopNotFound";
    /**
     * The external video stream is stopped from being unauthorized.
     */
    InjectStreamStatus[InjectStreamStatus["StopUnauthorized"] = 7] = "StopUnauthorized";
    /**
     * Importing the external video stream timeout.
     */
    InjectStreamStatus[InjectStreamStatus["StopTimedout"] = 8] = "StopTimedout";
    /**
     * Importing the external video stream failed.
     */
    InjectStreamStatus[InjectStreamStatus["StopFailed"] = 9] = "StopFailed";
    /**
     * The external video stream import is interrupted.
     */
    InjectStreamStatus[InjectStreamStatus["Broken"] = 10] = "Broken";
})(InjectStreamStatus = exports.InjectStreamStatus || (exports.InjectStreamStatus = {}));
/**
 * The state of the probe test result.
 * @enum {number}
 */
var LastmileProbeResultState;
(function (LastmileProbeResultState) {
    /**
     * the last-mile network probe test is complete.
     */
    LastmileProbeResultState[LastmileProbeResultState["Complete"] = 1] = "Complete";
    /**
     * the last-mile network probe test is incomplete and the bandwidth estimation is not available, probably due to limited test resources.
     */
    LastmileProbeResultState[LastmileProbeResultState["IncompleteNoBwe"] = 2] = "IncompleteNoBwe";
    /**
     * the last-mile network probe test is not carried out, probably due to poor network conditions.
     */
    LastmileProbeResultState[LastmileProbeResultState["Unavailable"] = 3] = "Unavailable";
})(LastmileProbeResultState = exports.LastmileProbeResultState || (exports.LastmileProbeResultState = {}));
/**
 * The lightening contrast level.
 * @enum {number}
 */
var LighteningContrastLevel;
(function (LighteningContrastLevel) {
    /**
     * Low contrast level.
     */
    LighteningContrastLevel[LighteningContrastLevel["Low"] = 0] = "Low";
    /**
     * (Default) Normal contrast level.
     */
    LighteningContrastLevel[LighteningContrastLevel["Normal"] = 1] = "Normal";
    /**
     * High contrast level.
     */
    LighteningContrastLevel[LighteningContrastLevel["High"] = 2] = "High";
})(LighteningContrastLevel = exports.LighteningContrastLevel || (exports.LighteningContrastLevel = {}));
/**
 * The detailed error information of the local video.
 * @enum {number}
 */
var LocalVideoStreamError;
(function (LocalVideoStreamError) {
    /**
     * The local video is normal.
     */
    LocalVideoStreamError[LocalVideoStreamError["OK"] = 0] = "OK";
    /**
     * No specified reason for the local video failure.
     */
    LocalVideoStreamError[LocalVideoStreamError["Failure"] = 1] = "Failure";
    /**
     * No permission to use the local video device.
     */
    LocalVideoStreamError[LocalVideoStreamError["DeviceNoPermission"] = 2] = "DeviceNoPermission";
    /**
     * The local video capturer is in use.
     */
    LocalVideoStreamError[LocalVideoStreamError["DeviceBusy"] = 3] = "DeviceBusy";
    /**
     * The local video capture fails. Check whether the capturer is working properly.
     */
    LocalVideoStreamError[LocalVideoStreamError["CaptureFailure"] = 4] = "CaptureFailure";
    /**
     * The local video encoding fails.
     */
    LocalVideoStreamError[LocalVideoStreamError["EncodeFailure"] = 5] = "EncodeFailure";
})(LocalVideoStreamError = exports.LocalVideoStreamError || (exports.LocalVideoStreamError = {}));
/**
 * The state of the local video stream.
 * @enum {number}
 */
var LocalVideoStreamState;
(function (LocalVideoStreamState) {
    /**
     * The local video is in the initial state.
     */
    LocalVideoStreamState[LocalVideoStreamState["Stopped"] = 0] = "Stopped";
    /**
     * The local video capturer starts successfully.
     */
    LocalVideoStreamState[LocalVideoStreamState["Capturing"] = 1] = "Capturing";
    /**
     * The first local video frame encodes successfully.
     */
    LocalVideoStreamState[LocalVideoStreamState["Encoding"] = 2] = "Encoding";
    /**
     * The local video fails to start.
     */
    LocalVideoStreamState[LocalVideoStreamState["Failed"] = 3] = "Failed";
})(LocalVideoStreamState = exports.LocalVideoStreamState || (exports.LocalVideoStreamState = {}));
/**
 * Output log filter level.
 * @enum {number}
 */
var LogFilter;
(function (LogFilter) {
    /**
     * Do not output any log information.
     */
    LogFilter[LogFilter["Off"] = 0] = "Off";
    /**
     * Output all log information. Set your log filter as debug if you want to get the most complete log file.
     */
    LogFilter[LogFilter["Debug"] = 2063] = "Debug";
    /**
     * Output CRITICAL, ERROR, WARNING, and INFO level log information. We recommend setting your log filter as this level.
     */
    LogFilter[LogFilter["Info"] = 15] = "Info";
    /**
     * Outputs CRITICAL, ERROR, and WARNING level log information.
     */
    LogFilter[LogFilter["Warning"] = 14] = "Warning";
    /**
     * Outputs CRITICAL and ERROR level log information.
     */
    LogFilter[LogFilter["Error"] = 12] = "Error";
    /**
     * Outputs CRITICAL level log information.
     */
    LogFilter[LogFilter["Critical"] = 8] = "Critical";
})(LogFilter = exports.LogFilter || (exports.LogFilter = {}));
/**
 * Media device type.
 * @enum {number}
 */
var MediaDeviceType;
(function (MediaDeviceType) {
    /**
     * Unknown device.
     */
    MediaDeviceType[MediaDeviceType["AudioUnknown"] = -1] = "AudioUnknown";
    /**
     * Audio playback device.
     */
    MediaDeviceType[MediaDeviceType["AudioPlayout"] = 0] = "AudioPlayout";
    /**
     * Audio recording device.
     */
    MediaDeviceType[MediaDeviceType["AudioRecording"] = 1] = "AudioRecording";
    /**
     * Video render device.
     */
    MediaDeviceType[MediaDeviceType["VideoRender"] = 2] = "VideoRender";
    /**
     * Video capture device.
     */
    MediaDeviceType[MediaDeviceType["VideoCapture"] = 3] = "VideoCapture";
})(MediaDeviceType = exports.MediaDeviceType || (exports.MediaDeviceType = {}));
/**
 * Media type.
 * @enum {number}
 */
var MediaType;
(function (MediaType) {
    /**
     * No audio and video.
     */
    MediaType[MediaType["None"] = 0] = "None";
    /**
     * Audio only.
     */
    MediaType[MediaType["AudioOnly"] = 1] = "AudioOnly";
    /**
     * Video only.
     */
    MediaType[MediaType["VideoOnly"] = 2] = "VideoOnly";
    /**
     * Audio and video.
     */
    MediaType[MediaType["AudioAndVideo"] = 3] = "AudioAndVideo";
})(MediaType = exports.MediaType || (exports.MediaType = {}));
/**
 * The metadata type.
 * @enum {number}
 */
var MetadataType;
(function (MetadataType) {
    /**
     * the metadata type is unknown.
     */
    MetadataType[MetadataType["Unknown"] = -1] = "Unknown";
    /**
     * the metadata type is video.
     */
    MetadataType[MetadataType["Video"] = 0] = "Video";
})(MetadataType = exports.MetadataType || (exports.MetadataType = {}));
/**
 * Network quality.
 * @enum {number}
 */
var NetworkQuality;
(function (NetworkQuality) {
    /**
     * The network quality is unknown.
     */
    NetworkQuality[NetworkQuality["Unknown"] = 0] = "Unknown";
    /**
     * The network quality is excellent.
     */
    NetworkQuality[NetworkQuality["Excellent"] = 1] = "Excellent";
    /**
     * The network quality is quite good, but the bitrate may be slightly lower than excellent.
     */
    NetworkQuality[NetworkQuality["Good"] = 2] = "Good";
    /**
     * Users can feel the communication slightly impaired.
     */
    NetworkQuality[NetworkQuality["Poor"] = 3] = "Poor";
    /**
     * Users can communicate only not very smoothly.
     */
    NetworkQuality[NetworkQuality["Bad"] = 4] = "Bad";
    /**
     * The network quality is so bad that users can hardly communicate.
     */
    NetworkQuality[NetworkQuality["VBad"] = 5] = "VBad";
    /**
     * The network is disconnected and users cannot communicate at all.
     */
    NetworkQuality[NetworkQuality["Down"] = 6] = "Down";
    /**
     * Users cannot detect the network quality. (Not in use.)
     */
    NetworkQuality[NetworkQuality["Unsupported"] = 7] = "Unsupported";
    /**
     * Detecting the network quality.
     */
    NetworkQuality[NetworkQuality["Detecting"] = 8] = "Detecting";
})(NetworkQuality = exports.NetworkQuality || (exports.NetworkQuality = {}));
/**
 * Network type.
 * @enum {number}
 */
var NetworkType;
(function (NetworkType) {
    /**
     * The network type is unknown.
     */
    NetworkType[NetworkType["Unknown"] = -1] = "Unknown";
    /**
     * The SDK disconnects from the network.
     */
    NetworkType[NetworkType["Disconnected"] = 0] = "Disconnected";
    /**
     * The network type is LAN.
     */
    NetworkType[NetworkType["LAN"] = 1] = "LAN";
    /**
     * The network type is Wi-Fi (including hotspots).
     */
    NetworkType[NetworkType["WIFI"] = 2] = "WIFI";
    /**
     * The network type is mobile 2G.
     */
    NetworkType[NetworkType["Mobile2G"] = 3] = "Mobile2G";
    /**
     * The network type is mobile 3G.
     */
    NetworkType[NetworkType["Mobile3G"] = 4] = "Mobile3G";
    /**
     * The network type is mobile 4G.
     */
    NetworkType[NetworkType["Mobile4G"] = 5] = "Mobile4G";
})(NetworkType = exports.NetworkType || (exports.NetworkType = {}));
/**
 * Default camera position
 * @enum {number}
 */
var RtcDefaultCameraPosition;
(function (RtcDefaultCameraPosition) {
    /**
     * Front camera
     */
    RtcDefaultCameraPosition[RtcDefaultCameraPosition["Front"] = 0] = "Front";
    /**
     * Rear camera
     */
    RtcDefaultCameraPosition[RtcDefaultCameraPosition["Back"] = 1] = "Back";
})(RtcDefaultCameraPosition = exports.RtcDefaultCameraPosition || (exports.RtcDefaultCameraPosition = {}));
/**
 * Lifecycle of the CDN live video stream.
 * @enum {number}
 */
var RtmpStreamLifeCycle;
(function (RtmpStreamLifeCycle) {
    /**
     * Bound to the channel lifecycle. If all hosts leave the channel, the CDN live streaming stops after 30 seconds.
     */
    RtmpStreamLifeCycle[RtmpStreamLifeCycle["BindToChannel"] = 1] = "BindToChannel";
    /**
     * Bound to the owner of the RTMP stream. If the owner leaves the channel, the CDN live streaming stops immediately.
     */
    RtmpStreamLifeCycle[RtmpStreamLifeCycle["BindToOwnner"] = 2] = "BindToOwnner";
})(RtmpStreamLifeCycle = exports.RtmpStreamLifeCycle || (exports.RtmpStreamLifeCycle = {}));
/**
 * The detailed error information for streaming.
 * @enum {number}
 */
var RtmpStreamingErrorCode;
(function (RtmpStreamingErrorCode) {
    /**
     * The RTMP streaming publishes successfully.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["OK"] = 0] = "OK";
    /**
     * Invalid argument used. If, for example, you do not call the setLiveTranscoding method to configure the LiveTranscoding parameters before calling the addPublishStreamUrl method, the SDK returns this error. Check whether you set the parameters in the setLiveTranscoding method properly.
     * @see RtcEngine.setLiveTranscoding
     * @see RtcEngine.addPublishStreamUrl
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["InvalidParameters"] = 1] = "InvalidParameters";
    /**
     * The RTMP streaming is encrypted and cannot be published.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["EncryptedStreamNotAllowed"] = 2] = "EncryptedStreamNotAllowed";
    /**
     * Timeout for the RTMP streaming. Call the addPublishStreamUrl method to publish the streaming again.
     * @see RtcEngine.addPublishStreamUrl
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["ConnectionTimeout"] = 3] = "ConnectionTimeout";
    /**
     * An error occurs in Agora’s streaming server. Call the addPublishStreamUrl method to publish the streaming again.
     * @see RtcEngine.addPublishStreamUrl
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["InternalServerError"] = 4] = "InternalServerError";
    /**
     * An error occurs in the RTMP server.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["RtmpServerError"] = 5] = "RtmpServerError";
    /**
     * The RTMP streaming publishes too frequently.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["TooOften"] = 6] = "TooOften";
    /**
     * The host publishes more than 10 URLs. Delete the unnecessary URLs before adding new ones.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["ReachLimit"] = 7] = "ReachLimit";
    /**
     * The host manipulates other hosts' URLs. Check your app logic.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["NotAuthorized"] = 8] = "NotAuthorized";
    /**
     * Agora’s server fails to find the RTMP streaming.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["StreamNotFound"] = 9] = "StreamNotFound";
    /**
     * The format of the RTMP streaming URL is not supported. Check whether the URL format is correct.
     */
    RtmpStreamingErrorCode[RtmpStreamingErrorCode["FormatNotSupported"] = 10] = "FormatNotSupported";
})(RtmpStreamingErrorCode = exports.RtmpStreamingErrorCode || (exports.RtmpStreamingErrorCode = {}));
/**
 * The RTMP streaming state.
 * @enum {number}
 */
var RtmpStreamingState;
(function (RtmpStreamingState) {
    /**
     * The RTMP streaming has not started or has ended. This state is also triggered after you remove an RTMP address from the CDN by calling removePublishStreamUrl.
     * @see RtcEngine.removePublishStreamUrl
     */
    RtmpStreamingState[RtmpStreamingState["Idle"] = 0] = "Idle";
    /**
     * The SDK is connecting to Agora’s streaming server and the RTMP server. This state is triggered after you call the addPublishStreamUrl method.
     * @see RtcEngine.addPublishStreamUrl
     */
    RtmpStreamingState[RtmpStreamingState["Connecting"] = 1] = "Connecting";
    /**
     * The RTMP streaming is being published. The SDK successfully publishes the RTMP streaming and returns this state.
     */
    RtmpStreamingState[RtmpStreamingState["Running"] = 2] = "Running";
    /**
     * The RTMP streaming is recovering. When exceptions occur to the CDN, or the streaming is interrupted, the SDK attempts to resume RTMP streaming and returns this state.
     * - If the SDK successfully resumes the streaming, Running(2) returns.
     * @see RtmpStreamingState.Running
     * - If the streaming does not resume within 60 seconds or server errors occur, Failure(4) returns. You can also reconnect to the server by calling the removePublishStreamUrl and addPublishStreamUrl methods.
     * @see RtmpStreamingState.Failure
     * @see RtcEngine.removePublishStreamUrl
     * @see RtcEngine.addPublishStreamUrl
     */
    RtmpStreamingState[RtmpStreamingState["Recovering"] = 3] = "Recovering";
    /**
     * The RTMP streaming fails. See the errorCode parameter for the detailed error information. You can also call the addPublishStreamUrl method to publish the RTMP streaming again.
     * @see RtcEngine.addPublishStreamUrl
     */
    RtmpStreamingState[RtmpStreamingState["Failure"] = 4] = "Failure";
})(RtmpStreamingState = exports.RtmpStreamingState || (exports.RtmpStreamingState = {}));
/**
 * Stream fallback option.
 * @enum {number}
 */
var StreamFallbackOptions;
(function (StreamFallbackOptions) {
    /**
     * No fallback behavior for the local/remote video stream when the uplink/downlink network condition is unreliable. The quality of the stream is not guaranteed.
     */
    StreamFallbackOptions[StreamFallbackOptions["Disabled"] = 0] = "Disabled";
    /**
     * Under unreliable downlink network conditions, the remote video stream falls back to the low-stream (low resolution and low bitrate) video. You can only set this option in the setRemoteSubscribeFallbackOption method. Nothing happens when you set this in the setLocalPublishFallbackOption method.
     * @see RtcEngine.setRemoteSubscribeFallbackOption
     * @see RtcEngine.setLocalPublishFallbackOption
     */
    StreamFallbackOptions[StreamFallbackOptions["VideoStreamLow"] = 1] = "VideoStreamLow";
    /**
     * Under unreliable uplink network conditions, the published video stream falls back to audio only. Under unreliable downlink network conditions, the remote video stream first falls back to the low-stream (low resolution and low bitrate) video; and then to an audio-only stream if the network condition deteriorates.
     */
    StreamFallbackOptions[StreamFallbackOptions["AudioOnly"] = 2] = "AudioOnly";
})(StreamFallbackOptions = exports.StreamFallbackOptions || (exports.StreamFallbackOptions = {}));
/**
 * Reason for the user being offline.
 * @enum {number}
 */
var UserOfflineReason;
(function (UserOfflineReason) {
    /**
     * The user left the current channel.
     */
    UserOfflineReason[UserOfflineReason["Quit"] = 0] = "Quit";
    /**
     * The SDK timed out and the user dropped offline because no data packet is received within a certain period of time. If a user quits the call and the message is not passed to the SDK (due to an unreliable channel), the SDK assumes the user dropped offline.
     */
    UserOfflineReason[UserOfflineReason["Dropped"] = 1] = "Dropped";
    /**
     * (Live broadcast only.) The client role switched from the host to the audience.
     */
    UserOfflineReason[UserOfflineReason["BecomeAudience"] = 2] = "BecomeAudience";
})(UserOfflineReason = exports.UserOfflineReason || (exports.UserOfflineReason = {}));
/**
 * The priority of the remote user.
 * @enum {number}
 */
var UserPriority;
(function (UserPriority) {
    /**
     * The user’s priority is high.
     */
    UserPriority[UserPriority["High"] = 50] = "High";
    /**
     * (Default) The user’s priority is normal.
     */
    UserPriority[UserPriority["Normal"] = 100] = "Normal";
})(UserPriority = exports.UserPriority || (exports.UserPriority = {}));
/**
 * Video buffer type
 * @enum {number}
 */
var VideoBufferType;
(function (VideoBufferType) {
    /**
     * Use a pixel buffer to transmit the video data.
     */
    VideoBufferType[VideoBufferType["PixelBuffer"] = 1] = "PixelBuffer";
    /**
     * Use raw data to transmit the video data.
     */
    VideoBufferType[VideoBufferType["RawData"] = 2] = "RawData";
})(VideoBufferType = exports.VideoBufferType || (exports.VideoBufferType = {}));
/**
 * Self-defined video codec profile.
 * @enum {number}
 */
var VideoCodecProfileType;
(function (VideoCodecProfileType) {
    /**
     * Baseline video codec profile. Generally used in video calls on mobile phones.
     */
    VideoCodecProfileType[VideoCodecProfileType["BaseLine"] = 66] = "BaseLine";
    /**
     * Main video codec profile. Generally used in mainstream electronics, such as MP4 players, portable video players, PSP, and iPads.
     */
    VideoCodecProfileType[VideoCodecProfileType["Main"] = 77] = "Main";
    /**
     * (Default) High video codec profile. Generally used in high-resolution broadcasts or television.
     */
    VideoCodecProfileType[VideoCodecProfileType["High"] = 100] = "High";
})(VideoCodecProfileType = exports.VideoCodecProfileType || (exports.VideoCodecProfileType = {}));
/**
 * The content hint for screen sharing.
 * @enum {number}
 */
var VideoContentHint;
(function (VideoContentHint) {
    /**
     * (Default) No content hint.
     */
    VideoContentHint[VideoContentHint["None"] = 0] = "None";
    /**
     * Motion-intensive content. Choose this option if you prefer smoothness or when you are sharing a video clip, movie, or video game.
     */
    VideoContentHint[VideoContentHint["Motion"] = 1] = "Motion";
    /**
     * Motionless content. Choose this option if you prefer sharpness or when you are sharing a picture, PowerPoint slide, or text.
     */
    VideoContentHint[VideoContentHint["Details"] = 2] = "Details";
})(VideoContentHint = exports.VideoContentHint || (exports.VideoContentHint = {}));
/**
 * Video frame rate
 * @enum {number}
 */
var VideoFrameRate;
(function (VideoFrameRate) {
    VideoFrameRate[VideoFrameRate["Min"] = -1] = "Min";
    /**
     * 1 fps.
     */
    VideoFrameRate[VideoFrameRate["Fps1"] = 1] = "Fps1";
    /**
     * 7 fps.
     */
    VideoFrameRate[VideoFrameRate["Fps7"] = 7] = "Fps7";
    /**
     * 10 fps.
     */
    VideoFrameRate[VideoFrameRate["Fps10"] = 10] = "Fps10";
    /**
     * 15 fps.
     */
    VideoFrameRate[VideoFrameRate["Fps15"] = 15] = "Fps15";
    /**
     * 24 fps.
     */
    VideoFrameRate[VideoFrameRate["Fps24"] = 24] = "Fps24";
    /**
     * 30 fps.
     */
    VideoFrameRate[VideoFrameRate["Fps30"] = 30] = "Fps30";
    /**
     * 60 fps (macOS only).
     */
    VideoFrameRate[VideoFrameRate["Fps60"] = 60] = "Fps60";
})(VideoFrameRate = exports.VideoFrameRate || (exports.VideoFrameRate = {}));
/**
 * Sets the video bitrate (Kbps). Refer to the table below and set your bitrate. If you set a bitrate beyond the proper range, the SDK automatically adjusts it to a value within the range. You can also choose from the following options:
 * @enum {number}
 */
var BitRate;
(function (BitRate) {
    /**
     * (recommended) the standard bitrate mode. In this mode, the bitrates differ between the Live-broadcast and Communication profiles:
     * - Communication profile: the video bitrate is the same as the base bitrate.
     * - Live-broadcast profile: the video bitrate is twice the base bitrate.
     */
    BitRate[BitRate["Standard"] = 0] = "Standard";
    /**
     * the compatible bitrate mode. In this mode, the bitrate stays the same regardless of the profile. In the Live-broadcast profile, if you choose this mode, the video frame rate may be lower than the set value.
     */
    BitRate[BitRate["Compatible"] = -1] = "Compatible";
})(BitRate = exports.BitRate || (exports.BitRate = {}));
/**
 * Video mirror mode.
 * @enum {number}
 */
var VideoMirrorMode;
(function (VideoMirrorMode) {
    /**
     * (Default) The SDK determines the mirror mode.
     */
    VideoMirrorMode[VideoMirrorMode["Auto"] = 0] = "Auto";
    /**
     * Enables mirror mode.
     */
    VideoMirrorMode[VideoMirrorMode["Enabled"] = 1] = "Enabled";
    /**
     * Disables mirror mode.
     */
    VideoMirrorMode[VideoMirrorMode["Disabled"] = 2] = "Disabled";
})(VideoMirrorMode = exports.VideoMirrorMode || (exports.VideoMirrorMode = {}));
/**
 * Video output orientation mode.
 * @enum {number}
 */
var VideoOutputOrientationMode;
(function (VideoOutputOrientationMode) {
    /**
     * Adaptive mode (Default).
     * The video encoder adapts to the orientation mode of the video input device. When you use a custom video source, the output video from the encoder inherits the orientation of the original video.
     * - If the width of the captured video from the SDK is greater than the height, the encoder sends the video in landscape mode. The encoder also sends the rotational information of the video, and the receiver uses the rotational information to rotate the received video.
     * - If the original video is in portrait mode, the output video from the encoder is also in portrait mode. The encoder also sends the rotational information of the video to the receiver.
     */
    VideoOutputOrientationMode[VideoOutputOrientationMode["Adaptative"] = 0] = "Adaptative";
    /**
     * Landscape mode.
     * The video encoder always sends the video in landscape mode. The video encoder rotates the original video before sending it and the rotational information is 0. This mode applies to scenarios involving CDN live streaming.
     */
    VideoOutputOrientationMode[VideoOutputOrientationMode["FixedLandscape"] = 1] = "FixedLandscape";
    /**
     * Portrait mode.
     * The video encoder always sends the video in portrait mode. The video encoder rotates the original video before sending it and the rotational information is 0. This mode applies to scenarios involving CDN live streaming.
     */
    VideoOutputOrientationMode[VideoOutputOrientationMode["FixedPortrait"] = 2] = "FixedPortrait";
})(VideoOutputOrientationMode = exports.VideoOutputOrientationMode || (exports.VideoOutputOrientationMode = {}));
/**
 * Video pixel format.
 * @enum {number}
 */
var VideoPixelFormat;
(function (VideoPixelFormat) {
    /**
     * I420
     */
    VideoPixelFormat[VideoPixelFormat["I420"] = 1] = "I420";
    /**
     * BGRA
     */
    VideoPixelFormat[VideoPixelFormat["BGRA"] = 2] = "BGRA";
    /**
     * NV12
     */
    VideoPixelFormat[VideoPixelFormat["NV12"] = 8] = "NV12";
})(VideoPixelFormat = exports.VideoPixelFormat || (exports.VideoPixelFormat = {}));
/**
 * Quality change of the local video in terms of target frame rate and target bit rate since last count.
 * @enum {number}
 */
var VideoQualityAdaptIndication;
(function (VideoQualityAdaptIndication) {
    /**
     * The quality of the local video stays the same.
     */
    VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptNone"] = 0] = "AdaptNone";
    /**
     * The quality improves because the network bandwidth increases.
     */
    VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptUpBandwidth"] = 1] = "AdaptUpBandwidth";
    /**
     * The quality worsens because the network bandwidth decreases.
     */
    VideoQualityAdaptIndication[VideoQualityAdaptIndication["AdaptDownBandwidth"] = 2] = "AdaptDownBandwidth";
})(VideoQualityAdaptIndication = exports.VideoQualityAdaptIndication || (exports.VideoQualityAdaptIndication = {}));
/**
 * The state of the remote video.
 * @enum {number}
 */
var VideoRemoteState;
(function (VideoRemoteState) {
    /**
     * The remote video is in the default state, probably due to:
     * @see VideoRemoteStateReason.LocalMuted
     * @see VideoRemoteStateReason.RemoteMuted
     * @see VideoRemoteStateReason.RemoteOffline
     */
    VideoRemoteState[VideoRemoteState["Stopped"] = 0] = "Stopped";
    /**
     * The first remote video packet is received.
     */
    VideoRemoteState[VideoRemoteState["Starting"] = 1] = "Starting";
    /**
     * The remote video stream is decoded and plays normally, probably due to:
     * @see VideoRemoteStateReason.NetworkRecovery
     * @see VideoRemoteStateReason.LocalUnmuted
     * @see VideoRemoteStateReason.RemoteUnmuted
     * @see VideoRemoteStateReason.AudioFallbackRecovery
     */
    VideoRemoteState[VideoRemoteState["Decoding"] = 2] = "Decoding";
    /**
     * The remote video is frozen, probably due to:
     * @see VideoRemoteStateReason.NetworkCongestion
     * @see VideoRemoteStateReason.AudioFallback
     */
    VideoRemoteState[VideoRemoteState["Frozen"] = 3] = "Frozen";
    /**
     * The remote video fails to start, probably due to:
     * @see VideoRemoteStateReason.Internal
     */
    VideoRemoteState[VideoRemoteState["Failed"] = 4] = "Failed";
})(VideoRemoteState = exports.VideoRemoteState || (exports.VideoRemoteState = {}));
/**
 * The reason of the remote video state change.
 * @enum {number}
 */
var VideoRemoteStateReason;
(function (VideoRemoteStateReason) {
    /**
     * Internal reasons.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["Internal"] = 0] = "Internal";
    /**
     * Network congestion.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["NetworkCongestion"] = 1] = "NetworkCongestion";
    /**
     * Network recovery.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["NetworkRecovery"] = 2] = "NetworkRecovery";
    /**
     * The local user stops receiving the remote video stream or disables the video module.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["LocalMuted"] = 3] = "LocalMuted";
    /**
     * The local user stops receiving the remote video stream or disables the video module.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["LocalUnmuted"] = 4] = "LocalUnmuted";
    /**
     * The remote user stops sending the video stream or disables the video module.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["RemoteMuted"] = 5] = "RemoteMuted";
    /**
     * The remote user resumes sending the video stream or enables the video module.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["RemoteUnmuted"] = 6] = "RemoteUnmuted";
    /**
     * The remote user leaves the channel.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["RemoteOffline"] = 7] = "RemoteOffline";
    /**
     * The remote media stream falls back to the audio-only stream due to poor network conditions.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["AudioFallback"] = 8] = "AudioFallback";
    /**
     * The remote media stream switches back to the video stream after the network conditions improve.
     */
    VideoRemoteStateReason[VideoRemoteStateReason["AudioFallbackRecovery"] = 9] = "AudioFallbackRecovery";
})(VideoRemoteStateReason = exports.VideoRemoteStateReason || (exports.VideoRemoteStateReason = {}));
/**
 * Video display mode.
 * @enum {number}
 */
var VideoRenderMode;
(function (VideoRenderMode) {
    /**
     * Uniformly scale the video until it fills the visible boundaries (cropped). One dimension of the video may have clipped contents.
     */
    VideoRenderMode[VideoRenderMode["Hidden"] = 1] = "Hidden";
    /**
     * Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to the disparity in the aspect ratio are filled with black.
     */
    VideoRenderMode[VideoRenderMode["Fit"] = 2] = "Fit";
    /**
     * This mode is deprecated.
     * @deprecated
     */
    VideoRenderMode[VideoRenderMode["Adaptive"] = 3] = "Adaptive";
})(VideoRenderMode = exports.VideoRenderMode || (exports.VideoRenderMode = {}));
/**
 * Video rotation.
 * @enum {number}
 */
var VideoRotation;
(function (VideoRotation) {
    /**
     * No rotation
     */
    VideoRotation[VideoRotation["RotationNone"] = 0] = "RotationNone";
    /**
     * 90 degrees
     */
    VideoRotation[VideoRotation["Rotation90"] = 1] = "Rotation90";
    /**
     * 180 degrees
     */
    VideoRotation[VideoRotation["Rotation180"] = 2] = "Rotation180";
    /**
     * 270 degrees
     */
    VideoRotation[VideoRotation["Rotation270"] = 3] = "Rotation270";
})(VideoRotation = exports.VideoRotation || (exports.VideoRotation = {}));
/**
 * Video stream type.
 * @enum {number}
 */
var VideoStreamType;
(function (VideoStreamType) {
    /**
     * High-bitrate, high-resolution video stream.
     */
    VideoStreamType[VideoStreamType["High"] = 0] = "High";
    /**
     * Low-bitrate, low-resolution video stream.
     */
    VideoStreamType[VideoStreamType["Low"] = 1] = "Low";
})(VideoStreamType = exports.VideoStreamType || (exports.VideoStreamType = {}));
/**
 * Warning codes occur when the SDK encounters an error that may be recovered automatically. These are only notifications, and can generally be ignored. For example, when the SDK loses connection to the server, the SDK reports the OpenChannelTimeout(106) warning and tries to reconnect automatically.
 * @see WarningCode.OpenChannelTimeout
 * @enum {number}
 */
var WarningCode;
(function (WarningCode) {
    /**
     * The specified view is invalid. Specify a view when using the video call function.
     */
    WarningCode[WarningCode["InvalidView"] = 8] = "InvalidView";
    /**
     * Failed to initialize the video function, possibly caused by a lack of resources. The users cannot see the video while the voice communication is not affected.
     */
    WarningCode[WarningCode["InitVideo"] = 16] = "InitVideo";
    /**
     * The request is pending, usually due to some module not being ready, and the SDK postpones processing the request.
     */
    WarningCode[WarningCode["Pending"] = 20] = "Pending";
    /**
     * No channel resources are available. Maybe because the server cannot allocate any channel resource.
     */
    WarningCode[WarningCode["NoAvailableChannel"] = 103] = "NoAvailableChannel";
    /**
     * A timeout occurs when looking up the channel. When joining a channel, the SDK looks up the specified channel. The warning usually occurs when the network condition is too poor for the SDK to connect to the server.
     */
    WarningCode[WarningCode["LookupChannelTimeout"] = 104] = "LookupChannelTimeout";
    /**
     * The server rejects the request to look up the channel. The server cannot process this request or the request is illegal. DEPRECATED as of v2.4.1. Use RejectedByServer(10) in the reason parameter of onConnectionStateChanged.
     * @see ConnectionChangedReason.RejectedByServer
     * @see RtcEngineEvents.onConnectionStateChanged
     * @deprecated
     */
    WarningCode[WarningCode["LookupChannelRejected"] = 105] = "LookupChannelRejected";
    /**
     * The server rejects the request to look up the channel. The server cannot process this request or the request is illegal.
     */
    WarningCode[WarningCode["OpenChannelTimeout"] = 106] = "OpenChannelTimeout";
    /**
     * The server rejects the request to open the channel. The server cannot process this request or the request is illegal.
     */
    WarningCode[WarningCode["OpenChannelRejected"] = 107] = "OpenChannelRejected";
    /**
     * A timeout occurs when switching to the live video.
     */
    WarningCode[WarningCode["SwitchLiveVideoTimeout"] = 111] = "SwitchLiveVideoTimeout";
    /**
     * A timeout occurs when setting the client role in the live broadcast profile.
     */
    WarningCode[WarningCode["SetClientRoleTimeout"] = 118] = "SetClientRoleTimeout";
    /**
     * The client role is unauthorized.
     */
    WarningCode[WarningCode["SetClientRoleNotAuthorized"] = 119] = "SetClientRoleNotAuthorized";
    /**
     * The ticket to open the channel is invalid.
     */
    WarningCode[WarningCode["OpenChannelInvalidTicket"] = 121] = "OpenChannelInvalidTicket";
    /**
     * Try connecting to another server.
     */
    WarningCode[WarningCode["OpenChannelTryNextVos"] = 122] = "OpenChannelTryNextVos";
    /**
     * An error occurs in opening the audio mixing file.
     */
    WarningCode[WarningCode["AudioMixingOpenError"] = 701] = "AudioMixingOpenError";
    /**
     * Audio Device Module: a warning occurs in the playback device.
     */
    WarningCode[WarningCode["AdmRuntimePlayoutWarning"] = 1014] = "AdmRuntimePlayoutWarning";
    /**
     * Audio Device Module: a warning occurs in the recording device.
     */
    WarningCode[WarningCode["AdmRuntimeRecordingWarning"] = 1016] = "AdmRuntimeRecordingWarning";
    /**
     * Audio Device Module: no valid audio data is collected.
     */
    WarningCode[WarningCode["AdmRecordAudioSilence"] = 1019] = "AdmRecordAudioSilence";
    /**
     * Audio Device Module: a playback device fails.
     */
    WarningCode[WarningCode["AdmPlaybackMalfunction"] = 1020] = "AdmPlaybackMalfunction";
    /**
     * Audio Device Module: a recording device fails.
     */
    WarningCode[WarningCode["AdmRecordMalfunction"] = 1021] = "AdmRecordMalfunction";
    /**
     * Audio Device Module: call is interrupted by system events such as phone call or siri etc.
     */
    WarningCode[WarningCode["AdmInterruption"] = 1025] = "AdmInterruption";
    /**
     * Audio Device Module: the recorded audio is too low.
     */
    WarningCode[WarningCode["AdmRecordAudioLowlevel"] = 1031] = "AdmRecordAudioLowlevel";
    /**
     * Audio Device Module: the playback audio is too low.
     */
    WarningCode[WarningCode["AdmPlayoutAudioLowlevel"] = 1032] = "AdmPlayoutAudioLowlevel";
    /**
     * Audio Device Module: The recording device is busy.
     */
    WarningCode[WarningCode["AdmRecordIsOccupied"] = 1033] = "AdmRecordIsOccupied";
    /**
     * Audio Device Module: howling is detected.
     */
    WarningCode[WarningCode["ApmHowling"] = 1051] = "ApmHowling";
    /**
     * Audio Device Module: the device is in the glitch state.
     */
    WarningCode[WarningCode["AdmGlitchState"] = 1052] = "AdmGlitchState";
    /**
     * Audio Device Module: the underlying audio settings have changed.
     */
    WarningCode[WarningCode["AdmImproperSettings"] = 1053] = "AdmImproperSettings";
})(WarningCode = exports.WarningCode || (exports.WarningCode = {}));
/**
 * The audio channel of the sound.
 * @enum {number}
 */
var AudioChannel;
(function (AudioChannel) {
    /**
     * (Default) Supports dual channels. Depends on the upstream of the broadcaster.
     */
    AudioChannel[AudioChannel["Channel0"] = 0] = "Channel0";
    /**
     * The audio stream of the broadcaster uses the FL audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     */
    AudioChannel[AudioChannel["Channel1"] = 1] = "Channel1";
    /**
     * The audio stream of the broadcaster uses the FC audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     */
    AudioChannel[AudioChannel["Channel2"] = 2] = "Channel2";
    /**
     * The audio stream of the broadcaster uses the FR audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     */
    AudioChannel[AudioChannel["Channel3"] = 3] = "Channel3";
    /**
     * The audio stream of the broadcaster uses the BL audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     */
    AudioChannel[AudioChannel["Channel4"] = 4] = "Channel4";
    /**
     * The audio stream of the broadcaster uses the BR audio channel. If the upstream of the broadcaster uses multiple audio channels, these channels will be mixed into mono first.
     */
    AudioChannel[AudioChannel["Channel5"] = 5] = "Channel5";
})(AudioChannel = exports.AudioChannel || (exports.AudioChannel = {}));
/**
 * Video codec types.
 * @enum {number}
 */
var VideoCodecType;
(function (VideoCodecType) {
    /**
     * Standard VP8.
     */
    VideoCodecType[VideoCodecType["VP8"] = 1] = "VP8";
    /**
     * Standard H264.
     */
    VideoCodecType[VideoCodecType["H264"] = 2] = "H264";
    /**
     * Enhanced VP8.
     */
    VideoCodecType[VideoCodecType["EVP"] = 3] = "EVP";
    /**
     * Enhanced H264.
     */
    VideoCodecType[VideoCodecType["E264"] = 4] = "E264";
})(VideoCodecType = exports.VideoCodecType || (exports.VideoCodecType = {}));
//# sourceMappingURL=Types.js.map