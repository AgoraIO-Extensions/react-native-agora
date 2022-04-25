//
//  BeanCovertor.swift
//  RCTAgora
//
//  Created by LXH on 2020/4/9.
//  Copyright © 2020 Syan. All rights reserved.
//

import AgoraRtcKit
import Foundation

func mapToPoint(_ map: [String: Any]) -> CGPoint {
    var point = CGPoint()
    if let x = map["x"] as? NSNumber {
        point.x = CGFloat(truncating: x)
    }
    if let y = map["y"] as? NSNumber {
        point.y = CGFloat(truncating: y)
    }
    return point
}

func mapToSize(_ map: [String: Any]) -> CGSize {
    var size = CGSize()
    if let width = map["width"] as? NSNumber {
        size.width = CGFloat(truncating: width)
    }
    if let height = map["height"] as? NSNumber {
        size.height = CGFloat(truncating: height)
    }
    return size
}

func mapToRect(_ map: [String: Any]) -> CGRect {
    return CGRect(
            origin: mapToPoint(map),
            size: mapToSize(map)
    )
}

func mapToVideoEncoderConfiguration(_ map: [String: Any]) -> AgoraVideoEncoderConfiguration {
    let config = AgoraVideoEncoderConfiguration()
    if let dimensions = map["dimensions"] as? [String: Any] {
        config.dimensions = mapToSize(dimensions)
    }
    if let frameRate = map["frameRate"] as? NSNumber {
        config.frameRate = frameRate.intValue
    }
    if let minFrameRate = map["minFrameRate"] as? NSNumber {
        config.minFrameRate = minFrameRate.intValue
    }
    if let bitrate = map["bitrate"] as? NSNumber {
        config.bitrate = bitrate.intValue
    }
    if let minBitrate = map["minBitrate"] as? NSNumber {
        config.minBitrate = minBitrate.intValue
    }
    if let orientationMode = map["orientationMode"] as? NSNumber {
        if let orientationMode = AgoraVideoOutputOrientationMode(rawValue: orientationMode.intValue) {
            config.orientationMode = orientationMode
        }
    }
    if let degradationPreference = map["degradationPrefer"] as? NSNumber {
        if let degradationPreference = AgoraDegradationPreference(rawValue: degradationPreference.intValue) {
            config.degradationPreference = degradationPreference
        }
    }
    if let mirrorMode = map["mirrorMode"] as? NSNumber {
        if let mirrorMode = AgoraVideoMirrorMode(rawValue: mirrorMode.uintValue) {
            config.mirrorMode = mirrorMode
        }
    }
    return config
}

func mapToBeautyOptions(_ map: [String: Any]) -> AgoraBeautyOptions {
    let options = AgoraBeautyOptions()
    if let lighteningContrastLevel = map["lighteningContrastLevel"] as? NSNumber {
        if let lighteningContrastLevel = AgoraLighteningContrastLevel(rawValue: lighteningContrastLevel.uintValue) {
            options.lighteningContrastLevel = lighteningContrastLevel
        }
    }
    if let lighteningLevel = map["lighteningLevel"] as? NSNumber {
        options.lighteningLevel = lighteningLevel.floatValue
    }
    if let smoothnessLevel = map["smoothnessLevel"] as? NSNumber {
        options.smoothnessLevel = smoothnessLevel.floatValue
    }
    if let rednessLevel = map["rednessLevel"] as? NSNumber {
        options.rednessLevel = rednessLevel.floatValue
    }
    if let sharpnessLevel = map["sharpnessLevel"] as? NSNumber {
        options.sharpnessLevel = sharpnessLevel.floatValue
    }
    return options
}

func mapToAgoraImage(_ map: [String: Any]) -> AgoraImage {
    let image = AgoraImage()
    if let url = map["url"] as? String {
        if let url = URL(string: url) {
            image.url = url
        }
    }
    image.rect = mapToRect(map)
    if let zOrder = map["zOrder"] as? NSNumber {
        image.zOrder = zOrder.intValue
    }
    if let alpha = map["alpha"] as? NSNumber {
        image.alpha = alpha.doubleValue
    }
    return image
}

