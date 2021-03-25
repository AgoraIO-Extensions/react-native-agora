import MultiChannel from './MultiChannel';
import CreateStreamData from './CreateStreamData';
import MediaChannelRelay from './MediaChannelRelay';
import LiveStreaming from './LiveStreaming';

const Advanced = {
  title: 'Advanced',
  data: [
    {
      name: 'MultiChannel',
      component: MultiChannel,
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
  ],
};

export default Advanced;
