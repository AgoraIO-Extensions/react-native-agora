import {
    NativeModules,
    findNodeHandle,
    NativeAppEventEmitter
} from 'react-native';

const { Agora } = NativeModules

export default {

    init(options = {}) {
        this.listener && this.listener.remove();
        Agora.init(options);
    },
    joinChannel(channelName = '001'){
        Agora.joinChannel(channelName)
    },
    eventEmitter(fnConf) {
        // const {
        //     onFirstRemoteVideoDecoded = () => {},
        //     onJoinChannelSuccess = () => {},
        //     onUserJoined = () => {},
        //     onError = () => {},
        //     onWarning = () => {}
        // } = options;

        // let fnConf = {...options};
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