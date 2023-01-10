import JoinChannelVideo from './JoinChannelVideo/JoinChannelVideo';
import JoinChannelAudio from './joinChannelAudio/JoinChannelAudio';

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
  ],
};
export default Hooks;
