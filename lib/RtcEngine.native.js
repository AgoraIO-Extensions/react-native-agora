"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const { Agora } = react_native_1.NativeModules;
const AgoraEventEmitter = new react_native_1.NativeEventEmitter(Agora);
/**
 * @class RtcEngine
 */
const RtcEngine = Object.assign({}, Agora, { eventTypes: new Set(), 
    /**
     * init agora rtc engine and begin subscribe event immediately
     * @param options: Option
     */
    init(options) {
        Agora.init(options);
    },
    /**
     * join channel
     * @param channelName String for channel name
     * @param uid Number user id is optional
     * @param token String secure token
     * @param info Object extra info
     * @return Promise
     */
    joinChannel(channelName, uid, token, info) {
        return Agora.joinChannel({ channelName, uid, token, info });
    },
    /**
     * on - add event listener for react native event
     * @param eventType String
     * @param eventHandler Function
     */
    on(eventType, listener) {
        this.eventTypes.add(eventType);
        AgoraEventEmitter.addListener(eventType, listener);
    },
    /**
     * off - remove event listener for react native event
     * @param eventType
     * @param listener
     */
    off(eventType) {
        AgoraEventEmitter.removeAllListeners(eventType);
        this.eventTypes.delete(eventType);
    },
    /**
     * removeAllListeners
     */
    removeAllListeners() {
        for (let eventType of this.eventTypes) {
            this.off(eventType);
        }
        this.eventTypes.clear();
    },
    /**
     * destroy AgoraRtcEngine
     */
    destroy() {
        Agora.destroy();
    },
    /**
     * getSdkVersion
     * @param callback Function
     */
    getSdkVersion(callback) {
        Agora.getSdkVersion().then(callback);
    } });
exports.default = RtcEngine;
//# sourceMappingURL=RtcEngine.native.js.map