func mapToTranscodingUser(_ map: [String: Any]) -> AgoraLiveTranscodingUser {
    let user = AgoraLiveTranscodingUser()
    if let uid = map["uid"] as? NSNumber {
        user.uid = uid.uintValue
    }
    user.rect = mapToRect(map)
    if let zOrder = map["zOrder"] as? NSNumber {
        user.zOrder = zOrder.intValue
    }
    if let alpha = map["alpha"] as? NSNumber {
        user.alpha = alpha.doubleValue
    }
    if let audioChannel = map["audioChannel"] as? NSNumber {
        user.audioChannel = audioChannel.intValue
    }
    return user
}

func mapToColor(_ map: [String: Any]) -> UIColor {
    return UIColor(
            red: (map["red"] as! CGFloat) / 255,
            green: (map["green"] as! CGFloat) / 255,
            blue: (map["blue"] as! CGFloat) / 255,
            alpha: 1.0
    )
}

func mapToLiveTranscoding(_ map: [String: Any]) -> AgoraLiveTranscoding {
    let transcoding = AgoraLiveTranscoding.default()
    transcoding.size = mapToSize(map)
    if let videoBitrate = map["videoBitrate"] as? NSNumber {
        transcoding.videoBitrate = videoBitrate.intValue
    }
    if let videoFramerate = map["videoFramerate"] as? NSNumber {
        transcoding.videoFramerate = videoFramerate.intValue
    }
    if let lowLatency = map["lowLatency"] as? Bool {
        transcoding.lowLatency = lowLatency
    }
    if let videoGop = map["videoGop"] as? NSNumber {
        transcoding.videoGop = videoGop.intValue
    }
    if let watermark = map["watermark"] as? [String: Any] {
        transcoding.watermark = mapToAgoraImage(watermark)
    }
    if let watermarkList = map["watermarkList"] as? [Any] {
        var array = [AgoraImage]()
        watermarkList.forEach {
            if let item = $0 as? [String: Any] {
                array.append(mapToAgoraImage(item))
            }
        }
        transcoding.watermarkArray = array;
    }
    if let backgroundImage = map["backgroundImage"] as? [String: Any] {
        transcoding.backgroundImage = mapToAgoraImage(backgroundImage)
    }
    if let backgroundImageList = map["backgroundImageList"] as? [Any] {
        var array = [AgoraImage]()
        backgroundImageList.forEach {
            if let item = $0 as? [String: Any] {
                array.append(mapToAgoraImage(item))
            }
        }
        transcoding.backgroundImageArray = array;
    }
    if let audioSampleRate = map["audioSampleRate"] as? NSNumber {
        if let audioSampleRate = AgoraAudioSampleRateType(rawValue: audioSampleRate.intValue) {
            transcoding.audioSampleRate = audioSampleRate
        }
    }
    if let audioBitrate = map["audioBitrate"] as? NSNumber {
        transcoding.audioBitrate = audioBitrate.intValue
    }
    if let audioChannels = map["audioChannels"] as? NSNumber {
        transcoding.audioChannels = audioChannels.intValue
    }
    if let audioCodecProfile = map["audioCodecProfile"] as? NSNumber {
        if let audioCodecProfile = AgoraAudioCodecProfileType(rawValue: audioCodecProfile.intValue) {
            transcoding.audioCodecProfile = audioCodecProfile
        }
    }
    if let videoCodecProfile = map["videoCodecProfile"] as? NSNumber {
        if let videoCodecProfile = AgoraVideoCodecProfileType(rawValue: videoCodecProfile.intValue) {
            transcoding.videoCodecProfile = videoCodecProfile
        }
    }
    if let videoCodecType = map["videoCodecType"] as? NSNumber {
        if let videoCodecType = AgoraVideoCodecTypeForStream(rawValue: videoCodecType.intValue) {
            transcoding.videoCodecType = videoCodecType
        }
    }
    if let backgroundColor = map["backgroundColor"] as? [String: Any] {
        transcoding.backgroundColor = mapToColor(backgroundColor)
    }
    if let userConfigExtraInfo = map["userConfigExtraInfo"] as? String {
        transcoding.transcodingExtraInfo = userConfigExtraInfo
    }
    if let transcodingUsers = map["transcodingUsers"] as? [Any] {
        transcodingUsers.forEach {
            if let item = $0 as? [String: Any] {
                transcoding.add(mapToTranscodingUser(item))
            }
        }
    }
    if let advancedFeatures = map["advancedFeatures"] as? [String: Bool] {
        advancedFeatures.forEach {
            transcoding.setAdvancedFeatures($0.key, opened: $0.value)
        }
    }
    return transcoding
}

