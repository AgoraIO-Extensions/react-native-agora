package io.agora.rtc.base

import io.agora.rtc.AgoraMediaRecorder
import io.agora.rtc.RtcEngineConfig
import io.agora.rtc.ScreenCaptureParameters
import io.agora.rtc.audio.AgoraRhythmPlayerConfig
import io.agora.rtc.audio.AudioRecordingConfiguration
import io.agora.rtc.audio.SpatialAudioParams
import io.agora.rtc.internal.EncryptionConfig
import io.agora.rtc.internal.LastmileProbeConfig
import io.agora.rtc.live.LiveInjectStreamConfig
import io.agora.rtc.live.LiveTranscoding
import io.agora.rtc.live.LiveTranscoding.TranscodingUser
import io.agora.rtc.models.*
import io.agora.rtc.proxy.LocalAccessPointConfiguration
import io.agora.rtc.video.*

fun mapToVideoDimensions(map: Map<*, *>): VideoEncoderConfiguration.VideoDimensions {
  return VideoEncoderConfiguration.VideoDimensions().apply {
    (map["width"] as? Number)?.let { width = it.toInt() }
    (map["height"] as? Number)?.let { height = it.toInt() }
  }
}

fun mapToVideoEncoderConfiguration(map: Map<*, *>): VideoEncoderConfiguration {
  return VideoEncoderConfiguration().apply {
    (map["dimensions"] as? Map<*, *>)?.let { dimensions = mapToVideoDimensions(it) }
    (map["frameRate"] as? Number)?.let { frameRate = it.toInt() }
    (map["minFrameRate"] as? Number)?.let { minFrameRate = it.toInt() }
    (map["bitrate"] as? Number)?.let { bitrate = it.toInt() }
    (map["minBitrate"] as? Number)?.let { minBitrate = it.toInt() }
    (map["orientationMode"] as? Number)?.let { orientationMode = intToOrientationMode(it.toInt()) }
    (map["degradationPrefer"] as? Number)?.let {
      degradationPrefer = intToDegradationPreference(it.toInt())
    }
    (map["mirrorMode"] as? Number)?.let { mirrorMode = it.toInt() }
  }
}

fun mapToBeautyOptions(map: Map<*, *>): BeautyOptions {
  return BeautyOptions().apply {
    (map["lighteningContrastLevel"] as? Number)?.let { lighteningContrastLevel = it.toInt() }
    (map["lighteningLevel"] as? Number)?.let { lighteningLevel = it.toFloat() }
    (map["smoothnessLevel"] as? Number)?.let { smoothnessLevel = it.toFloat() }
    (map["rednessLevel"] as? Number)?.let { rednessLevel = it.toFloat() }
    (map["sharpnessLevel"] as? Number)?.let { sharpnessLevel = it.toFloat() }
  }
}

fun mapToAgoraImage(map: Map<*, *>): AgoraImage {
  return AgoraImage().apply {
    (map["url"] as? String)?.let { url = it }
    (map["x"] as? Number)?.let { x = it.toInt() }
    (map["y"] as? Number)?.let { y = it.toInt() }
    (map["width"] as? Number)?.let { width = it.toInt() }
    (map["height"] as? Number)?.let { height = it.toInt() }
    (map["zOrder"] as? Number)?.let { zOrder = it.toInt() }
    (map["alpha"] as? Number)?.let { alpha = it.toDouble() }
  }
}

fun mapToTranscodingUser(map: Map<*, *>): TranscodingUser {
  return TranscodingUser().apply {
    (map["uid"] as? Number)?.let { uid = it.toNativeUInt() }
    (map["x"] as? Number)?.let { x = it.toInt() }
    (map["y"] as? Number)?.let { y = it.toInt() }
    (map["width"] as? Number)?.let { width = it.toInt() }
    (map["height"] as? Number)?.let { height = it.toInt() }
    (map["zOrder"] as? Number)?.let { zOrder = it.toInt() }
    (map["alpha"] as? Number)?.let { alpha = it.toFloat() }
    (map["audioChannel"] as? Number)?.let { audioChannel = it.toInt() }
  }
}

