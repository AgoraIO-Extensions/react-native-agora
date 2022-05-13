import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel';
import StreamMessage from './StreamMessage/StreamMessage';
import ChannelMediaRelay from './ChannelMediaRelay/ChannelMediaRelay';
import VoiceChanger from './VoiceChanger/VoiceChanger';
import ScreenSharing from './ScreenSharing/ScreenSharing';
import SpatialAudio from './SpatialAudio/SpatialAudio';

const Advanced = {
  title: 'Advanced',
  data: [
    {
      name: 'JoinMultipleChannel',
      component: JoinMultipleChannel,
    },
    {
      name: 'StreamMessage',
      component: StreamMessage,
    },
    {
      name: 'ChannelMediaRelay',
      component: ChannelMediaRelay,
    },
    {
      name: 'VoiceChanger',
      component: VoiceChanger,
    },
    {
      name: 'ScreenSharing',
      component: ScreenSharing,
    },
    {
      name: 'SpatialAudio',
      component: SpatialAudio,
    },
  ],
};

export default Advanced;
