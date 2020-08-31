/**
 * IP areas
 * @enum {number}
 */
export enum IPAreaCode {
    /**
     * Mainland China
     */
    AREA_CN = 1 << 0,
    /**
     * North America
     */
    AREA_NA = 1 << 1,
    /**
     * Europe
     */
    AREA_EUR = 1 << 2,
    /**
     * Asia, excluding Mainland China
     */
    AREA_AS = 1 << 3,
    /**
     * (Default) Global
     */
    AREA_GLOBAL = -1,
}

/**
 * Audio codec profile.
 * @enum {number}
 */
export enum AudioCodecProfileType {
    /**
     * 0: (Default) LC-AAC, which is the low-complexity audio codec profile.
     */
    LCAAC = 0,
    /**
     * 1: HE-AAC, which is the high-efficiency audio codec profile.
     */
    HEAAC = 1,
}

/**
 * Audio equalization band frequency.
 * @enum {number}
 */
export enum AudioEqualizationBandFrequency {
    /**
     * 0: 31 Hz.
     */
    Band31 = 0,
    /**
     * 1: 62 Hz.
     */
    Band62 = 1,
    /**
     * 2: 125 Hz.
     */
    Band125 = 2,
    /**
     * 3: 250 Hz.
     */
    Band250 = 3,
    /**
     * 4: 500 Hz.
     */
    Band500 = 4,
    /**
     * 5: 1 kHz.
     */
    Band1K = 5,
    /**
     * 6: 2 kHz.
     */
    Band2K = 6,
    /**
     * 7: 4 kHz.
     */
    Band4K = 7,
    /**
     * 8: 8 kHz.
     */
    Band8K = 8,
    /**
     * 9: 16 kHz.
     */
    Band16K = 9,
}

/**
 * The error information of the local audio.
 * @enum {number}
 */
export enum AudioLocalError {
    /**
     * 0: The local audio is normal.
     */
    Ok = 0,
    /**
     * 1: No specified reason for the local audio failure.
     */
    Failure = 1,
    /**
     * 2: No permission to use the local audio device.
     */
    DeviceNoPermission = 2,
    /**
     * 3: The microphone is in use.
     */
    DeviceBusy = 3,
    /**
     * 4: The local audio recording fails. Check whether the recording device is working properly.
     */
    RecordFailure = 4,
    /**
     * 5: The local audio encoding fails.
     */
    EncodeFailure = 5,
}

/**
 * The state of the local audio.
 * @enum {number}
 */
export enum AudioLocalState {
    /**
     * 0: The local audio is in the initial state.
     */
    Stopped = 0,
    /**
     * 1: The recording device starts successfully.
     */
    Recording = 1,
    /**
     * 2: The first audio frame encodes successfully.
     */
    Encoding = 2,
    /**
     * 3: The local audio fails to start.
     */
    Failed = 3,
}

/**
 * The error code of the audio mixing file.
 * @enum {number}
 */
export enum AudioMixingErrorCode {
    /**
     * 701: The SDK cannot open the audio mixing file.
     */
    CanNotOpen = 701,
    /**
     * 702: The SDK opens the audio mixing file too frequently.
     */
    TooFrequentCall = 702,
    /**
     * 703: The opening of the audio mixing file is interrupted.
     */
    InterruptedEOF = 703,
    /**
     * 0: No error.
     */
    OK = 0,
}

/**
 * The state of the audio mixing file.
 * @enum {number}
 */
export enum AudioMixingStateCode {
    /**
     * 710: The audio mixing file is playing.
     */
    Playing = 710,
    /**
     * 711: The audio mixing file pauses playing.
     */
    Paused = 711,
    /**
     * 713: The audio mixing file stops playing.
     */
    Stopped = 713,
    /**
     * 714: An exception occurs when playing the audio mixing file.
     */
    Failed = 714,
}

/**
 * Audio output routing.
 * @enum {number}
 */
export enum AudioOutputRouting {
    /**
     * -1: Default.
     */
    Default = -1,
    /**
     * 0: Headset.
     */
    Headset = 0,
    /**
     * 1: Earpiece.
     */
    Earpiece = 1,
    /**
     * 2: Headset with no microphone.
     */
    HeadsetNoMic = 2,
    /**
     * 3: Speakerphone.
     */
    Speakerphone = 3,
    /**
     * 4: Loudspeaker.
     */
    Loudspeaker = 4,
    /**
     * 5: Bluetooth headset.
     */
    HeadsetBluetooth = 5,
}

/**
 * Audio profile.
 * @enum {number}
 */
export enum AudioProfile {
    /**
     * 0: Default audio profile.
     * - In the Communication profile: A sample rate of 32 KHz, audio encoding, mono, and a bitrate of up to 18 Kbps.
     * - In the Live-broadcast profile: A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 52 Kbps.
     */
    Default = 0,
    /**
     * 1: A sample rate of 32 KHz, audio encoding, mono, and a bitrate of up to 18 Kbps.
     */
    SpeechStandard = 1,
    /**
     * 2: A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 48 Kbps.
     */
    MusicStandard = 2,
    /**
     * 3: A sample rate of 48 KHz, music encoding, stereo, and a bitrate of up to 56 Kbps.
     */
    MusicStandardStereo = 3,
    /**
     * 4: A sample rate of 48 KHz, music encoding, mono, and a bitrate of up to 128 Kbps.
     */
    MusicHighQuality = 4,
    /**
     * 5: A sample rate of 48 KHz, music encoding, stereo, and a bitrate of up to 192 Kbps.
     */
    MusicHighQualityStereo = 5,
}

/**
 * Use mode of the onRecordAudioFrame callback.
 * @enum {number}
 * TODO setPlaybackAudioFrameParameters
 */
export enum AudioRawFrameOperationMode {
    /**
     * 0: Users only read the AudioFrame data without modifying anything. For example, when users acquire data with the Agora SDK then push the RTMP streams.
     */
    ReadOnly = 0,
    /**
     * 1: Users replace the AudioFrame data with their own data and pass them to the SDK for encoding. For example, when users acquire data.
     */
    WriteOnly = 1,
    /**
     * 2: Users read the data from AudioFrame, modify it, and then play it. For example, when users have their own sound-effect processing module and perform some voice pre-processing such as a voice change.
     */
    ReadWrite = 2,
}

/**
 * Audio recording quality.
 */
export enum AudioRecordingQuality {
    /**
     * 0: The sample rate is 32 KHz, and the file size is around 1.2 MB after 10 minutes of recording.
     */
    Low = 0,
    /**
     * 1: The sample rate is 32 KHz, and the file size is around 2 MB after 10 minutes of recording.
     */
    Medium = 1,
    /**
     * 2: The sample rate is 32 KHz, and the file size is around 3.75 MB after 10 minutes of recording.
     */
    High = 2,
}

/**
 * The state of the remote audio.
 * @enum {number}
 */
export enum AudioRemoteState {
    /**
     * 0: The remote audio is in the default state, probably due to:
     * - [`LocalMuted`]{@link AudioRemoteStateReason.LocalMuted}
     * - [`RemoteMuted`]{@link AudioRemoteStateReason.RemoteMuted}
     * - [`RemoteOffline`]{@link AudioRemoteStateReason.RemoteOffline}
     */
    Stopped = 0,
    /**
     * 1: The first remote audio packet is received.
     */
    Starting = 1,
    /**
     * 2: The remote audio stream is decoded and plays normally, probably due to:
     * - [`NetworkRecovery`]{@link AudioRemoteStateReason.NetworkRecovery}
     * - [`LocalUnmuted`]{@link AudioRemoteStateReason.LocalUnmuted}
     * - [`RemoteUnmuted`]{@link AudioRemoteStateReason.RemoteUnmuted}
     */
    Decoding = 2,
    /**
     * 3: The remote audio is frozen, probably due to:
     * [`NetworkCongestion`]{@link AudioRemoteStateReason.NetworkCongestion}
     */
    Frozen = 3,
    /**
     * 4: The remote audio fails to start, probably due to:
     * [`Internal`]{@link AudioRemoteStateReason.Internal}
     */
    Failed = 4,
}

/**
 * The reason of the remote audio state change.
 * @enum {number}
 */
