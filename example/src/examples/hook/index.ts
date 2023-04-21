import AudioMixing from './AudioMixing/AudioMixing';
import JoinChannelAudio from './JoinChannelAudio/JoinChannelAudio';
import JoinChannelVideo from './JoinChannelVideo/JoinChannelVideo';
import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel';
import ScreenShare from './ScreenShare/ScreenShare';
import StringUid from './StringUid/StringUid';
import TakeSnapshot from './TakeSnapshot/TakeSnapshot';
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
      name: 'JoinMultipleChannelHooks',
      component: JoinMultipleChannel,
    },
    {
      name: 'VirtualBackgroundHooks',
      component: VirtualBackground,
    },
    {
      name: 'AudioMixingHooks',
      component: AudioMixing,
    },
    {
      name: 'TakeSnapshotHooks',
      component: TakeSnapshot,
    },
    {
      name: 'ScreenShareHooks',
      component: ScreenShare,
    },
  ],
};
export default Hooks;