func mapToChannelMediaInfo(_ map: [String: Any]) -> AgoraChannelMediaRelayInfo {
    let info = AgoraChannelMediaRelayInfo()
    if let channelName = map["channelName"] as? String {
        info.channelName = channelName
    }
    if let token = map["token"] as? String {
        info.token = token
    }
    if let uid = map["uid"] as? NSNumber {
        info.uid = uid.uintValue
    }
    return info
}

func mapToChannelMediaRelayConfiguration(_ map: [String: Any]) -> AgoraChannelMediaRelayConfiguration {
    let config = AgoraChannelMediaRelayConfiguration()
    if let srcInfo = map["srcInfo"] as? [String: Any] {
        config.sourceInfo = mapToChannelMediaInfo(srcInfo)
    }
    if let destInfos = map["destInfos"] as? [Any] {
        destInfos.forEach {
            if let item = $0 as? [String: Any] {
                let info = mapToChannelMediaInfo(item)
                config.setDestinationInfo(info, forChannelName: info.channelName ?? "")
            }
        }
    }
    return config
}

func mapToLastmileProbeConfig(_ map: [String: Any]) -> AgoraLastmileProbeConfig {
    let config = AgoraLastmileProbeConfig()
    if let probeUplink = map["probeUplink"] as? Bool {
        config.probeUplink = probeUplink
    }
    if let probeDownlink = map["probeDownlink"] as? Bool {
        config.probeDownlink = probeDownlink
    }
    if let expectedUplinkBitrate = map["expectedUplinkBitrate"] as? NSNumber {
        config.expectedUplinkBitrate = expectedUplinkBitrate.uintValue
    }
    if let expectedDownlinkBitrate = map["expectedDownlinkBitrate"] as? NSNumber {
        config.expectedDownlinkBitrate = expectedDownlinkBitrate.uintValue
    }
    return config
}

func mapToWatermarkOptions(_ map: [String: Any]) -> WatermarkOptions {
    let options = WatermarkOptions()
    if let visibleInPreview = map["visibleInPreview"] as? Bool {
        options.visibleInPreview = visibleInPreview
    }
    if let positionInLandscapeMode = map["positionInLandscapeMode"] as? [String: Any] {
        options.positionInLandscapeMode = mapToRect(positionInLandscapeMode)
    }
    if let positionInPortraitMode = map["positionInPortraitMode"] as? [String: Any] {
        options.positionInPortraitMode = mapToRect(positionInPortraitMode)
    }
    return options
}