export enum AudioRemoteStateReason {
    /**
     * 0: Internal reasons.
     */
    Internal = 0,
    /**
     * 1: Network congestion.
     */
    NetworkCongestion = 1,
    /**
     * 2: Network recovery.
     */
    NetworkRecovery = 2,
    /**
     * 3: The local user stops receiving the remote audio stream or disables the audio module.
     */
    LocalMuted = 3,
    /**
     * 4: The local user resumes receiving the remote audio stream or enables the audio module.
     */
    LocalUnmuted = 4,
    /**
     * 5: The remote user stops sending the audio stream or disables the audio module.
     */
    RemoteMuted = 5,
    /**
     * 6: The remote user resumes sending the audio stream or enables the audio module.
     */
    RemoteUnmuted = 6,
    /**
     * 7: The remote user leaves the channel.
     */
    RemoteOffline = 7,
}

/**
 * The preset local voice reverberation option.
 * @enum {number}
 */
export enum AudioReverbPreset {
    /**
     * The original voice (no local voice reverberation).
     */
    Off = 0x00000000,
    /**
     * Pop music.
     */
    Popular = 0x00000001,
    /**
     * R&B.
     */
    RnB = 0x00000002,
    /**
     * Rock music.
     */
    Rock = 0x00000003,
    /**
     * Hip-hop music.
     */
    HipHop = 0x00000004,
    /**
     * Pop concert.
     */
    VocalConcert = 0x00000005,
    /**
     * Karaoke.
     */
    KTV = 0x00000006,
    /**
     * Recording studio.
     */
    Studio = 0x00000007,
    /**
     * The reverberation style typical of a KTV venue (enhanced).
     */
    FX_KTV = 0x00100001,
    /**
     * The reverberation style typical of a concert hall (enhanced).
     */
    FX_VOCAL_CONCERT = 0x00100002,
    /**
     * The reverberation style typical of an uncle’s voice.
     */
    FX_UNCLE = 0x00100003,
    /**
     * The reverberation style typical of a sister’s voice.
     */
    FX_SISTER = 0x00100004,
    /**
     * The reverberation style typical of a recording studio (enhanced).
     */
    FX_STUDIO = 0x00100005,
    /**
     * The reverberation style typical of popular music (enhanced).
     */
    FX_POPULAR = 0x00100006,
    /**
     * The reverberation style typical of R&B music (enhanced).
     */
    FX_RNB = 0x00100007,
    /**
     * The reverberation style typical of the vintage phonograph.
     */
    FX_PHONOGRAPH = 0x00100008,
    /**
     * The reverberation of the virtual stereo. The virtual stereo is an effect that renders
     * the monophonic audio as the stereo audio, so that all users in the channel can hear the stereo voice effect.
     * To achieve better virtual stereo reverberation, Agora recommends setting the profile
     * parameter in [`RtcEngine#setAudioProfile`]{@link RtcEngine#setAudioProfile} as [`MusicHighQualityStereo(5)`]{@link AudioProfile.MusicHighQualityStereo}.
     *
     */
    VIRTUAL_STEREO = 0x00200001,
}

/**
 * Audio reverberation type.
 * @enum {number}
 */
export enum AudioReverbType {
    /**
     * 0: The level of the dry signal (dB). The value ranges between -20 and 10.
     */
    DryLevel = 0,
    /**
     * 1: The level of the early reflection signal (wet signal) in dB. The value ranges between -20 and 10.
     */
    WetLevel = 1,
    /**
     * 2: The room size of the reverberation. A larger room size means a stronger reverberation. The value ranges between 0 and 100.
     */
    RoomSize = 2,
    /**
     * 3: The length of the initial delay of the wet signal (ms). The value ranges between 0 and 200.
     */
    WetDelay = 3,
    /**
     * 4: The reverberation strength. The value ranges between 0 and 100.
     */
    Strength = 4,
}

/**
 * Audio sample rate.
 * @enum {number}
 */
export enum AudioSampleRateType {
    /**
     * 32000: 32 kHz.
     */
    Type32000 = 32000,
    /**
     * 44100: 44.1 kHz.
     */
    Type44100 = 44100,
    /**
     * 48000: 48 kHz.
     */
    Type48000 = 48000,
}

/**
 * Audio scenario.
 * @enum {number}
 */
export enum AudioScenario {
    /**
     * 0: Default.
     */
    Default = 0,
    /**
     * 1: Entertainment scenario, supporting voice during gameplay.
     */
    ChatRoomEntertainment = 1,
    /**
     * 2: Education scenario, prioritizing fluency and stability.
     */
    Education = 2,
    /**
     * 3: Live gaming scenario, enabling the gaming audio effects in the speaker mode in a live broadcast scenario. Choose this scenario for high-fidelity music playback.
     */
    GameStreaming = 3,
    /**
     * 4: Showroom scenario, optimizing the audio quality with external professional equipment.
     */
    ShowRoom = 4,
    /**
     * 5: Gaming scenario.
     */
    ChatRoomGaming = 5,
}

/**
 * Audio session restriction.
 * @enum {number}
 * TODO iOS setAudioSessionOperationRestriction
 */
export enum AudioSessionOperationRestriction {
    /**
     * 0: No restriction, the SDK has full control of the audio session operations.
     */
    None = 0,
    /**
     * 1: The SDK does not change the audio session category.
     */
    SetCategory = 1,
    /**
     * 1 << 1: The SDK does not change any setting of the audio session (category, mode, categoryOptions).
     */
    ConfigureSession = 1 << 1,
    /**
     * 1 << 2: The SDK keeps the audio session active when leaving a channel.
     */
    DeactivateSession = 1 << 2,
    /**
     * 1 << 7: The SDK does not configure the audio session anymore.
     */
    All = 1 << 7,
}

/**
 * The preset audio voice configuration used to change the voice effect.
 * @enum {number}
 */
export enum AudioVoiceChanger {
    /**
     * The original voice (no local voice change).
     */
    Off = 0x00000000,
    /**
     * An old man’s voice.
     */
    OldMan = 0x00000001,
    /**
     * A little boy’s voice.
     */
    BabyBoy = 0x00000002,
    /**
     * A little girl’s voice.
     */
    BabyGirl = 0x00000003,
    /**
     * The voice of a growling bear.
     */
    ZhuBaJie = 0x00000004,
    /**
     * Ethereal vocal effects.
     */
    Ethereal = 0x00000005,
    /**
     * Hulk’s voice.
     */
    Hulk = 0x00000006,
    /**
     * A more vigorous voice.
     */
    BEAUTY_VIGOROUS = 0x00100001,
    /**
     * A deeper voice.
     */
    BEAUTY_DEEP = 0x00100002,
    /**
     * A mellower voice.
     */
    BEAUTY_MELLOW = 0x00100003,
    /**
     * Falsetto.
     */
    BEAUTY_FALSETTO = 0x00100004,
    /**
     * A fuller voice.
     */
    BEAUTY_FULL = 0x00100005,
    /**
     * A clearer voice.
     */
    BEAUTY_CLEAR = 0x00100006,
    /**
     * A more resounding voice.
     */
    BEAUTY_RESOUNDING = 0x00100007,
    /**
     * A more ringing voice.
     */
    BEAUTY_RINGING = 0x00100008,
    /**
     * A more spatially resonant voice.
     */
    BEAUTY_SPACIAL = 0x00100009,
    /**
     * (For male only) A more magnetic voice. Do not use it when the speaker is a female; otherwise, voice distortion occurs.
     */
    GENERAL_BEAUTY_VOICE_MALE_MAGNETIC = 0x00200001,
    /**
     * (For female only) A fresher voice. Do not use it when the speaker is a male; otherwise, voice distortion occurs.
     */
    GENERAL_BEAUTY_VOICE_FEMALE_FRESH = 0x00200002,
    /**
     * (For female only) A more vital voice. Do not use it when the speaker is a male; otherwise, voice distortion occurs.
     */
    GENERAL_BEAUTY_VOICE_FEMALE_VITALITY = 0x00200003,
}

/**
 * The camera capturer configuration.
 * @enum {number}
 */
