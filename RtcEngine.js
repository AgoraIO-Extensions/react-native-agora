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
    joinChannel(channelName = '00001', uid = 0){
        Agora.joinChannel(channelName, uid)
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