fun mapToColor(map: Map<*, *>): Int {
  return ((map["red"] as Number).toInt() shl 16) + ((map["green"] as Number).toInt() shl 8) + (map["blue"] as Number).toInt()
}

fun mapToLiveTranscoding(map: Map<*, *>): LiveTranscoding {
  return LiveTranscoding().apply {
    (map["width"] as? Number)?.let { width = it.toInt() }
    (map["height"] as? Number)?.let { height = it.toInt() }
    (map["videoBitrate"] as? Number)?.let { videoBitrate = it.toInt() }
    (map["videoFramerate"] as? Number)?.let { videoFramerate = it.toInt() }
    (map["lowLatency"] as? Boolean)?.let { lowLatency = it }
    (map["videoGop"] as? Number)?.let { videoGop = it.toInt() }
    (map["watermark"] as? Map<*, *>)?.let { watermark = mapToAgoraImage(it) }
    (map["watermarkList"] as? List<*>)?.let { list ->
      list.forEach { item ->
        (item as? Map<*, *>)?.let {
          addWatermark(mapToAgoraImage(it))
        }
      }
    }
    (map["backgroundImage"] as? Map<*, *>)?.let { backgroundImage = mapToAgoraImage(it) }
    (map["backgroundImageList"] as? List<*>)?.let { list ->
      list.forEach { item ->
        (item as? Map<*, *>)?.let {
          addBackgroundImage(mapToAgoraImage(it))
        }
      }
    }
    (map["audioSampleRate"] as? Number)?.let {
      audioSampleRate = intToLiveTranscodingAudioSampleRate(it.toInt())
    }
    (map["audioBitrate"] as? Number)?.let { audioBitrate = it.toInt() }
    (map["audioChannels"] as? Number)?.let { audioChannels = it.toInt() }
    (map["audioCodecProfile"] as? Number)?.let {
      audioCodecProfile = intToAudioCodecProfile(it.toInt())
    }
    (map["videoCodecProfile"] as? Number)?.let {
      videoCodecProfile = intToVideoCodecProfile(it.toInt())
    }
    (map["videoCodecType"] as? Number)?.let {
      videoCodecType = intToVideoCodecType(it.toInt())
    }
    (map["backgroundColor"] as? Map<*, *>)?.let { backgroundColor = mapToColor(it) }
    (map["userConfigExtraInfo"] as? String)?.let { userConfigExtraInfo = it }
    (map["transcodingUsers"] as? List<*>)?.let { list ->
      list.forEach { item ->
        (item as? Map<*, *>)?.let {
          addUser(mapToTranscodingUser(it))
        }
      }
    }
    (map["advancedFeatures"] as? Map<*, *>)?.let {
      it.forEach { item ->
        setAdvancedFeatures(item.key as String, item.value as Boolean)
      }
    }
  }
}

fun mapToChannelMediaInfo(map: Map<*, *>): ChannelMediaInfo {
  return ChannelMediaInfo(
    map["channelName"] as? String,
    map["token"] as? String,
    (map["uid"] as Number).toNativeUInt()
  )
}

fun mapToChannelMediaRelayConfiguration(map: Map<*, *>): ChannelMediaRelayConfiguration {
  return ChannelMediaRelayConfiguration().apply {
    (map["srcInfo"] as? Map<*, *>)?.let { setSrcChannelInfo(mapToChannelMediaInfo(it)) }
    (map["destInfos"] as? List<*>)?.let { list ->
      list.forEach { item ->
        (item as? Map<*, *>)?.let {
          val info = mapToChannelMediaInfo(it)
          setDestChannelInfo(info.channelName, info)
        }
      }
    }
  }
}

fun mapToLastmileProbeConfig(map: Map<*, *>): LastmileProbeConfig {
  return LastmileProbeConfig().apply {
    (map["probeUplink"] as? Boolean)?.let { probeUplink = it }
    (map["probeDownlink"] as? Boolean)?.let { probeDownlink = it }
    (map["expectedUplinkBitrate"] as? Number)?.let { expectedUplinkBitrate = it.toInt() }
    (map["expectedDownlinkBitrate"] as? Number)?.let { expectedUplinkBitrate = it.toInt() }
  }
}

