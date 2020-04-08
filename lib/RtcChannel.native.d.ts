import { ChannelMediaOptions, ChannelMediaRelayConfiguration, ClientRole, ConnectionStateType, EncryptionMode, LiveInjectStreamConfig, LiveTranscoding, String, UserPriority, VideoStreamType } from "./Types";
import { RtcChannelEvents, Subscription } from "./RtcEvents";
export default class RtcChannel implements RtcAudioInterface, RtcVideoInterface, RtcVoicePositionInterface, RtcPublishStreamInterface, RtcMediaRelayInterface, RtcDualStreamInterface, RtcFallbackInterface, RtcMediaMetadataInterface, RtcEncryptionInterface, RtcInjectStreamInterface, RtcStreamMessageInterface {
    private static channels;
    private readonly _channelId;
    private _listeners;
    private constructor();
    static create(channelId: string): Promise<RtcChannel>;
    static destroyAll(): void;
    destroy(): Promise<void>;
    addListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]): Subscription;
    removeListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]): void;
    removeAllListeners<EventType extends keyof RtcChannelEvents>(event?: EventType): void;
    setClientRole(role: ClientRole): Promise<void>;
    joinChannel(token: String, optionalInfo: String, optionalUid: number, options: ChannelMediaOptions): Promise<void>;
    joinChannelWithUserAccount(token: String, userAccount: string, options: ChannelMediaOptions): Promise<void>;
    leaveChannel(): Promise<void>;
    renewToken(token: string): Promise<void>;
    getConnectionState(): Promise<ConnectionStateType>;
    publish(): Promise<void>;
    unpublish(): Promise<void>;
    getCallId(): Promise<string>;
    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;
    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;
    muteAllRemoteAudioStreams(muted: boolean): Promise<void>;
    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;
    muteAllRemoteVideoStreams(muted: boolean): Promise<void>;
    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;
    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>;
    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>;
    removePublishStreamUrl(url: string): Promise<void>;
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>;
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;
    stopChannelMediaRelay(): Promise<void>;
    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;
    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>;
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void>;
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
    registerMediaMetadataObserver(): Promise<void>;
    sendMetadata(metadata: string): Promise<void>;
    setMaxMetadataSize(size: number): Promise<void>;
    unregisterMediaMetadataObserver(): Promise<void>;
    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void>;
    setEncryptionSecret(secret: string): Promise<void>;
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void>;
    removeInjectStreamUrl(url: string): Promise<void>;
    createDataStream(reliable: boolean, ordered: boolean): Promise<number>;
    sendStreamMessage(streamId: number, message: string): Promise<void>;
}
interface RtcAudioInterface {
    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void>;
    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void>;
    muteAllRemoteAudioStreams(muted: boolean): Promise<void>;
    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void>;
}
interface RtcVideoInterface {
    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void>;
    muteAllRemoteVideoStreams(muted: boolean): Promise<void>;
    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void>;
}
interface RtcVoicePositionInterface {
    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void>;
}
interface RtcPublishStreamInterface {
    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void>;
    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void>;
    removePublishStreamUrl(url: string): Promise<void>;
}
interface RtcMediaRelayInterface {
    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;
    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void>;
    stopChannelMediaRelay(): Promise<void>;
}
interface RtcDualStreamInterface {
    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void>;
    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void>;
}
interface RtcFallbackInterface {
    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void>;
}
interface RtcMediaMetadataInterface {
    registerMediaMetadataObserver(): Promise<void>;
    unregisterMediaMetadataObserver(): Promise<void>;
    setMaxMetadataSize(size: number): Promise<void>;
    sendMetadata(metadata: string): Promise<void>;
}
interface RtcEncryptionInterface {
    setEncryptionSecret(secret: string): Promise<void>;
    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void>;
}
interface RtcInjectStreamInterface {
    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void>;
    removeInjectStreamUrl(url: string): Promise<void>;
}
interface RtcStreamMessageInterface {
    createDataStream(reliable: boolean, ordered: boolean): Promise<number>;
    sendStreamMessage(streamId: number, message: string): Promise<void>;
}
export {};