export enum CameraCaptureOutputPreference {
    /**
     * 0: (default) Self-adapts the camera output parameters to the system performance and network conditions to balance CPU consumption and video preview quality.
     */
    Auto = 0,
    /**
     * 1: Prioritizes the system performance. The SDK chooses the dimension and frame rate of the local camera capture closest to those set by [`setVideoEncoderConfiguration`]{@link RtcEngine.setVideoEncoderConfiguration}.
     */
    Performance = 1,
    /**
     * 2: Prioritizes the local preview quality. The SDK chooses higher camera output parameters to improve the local video preview quality. This option requires extra CPU and RAM usage for video pre-processing.
     */
    Preview = 2,
    /**
     * 3: Internal use only
     */
    Unkown = 3,
}

/**
 * The camera direction.
 * @enum {number}
 */
export enum CameraDirection {
    /**
     * 0: The rear camera.
     */
    Rear = 0,
    /**
     * 1: The front camera.
     */
    Front = 1,
}

/**
 * The error code in AgoraChannelMediaRelayError.
 * @enum {number}
 */
export enum ChannelMediaRelayError {
    /**
     * 0: The state is normal.
     */
    None = 0,
    /**
     * 1: An error occurs in the server response.
     */
    ServerErrorResponse = 1,
    /**
     * 2: No server response. You can call the leaveChannel method to leave the channel.
     * [`leaveChannel`]{@link RtcEngine.leaveChannel}
     */
    ServerNoResponse = 2,
    /**
     * 3: The SDK fails to access the service, probably due to limited resources of the server.
     */
    NoResourceAvailable = 3,
    /**
     * 4: Fails to send the relay request.
     */
    FailedJoinSourceChannel = 4,
    /**
     * 5: Fails to accept the relay request.
     */
    FailedJoinDestinationChannel = 5,
    /**
     * 6: The server fails to receive the media stream.
     */
    FailedPacketReceivedFromSource = 6,
    /**
     * 7: The server fails to send the media stream.
     */
    FailedPacketSentToDestination = 7,
    /**
     * 8: The SDK disconnects from the server due to poor network connections. You can call [`leaveChannel`]{@link RtcEngine.leaveChannel} to leave the channel.
     *
     */
    ServerConnectionLost = 8,
    /**
     * 9: An internal error occurs in the server.
     */
    InternalError = 9,
    /**
     * 10: The token of the source channel has expired.
     */
    SourceTokenExpired = 10,
    /**
     * 11: The token of the destination channel has expired.
     */
    DestinationTokenExpired = 11,
}

/**
 * The event code in `ChannelMediaRelayEvent`.
 * @enum {number}
 */
export enum ChannelMediaRelayEvent {
    /**
     * 0: The user disconnects from the server due to poor network connections.
     */
    Disconnect = 0,
    /**
     * 1: The network reconnects.
     */
    Connected = 1,
    /**
     * 2: The user joins the source channel.
     */
    JoinedSourceChannel = 2,
    /**
     * 3: The user joins the destination channel.
     */
    JoinedDestinationChannel = 3,
    /**
     * 4: The SDK starts relaying the media stream to the destination channel.
     */
    SentToDestinationChannel = 4,
    /**
     * 5: The server receives the video stream from the source channel.
     */
    ReceivedVideoPacketFromSource = 5,
    /**
     * 6: The server receives the audio stream from the source channel.
     */
    ReceivedAudioPacketFromSource = 6,
    /**
     * 7: The destination channel is updated.
     */
    UpdateDestinationChannel = 7,
    /**
     * 8: The destination channel update fails due to internal reasons.
     */
    UpdateDestinationChannelRefused = 8,
    /**
     * 9: The destination channel does not change, which means that the destination channel fails to be updated.
     */
    UpdateDestinationChannelNotChange = 9,
    /**
     * 10: The destination channel name is NULL.
     */
    UpdateDestinationChannelIsNil = 10,
    /**
     * 11: The video profile is sent to the server.
     */
    VideoProfileUpdate = 11,
}

/**
 * The state code in [`ChannelMediaRelayState`]{@link ChannelMediaRelayState}.
 * @enum {number}
 */
export enum ChannelMediaRelayState {
    /**
     * 0: The SDK is initializing.
     */
    Idle = 0,
    /**
     * 1: The SDK tries to relay the media stream to the destination channel.
     */
    Connecting = 1,
    /**
     * 2: The SDK successfully relays the media stream to the destination channel.
     */
    Running = 2,
    /**
     * 3: A failure occurs. See the details in error.
     */
    Failure = 3,
}

/**
 * Channel profile.
 * @enum {number}
 */
export enum ChannelProfile {
    /**
     * 0: (Default) The Communication profile.
     * Use this profile in one-on-one calls or group calls, where all users can talk freely.
     */
    Communication = 0,
    /**
     * 1: The Live-Broadcast profile.
     * Users in a live-broadcast channel have a role as either host or audience. A host can both send and receive streams; an audience can only receive streams.
     */
    LiveBroadcasting = 1,
    /**
     * 2: The Gaming profile.
     * This profile uses a codec with a lower bitrate and consumes less power. Applies to the gaming scenario, where all game players can talk freely.
     */
    Game = 2,
}

/**
 * Client role in the `LiveBroadcasting` profile.
 * @enum {number}
 */
export enum ClientRole {
    /**
     * 1: A host can both send and receive streams.
     */
    Broadcaster = 1,
    /**
     * 2: The default role. An audience can only receive streams.
     */
    Audience = 2,
}

/**
 * Reasons for the connection state change.
 * @enum {number}
 */
export enum ConnectionChangedReason {
    /**
     * 0: The SDK is connecting to Agora’s edge server.
     */
    Connecting = 0,
    /**
     * 1: The SDK has joined the channel successfully.
     */
    JoinSuccess = 1,
    /**
     * 2: The connection between the SDK and Agora’s edge server is interrupted.
     */
    Interrupted = 2,
    /**
     * 3: The connection between the SDK and Agora’s edge server is banned by Agora’s edge server.
     */
    BannedByServer = 3,
    /**
     * 4: The SDK fails to join the channel for more than 20 minutes and stops reconnecting to the channel.
     */
    JoinFailed = 4,
    /**
     * 5: The SDK has left the channel.
     */
    LeaveChannel = 5,
    /**
     * 6: The specified App ID is invalid. Try to rejoin the channel with a valid App ID.
     */
    InvalidAppId = 6,
    /**
     * 7: The specified channel name is invalid. Try to rejoin the channel with a valid channel name.
     */
    InvalidChannelName = 7,
    /**
     * 8: The generated token is invalid probably due to the following reasons:
     * - The App Certificate for the project is enabled in Console, but you do not use Token when joining the channel. If you enable the App Certificate, you must use a token to join the channel.
     * - The uid that you specify in the [`joinChannel`]{@link RtcEngine.joinChannel} method is different from the uid that you pass for generating the token.
     *
     */
    InvalidToken = 8,
    /**
     * 9: The token has expired. Generate a new token from your server.
     */
    TokenExpired = 9,
    /**
     * 10: The user is banned by the server.
     */
    RejectedByServer = 10,
    /**
     * 11: The SDK tries to reconnect after setting a proxy server.
     */
    SettingProxyServer = 11,
    /**
     * 12: The token renews.
     */
    RenewToken = 12,
    /**
     * 13: The client IP address has changed, probably due to a change of the network type, IP address, or network port.
     */
    ClientIpAddressChanged = 13,
    /**
     * 14: Timeout for the keep-alive of the connection between the SDK and Agora’s edge server. The connection state changes to:
     * [`Reconnecting`]{@link ConnectionStateType.Reconnecting}
     */
    KeepAliveTimeout = 14,
}

/**
 * Connection states.
 * @enum {number}
 */
