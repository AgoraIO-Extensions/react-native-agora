import AudioMixing from './AudioMixing/AudioMixing';
import JoinChannelAudio from './JoinChannelAudio/JoinChannelAudio';
import JoinChannelVideo from './JoinChannelVideo/JoinChannelVideo';
import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel';
import ScreenShare from './ScreenShare/ScreenShare';
import StringUid from './StringUid/StringUid';
import TakeSnapshot from './TakeSnapshot/TakeSnapshot';
import VirtualBackground from './VirtualBackground/VirtualBackground';

const Hooks = {
  title: 'hook',
  data: [
    {
      name: 'JoinChannelVideo',
      component: JoinChannelVideo,
    },
    {
      name: 'JoinChannelAudio',
      component: JoinChannelAudio,
    },
    {
      name: 'StringUid',
      component: StringUid,
    },
    {
      name: 'JoinMultipleChannel',
      component: JoinMultipleChannel,
    },
    {
      name: 'VirtualBackground',
      component: VirtualBackground,
    },
    {
      name: 'AudioMixing',
      component: AudioMixing,
    },
    {
      name: 'TakeSnapshot',
      component: TakeSnapshot,
    },
    {
      name: 'ScreenShare',
      component: ScreenShare,
    },
  ],
};
export default Hooks;
