import {
    NativeModules,
    NativeEventEmitter
} from 'react-native';

import {
    Option, Callback,
    String, Number
} from "./types.d";


const { Agora } = NativeModules;
const AgoraEventEmitter = new NativeEventEmitter(Agora);

/**
 * @class RtcEngine
 */
const RtcEngine = { ...Agora,
    eventTypes: new Set(),
    /**
     * init agora rtc engine and begin subscribe event immediately
     * @param options: Option
     */
    init(options: Option): void {
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
    joinChannel(channelName: String, uid?: Number, token?: String, info?: Object): void {
        return Agora.joinChannel({channelName, uid, token, info});
    },

    /**
     * on - add event listener for react native event
     * @param eventType String
     * @param eventHandler Function
     */
    on(eventType: string, listener: (...args: any[]) => any) {
        this.eventTypes.add(eventType);
        AgoraEventEmitter.addListener(eventType, listener);
    },

    /**
     * off - remove event listener for react native event
     * @param eventType 
     * @param listener 
     */
    off(eventType: string) {
        AgoraEventEmitter.removeAllListeners(eventType);
        this.eventTypes.delete(eventType);
    },

    /**
     * removeAllListeners
     */
    removeAllListeners () {
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
    getSdkVersion(callback: Callback<void>) {
        Agora.getSdkVersion().then(callback);
    }
};

export default RtcEngine;