export enum ConnectionStateType {
    /**
     * 1: The SDK is disconnected from Agora's edge server.
     * - This is the initial state before [`joinChannel`]{@link RtcEngine.joinChannel}.
     * - The SDK also enters this state when the app calls [`leaveChannel`]{@link RtcEngine.leaveChannel}.
     *
     */
    Disconnected = 1,
    /**
     * 2: The SDK is connecting to Agora's edge server.
     * - When the app calls [`joinChannel`]{@link RtcEngine.joinChannel}, the SDK starts to establish a connection to the specified channel, triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback, and switches to the [`Connecting`]{@link ConnectionStateType.Connecting} state.
     * - When the SDK successfully joins the channel, the SDK triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback and switches to the [`Connected`]{@link ConnectionStateType.Connected} state.
     * - After the SDK joins the channel and when it finishes initializing the media engine, the SDK triggers the [`JoinChannelSuccess`]{@link RtcEngineEvents.JoinChannelSuccess} callback.
     *
     */
    Connecting = 2,
    /**
     * 3: The SDK is connected to Agora's edge server and joins a channel. You can now publish or subscribe to a media stream in the channel.
     * If the connection to the channel is lost because, for example, the network is down or switched, the SDK automatically tries to reconnect and triggers:
     * - The [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback, and switches to the [`Reconnecting`]{@link ConnectionStateType.Reconnecting} state.
     *
     */
    Connected = 3,
    /**
     * 4: The SDK keeps rejoining the channel after being disconnected from a joined channel because of network issues.
     * - If the SDK cannot rejoin the channel within 10 seconds after being disconnected from Agora’s edge server, the SDK triggers the [`ConnectionLost`]{@link RtcEngineEvents.ConnectionLost} callback, stays in the [`Reconnecting`]{@link ConnectionStateType.Reconnecting} state, and keeps rejoining the channel.
     *
     * - If the SDK fails to rejoin the channel 20 minutes after being disconnected from Agora’s edge server, the SDK triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callback, switches to the [`Failed`]{@link ConnectionStateType.Failed} state, and stops rejoining the channel.
     * [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged}
     *
     */
    Reconnecting = 4,
    /**
     * 5: The SDK fails to connect to Agora's edge server or join the channel.
     * You must call [`leaveChannel`]{@link RtcEngine.leaveChannel} to leave this state, and call [`joinChannel`]{@link RtcEngine.joinChannel} again to rejoin the channel.
     *
     * If the SDK is banned from joining the channel by Agora’s edge server (through the RESTful API), the SDK triggers the [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged} callbacks.
     *
     */
    Failed = 5,
}

/**
 * The video encoding degradation preference under limited bandwidth.
 * @enum {number}
 */
export enum DegradationPreference {
    /**
     * 0: (Default) Degrades the frame rate to guarantee the video quality.
     */
    MaintainQuality = 0,
    /**
     * 1: Degrades the video quality to guarantee the frame rate.
     */
    MaintainFramerate = 1,
    /**
     * 2: Reserved for future use.
     */
    Balanced = 2,
}

/**
 * Encryption mode
 * @enum {string}
 */
export enum EncryptionMode {
    /**
     * (Default) 128-bit AES encryption, XTS mode.
     */
    AES128XTS = 'aes-128-xts',
    /**
     * 256-bit AES encryption, XTS mode.
     */
    AES256XTS = 'aes-256-xts',
    /**
     * 128-bit AES encryption, ECB mode.
     */
    AES128ECB = 'aes-128-ecb',
}

/**
 * Error codes occur when the SDK encounters an error that cannot be recovered automatically without any app intervention.
 * @enum {number}
 */
