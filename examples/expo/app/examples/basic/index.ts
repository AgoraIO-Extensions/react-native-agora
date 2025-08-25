import JoinChannelAudio from './JoinChannelAudio/JoinChannelAudio';
import JoinChannelVideo from './JoinChannelVideo/JoinChannelVideo';
import StringUid from './StringUid/StringUid';

const Basic = {
  title: 'basic',
  data: [
    {
      name: 'JoinChannelAudio',
      component: JoinChannelAudio,
    },
    {
      name: 'JoinChannelVideo',
      component: JoinChannelVideo,
    },
    {
      name: 'StringUid',
      component: StringUid,
    },
  ],
};

export default Basic;
