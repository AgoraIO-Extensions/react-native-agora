import {
    NativeModules,
    findNodeHandle,
    NativeAppEventEmitter
} from 'react-native';

const { Agora } = NativeModules

export default {
    ...Agora,
    init(options = {}) {
        this.listener && this.listener.remove();
        Agora.init(options);
    },
    joinChannel(channelName = '001'){
        Agora.joinChannel(channelName)
    },
    eventEmitter(fnConf) {
        //there are no `removeListener` for NativeAppEventEmitter & DeviceEventEmitter
        this.listener && this.listener.remove();
        this.listener = NativeAppEventEmitter.addListener('agoraEvent', event => {
            fnConf[event['type']] && fnConf[event['type']](event);
        });
    },
    removeEmitter() {
        this.listener && this.listener.remove();
    }
};