export enum ErrorCode {
    /**
     * 0: No error occurs.
     */
    NoError = 0,
    /**
     * 1: A general error occurs (no specified reason).
     */
    Failed = 1,
    /**
     * 2: An invalid parameter is used. For example, the specific channel name includes illegal characters.
     */
    InvalidArgument = 2,
    /**
     * 3: The SDK module is not ready.
     * Possible solutions:
     * - Check the audio device.
     * - Check the completeness of the app.
     * - Re-initialize the SDK.
     */
    NotReady = 3,
    /**
     * 4: The current state of the SDK does not support this function.
     */
    NotSupported = 4,
    /**
     * 5: The request is rejected. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    Refused = 5,
    /**
     * 6: The buffer size is not big enough to store the returned data.
     */
    BufferTooSmall = 6,
    /**
     * 7: The SDK is not initialized before calling this method.
     */
    NotInitialized = 7,
    /**
     * 9: No permission exists. Check if the user has granted access to the audio or video device.
     */
    NoPermission = 9,
    /**
     * 10: An API method timeout occurs. Some API methods require the SDK to return the execution result, and this error occurs if the request takes too long (over 10 seconds) for the SDK to process.
     */
    TimedOut = 10,
    /**
     * 11: The request is canceled. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    Canceled = 11,
    /**
     * 12: The method is called too often. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    TooOften = 12,
    /**
     * 13: The SDK fails to bind to the network socket. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    BindSocket = 13,
    /**
     * 14: The network is unavailable. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    NetDown = 14,
    /**
     * 15: No network buffers are available. This is for internal SDK use only, and is not returned to the app through any method or callback.
     */
    NoBufs = 15,
    /**
     * 17: The request to join the channel is rejected.
     * Possible reasons are:
     * - The user is already in the channel, and still calls the API method to join the channel, for example, [`joinChannel`]{@link RtcEngine.joinChannel}
     * - The user tries joining the channel during the echo test. Please join the channel after the echo test ends.
     */
    JoinChannelRejected = 17,
    /**
     * 18: The request to leave the channel is rejected.
     * Possible reasons are:
     * - The user left the channel and still calls the API method to leave the channel, for example, [`leaveChannel`]{@link RtcEngine.leaveChannel}.
     * - The user has not joined the channel and calls the API method to leave the channel.
     */
    LeaveChannelRejected = 18,
    /**
     * 19: The resources are occupied and cannot be used.
     */
    AlreadyInUse = 19,
    /**
     * 20: The SDK gave up the request due to too many requests.
     */
    Abort = 20,
    /**
     * 21: In Windows, specific firewall settings cause the SDK to fail to initialize and crash.
     */
    InitNetEngine = 21,
    /**
     * 22: The app uses too much of the system resources and the SDK fails to allocate the resources.
     */
    ResourceLimited = 22,
    /**
     * 101: The specified App ID is invalid. Please try to rejoin the channel with a valid App ID.
     */
    InvalidAppId = 101,
    /**
     * 102: The specified channel name is invalid. Please try to rejoin the channel with a valid channel name.
     */
    InvalidChannelId = 102,
    /**
     * 109: The token expired.
     * **DEPRECATED** Use [`TokenExpired`]{@link ConnectionChangedReason.TokenExpired} in the reason parameter of [`onConnectionStateChanged`]{@link RtcEngineEvents.onConnectionStateChanged}.
     *
     * Possible reasons are:
     * - Authorized Timestamp expired: The timestamp is represented by the number of seconds elapsed since 1/1/1970. The user can use the token to access the Agora service within five minutes after the token is generated. If the user does not access the Agora service after five minutes, this token is no longer valid.
     * - Call Expiration Timestamp expired: The timestamp is the exact time when a user can no longer use the Agora service (for example, when a user is forced to leave an ongoing call). When a value is set for the Call Expiration Timestamp, it does not mean that the token will expire, but that the user will be banned from the channel.
     *
     */
    TokenExpired = 109,
    /**
     * 110: The token is invalid.
     * **DEPRECATED**  Use [`InvalidToken`]{@link ConnectionChangedReason.InvalidToken} in the reason parameter of [`onConnectionStateChanged`]{@link RtcEngineEvents.onConnectionStateChanged}.
     *
     * Possible reasons are:
     * - The App Certificate for the project is enabled in Console, but the user is using the App ID. Once the App Certificate is enabled, the user must use a token.
     * - The uid is mandatory, and users must set the same uid as the one set in the [`joinChannel`]{@link RtcEngine.joinChannel} method.
     *
     */
    InvalidToken = 110,
    /**
     * 111: The Internet connection is interrupted. This applies to the Agora Web SDK only.
     */
    ConnectionInterrupted = 111,
    /**
     * 112: The Internet connection is lost. This applies to the Agora Web SDK only.
     */
    ConnectionLost = 112,
    /**
     * 113: The user is not in the channel when calling the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} or [`getUserInfoByUserAccount`]{@link RtcEngine.getUserInfoByUserAccount} method.
     */
    NotInChannel = 113,
    /**
     * 114: The size of the sent data is over 1024 bytes when the user calls the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     *
     */
    SizeTooLarge = 114,
    /**
     * 115: The bitrate of the sent data exceeds the limit of 6 Kbps when the user calls the [`sendStreamMessage`]{@link RtcEngine.sendStreamMessage} method.
     */
    BitrateLimit = 115,
    /**
     * 116: Too many data streams (over five streams) are created when the user calls the [`createDataStream`]{@link RtcEngine.createDataStream} method.
     */
    TooManyDataStreams = 116,
    /**
     * 120: Decryption fails. The user may have used a different encryption password to join the channel. Check your settings or try rejoining the channel.
     */
    DecryptionFailed = 120,
    /**
     * 123: The client is banned by the server.
     */
    ClientIsBannedByServer = 123,
    /**
     * 124: Incorrect watermark file parameter.
     */
    WatermarkParam = 124,
    /**
     * 125: Incorrect watermark file path.
     */
    WatermarkPath = 125,
    /**
     * 126: Incorrect watermark file format.
     */
    WatermarkPng = 126,
    /**
     * 127: Incorrect watermark file information.
     */
    WatermarkInfo = 127,
    /**
     * 128: Incorrect watermark file data format.
     */
    WatermarkAGRB = 128,
    /**
     * 129: An error occurs in reading the watermark file.
     */
    WatermarkRead = 129,
    /**
     * 130: The encrypted stream is not allowed to publish.
     */
    EncryptedStreamNotAllowedPublish = 130,
    /**
     * 134: The user account is invalid.
     */
    InvalidUserAccount = 134,
    /**
     * 151: CDN related errors. Remove the original URL address and add a new one by calling the [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} and [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} methods.
     */
    PublishStreamCDNError = 151,
    /**
     * 152: The host publishes more than 10 URLs. Delete the unnecessary URLs before adding new ones.
     */
    PublishStreamNumReachLimit = 152,
    /**
     * 153: The host manipulates other hosts' URLs. Check your app logic.
     */
    PublishStreamNotAuthorized = 153,
    /**
     * 154: An error occurs in Agora’s streaming server. Call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the stream again.
     */
    PublishStreamInternalServerError = 154,
    /**
     * 155: The server fails to find the stream.
     */
    PublishStreamNotFound = 155,
    /**
     * 156: The format of the RTMP stream URL is not supported. Check whether the URL format is correct.
     */
    PublishStreamFormatNotSuppported = 156,
    /**
     * 1001: Fails to load the media engine.
     */
    LoadMediaEngine = 1001,
    /**
     * 1002: Fails to start the call after enabling the media engine.
     */
    StartCall = 1002,
    /**
     * 1003: Fails to start the camera.
     *
     * **DEPRECATED** Use [`CaptureFailure`]{@link LocalVideoStreamError.CaptureFailure} in the error parameter of [`LocalVideoStateChanged`]{@link RtcEngineEvents.LocalVideoStateChanged}.
     *
     */
    StartCamera = 1003,
    /**
     * 1004: Fails to start the video rendering module.
     */
    StartVideoRender = 1004,
    /**
     * 1005: Audio Device Module: A general error occurs in the Audio Device Module (the reason is not classified specifically). Check if the audio device is used by another app, or try rejoining the channel.
     */
    AdmGeneralError = 1005,
    /**
     * 1006: Audio Device Module: An error occurs in using the Java resources.
     */
    AdmJavaResource = 1006,
    /**
     * 1007: Audio Device Module: An error occurs in setting the sampling frequency.
     */
    AdmSampleRate = 1007,
    /**
     * 1008: Audio Device Module: An error occurs in initializing the playback device.
     */
    AdmInitPlayout = 1008,
    /**
     * 1009: Audio Device Module: An error occurs in starting the playback device.
     */
    AdmStartPlayout = 1009,
    /**
     * 1010: Audio Device Module: An error occurs in stopping the playback device.
     */
    AdmStopPlayout = 1010,
    /**
     * 1011: Audio Device Module: An error occurs in initializing the recording device.
     */
    AdmInitRecording = 1011,
    /**
     * 1012: Audio Device Module: An error occurs in starting the recording device.
     */
    AdmStartRecording = 1012,
    /**
     * 1013: Audio Device Module: An error occurs in stopping the recording device.
     */
    AdmStopRecording = 1013,
    /**
     * 1015: Audio Device Module: A playback error occurs. Check your playback device, or try rejoining the channel.
     */
    AdmRuntimePlayoutError = 1015,
    /**
     * 1017: Audio Device Module: A recording error occurs.
     */
    AdmRuntimeRecordingError = 1017,
    /**
     * 1018: Audio Device Module: Fails to record.
     */
    AdmRecordAudioFailed = 1018,
    /**
     * 1020: Audio Device Module: Abnormal audio playback frequency.
     */
    AdmPlayAbnormalFrequency = 1020,
    /**
     * 1021: Audio Device Module: Abnormal audio recording frequency.
     */
    AdmRecordAbnormalFrequency = 1021,
    /**
     * 1022: Audio Device Module: An error occurs in initializing the loopback device.
     */
    AdmInitLoopback = 1022,
    /**
     * 1023: Audio Device Module: An error occurs in starting the loopback device.
     */
    AdmStartLoopback = 1023,
    /**
     * 1027: Audio Device Module: No recording permission.
     */
    AdmNoPermission = 1027,
    /**
     * 1030: Audio Routing: Fails to route the audio to the connected Bluetooth device. The default route is used.
     */
    AudioBtScoFailed = 1030,
    /**
     * 1359: Audio Device Module: No recording device exists.
     */
    AdmNoRecordingDevice = 1359,
    /**
     * 1360: No playback device exists.
     */
    AdmNoPlayoutDevice = 1360,
    /**
     * 1501: Video Device Module: The camera is unauthorized.
     */
    VdmCameraNotAuthorized = 1501,
    /**
     * 1600: Video Device Module: An unknown error occurs.
     */
    VcmUnknownError = 1600,
    /**
     * 1601: Video Device Module: An error occurs in initializing the video encoder.
     */
    VcmEncoderInitError = 1601,
    /**
     * 1602: Video Device Module: An error occurs in video encoding.
     */
    VcmEncoderEncodeError = 1602,
    /**
     * 1603: Video Device Module: An error occurs in setting the video encoder.
     *
     * **DEPRECATED**
     * This error code is deprecated.
     */
    VcmEncoderSetError = 1603,
}

/**
 * State of importing an external video stream in a live broadcast.
 * @enum {number}
 */
export enum InjectStreamStatus {
    /**
     * 0: The external video stream imported successfully.
     */
    StartSuccess = 0,
    /**
     * 1: The external video stream already exists.
     */
    StartAlreadyExists = 1,
    /**
     * 2: The external video stream import is unauthorized.
     */
    StartUnauthorized = 2,
    /**
     * 3: Import external video stream timeout.
     */
    StartTimedout = 3,
    /**
     * 4: The external video stream failed to import.
     */
    StartFailed = 4,
    /**
     * 5: The external video stream stops importing successfully.
     */
    StopSuccess = 5,
    /**
     * 6: No external video stream is found.
     */
    StopNotFound = 6,
    /**
     * 7: The external video stream to be stopped importing is unauthorized.
     */
    StopUnauthorized = 7,
    /**
     * 8: Stopping importing the external video stream timed out.
     */
    StopTimedout = 8,
    /**
     * 9: Stopping Importing the external video stream failed.
     */
    StopFailed = 9,
    /**
     * 10: The external video stream import is corrupted.
     */
    Broken = 10,
}

/**
 * The state of the probe test result.
 * @enum {number}
 */
export enum LastmileProbeResultState {
    /**
     * 1: the last-mile network probe test is complete.
     */
    Complete = 1,
    /**
     * 2: the last-mile network probe test is incomplete and the bandwidth estimation is not available, probably due to limited test resources.
     */
    IncompleteNoBwe = 2,
    /**
     * 3: The last-mile network probe test is not carried out, probably due to poor network conditions.
     */
    Unavailable = 3,
}

/**
 * The lightening contrast level.
 * @enum {number}
 */
export enum LighteningContrastLevel {
    /**
     * 0: Low contrast level.
     */
    Low = 0,
    /**
     * 1: (Default) Normal contrast level.
     */
    Normal = 1,
    /**
     * 2: High contrast level.
     */
    High = 2,
}

/**
 * The detailed error information of the local video.
 * @enum {number}
 */
export enum LocalVideoStreamError {
    /**
     * 0: The local video is normal.
     */
    OK = 0,
    /**
     * 1: No specified reason for the local video failure.
     */
    Failure = 1,
    /**
     * 2: No permission to use the local video device.
     */
    DeviceNoPermission = 2,
    /**
     * 3: The local video capturer is in use.
     */
    DeviceBusy = 3,
    /**
     * 4: The local video capture fails. Check whether the capturer is working properly.
     */
    CaptureFailure = 4,
    /**
     * 5: The local video encoding fails.
     */
    EncodeFailure = 5,
}

