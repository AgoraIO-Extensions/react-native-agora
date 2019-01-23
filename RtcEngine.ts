import {
    NativeModules,
    NativeAppEventEmitter
} from 'react-native';

import {
    IRtcEngineOption, IRTCEngineEventScheduler,
    String, Integer
} from "./types.d";

const { Agora } = NativeModules;

export default class RtcEngine extends Agora {
    static init(options: IRtcEngineOption): void {
        this.removeEmitter();
        super.init(options);
    }

    static joinChannel(channelName: String, uid?: Integer): void {
        super.joinChannel(channelName, uid);
    }

    static joinChannelWithToken(
        channelName: string, token?: String, uid?: Integer): void {
        super.joinChannelWithToken(token, channelName, uid);
    }

    static eventEmitter(eventScheduler: IRTCEngineEventScheduler) {
        this.listener && this.listener.remove();
        this.listener = NativeAppEventEmitter.addListener('agoraEvent', event => {
            const functor = (eventScheduler as any)[event['type']];
            functor && functor(event);
        });
    }

    static removeEmitter() {
        this.listener && this.listener.remove();
    }

    static enableLastmileTest() {
        super.enableLastmileTest();
    }

    static disableLastmileTest() {
        super.disableLastmileTest();
    }

};
