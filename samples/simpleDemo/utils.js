export const APPID = 'Your Agora APP_ID'; //'Your Agora APP_ID'
export function handleError (code) {
  let errObj = [
    {
      name: 'AGORA_IID_AUDIO_DEVICE_MANAGER',
      code: 1,
    },
    {
      name: 'AGORA_IID_VIDEO_DEVICE_MANAGER',
      code: 2,
    },
    {
      name: 'AGORA_IID_RTC_ENGINE_PARAMETER',
      code: 3,
    },
    {
      name: 'AGORA_IID_MEDIA_ENGINE',
      code: 4,
    },
    {
      name: 'WARN_INVALID_VIEW',
      code: 8,
    },
    {
      name: 'WARN_INIT_VIDEO',
      code: 16,
    },
    {
      name: 'WARN_PENDING',
      code: 20,
    },
    {
      name: 'ERR_JOIN_CHANNEL_REJECTED',
      code: 17
    },
    {
      name: 'ERR_START_CAMERA',
      code: 1003
    }
  ];
  
  let found = errObj.find(e => e.code === code);
  if (!found) {
    throw new Error(`Code: ${code} isn't exists`);
  }
  return found;
}