/**
 * The state of the local video stream.
 * @enum {number}
 */
export enum LocalVideoStreamState {
    /**
     * 0: The local video is in the initial state.
     */
    Stopped = 0,
    /**
     * 1: The local video capturer starts successfully.
     */
    Capturing = 1,
    /**
     * 2: The first local video frame encodes successfully.
     */
    Encoding = 2,
    /**
     * 3: The local video fails to start.
     */
    Failed = 3,
}

/**
 * Output log filter level.
 * @enum {number}
 */
export enum LogFilter {
    /**
     * 0: Do not output any log information.
     */
    Off = 0,
    /**
     * 0x080f: Output all log information. Set your log filter as debug if you want to get the most complete log file.
     */
    Debug = 0x080f,
    /**
     * 0x000f: Output CRITICAL, ERROR, WARNING, and INFO level log information. We recommend setting your log filter as this level.
     */
    Info = 0x000f,
    /**
     * 0x000e: Outputs CRITICAL, ERROR, and WARNING level log information.
     */
    Warning = 0x000e,
    /**
     * 0x000c: Outputs CRITICAL and ERROR level log information.
     */
    Error = 0x000c,
    /**
     * 0x0008: Outputs CRITICAL level log information.
     */
    Critical = 0x0008,
}

/**
 * Media device type.
 * @enum {number}
 * TODO MacOS AgoraMediaDeviceType
 */
export enum MediaDeviceType {
    /**
     * -1: Unknown device.
     */
    AudioUnknown = -1,
    /**
     * 0: Audio playback device.
     */
    AudioPlayout = 0,
    /**
     * 1: Audio recording device.
     */
    AudioRecording = 1,
    /**
     * 2: Video render device.
     */
    VideoRender = 2,
    /**
     * 3: Video capture device.
     */
    VideoCapture = 3,
}

/**
 * Media type.
 * @enum {number}
 * TODO LiveEngine
 */
export enum MediaType {
    /**
     * 0: No audio and video.
     */
    None = 0,
    /**
     * 1: Audio only.
     */
    AudioOnly = 1,
    /**
     * 2: Video only.
     */
    VideoOnly = 2,
    /**
     * 3: Audio and video.
     */
    AudioAndVideo = 3,
}

/**
 * The metadata type.
 * @enum {number}
 * TODO registerMediaMetadataObserver
 */
export enum MetadataType {
    /**
     * -1: The metadata type is unknown.
     */
    Unknown = -1,
    /**
     * 0: The metadata type is video.
     */
    Video = 0,
}

/**
 * Network quality.
 * @enum {number}
 */
export enum NetworkQuality {
    /**
     * 0: The network quality is unknown.
     */
    Unknown = 0,
    /**
     * 1: The network quality is excellent.
     */
    Excellent = 1,
    /**
     * 2: The network quality is quite good, but the bitrate may be slightly lower than excellent.
     */
    Good = 2,
    /**
     * 3: Users can feel the communication slightly impaired.
     */
    Poor = 3,
    /**
     * 4: Users can communicate only not very smoothly.
     */
    Bad = 4,
    /**
     * 5: The network quality is so bad that users can hardly communicate.
     */
    VBad = 5,
    /**
     * 6: The network is disconnected and users cannot communicate at all.
     */
    Down = 6,
    /**
     * 7: Users cannot detect the network quality. (Not in use.)
     */
    Unsupported = 7,
    /**
     * 8: Detecting the network quality.
     */
    Detecting = 8,
}

/**
 * Network type.
 * @enum {number}
 */
export enum NetworkType {
    /**
     * -1: The network type is unknown.
     */
    Unknown = -1,
    /**
     * 0: The SDK disconnects from the network.
     */
    Disconnected = 0,
    /**
     * 1: The network type is LAN.
     */
    LAN = 1,
    /**
     * 2: The network type is Wi-Fi (including hotspots).
     */
    WIFI = 2,
    /**
     * 3: The network type is mobile 2G.
     */
    Mobile2G = 3,
    /**
     * 4: The network type is mobile 3G.
     */
    Mobile3G = 4,
    /**
     * 5: The network type is mobile 4G.
     */
    Mobile4G = 5,
}

/**
 * Default camera position
 * @enum {number}
 * TODO AgoraRtcDefaultCamera
 */
export enum RtcDefaultCameraPosition {
    /**
     * 0: Front camera
     */
    Front = 0,
    /**
     * 1: Rear camera
     */
    Back = 1,
}

/**
 * Lifecycle of the CDN live video stream.
 * @enum {number}
 * TODO AgoraPublisherConfiguration
 */
export enum RtmpStreamLifeCycle {
    /**
     * 1: Bound to the channel lifecycle. If all hosts leave the channel, the CDN live streaming stops after 30 seconds.
     */
    BindToChannel = 1,
    /**
     * 2: Bound to the owner of the RTMP stream. If the owner leaves the channel, the CDN live streaming stops immediately.
     */
    BindToOwnner = 2,
}

/**
 * The detailed error information for streaming.
 * @enum {number}
 */
export enum RtmpStreamingErrorCode {
    /**
     * 0: The RTMP streaming publishes successfully.
     */
    OK = 0,
    /**
     * 1: Invalid argument used. If, for example, you do not call the [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} method to configure
     * the `LiveTranscoding` parameters before calling the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method, the SDK returns this error.
     * Check whether you set the parameters in the [`setLiveTranscoding`]{@link RtcEngine.setLiveTranscoding} method properly.
     */
    InvalidParameters = 1,
    /**
     * 2: The RTMP streaming is encrypted and cannot be published.
     */
    EncryptedStreamNotAllowed = 2,
    /**
     * 3: Timeout for the RTMP streaming. Call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the streaming again.
     */
    ConnectionTimeout = 3,
    /**
     * 4: An error occurs in Agora’s streaming server. Call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the streaming again.
     */
    InternalServerError = 4,
    /**
     * 5: An error occurs in the RTMP server.
     */
    RtmpServerError = 5,
    /**
     * 6: The RTMP streaming publishes too frequently.
     */
    TooOften = 6,
    /**
     * 7: The host publishes more than 10 URLs. Delete the unnecessary URLs before adding new ones.
     */
    ReachLimit = 7,
    /**
     * 8: The host manipulates other hosts' URLs. Check your app logic.
     */
    NotAuthorized = 8,
    /**
     * 9: Agora’s server fails to find the RTMP streaming.
     */
    StreamNotFound = 9,
    /**
     * 10: The format of the RTMP streaming URL is not supported. Check whether the URL format is correct.
     */
    FormatNotSupported = 10,
}

/**
 * The RTMP streaming state.
 * @enum {number}
 */
export enum RtmpStreamingState {
    /**
     * 0: The RTMP streaming has not started or has ended. This state is also triggered after you
     * remove an RTMP address from the CDN by calling [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl}.
     *
     */
    Idle = 0,
    /**
     * 1: The SDK is connecting to Agora’s streaming server and the RTMP server.
     * This state is triggered after you call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method.
     *
     */
    Connecting = 1,
    /**
     * 2: The RTMP streaming is being published. The SDK successfully publishes the RTMP streaming and returns this state.
     */
    Running = 2,
    /**
     * 3: The RTMP streaming is recovering. When exceptions occur to the CDN, or the streaming is interrupted,
     * the SDK attempts to resume RTMP streaming and returns this state.
     *
     * - If the SDK successfully resumes the streaming, [`Running`]{@link RtmpStreamingState.Running} returns.
     * - If the streaming does not resume within 60 seconds or server errors occur,
     * [`Failure`]{@link RtmpStreamingState.Failure} returns.
     *
     * You can also reconnect to the server by calling the [`removePublishStreamUrl`]{@link RtcEngine.removePublishStreamUrl} and [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} methods.
     *
     */
    Recovering = 3,
    /**
     * 4: The RTMP streaming fails. See the errorCode parameter for the detailed error information.
     * You can also call the [`addPublishStreamUrl`]{@link RtcEngine.addPublishStreamUrl} method to publish the RTMP streaming again.
     *
     */
    Failure = 4,
}

/**
 * Stream fallback option.
 * @enum {number}
 */