fun mapToRectangle(map: Map<*, *>): WatermarkOptions.Rectangle {
  return WatermarkOptions.Rectangle().apply {
    (map["x"] as? Number)?.let { x = it.toInt() }
    (map["y"] as? Number)?.let { y = it.toInt() }
    (map["width"] as? Number)?.let { width = it.toInt() }
    (map["height"] as? Number)?.let { height = it.toInt() }
  }
}

fun mapToWatermarkOptions(map: Map<*, *>): WatermarkOptions {
  return WatermarkOptions().apply {
    (map["visibleInPreview"] as? Boolean)?.let { visibleInPreview = it }
    (map["positionInLandscapeMode"] as? Map<*, *>)?.let {
      positionInLandscapeMode = mapToRectangle(it)
    }
    (map["positionInPortraitMode"] as? Map<*, *>)?.let {
      positionInPortraitMode = mapToRectangle(it)
    }
  }
}

fun mapToLiveInjectStreamConfig(map: Map<*, *>): LiveInjectStreamConfig {
  return LiveInjectStreamConfig().apply {
    (map["width"] as? Number)?.let { width = it.toInt() }
    (map["height"] as? Number)?.let { height = it.toInt() }
    (map["videoGop"] as? Number)?.let { videoGop = it.toInt() }
    (map["videoFramerate"] as? Number)?.let { videoFramerate = it.toInt() }
    (map["videoBitrate"] as? Number)?.let { videoBitrate = it.toInt() }
    (map["audioSampleRate"] as? Number)?.let {
      audioSampleRate = intToLiveInjectStreamConfigAudioSampleRate(it.toInt())
    }
    (map["audioBitrate"] as? Number)?.let { audioBitrate = it.toInt() }
    (map["audioChannels"] as? Number)?.let { audioChannels = it.toInt() }
  }
}

fun mapToRhythmPlayerConfig(map: Map<*, *>): AgoraRhythmPlayerConfig {
  return AgoraRhythmPlayerConfig().apply {
    (map["beatsPerMeasure"] as? Number)?.let { beatsPerMeasure = it.toInt() }
    (map["beatsPerMinute"] as? Number)?.let { beatsPerMinute = it.toInt() }
    (map["publish"] as? Boolean)?.let { publish = it }
  }
}

fun mapToCameraCapturerConfiguration(map: Map<*, *>): CameraCapturerConfiguration {
  return CameraCapturerConfiguration(
    intToCapturerOutputPreference((map["preference"] as Number).toInt()),
    intToCameraDirection((map["cameraDirection"] as Number).toInt())
  ).apply {
    dimensions = CameraCapturerConfiguration.CaptureDimensions()
    (map["captureWidth"] as? Number)?.toInt()?.let { dimensions.width = it }
    (map["captureHeight"] as? Number)?.toInt()?.let { dimensions.height = it }
  }
}

fun mapToChannelMediaOptions(map: Map<*, *>): ChannelMediaOptions {
  return ChannelMediaOptions().apply {
    (map["autoSubscribeAudio"] as? Boolean)?.let { autoSubscribeAudio = it }
    (map["autoSubscribeVideo"] as? Boolean)?.let { autoSubscribeVideo = it }
    (map["publishLocalAudio"] as? Boolean)?.let { publishLocalAudio = it }
    (map["publishLocalVideo"] as? Boolean)?.let { publishLocalVideo = it }
  }
}

fun mapToRtcEngineConfig(map: Map<*, *>): RtcEngineConfig {
  return RtcEngineConfig().apply {
    mAppId = map["appId"] as String
    (map["areaCode"] as? Number)?.toInt()?.let { mAreaCode = it }
    (map["logConfig"] as? Map<*, *>)?.let { mLogConfig = mapToLogConfig(it) }
  }
}

