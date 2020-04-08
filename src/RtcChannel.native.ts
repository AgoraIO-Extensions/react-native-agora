import {NativeEventEmitter, NativeModules} from "react-native";
import {
    ChannelMediaOptions,
    ChannelMediaRelayConfiguration,
    ClientRole,
    ConnectionStateType,
    EncryptionMode,
    LiveInjectStreamConfig,
    LiveTranscoding,
    String,
    UserPriority,
    VideoStreamType
} from "./Types";
import {Listener, RtcChannelEvents, Subscription} from "./RtcEvents";
import RtcEngine from "./RtcEngine.native";

const {RtcChannelModule} = NativeModules;
const RtcChannelEvent = new NativeEventEmitter(RtcChannelModule);

export default class RtcChannel implements RtcAudioInterface, RtcVideoInterface, RtcVoicePositionInterface,
    RtcPublishStreamInterface, RtcMediaRelayInterface, RtcDualStreamInterface, RtcFallbackInterface,
    RtcMediaMetadataInterface, RtcEncryptionInterface, RtcInjectStreamInterface, RtcStreamMessageInterface {

    private static channels = new Map<string, RtcChannel>();
    private readonly _channelId: string;
    private _listeners = new Map<string, Map<any, Listener>>();

    private constructor(channelId: string) {
        this._channelId = channelId;
    }

    static async create(channelId: string): Promise<RtcChannel> {
        if (RtcEngine.instance()) {
            if (RtcChannel.channels.get(channelId)) return RtcChannel.channels.get(channelId) as RtcChannel;
            await RtcChannelModule.create(channelId);
            RtcChannel.channels.set(channelId, new RtcChannel(channelId));
            return RtcChannel.channels.get(channelId) as RtcChannel
        } else {
            throw new Error('please create RtcEngine first')
        }
    }

    static destroyAll() {
        RtcChannel.channels.forEach(async (value, key) => {
            await value.destroy()
        });
        RtcChannel.channels.clear()
    }

    destroy(): Promise<void> {
        RtcChannel.channels.delete(this._channelId);
        return RtcChannelModule.destroy(this._channelId)
    }

    addListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]): Subscription {
        const callback = (res: any) => {
            const {channelId, ...other} = res;
            if (channelId === this._channelId) {
                // @ts-ignore
                listener(...Object.values(other))
            }
        };
        let map = this._listeners.get(event);
        if (map === undefined) {
            map = new Map<Listener, Listener>();
            this._listeners.set(event, map)
        }
        RtcChannelEvent.addListener(event, callback);
        map.set(listener, callback);
        return {
            remove: () => {
                this.removeListener(event, listener)
            }
        }
    }

    removeListener<EventType extends keyof RtcChannelEvents>(event: EventType, listener: RtcChannelEvents[EventType]) {
        const map = this._listeners.get(event);
        if (map === undefined) return;
        RtcChannelEvent.removeListener(event, map.get(listener) as Listener);
        map.delete(listener)
    }

    removeAllListeners<EventType extends keyof RtcChannelEvents>(event?: EventType) {
        if (event === undefined) {
            this._listeners.forEach((value, key) => {
                RtcChannelEvent.removeAllListeners(key);
            });
            this._listeners.clear();
            return
        }
        RtcChannelEvent.removeAllListeners(event);
        this._listeners.delete(event as string)
    }

    setClientRole(role: ClientRole): Promise<void> {
        return RtcChannelModule.setClientRole(this._channelId, role)
    }

    joinChannel(token: String, optionalInfo: String, optionalUid: number, options: ChannelMediaOptions): Promise<void> {
        return RtcChannelModule.joinChannel(this._channelId, token, optionalInfo, optionalUid, options)
    }

    joinChannelWithUserAccount(token: String, userAccount: string, options: ChannelMediaOptions): Promise<void> {
        return RtcChannelModule.joinChannelWithUserAccount(this._channelId, token, userAccount, options)
    }

    leaveChannel(): Promise<void> {
        return RtcChannelModule.leaveChannel(this._channelId)
    }

    renewToken(token: string): Promise<void> {
        return RtcChannelModule.renewToken(this._channelId, token)
    }

    getConnectionState(): Promise<ConnectionStateType> {
        return RtcChannelModule.getConnectionState(this._channelId)
    }

    publish(): Promise<void> {
        return RtcChannelModule.publish(this._channelId)
    }

    unpublish(): Promise<void> {
        return RtcChannelModule.unpublish(this._channelId)
    }

    getCallId(): Promise<string> {
        return RtcChannelModule.getCallId(this._channelId)
    }

    adjustUserPlaybackSignalVolume(uid: number, volume: number): Promise<void> {
        return RtcChannelModule.adjustUserPlaybackSignalVolume(this._channelId, uid, volume)
    }

    muteRemoteAudioStream(uid: number, muted: boolean): Promise<void> {
        return RtcChannelModule.muteRemoteAudioStream(this._channelId, uid, muted)
    }

    muteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return RtcChannelModule.muteAllRemoteAudioStreams(this._channelId, muted)
    }

    setDefaultMuteAllRemoteAudioStreams(muted: boolean): Promise<void> {
        return RtcChannelModule.setDefaultMuteAllRemoteAudioStreams(this._channelId, muted)
    }

    muteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return RtcChannelModule.muteAllRemoteVideoStreams(this._channelId, muted)
    }

    muteRemoteVideoStream(uid: number, muted: boolean): Promise<void> {
        return RtcChannelModule.muteRemoteVideoStream(this._channelId, uid, muted)
    }

    setDefaultMuteAllRemoteVideoStreams(muted: boolean): Promise<void> {
        return RtcChannelModule.setDefaultMuteAllRemoteVideoStreams(this._channelId, muted)
    }

    setRemoteVoicePosition(uid: number, pan: number, gain: number): Promise<void> {
        return RtcChannelModule.setRemoteVoicePosition(this._channelId, uid, pan, gain);
    }

    addPublishStreamUrl(url: string, transcodingEnabled: boolean): Promise<void> {
        return RtcChannelModule.addPublishStreamUrl(this._channelId, url, transcodingEnabled);
    }

    removePublishStreamUrl(url: string): Promise<void> {
        return RtcChannelModule.removePublishStreamUrl(this._channelId, url);
    }

    setLiveTranscoding(transcoding: LiveTranscoding): Promise<void> {
        return RtcChannelModule.setLiveTranscoding(this._channelId, transcoding);
    }

    startChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return RtcChannelModule.startChannelMediaRelay(this._channelId, channelMediaRelayConfiguration);
    }

    stopChannelMediaRelay(): Promise<void> {
        return RtcChannelModule.stopChannelMediaRelay(this._channelId);
    }

    updateChannelMediaRelay(channelMediaRelayConfiguration: ChannelMediaRelayConfiguration): Promise<void> {
        return RtcChannelModule.updateChannelMediaRelay(this._channelId, channelMediaRelayConfiguration);
    }

    setRemoteDefaultVideoStreamType(streamType: VideoStreamType): Promise<void> {
        return RtcChannelModule.setRemoteDefaultVideoStreamType(this._channelId, streamType);
    }

    setRemoteVideoStreamType(uid: number, streamType: VideoStreamType): Promise<void> {
        return RtcChannelModule.setRemoteVideoStreamType(this._channelId, uid, streamType);
    }

    setRemoteUserPriority(uid: number, userPriority: UserPriority): Promise<void> {
        return RtcChannelModule.setRemoteUserPriority(this._channelId, uid, userPriority);
    }

    registerMediaMetadataObserver(): Promise<void> {
        return RtcChannelModule.registerMediaMetadataObserver(this._channelId);
    }

    sendMetadata(metadata: string): Promise<void> {
        return RtcChannelModule.sendMetadata(this._channelId, metadata);
    }

    setMaxMetadataSize(size: number): Promise<void> {
        return RtcChannelModule.setMaxMetadataSize(this._channelId, size);
    }

    unregisterMediaMetadataObserver(): Promise<void> {
        return RtcChannelModule.unregisterMediaMetadataObserver(this._channelId);
    }

    setEncryptionMode(encryptionMode: EncryptionMode): Promise<void> {
        return RtcChannelModule.setEncryptionMode(this._channelId, encryptionMode);
    }

    setEncryptionSecret(secret: string): Promise<void> {
        return RtcChannelModule.setEncryptionSecret(this._channelId, secret);
    }

    addInjectStreamUrl(url: string, config: LiveInjectStreamConfig): Promise<void> {
        return RtcChannelModule.addInjectStreamUrl(this._channelId, url, config);
    }

    removeInjectStreamUrl(url: string): Promise<void> {
        return RtcChannelModule.removeInjectStreamUrl(this._channelId, url);
    }

    createDataStream(reliable: boolean, ordered: boolean): Promise<number> {
        return RtcChannelModule.createDataStream(this._channelId, reliable, ordered);
    }

    sendStreamMessage(streamId: number, message: string): Promise<void> {
        return RtcChannelModule.sendStreamMessage(this._channelId, streamId, message);
    }
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