export enum StreamFallbackOptions {
    /**
     * 0: No fallback behavior for the local/remote video stream when the uplink/downlink network condition is unreliable. The quality of the stream is not guaranteed.
     */
    Disabled = 0,
    /**
     * 1: Under unreliable downlink network conditions, the remote video stream falls back to the
     * low-stream (low resolution and low bitrate) video. You can only set this option
     * in the [`setRemoteSubscribeFallbackOption`]{@link RtcEngine.setRemoteSubscribeFallbackOption} method.
     * Nothing happens when you set this in the [`setLocalPublishFallbackOption`]{@link RtcEngine.setLocalPublishFallbackOption} method.
     *
     */
    VideoStreamLow = 1,
    /**
     * 2: Under unreliable uplink network conditions, the published video stream falls back to audio only. Under unreliable downlink network conditions, the remote video stream first falls back to the low-stream (low resolution and low bitrate) video; and then to an audio-only stream if the network condition deteriorates.
     */
    AudioOnly = 2,
}

/**
 * Reason for the user being offline.
 * @enum {number}
 */
export enum UserOfflineReason {
    /**
     * 0: The user left the current channel.
     */
    Quit = 0,
    /**
     * 1: The SDK timed out and the user dropped offline because no data packet is received within a certain period of time. If a user quits the call and the message is not passed to the SDK (due to an unreliable channel), the SDK assumes the user dropped offline.
     */
    Dropped = 1,
    /**
     * 2: (Live broadcast only.) The client role switched from the host to the audience.
     */
    BecomeAudience = 2,
}

/**
 * The priority of the remote user.
 * @enum {number}
 */
export enum UserPriority {
    /**
     * 50: The user’s priority is high.
     */
    High = 50,
    /**
     * 100: (Default) The user’s priority is normal.
     */
    Normal = 100,
}

/**
 * Video buffer type
 * @enum {number}
 * TODO iOS AgoraVideoSourceProtocol AgoraVideoSinkProtocol
 */
export enum VideoBufferType {
    /**
     * 1: Use a pixel buffer to transmit the video data.
     */
    PixelBuffer = 1,
    /**
     * 2: Use raw data to transmit the video data.
     */
    RawData = 2,
}

/**
 * Self-defined video codec profile.
 * @enum {number}
 */
export enum VideoCodecProfileType {
    /**
     * 66: Baseline video codec profile. Generally used in video calls on mobile phones.
     */
    BaseLine = 66,
    /**
     * 77: Main video codec profile. Generally used in mainstream electronics, such as MP4 players, portable video players, PSP, and iPads.
     */
    Main = 77,
    /**
     * 100: (Default) High video codec profile. Generally used in high-resolution broadcasts or television.
     */
    High = 100,
}

/**
 * The content hint for screen sharing.
 * @enum {number}
 * TODO MacOS setScreenCaptureContentHint
 *
 */
export enum VideoContentHint {
    /**
     * 0: (Default) No content hint.
     */
    None = 0,
    /**
     * 1: Motion-intensive content. Choose this option if you prefer smoothness or when you are sharing a video clip, movie, or video game.
     */
    Motion = 1,
    /**
     * 2: Motionless content. Choose this option if you prefer sharpness or when you are sharing a picture, PowerPoint slide, or text.
     */
    Details = 2,
}

/**
 * Video frame rate
 * @enum {number}
 */
export enum VideoFrameRate {
    /**
     * -1: The minimum frame rate of the video.
     */
    Min = -1,
    /**
     * 1: 1 fps.
     */
    Fps1 = 1,
    /**
     * 7: 7 fps.
     */
    Fps7 = 7,
    /**
     * 10: 10 fps.
     */
    Fps10 = 10,
    /**
     * 15: 15 fps.
     */
    Fps15 = 15,
    /**
     * 24: 24 fps.
     */
    Fps24 = 24,
    /**
     * 30: 30 fps.
     */
    Fps30 = 30,
    /**
     * 60: 60 fps (macOS only).
     */
    Fps60 = 60,
}

/**
 * Bitrate of the video (Kbps). Refer to the table below and set your bitrate.
 * If you set a bitrate beyond the proper range, the SDK automatically adjusts it to a value within the range.
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
 * Agora uses different video codecs for different profiles to optimize the user experience. For example,
 * the Communication profile prioritizes the smoothness while the LIVE_BROADCASTING profile prioritizes the
 * video quality (a higher bitrate). Therefore, We recommend setting this parameter as STANDARD_BITRATE = 0.
 * @enum {number}
 */
export enum BitRate {
    /**
     * 0: (Recommended) the standard bitrate mode. In this mode, the bitrates differ between the Live-broadcast and Communication profiles:
     * - Communication profile: the video bitrate is the same as the base bitrate.
     * - Live-broadcast profile: the video bitrate is twice the base bitrate.
     */
    Standard = 0,
    /**
     * -1: The compatible bitrate mode. In this mode, the bitrate stays the same regardless of the profile. In the Live-broadcast profile,
     * if you choose this mode, the video frame rate may be lower than the set value.
     */
    Compatible = -1,
}

/**
 * Video mirror mode.
 * @enum {number}
 */
export enum VideoMirrorMode {
    /**
     * 0: (Default) The SDK determines the mirror mode.
     */
    Auto = 0,
    /**
     * 1: Enables mirror mode.
     */
    Enabled = 1,
    /**
     * 2: Disables mirror mode.
     */
    Disabled = 2,
}

/**
 * Video output orientation mode.
 * @enum {number}
 */
export enum VideoOutputOrientationMode {
    /**
     * 0: Adaptive mode (Default).
     *
     * The video encoder adapts to the orientation mode of the video input device. When you use a custom video source, the output video from the encoder inherits the orientation of the original video.
     * - If the width of the captured video from the SDK is greater than the height, the encoder sends the video in landscape mode. The encoder also sends the rotational information of the video, and the receiver uses the rotational information to rotate the received video.
     * - If the original video is in portrait mode, the output video from the encoder is also in portrait mode. The encoder also sends the rotational information of the video to the receiver.
     */
    Adaptative = 0,
    /**
     * 1: Landscape mode.
     *
     * The video encoder always sends the video in landscape mode. The video encoder rotates the original video before sending it and the rotational information is 0. This mode applies to scenarios involving CDN live streaming.
     */
    FixedLandscape = 1,
    /**
     * 2: Portrait mode.
     *
     * The video encoder always sends the video in portrait mode. The video encoder rotates the original video before sending it and the rotational information is 0. This mode applies to scenarios involving CDN live streaming.
     */
    FixedPortrait = 2,
}

/**
 * Video pixel format.
 * @enum {number}
 * TODO iOS AgoraVideoSinkProtocol
 *
 */
export enum VideoPixelFormat {
    /**
     * 1: I420
     */
    I420 = 1,
    /**
     * 2: BGRA
     */
    BGRA = 2,
    /**
     * 8: NV12
     */
    NV12 = 8,
}

/**
 * Quality change of the local video in terms of target frame rate and target bit rate since last count.
 * @enum {number}
 */
export enum VideoQualityAdaptIndication {
    /**
     * 0: The quality of the local video stays the same.
     */
    AdaptNone = 0,
    /**
     * 1: The quality improves because the network bandwidth increases.
     */
    AdaptUpBandwidth = 1,
    /**
     * 2: The quality worsens because the network bandwidth decreases.
     */
    AdaptDownBandwidth = 2,
}

/**
 * The state of the remote video.
 * @enum {number}
 */
export enum VideoRemoteState {
    /**
     * 0: The remote video is in the default state, probably due to:
     * - [`LocalMuted`]{@link VideoRemoteStateReason.LocalMuted}
     * - [`RemoteMuted`]{@link VideoRemoteStateReason.RemoteMuted}
     * - [`RemoteOffline`]{@link VideoRemoteStateReason.RemoteOffline}
     */
    Stopped = 0,
    /**
     * 1: The first remote video packet is received.
     */
    Starting = 1,
    /**
     * 2: The remote video stream is decoded and plays normally, probably due to:
     * - [`NetworkRecovery`]{@link VideoRemoteStateReason.NetworkRecovery}
     * - [`LocalUnmuted`]{@link VideoRemoteStateReason.LocalUnmuted}
     * - [`RemoteUnmuted`]{@link VideoRemoteStateReason.RemoteUnmuted}
     * - [`AudioFallbackRecovery`]{@link VideoRemoteStateReason.AudioFallbackRecovery}
     */
    Decoding = 2,
    /**
     * 3: The remote video is frozen, probably due to:
     * - [`NetworkCongestion`]{@link VideoRemoteStateReason.NetworkCongestion}
     * - [`AudioFallback`]{@link VideoRemoteStateReason.AudioFallback}
     */
    Frozen = 3,
    /**
     * 4: The remote video fails to start, probably due to: [`Internal`]{@link VideoRemoteStateReason.Internal}
     */
    Failed = 4,
}