func mapToLiveInjectStreamConfig(_ map: [String: Any]) -> AgoraLiveInjectStreamConfig {
    let config = AgoraLiveInjectStreamConfig.default()
    config.size = mapToSize(map)
    if let videoGop = map["videoGop"] as? NSNumber {
        config.videoGop = videoGop.intValue
    }
    if let videoFramerate = map["videoFramerate"] as? NSNumber {
        config.videoFramerate = videoFramerate.intValue
    }
    if let videoBitrate = map["videoBitrate"] as? NSNumber {
        config.videoBitrate = videoBitrate.intValue
    }
    if let audioSampleRate = map["audioSampleRate"] as? NSNumber {
        if let audioSampleRate = AgoraAudioSampleRateType(rawValue: audioSampleRate.intValue) {
            config.audioSampleRate = audioSampleRate
        }
    }
    if let audioBitrate = map["audioBitrate"] as? NSNumber {
        config.audioBitrate = audioBitrate.intValue
    }
    if let audioChannels = map["audioChannels"] as? NSNumber {
        config.audioChannels = audioChannels.intValue
    }
    return config
}

func mapToCameraCapturerConfiguration(_ map: [String: Any]) -> AgoraCameraCapturerConfiguration {
    let config = AgoraCameraCapturerConfiguration()
    if let preference = map["preference"] as? NSNumber {
        if let preference = AgoraCameraCaptureOutputPreference(rawValue: preference.intValue) {
            config.preference = preference
        }
    }
    if let captureWidth = map["captureWidth"] as? NSNumber {
        config.captureWidth = captureWidth.int32Value
    }
    if let captureHeight = map["captureHeight"] as? NSNumber {
        config.captureHeight = captureHeight.int32Value
    }
    if let cameraDirection = map["cameraDirection"] as? NSNumber {
        if let cameraDirection = AgoraCameraDirection(rawValue: cameraDirection.intValue) {
            config.cameraDirection = cameraDirection
        }
    }
    return config
}

func mapToChannelMediaOptions(_ map: [String: Any]) -> AgoraRtcChannelMediaOptions {
    let options = AgoraRtcChannelMediaOptions()
    if let autoSubscribeAudio = map["autoSubscribeAudio"] as? Bool {
        options.autoSubscribeAudio = autoSubscribeAudio
    }
    if let autoSubscribeVideo = map["autoSubscribeVideo"] as? Bool {
        options.autoSubscribeVideo = autoSubscribeVideo
    }
    if let publishLocalAudio = map["publishLocalAudio"] as? Bool {
        options.publishLocalAudio = publishLocalAudio
    }
    if let publishLocalVideo = map["publishLocalVideo"] as? Bool {
        options.publishLocalVideo = publishLocalVideo
    }
    return options
}

func mapToRtcEngineConfig(_ map: [String: Any]) -> AgoraRtcEngineConfig {
    let config = AgoraRtcEngineConfig()
    config.appId = map["appId"] as? String
    if let areaCode = map["areaCode"] as? NSNumber {
        config.areaCode = areaCode.uintValue
    }
    if let logConfig = map["logConfig"] as? [String: Any] {
        config.logConfig = mapToLogConfig(logConfig)
    }
    return config
}

func mapToAudioRecordingConfiguration(_ map: [String: Any]) -> AgoraAudioRecordingConfiguration {
    let config = AgoraAudioRecordingConfiguration()
    if let filePath = map["filePath"] as? String {
        config.filePath = filePath
    }
    if let recordingQuality = map["recordingQuality"] as? NSNumber {
        if let recordingQuality = AgoraAudioRecordingQuality(rawValue: recordingQuality.intValue) {
            config.recordingQuality = recordingQuality
        }
    }
    if let recordingPosition = map["recordingPosition"] as? NSNumber {
        if let recordingPosition = AgoraAudioRecordingPosition(rawValue: recordingPosition.intValue) {
            config.recordingPosition = recordingPosition
        }
    }
    if let recordingSampleRate = map["recordingSampleRate"] as? NSNumber {
        config.recordingSampleRate = recordingSampleRate.intValue
    }
    if let recordingChannel = map["recordingChannel"] as? NSNumber {
        config.recordingChannel = recordingChannel.intValue
    }
    return config
}