fun mapToAudioRecordingConfiguration(map: Map<*, *>): AudioRecordingConfiguration {
  return AudioRecordingConfiguration().apply {
    (map["filePath"] as? String)?.let { filePath = it }
    (map["recordingQuality"] as? Number)?.let { recordingQuality = it.toInt() }
    (map["recordingPosition"] as? Number)?.let { recordingPosition = it.toInt() }
    (map["recordingSampleRate"] as? Number)?.let { recordingSampleRate = it.toInt() }
    (map["recordingChannel"] as? Number)?.let { recordingChannel = it.toInt() }
  }
}

fun mapToEncryptionConfig(map: Map<*, *>): EncryptionConfig {
  return EncryptionConfig().apply {
    (map["encryptionMode"] as? Number)?.let { encryptionMode = intToEncryptionMode(it.toInt()) }
    (map["encryptionKey"] as? String)?.let { encryptionKey = it }
    (map["encryptionKdfSalt"] as? List<*>)?.let { list ->
      for (i in list.indices) {
        (list[i] as? Number)?.let {
          encryptionKdfSalt[i] = it.toByte()
        }
      }
    }
  }
}

fun mapToClientRoleOptions(map: Map<*, *>): ClientRoleOptions {
  return ClientRoleOptions().apply {
    (map["audienceLatencyLevel"] as? Number)?.let { audienceLatencyLevel = it.toInt() }
  }
}

fun mapToLogConfig(map: Map<*, *>): RtcEngineConfig.LogConfig {
  return RtcEngineConfig.LogConfig().apply {
    (map["filePath"] as? String)?.let { filePath = it }
    (map["fileSize"] as? Number)?.let { fileSize = it.toInt() }
    (map["level"] as? Number)?.let { level = it.toInt() }
  }
}

fun mapToDataStreamConfig(map: Map<*, *>): DataStreamConfig {
  return DataStreamConfig().apply {
    (map["syncWithAudio"] as? Boolean)?.let { syncWithAudio = it }
    (map["ordered"] as? Boolean)?.let { ordered = it }
  }
}

fun mapToVirtualBackgroundSource(map: Map<*, *>): VirtualBackgroundSource {
  return VirtualBackgroundSource().apply {
    (map["backgroundSourceType"] as? Number)?.let { backgroundSourceType = it.toInt() }
    (map["color"] as? Map<*, *>)?.let { color = mapToColor(it) }
    (map["source"] as? String)?.let { source = it }
    (map["blur_degree"] as? Int)?.let { blur_degree = it }
  }
}

fun mapToEchoTestConfiguration(map: Map<*, *>): EchoTestConfiguration {
  return EchoTestConfiguration().apply {
    (map["enableAudio"] as? Boolean)?.let { enableAudio = it }
    (map["enableVideo"] as? Boolean)?.let { enableVideo = it }
    (map["token"] as? String)?.let { token = it }
    (map["channelId"] as? String)?.let { channelId = it }
  }
}

fun mapToMediaRecorderConfiguration(map: Map<*, *>): AgoraMediaRecorder.MediaRecorderConfiguration {
  return AgoraMediaRecorder.MediaRecorderConfiguration(
    map["storagePath"] as String,
    (map["containerFormat"] as Number).toInt(),
    (map["streamType"] as Number).toInt(),
    (map["maxDurationMs"] as Number).toInt(),
    (map["recorderInfoUpdateInterval"] as Number).toInt()
  )
}

fun mapToContentInspectModule(map: Map<*, *>): ContentInspectConfig.ContentInspectModule {
  return ContentInspectConfig.ContentInspectModule().apply {
    (map["type"] as? Number)?.let { type = it.toInt() }
    (map["interval"] as? Number)?.let { interval = it.toInt() }
  }
}

fun mapToContentInspectConfig(map: Map<*, *>): ContentInspectConfig {
  return ContentInspectConfig().apply {
    (map["extraInfo"] as? String)?.let { extraInfo = it }
    (map["modules"] as? List<*>)?.let { list ->
      list.forEachIndexed { index, item ->
        (item as? Map<*, *>)?.let {
          modules[index] = mapToContentInspectModule(it)
        }
      }
      moduleCount = list.size
    }
  }
}

