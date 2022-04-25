import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel';
import StreamMessage from './StreamMessage/StreamMessage';
import ChannelMediaRelay from './ChannelMediaRelay/ChannelMediaRelay';
import VoiceChanger from './VoiceChanger/VoiceChanger';
import ScreenSharing from './ScreenSharing/ScreenSharing';

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
  ],
};

export default Advanced;