/**
 * The reason of the remote video state change.
 * @enum {number}
 */
export enum VideoRemoteStateReason {
    /**
     * 0: Internal reasons.
     */
    Internal = 0,
    /**
     * 1: Network congestion.
     */
    NetworkCongestion = 1,
    /**
     * 2: Network recovery.
     */
    NetworkRecovery = 2,
    /**
     * 3: The local user stops receiving the remote video stream or disables the video module.
     */
    LocalMuted = 3,
    /**
     * 4: The local user resumes receiving the remote video stream or disables the video module.
     */
    LocalUnmuted = 4,
    /**
     * 5: The remote user stops sending the video stream or disables the video module.
     */
    RemoteMuted = 5,
    /**
     * 6: The remote user resumes sending the video stream or enables the video module.
     */
    RemoteUnmuted = 6,
    /**
     * 7: The remote user leaves the channel.
     */
    RemoteOffline = 7,
    /**
     * 8: The remote media stream falls back to the audio-only stream due to poor network conditions.
     */
    AudioFallback = 8,
    /**
     * 9: The remote media stream switches back to the video stream after the network conditions improve.
     */
    AudioFallbackRecovery = 9,
}

/**
 * Video display mode.
 * @enum {number}
 */
export enum VideoRenderMode {
    /**
     * 1: Uniformly scale the video until it fills the visible boundaries (cropped). One dimension of the video may have clipped contents.
     */
    Hidden = 1,
    /**
     * 2: Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to the disparity in the aspect ratio are filled with black.
     */
    Fit = 2,
    /**
     * **DEPRECATED**
     * 3: This mode is deprecated.
     *
     */
    Adaptive = 3,
    /**
     * 4: The fill mode. In this mode, the SDK stretches or zooms the video to fill the display window.
     */
    FILL = 4,
}

/**
 * Video rotation.
 * @enum {number}
 * TODO iOS AgoraVideoSourceProtocol AgoraVideoSinkProtocol
 */
export enum VideoRotation {
    /**
     * 0: No rotation
     */
    RotationNone = 0,
    /**
     * 1: 90 degrees
     */
    Rotation90 = 1,
    /**
     * 2: 180 degrees
     */
    Rotation180 = 2,
    /**
     * 3: 270 degrees
     */
    Rotation270 = 3,
}

/**
 * Video stream type.
 * @enum {number}
 */
export enum VideoStreamType {
    /**
     * 0: High-bitrate, high-resolution video stream.
     */
    High = 0,
    /**
     * 1: Low-bitrate, low-resolution video stream.
     */
    Low = 1,
}

/**
 * Warning codes occur when the SDK encounters an error that may be recovered automatically.
 * These are only notifications, and can generally be ignored. For example, when the SDK loses connection to the server,
 * the SDK reports the [`OpenChannelTimeout(106)`]{@link WarningCode.OpenChannelTimeout} warning and tries to reconnect automatically.
 * @enum {number}
 */
export enum WarningCode {
    /**
     * 8: The specified view is invalid. Specify a view when using the video call function.
     */
    InvalidView = 8,
    /**
     * 16: Failed to initialize the video function, possibly caused by a lack of resources. The users cannot see the video while the voice communication is not affected.
     */
    InitVideo = 16,
    /**
     * 20: The request is pending, usually due to some module not being ready, and the SDK postpones processing the request.
     */
    Pending = 20,
    /**
     * 103: No channel resources are available. Maybe because the server cannot allocate any channel resource.
     */
    NoAvailableChannel = 103,
    /**
     * 104: A timeout occurs when looking up the channel. When joining a channel, the SDK looks up the specified channel. The warning usually occurs when the network condition is too poor for the SDK to connect to the server.
     */
    LookupChannelTimeout = 104,
    /**
     * 105: The server rejects the request to look up the channel.
     * The server cannot process this request or the request is illegal.
     * **Deprecated**
     *
     * Use [`RejectedByServer(10)`]{@link ConnectionChangedReason.RejectedByServer} in the reason parameter
     * of [`ConnectionStateChanged`]{@link RtcEngineEvents.ConnectionStateChanged}.
     *
     */
    LookupChannelRejected = 105,
    /**
     * 106: The server rejects the request to look up the channel. The server cannot process this request
     * or the request is illegal.
     */
    OpenChannelTimeout = 106,
    /**
     * 107: The server rejects the request to open the channel. The server cannot process this request or the request is illegal.
     */
    OpenChannelRejected = 107,
    /**
     * 111: A timeout occurs when switching to the live video.
     */
    SwitchLiveVideoTimeout = 111,
    /**
     * 118: A timeout occurs when setting the client role in the live broadcast profile.
     */
    SetClientRoleTimeout = 118,
    /**
     * 119: The client role is unauthorized.
     */
    SetClientRoleNotAuthorized = 119,
    /**
     * 121: The ticket to open the channel is invalid.
     */
    OpenChannelInvalidTicket = 121,
    /**
     * 122: Try connecting to another server.
     */
    OpenChannelTryNextVos = 122,
    /**
     * 701: An error occurs in opening the audio mixing file.
     */
    AudioMixingOpenError = 701,
    /**
     * 1014: Audio Device Module: a warning occurs in the playback device.
     */
    AdmRuntimePlayoutWarning = 1014,
    /**
     * 1016: Audio Device Module: a warning occurs in the recording device.
     */
    AdmRuntimeRecordingWarning = 1016,
    /**
     * 1019: Audio Device Module: no valid audio data is collected.
     */
    AdmRecordAudioSilence = 1019,
    /**
     * 1020: Audio Device Module: a playback device fails.
     */
    AdmPlaybackMalfunction = 1020,
    /**
     * 1021: Audio Device Module: a recording device fails.
     */
    AdmRecordMalfunction = 1021,
    /**
     * 1025: Audio Device Module: call is interrupted by system events such as phone call or siri etc.
     */
    AdmInterruption = 1025,
    /**
     * 1031: Audio Device Module: the recorded audio is too low.
     */
    AdmRecordAudioLowlevel = 1031,
    /**
     * 1032: Audio Device Module: the playback audio is too low.
     */
    AdmPlayoutAudioLowlevel = 1032,
    /**
     * 1033: Audio Device Module: The recording device is busy.
     */
    AdmRecordIsOccupied = 1033,
    /**
     * 1051: Audio Device Module: howling is detected.
     */
    ApmHowling = 1051,
    /**
     * 1052: Audio Device Module: the device is in the glitch state.
     */
    AdmGlitchState = 1052,
    /**
     * 1053: Audio Device Module: the underlying audio settings have changed.
     */
    AdmImproperSettings = 1053,
}

/**
 * The audio channel of the sound.
 * @enum {number}
 */
export enum AudioChannel {
    /**
     * 0: (Default) Supports dual channels. Depends on the upstream of the host.
     */
    Channel0 = 0,
    /**
     * 1: The audio stream of the host uses the FL audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    Channel1 = 1,
    /**
     * 2: The audio stream of the host uses the FC audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    Channel2 = 2,
    /**
     * 3: The audio stream of the host uses the FR audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    Channel3 = 3,
    /**
     * 4: The audio stream of the host uses the BL audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    Channel4 = 4,
    /**
     * 5: The audio stream of the host uses the BR audio channel. If the upstream of the host uses multiple audio channels, these channels will be mixed into mono first.
     */
    Channel5 = 5,
}

/**
 * Video codec types.
 * @enum {number}
 */
export enum VideoCodecType {
    /**
     * 1: Standard VP8.
     */
    VP8 = 1,
    /**
     * 2: Standard H264.
     */
    H264 = 2,
    /**
     * 3: Enhanced VP8.
     */
    EVP = 3,
    /**
     * 4: Enhanced H264.
     */
    E264 = 4,
}
