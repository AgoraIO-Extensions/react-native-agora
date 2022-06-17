import {
  AudioEffectPreset,
  AudioReverbType,
  VoiceBeautifierPreset,
} from 'react-native-agora-rtc-ng';

export const VoiceBeautifierPresetParam1Limit: Map<
  VoiceBeautifierPreset,
  { min: number; max: number }
> = new Map<VoiceBeautifierPreset, { min: number; max: number }>();

VoiceBeautifierPresetParam1Limit.set(VoiceBeautifierPreset.SingingBeautifier, {
  min: 1,
  max: 2,
});

export const VoiceBeautifierPresetParam2Limit: Map<
  VoiceBeautifierPreset,
  { min: number; max: number }
> = new Map<VoiceBeautifierPreset, { min: number; max: number }>();

VoiceBeautifierPresetParam2Limit.set(VoiceBeautifierPreset.SingingBeautifier, {
  min: 1,
  max: 3,
});

export const AudioEffectPresetParam1Limit: Map<
  AudioEffectPreset,
  { min: number; max: number }
> = new Map<AudioEffectPreset, { min: number; max: number }>();

AudioEffectPresetParam1Limit.set(AudioEffectPreset.RoomAcoustics3dVoice, {
  min: 1,
  max: 60,
});
AudioEffectPresetParam1Limit.set(AudioEffectPreset.PitchCorrection, {
  min: 1,
  max: 3,
});

export const AudioEffectPresetParam2Limit: Map<
  AudioEffectPreset,
  { min: number; max: number }
> = new Map<AudioEffectPreset, { min: number; max: number }>();

AudioEffectPresetParam2Limit.set(AudioEffectPreset.RoomAcoustics3dVoice, {
  min: 0,
  max: 0,
});
AudioEffectPresetParam2Limit.set(AudioEffectPreset.PitchCorrection, {
  min: 1,
  max: 12,
});

export const AudioReverbTypeValueLimit: Map<
  AudioReverbType,
  { min: number; max: number }
> = new Map<AudioReverbType, { min: number; max: number }>();

AudioReverbTypeValueLimit.set(AudioReverbType.AudioReverbDryLevel, {
  min: -20,
  max: 10,
});
AudioReverbTypeValueLimit.set(AudioReverbType.AudioReverbWetLevel, {
  min: -20,
  max: 10,
});
AudioReverbTypeValueLimit.set(AudioReverbType.AudioReverbRoomSize, {
  min: 0,
  max: 100,
});
AudioReverbTypeValueLimit.set(AudioReverbType.AudioReverbWetDelay, {
  min: 0,
  max: 200,
});
AudioReverbTypeValueLimit.set(AudioReverbType.AudioReverbStrength, {
  min: 0,
  max: 100,
});
