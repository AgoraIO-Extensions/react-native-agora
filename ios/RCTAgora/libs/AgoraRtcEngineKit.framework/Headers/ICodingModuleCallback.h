
#ifndef _I_CODING_MODULE_CALLBACK_H_
#define _I_CODING_MODULE_CALLBACK_H_

#ifdef AGORAVOICE_EXPORT
#define AGORAVOICE_DLLEXPORT HELPER_DLL_EXPORT
#elif AGORAVOICE_DLL
#define AGORAVOICE_DLLIMPORT HELPER_DLL_IMPORT
#else
#define AGORAVOICE_DLLEXPORT
#endif

namespace AgoraRTC {

  struct VFrameInfo {
    int frame_type; //2: Key frame, 0: P Frame, 1: B Frame
    unsigned int frame_num;
    unsigned int width;
    unsigned int height;
    bool sps_pps_handle;
  };

  // Callback class used for recording/playback video file
  class VCMVideoFileCallback {
  public:
    virtual int onDecodeVideo(unsigned int video_ts, unsigned char payload_type, unsigned char* buffer, unsigned int length, VFrameInfo info) = 0;
    virtual int onEncodeVideo(unsigned int video_ts, unsigned char payload_type, unsigned char* buffer, unsigned int length, VFrameInfo info) = 0;

    virtual int onDecodeVideoSEI(const char* info, int len) = 0;
    //virtual int onEncodeVideoSEI(char** info, int *len) = 0;
  };

  // Callback class used for recording/playback audio file
  class ACMAudioFileCallback {
  public:
    virtual int onDecodeAudio(unsigned int audio_ts, unsigned char payload_type, unsigned int channels, unsigned char* buffer, unsigned int length) = 0;
    virtual int onEncodeAudio(unsigned int audio_ts, unsigned char payload_type, unsigned int channels, unsigned char* buffer, unsigned int length) = 0;
  };

  class ICMFile : public VCMVideoFileCallback,
                  public ACMAudioFileCallback {
  public:
    virtual int startAudioRecord() = 0;
    virtual int startVideoRecord() = 0;
    virtual int stopAudioRecord() = 0;
    virtual int stopVideoRecord() = 0;
    virtual int setVideoRotation(int rotation) = 0;
  };

  class ICMFileObserver {
  public:
    virtual ICMFile* GetICMFileObject(unsigned int uid) = 0;
    virtual int InsertRawAudioPacket(unsigned int uid, const unsigned char*  payloadData, unsigned short payloadSize,
      int payload_type, unsigned int timeStamp, unsigned short seqNumber) = 0;
  };

}

AGORAVOICE_DLLEXPORT int RegisterICMFileObserver(AgoraRTC::ICMFileObserver* observer);
AGORAVOICE_DLLEXPORT int Set264SPSPPS(char* spspps, int len);

#endif
