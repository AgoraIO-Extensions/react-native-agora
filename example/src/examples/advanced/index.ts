import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel';
import StreamMessage from './StreamMessage/StreamMessage';
import ChannelMediaRelay from './ChannelMediaRelay/ChannelMediaRelay';
import VoiceChanger from './VoiceChanger/VoiceChanger';

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
      name: 'Live Streaming',
      component: LiveStreaming,
    },
    {
      name: 'CreateStreamData',
      component: CreateStreamData,
    },
    {
      name: 'MediaChannelRelay',
      component: MediaChannelRelay,
    },
    {
      name: 'VoiceChange',
      component: VoiceChange,
    },
  ],
};

export default Advanced;
