"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const RtcEngine_native_1 = tslib_1.__importDefault(require("./RtcEngine.native"));
const { RtcChannelModule } = react_native_1.NativeModules;
const RtcChannelEvent = new react_native_1.NativeEventEmitter(RtcChannelModule);
class RtcChannel {
    constructor(channelId) {
        this._listeners = new Map();
        this._channelId = channelId;
    }
    static async create(channelId) {
        if (RtcEngine_native_1.default.instance()) {
            if (RtcChannel.channels.get(channelId))
                return RtcChannel.channels.get(channelId);
            await RtcChannelModule.create(channelId);
            RtcChannel.channels.set(channelId, new RtcChannel(channelId));
            return RtcChannel.channels.get(channelId);
        }
        else {
            throw new Error('please create RtcEngine first');
        }
    }
    static destroyAll() {
        RtcChannel.channels.forEach(async (value, key) => {
            await value.destroy();
        });
        RtcChannel.channels.clear();
    }
    destroy() {
        RtcChannel.channels.delete(this._channelId);
        return RtcChannelModule.destroy(this._channelId);
    }
    addListener(event, listener) {
        const callback = (res) => {
            const { channelId, ...other } = res;
            if (channelId === this._channelId) {
                // @ts-ignore
                listener(...Object.values(other));
            }
        };
        let map = this._listeners.get(event);
        if (map === undefined) {
            map = new Map();
            this._listeners.set(event, map);
        }
        RtcChannelEvent.addListener(event, callback);
        map.set(listener, callback);
        return {
            remove: () => {
                this.removeListener(event, listener);
            }
        };
    }
    removeListener(event, listener) {
        const map = this._listeners.get(event);
        if (map === undefined)
            return;
        RtcChannelEvent.removeListener(event, map.get(listener));
        map.delete(listener);
    }
    removeAllListeners(event) {
        if (event === undefined) {
            this._listeners.forEach((value, key) => {
                RtcChannelEvent.removeAllListeners(key);
            });
            this._listeners.clear();
            return;
        }
        RtcChannelEvent.removeAllListeners(event);
        this._listeners.delete(event);
    }
    setClientRole(role) {
        return RtcChannelModule.setClientRole(this._channelId, role);
    }
    joinChannel(token, optionalInfo, optionalUid, options) {
        return RtcChannelModule.joinChannel(this._channelId, token, optionalInfo, optionalUid, options);
    }
    joinChannelWithUserAccount(token, userAccount, options) {
        return RtcChannelModule.joinChannelWithUserAccount(this._channelId, token, userAccount, options);
    }
    leaveChannel() {
        return RtcChannelModule.leaveChannel(this._channelId);
    }
    renewToken(token) {
        return RtcChannelModule.renewToken(this._channelId, token);
    }
    getConnectionState() {
        return RtcChannelModule.getConnectionState(this._channelId);
    }
    publish() {
        return RtcChannelModule.publish(this._channelId);
    }
    unpublish() {
        return RtcChannelModule.unpublish(this._channelId);
    }
    getCallId() {
        return RtcChannelModule.getCallId(this._channelId);
    }
    adjustUserPlaybackSignalVolume(uid, volume) {
        return RtcChannelModule.adjustUserPlaybackSignalVolume(this._channelId, uid, volume);
    }
    muteRemoteAudioStream(uid, muted) {
        return RtcChannelModule.muteRemoteAudioStream(this._channelId, uid, muted);
    }
    muteAllRemoteAudioStreams(muted) {
        return RtcChannelModule.muteAllRemoteAudioStreams(this._channelId, muted);
    }
    setDefaultMuteAllRemoteAudioStreams(muted) {
        return RtcChannelModule.setDefaultMuteAllRemoteAudioStreams(this._channelId, muted);
    }
    muteAllRemoteVideoStreams(muted) {
        return RtcChannelModule.muteAllRemoteVideoStreams(this._channelId, muted);
    }
    muteRemoteVideoStream(uid, muted) {
        return RtcChannelModule.muteRemoteVideoStream(this._channelId, uid, muted);
    }
    setDefaultMuteAllRemoteVideoStreams(muted) {
        return RtcChannelModule.setDefaultMuteAllRemoteVideoStreams(this._channelId, muted);
    }
    setRemoteVoicePosition(uid, pan, gain) {
        return RtcChannelModule.setRemoteVoicePosition(this._channelId, uid, pan, gain);
    }
    addPublishStreamUrl(url, transcodingEnabled) {
        return RtcChannelModule.addPublishStreamUrl(this._channelId, url, transcodingEnabled);
    }
    removePublishStreamUrl(url) {
        return RtcChannelModule.removePublishStreamUrl(this._channelId, url);
    }
    setLiveTranscoding(transcoding) {
        return RtcChannelModule.setLiveTranscoding(this._channelId, transcoding);
    }
    startChannelMediaRelay(channelMediaRelayConfiguration) {
        return RtcChannelModule.startChannelMediaRelay(this._channelId, channelMediaRelayConfiguration);
    }
    stopChannelMediaRelay() {
        return RtcChannelModule.stopChannelMediaRelay(this._channelId);
    }
    updateChannelMediaRelay(channelMediaRelayConfiguration) {
        return RtcChannelModule.updateChannelMediaRelay(this._channelId, channelMediaRelayConfiguration);
    }
    setRemoteDefaultVideoStreamType(streamType) {
        return RtcChannelModule.setRemoteDefaultVideoStreamType(this._channelId, streamType);
    }
    setRemoteVideoStreamType(uid, streamType) {
        return RtcChannelModule.setRemoteVideoStreamType(this._channelId, uid, streamType);
    }
    setRemoteUserPriority(uid, userPriority) {
        return RtcChannelModule.setRemoteUserPriority(this._channelId, uid, userPriority);
    }
    registerMediaMetadataObserver() {
        return RtcChannelModule.registerMediaMetadataObserver(this._channelId);
    }
    sendMetadata(metadata) {
        return RtcChannelModule.sendMetadata(this._channelId, metadata);
    }
    setMaxMetadataSize(size) {
        return RtcChannelModule.setMaxMetadataSize(this._channelId, size);
    }
    unregisterMediaMetadataObserver() {
        return RtcChannelModule.unregisterMediaMetadataObserver(this._channelId);
    }
    setEncryptionMode(encryptionMode) {
        return RtcChannelModule.setEncryptionMode(this._channelId, encryptionMode);
    }
    setEncryptionSecret(secret) {
        return RtcChannelModule.setEncryptionSecret(this._channelId, secret);
    }
    addInjectStreamUrl(url, config) {
        return RtcChannelModule.addInjectStreamUrl(this._channelId, url, config);
    }
    removeInjectStreamUrl(url) {
        return RtcChannelModule.removeInjectStreamUrl(this._channelId, url);
    }
    createDataStream(reliable, ordered) {
        return RtcChannelModule.createDataStream(this._channelId, reliable, ordered);
    }
    sendStreamMessage(streamId, message) {
        return RtcChannelModule.sendStreamMessage(this._channelId, streamId, message);
    }
}
exports.default = RtcChannel;
RtcChannel.channels = new Map();
//# sourceMappingURL=RtcChannel.native.js.map