require 'digest'

module AgoraReactNativeSPM
  def self.enabled?
    respond_to?(:spm_dependency, true) && ENV['USE_FRAMEWORKS'] == 'dynamic'
  end

  RTC_VERSION = '4.6.4-rc.2'
  RTC_PRODUCTS = %w[
    RtcBasic AINS AINSLL AudioBeauty ClearVision ContentInspect SpatialAudio
    VirtualBackground AIAEC AIAECLL VQA FaceDetection FaceCapture LipSync
    VideoCodecEnc VideoAv1CodecEnc ReplayKit
  ].freeze
  RTC_FRAMEWORKS = %w[
    AgoraRtcKit Agorafdkaac Agoraffmpeg AgoraSoundTouch video_dec aosl
    AgoraAiNoiseSuppressionExtension AgoraAiNoiseSuppressionLLExtension
    AgoraAudioBeautyExtension AgoraClearVisionExtension AgoraContentInspectExtension
    AgoraSpatialAudioExtension AgoraVideoSegmentationExtension
    AgoraAiEchoCancellationExtension AgoraAiEchoCancellationLLExtension
    AgoraVideoQualityAnalyzerExtension AgoraFaceDetectionExtension
    AgoraFaceCaptureExtension AgoraLipSyncExtension AgoraVideoEncoderExtension
    AgoraVideoAv1EncoderExtension AgoraReplayKitExtension
  ].freeze

  # Older RN helpers add objects after CocoaPods' UUID counter has been reset.
  # Probe occupied IDs so an SPM product cannot overwrite the project's root.
  module UniqueProjectUUIDs
    def generate_uuid
      uuid = super
      uuid = super while objects_by_uuid.key?(uuid)
      uuid
    end
  end

  module LegacyInstall
    def apply_on_post_install(installer)
      singleton = installer.pods_project.singleton_class
      singleton.prepend(UniqueProjectUUIDs) unless singleton.ancestors.include?(UniqueProjectUUIDs)
      super
    end
  end

  def self.prepare!
    return if SPM.respond_to?(:new_object, true)

    singleton = SPM.singleton_class
    singleton.prepend(LegacyInstall) unless singleton.ancestors.include?(LegacyInstall)
  end

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
    return unless enabled?
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
