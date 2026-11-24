require 'digest'

module AgoraReactNativeSPM
  RTC_VERSION = '4.6.2'
  RTC_PRODUCTS = %w[
    RtcBasic AINS AINSLL AudioBeauty ClearVision ContentInspect SpatialAudio
    VirtualBackground AIAEC AIAECLL VQA FaceDetection FaceCapture LipSync
    VideoCodecEnc VideoAv1CodecEnc ReplayKit
  ].freeze
  RTC_FRAMEWORKS = %w[
    AgoraRtcKit Agorafdkaac Agoraffmpeg AgoraSoundTouch video_dec video_enc aosl
    AgoraAiNoiseSuppressionExtension AgoraAiNoiseSuppressionLLExtension
    AgoraAudioBeautyExtension AgoraClearVisionExtension AgoraContentInspectExtension
    AgoraSpatialAudioExtension AgoraVideoSegmentationExtension
    AgoraAiEchoCancellationExtension AgoraAiEchoCancellationLLExtension
    AgoraVideoQualityAnalyzerExtension AgoraFaceDetectionExtension
    AgoraFaceCaptureExtension AgoraLipSyncExtension AgoraVideoEncoderExtension
    AgoraVideoAv1EncoderExtension AgoraReplayKitExtension
  ].freeze

  def self.native_embedding?
    Object.instance_method(:spm_dependency).parameters.any? { |_, name| name == :embed_frameworks }
  rescue NameError
    false
  end

  def self.embedding_options(frameworks)
    native_embedding? ? { embed_frameworks: frameworks } : {}
  end

  # Older RN versions register Swift packages without embedding their dynamic
  # frameworks in the app. Reuse CocoaPods' copy/strip/sign function for these binaries.
  def self.post_install(installer)
    return unless ENV['AGORA_USE_SPM'] == '1'
    return if native_embedding?

    frameworks = RTC_FRAMEWORKS + ['AgoraRtcWrapper']
    manifest_hash = Digest::SHA256.file(File.join(__dir__, '..', 'Package.swift')).hexdigest
    marker = '# [Agora] Embed Swift package frameworks'
    installer.aggregate_targets.each do |target|
      next unless target.pod_targets.any? { |pod| pod.name == 'react-native-agora' }

      path = target.embed_frameworks_script_path
      unless File.file?(path)
        raise 'Agora SPM requires use_frameworks! :linkage => :dynamic in the app target.'
      end
      script = File.read(path)
      next if script.include?(marker)

      anchor = /^if \[ "\$\{COCOAPODS_PARALLEL_CODE_SIGN\}" == "true" \]; then$/
      unless script.match?(anchor)
        raise 'Cannot configure Agora SPM framework embedding in the CocoaPods script.'
      end
      # Package requirements are inputs too: rewrite the script when binaries change.
      calls = "#{marker} RTC=#{RTC_VERSION} Iris=#{manifest_hash}\n"
      calls += frameworks.map do |framework|
        "install_framework \"${PODS_CONFIGURATION_BUILD_DIR}/#{framework}.framework\"\n"
      end.join
      File.write(path, script.sub(anchor) { "#{calls}\n#{$&}" })
    end
  end
end