func mapToEncryptionConfig(_ map: [String: Any]) -> AgoraEncryptionConfig {
    let config = AgoraEncryptionConfig()
    if let encryptionMode = map["encryptionMode"] as? NSNumber {
        if let encryptionMode = AgoraEncryptionMode(rawValue: encryptionMode.intValue) {
            config.encryptionMode = encryptionMode
        }
    }
    if let encryptionKey = map["encryptionKey"] as? String {
        config.encryptionKey = encryptionKey
    }
    if let list = map["encryptionKdfSalt"] as? [Any] {
        var encryptionKdfSalt: [UInt8] = []
        for i in list.indices {
            if let item = list[i] as? NSNumber {
                encryptionKdfSalt.append(item.uint8Value)
            }
        }
        config.encryptionKdfSalt = Data(bytes: encryptionKdfSalt)
    }
    return config
}

func mapToRhythmPlayerConfig(_ map: [String: Any]) -> AgoraRtcRhythmPlayerConfig {
    let config = AgoraRtcRhythmPlayerConfig()
    if let beatsPerMeasure = map["beatsPerMeasure"] as? NSNumber {
        config.beatsPerMeasure = beatsPerMeasure.uintValue
    }
    if let beatsPerMinute = map["beatsPerMinute"] as? NSNumber {
        config.beatsPerMinute = beatsPerMinute.uintValue
    }
    if let publish = map["publish"] as? NSNumber {
        config.publish = publish.boolValue
    }
    return config
}

func mapToClientRoleOptions(_ map: [String: Any]) -> AgoraClientRoleOptions {
    let options = AgoraClientRoleOptions()
    if let audienceLatencyLevel = map["audienceLatencyLevel"] as? NSNumber {
        if let audienceLatencyLevel = AgoraAudienceLatencyLevelType(rawValue: audienceLatencyLevel.intValue) {
            options.audienceLatencyLevel = audienceLatencyLevel
        }
    }
    return options
}

func mapToLogConfig(_ map: [String: Any]) -> AgoraLogConfig {
    let config = AgoraLogConfig()
    config.filePath = map["filePath"] as? String
    if let fileSize = map["fileSize"] as? NSNumber {
        config.fileSize = fileSize.intValue
    }
    if let level = map["level"] as? NSNumber {
        if let level = AgoraLogLevel(rawValue: level.intValue) {
            config.level = level
        }
    }
    return config
}

func mapToDataStreamConfig(_ map: [String: Any]) -> AgoraDataStreamConfig {
    let config = AgoraDataStreamConfig()
    if let syncWithAudio = map["syncWithAudio"] as? Bool {
        config.syncWithAudio = syncWithAudio
    }
    if let ordered = map["ordered"] as? Bool {
        config.ordered = ordered
    }
    return config
}

func mapToVirtualBackgroundSource(_ map: [String: Any]) -> AgoraVirtualBackgroundSource {
    let backgroundSource = AgoraVirtualBackgroundSource()
    if let backgroundSourceType = map["backgroundSourceType"] as? NSNumber {
        if let backgroundSourceType = AgoraVirtualBackgroundSourceType(rawValue: backgroundSourceType.uintValue) {
            backgroundSource.backgroundSourceType = backgroundSourceType
        }
    }
    if let color = map["color"] as? [String: Any] {
        var red: CGFloat = 0, green: CGFloat = 0, blue: CGFloat = 0, alpha: CGFloat = 0
        mapToColor(color).getRed(&red, green: &green, blue: &blue, alpha: &alpha)
        backgroundSource.color = UInt(red * 255.0) << 16 + UInt(green * 255.0) << 8 + UInt(blue * 255.0)
    }
    backgroundSource.source = map["source"] as? String
    if let blurDegree = map["blur_degree"] as? NSNumber {
        if let blurDegree = AgoraBlurDegree(rawValue: blurDegree.uintValue) {
            backgroundSource.blur_degree = blurDegree
        }
    }
    return backgroundSource
}

