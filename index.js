import {
    NativeModules,
    findNodeHandle
} from 'react-native';

const { Agora } = NativeModules

export const loadAgoraKit = (options) => Agora.loadAgoraKit(options)