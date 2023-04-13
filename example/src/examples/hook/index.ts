import JoinChannelAudio from './JoinChannelAudio/JoinChannelAudio';
import JoinChannelVideo from './JoinChannelVideo/JoinChannelVideo';
import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel';
import StringUid from './StringUid/StringUid';
import VirtualBackground from './VirtualBackground/VirtualBackground';

const Hooks = {
  title: 'Hooks',
  data: [
    {
      name: 'JoinChannelVideoHooks',
      component: JoinChannelVideo,
    },
    {
      name: 'JoinChannelAudioHooks',
      component: JoinChannelAudio,
    },
    {
      name: 'StringUidHooks',
      component: StringUid,
    },
    {
      name: 'JoinMultipleChannelHook',
      component: JoinMultipleChannel,
    },
    {
      name: 'VirtualBackgroundHook',
      component: VirtualBackground,
    },
  ],
};
export default Hooks;