func mapToEchoTestConfiguration(_ map: [String: Any]) -> AgoraEchoTestConfiguration {
    let config = AgoraEchoTestConfiguration()
    if let enableAudio = map["enableAudio"] as? NSNumber {
        config.enableAudio = enableAudio.boolValue
    }
    if let enableVideo = map["enableVideo"] as? NSNumber {
        config.enableVideo = enableVideo.boolValue
    }
    if let token = map["token"] as? String {
        config.token = token
    }
    if let channelId = map["channelId"] as? String {
        config.channelId = channelId
    }
    return config
}

func mapToMediaRecorderConfiguration(_ map: [String: Any]) -> AgoraMediaRecorderConfiguration {
    let config = AgoraMediaRecorderConfiguration()
    if let storagePath = map["storagePath"] as? String {
        config.storagePath = storagePath
    }
    if let containerFormat = map["containerFormat"] as? NSNumber {
        if let containerFormat = AgoraMediaRecorderContainerFormat(rawValue: containerFormat.intValue) {
            config.containerFormat = containerFormat
        }
    }
    if let streamType = map["streamType"] as? NSNumber {
        if let streamType = AgoraMediaRecorderStreamType(rawValue: streamType.intValue) {
            config.streamType = streamType
        }
    }
    if let maxDurationMs = map["maxDurationMs"] as? NSNumber {
        config.maxDurationMs = maxDurationMs.uintValue
    }
    if let recorderInfoUpdateInterval = map["recorderInfoUpdateInterval"] as? NSNumber {
        config.recorderInfoUpdateInterval = recorderInfoUpdateInterval.uintValue
    }
    return config
}

func mapToContentInspectModule(_ map: [String: Any]) -> AgoraContentInspectModule {
    let module = AgoraContentInspectModule()
    if let type = map["type"] as? NSNumber {
        if let type = AgoraContentInspectType(rawValue: type.intValue) {
            module.type = type
        }
    }
    if let interval = map["interval"] as? NSNumber {
        module.interval = interval.intValue
    }
    return module
}

func mapToContentInspectConfig(_ map: [String: Any]) -> AgoraContentInspectConfig {
    let config = AgoraContentInspectConfig()
    if let extraInfo = map["extraInfo"] as? String {
        config.extraInfo = extraInfo
    }
    if let modules = map["modules"] as? [Any] {
        var array = [AgoraContentInspectModule]()
        modules.forEach {
            if let item = $0 as? [String: Any] {
                array.append(mapToContentInspectModule(item))
            }
        }
        config.modules = array
    }
    return config
}

func mapToLocalAccessPointConfiguration(_ map: [String: Any]) -> AgoraLocalAccessPointConfiguration {
    let config = AgoraLocalAccessPointConfiguration()
    if let ipList = map["ipList"] as? [Any] {
        var array = [String]()
        ipList.forEach {
            if let item = $0 as? String {
                array.append(item)
            }
        }
        config.ipList = array
    }
    if let domainList = map["domainList"] as? [Any] {
        var array = [String]()
        domainList.forEach {
            if let item = $0 as? String {
                array.append(item)
            }
        }
        config.domainList = array
    }
    if let verifyDomainName = map["verifyDomainName"] as? String {
        config.verifyDomainName = verifyDomainName
    }
    if let mode = map["mode"] as? NSNumber {
        if let mode = AgoraLocalProxyMode(rawValue: mode.uintValue) {
            config.mode = mode
        }
    }
    return config
}

func mapToVideoDenoiserOptions(_ map: [String: Any]) -> AgoraVideoDenoiserOptions {
    let options = AgoraVideoDenoiserOptions()
    if let mode = map["mode"] as? NSNumber {
        if let mode = AgoraVideoDenoiserMode(rawValue: mode.uintValue) {
            options.mode = mode
        }
    }
    if let level = map["level"] as? NSNumber {
        if let level = AgoraVideoDenoiserLevel(rawValue: level.uintValue) {
            options.level = level
        }
    }
    return options
}

