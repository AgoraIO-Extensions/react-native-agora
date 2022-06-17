import JoinMultipleChannel from './JoinMultipleChannel/JoinMultipleChannel';
import StreamMessage from './StreamMessage/StreamMessage';
import ChannelMediaRelay from './ChannelMediaRelay/ChannelMediaRelay';
import VoiceChanger from './VoiceChanger/VoiceChanger';
import EnableSpatialAudio from './EnableSpatialAudio/EnableSpatialAudio';
import MediaPlayer from './MediaPlayer/MediaPlayer';
import PlayEffect from './PlayEffect/PlayEffect';
import TakeSnapshot from './TakeSnapshot/TakeSnapshot';
import EnableContentInspect from './EnableContentInspect/EnableContentInspect';
import StartRhythmPlayer from './StartRhythmPlayer/StartRhythmPlayer';
import SendMultiVideoStream from './SendMultiVideoStream/SendMultiVideoStream';
import AudioMixing from './AudioMixing/AudioMixing';
import RTMPStreaming from './RTMPStreaming/RTMPStreaming';
import EnableEncryption from './EnableEncryption/EnableEncryption';
import SetVideoEncoderConfiguration from './SetVideoEncoderConfiguration/SetVideoEncoderConfiguration';
import StartDirectCdnStreaming from './StartDirectCdnStreaming/StartDirectCdnStreaming';
import EnableVirtualBackground from './EnableVirtualBackground/EnableVirtualBackground';
import SendMetadata from './SendMetadata/SendMetadata';
import EnableExtension from './EnableExtension/EnableExtension';
import SetBeautyEffectOptions from './SetBeautyEffectOptions/SetBeautyEffectOptions';

const Advanced = {
  title: 'Advanced',
  data: [
    {
      name: 'AudioMixing',
      component: AudioMixing,
    },
    {
      name: 'ChannelMediaRelay',
      component: ChannelMediaRelay,
    },
    {
      name: 'EnableContentInspect',
      component: EnableContentInspect,
    },
    {
      name: 'EnableEncryption',
      component: EnableEncryption,
    },
    {
      name: 'EnableExtension',
      component: EnableExtension,
    },
    {
      name: 'EnableSpatialAudio',
      component: EnableSpatialAudio,
    },
    {
      name: 'EnableVirtualBackground',
      component: EnableVirtualBackground,
    },
    {
      name: 'JoinMultipleChannel',
      component: JoinMultipleChannel,
    },
    {
      name: 'MediaPlayer',
      component: MediaPlayer,
    },
    {
      name: 'PlayEffect',
      component: PlayEffect,
    },
    {
      name: 'RTMPStreaming',
      component: RTMPStreaming,
    },
    {
      name: 'SendMetadata',
      component: SendMetadata,
    },
    {
      name: 'SendMultiVideoStream',
      component: SendMultiVideoStream,
    },
    {
      name: 'SetBeautyEffectOptions',
      component: SetBeautyEffectOptions,
    },
    {
      name: 'SetVideoEncoderConfiguration',
      component: SetVideoEncoderConfiguration,
    },
    {
      name: 'StartDirectCdnStreaming',
      component: StartDirectCdnStreaming,
    },
    {
      name: 'StartRhythmPlayer',
      component: StartRhythmPlayer,
    },
    {
      name: 'StreamMessage',
      component: StreamMessage,
    },
    {
      name: 'TakeSnapshot',
      component: TakeSnapshot,
    },
    {
      name: 'VoiceChanger',
      component: VoiceChanger,
    },
  ],
};

export default Advanced;