fun mapToLocalAccessPointConfiguration(map: Map<*, *>): LocalAccessPointConfiguration {
  return LocalAccessPointConfiguration().apply {
    (map["ipList"] as? List<*>)?.let { list ->
      ipList = arrayListOf<String>().apply {
        list.forEach { item ->
          (item as? String)?.let { add(it) }
        }
      }
    }
    (map["domainList"] as? List<*>)?.let { list ->
      domainList = arrayListOf<String>().apply {
        list.forEach { item ->
          (item as? String)?.let { add(it) }
        }
      }
    }
    (map["verifyDomainName"] as? String)?.let { verifyDomainName = it }
    (map["mode"] as? Number)?.let { mode = it.toInt() }
  }
}

fun mapToVideoDenoiserOptions(map: Map<*, *>): VideoDenoiserOptions {
  return VideoDenoiserOptions().apply {
    (map["mode"] as? Number)?.let { denoiserMode = it.toInt() }
    (map["level"] as? Number)?.let { denoiserLevel = it.toInt() }
  }
}

fun mapToLowLightEnhanceOptions(map: Map<*, *>): LowLightEnhanceOptions {
  return LowLightEnhanceOptions().apply {
    (map["mode"] as? Number)?.let { lowlightEnhanceMode = it.toInt() }
    (map["level"] as? Number)?.let { lowlightEnhanceLevel = it.toInt() }
  }
}

fun mapToColorEnhanceOptions(map: Map<*, *>): ColorEnhanceOptions {
  return ColorEnhanceOptions().apply {
    (map["strengthLevel"] as? Number)?.let { strengthLevel = it.toFloat() }
    (map["skinProtectLevel"] as? Number)?.let { skinProtectLevel = it.toFloat() }
  }
}

fun mapToScreenCaptureParameters(map: Map<*, *>): ScreenCaptureParameters {
  return ScreenCaptureParameters().apply {
    (map["captureAudio"] as? Boolean)?.let { captureAudio = it }
    (map["audioParams"] as? Map<*, *>)?.let {
      audioCaptureParameters = mapToAudioCaptureParameters(it)
    }
    (map["captureVideo"] as? Boolean)?.let { captureVideo = it }
    (map["videoParams"] as? Map<*, *>)?.let {
      videoCaptureParameters = mapToVideoCaptureParameters(it)
    }
  }
}

fun mapToVideoCaptureParameters(map: Map<*, *>): ScreenCaptureParameters.VideoCaptureParameters {
  return ScreenCaptureParameters.VideoCaptureParameters().apply {
    (map["bitrate"] as? Number)?.let { bitrate = it.toInt() }
    (map["frameRate"] as? Number)?.let { framerate = it.toInt() }
    (map["dimensions"] as? Map<*, *>)?.let { it ->
      mapToVideoDimensions(it).let {
        width = it.width
        height = it.height
      }
    }
    (map["contentHint"] as? Number)?.let { contentHint = it.toInt() }
  }
}

fun mapToAudioCaptureParameters(map: Map<*, *>): ScreenCaptureParameters.AudioCaptureParameters {
  return ScreenCaptureParameters.AudioCaptureParameters().apply {
    (map["sampleRate"] as? Number)?.let { sampleRate = it.toInt() }
    (map["channels"] as? Number)?.let { channels = it.toInt() }
    (map["captureSignalVolume"] as? Number)?.let { captureSignalVolume = it.toInt() }
    (map["allowCaptureCurrentApp"] as? Boolean)?.let { allowCaptureCurrentApp = it }
  }
}

fun mapToSpatialAudioParams(map: Map<*, *>): SpatialAudioParams {
  return SpatialAudioParams().apply {
    (map["speaker_azimuth"] as? Number)?.let { spk_azimuth = it.toDouble() }
    (map["speaker_elevation"] as? Number)?.let { spk_elevation = it.toDouble() }
    (map["speaker_distance"] as? Number)?.let { spk_distance = it.toDouble() }
    (map["speaker_orientation"] as? Number)?.let { spk_orientation = it.toInt() }
    (map["enable_blur"] as? Boolean)?.let { enable_blur = it }
    (map["enable_air_absorb"] as? Boolean)?.let { enable_air_absorb = it }
  }
}