func mapToLowLightEnhanceOptions(_ map: [String: Any]) -> AgoraLowlightEnhanceOptions {
    let options = AgoraLowlightEnhanceOptions()
    if let mode = map["mode"] as? NSNumber {
        if let mode = AgoraLowlightEnhanceMode(rawValue: mode.uintValue) {
            options.mode = mode
        }
    }
    if let level = map["level"] as? NSNumber {
        if let level = AgoraLowlightEnhanceLevel(rawValue: level.uintValue) {
            options.level = level
        }
    }
    return options
}

func mapToColorEnhanceOptions(_ map: [String: Any]) -> AgoraColorEnhanceOptions {
    let options = AgoraColorEnhanceOptions()
    if let strengthLevel = map["strengthLevel"] as? NSNumber {
        options.strengthLevel = strengthLevel.floatValue
    }
    if let skinProtectLevel = map["skinProtectLevel"] as? NSNumber {
        options.skinProtectLevel = skinProtectLevel.floatValue
    }
    return options
}

func mapToScreenCaptureParameters(_ map: [String: Any]) -> AgoraScreenCaptureParameters2 {
    let params = AgoraScreenCaptureParameters2()
    if let captureAudio = map["captureAudio"] as? Bool {
        params.captureAudio = captureAudio;
    }
    if let audioParams = map["audioParams"] as? [String: Any] {
        params.audioParams = mapToScreenAudioParameters(audioParams)
    }
    if let captureVideo = map["captureVideo"] as? Bool {
        params.captureVideo = captureVideo
    }
    if let videoParams = map["videoParams"] as? [String: Any] {
        params.videoParams = mapToScreenVideoParameters(videoParams)
    }
    return params
}

func mapToScreenVideoParameters(_ map: [String: Any]) -> AgoraScreenVideoParameters {
    let params = AgoraScreenVideoParameters()
    if let bitrate = map["bitrate"] as? NSNumber {
        params.bitrate = bitrate.intValue
    }
    if let frameRate = map["frameRate"] as? NSNumber {
        params.frameRate = frameRate.intValue
    }
    if let dimensions = map["dimensions"] as? [String: Any] {
        params.dimensions = mapToSize(dimensions)
    }
    if let contentHint = map["contentHint"] as? NSNumber {
        if let contentHint = AgoraVideoContentHint(rawValue: contentHint.uintValue) {
            params.contentHint = contentHint;
        }
    }
    return params
}

func mapToScreenAudioParameters(_ map: [String: Any]) -> AgoraScreenAudioParameters {
    let params = AgoraScreenAudioParameters()
    if let captureSignalVolume = map["captureSignalVolume"] as? NSNumber {
        params.captureSignalVolume = captureSignalVolume.intValue
    }
    return params
}

func mapToSpatialAudioParams(_ map: [String: Any]) -> AgoraSpatialAudioParams {
    let params = AgoraSpatialAudioParams()
    if let speaker_azimuth = map["speaker_azimuth"] as? NSNumber {
        params.speaker_azimuth = AgoraRtcDoubleOptional.of(speaker_azimuth.doubleValue)
    }
    if let speaker_elevation = map["speaker_elevation"] as? NSNumber {
        params.speaker_elevation = AgoraRtcDoubleOptional.of(speaker_elevation.doubleValue)
    }
    if let speaker_distance = map["speaker_distance"] as? NSNumber {
        params.speaker_distance = AgoraRtcDoubleOptional.of(speaker_distance.doubleValue)
    }
    if let speaker_orientation = map["speaker_orientation"] as? NSNumber {
        params.speaker_orientation = AgoraRtcIntOptional.of(speaker_orientation.int32Value)
    }
    if let enable_blur = map["enable_blur"] as? Bool {
        params.enable_blur = AgoraRtcBoolOptional.of(enable_blur)
    }
    if let enable_air_absorb = map["enable_air_absorb"] as? Bool {
        params.enable_air_absorb = AgoraRtcBoolOptional.of(enable_air_absorb)
    }
    return params
}
