/**
 * Runtime verification checklist for Expo VideoEffect:
 * - bundle status transitions preparing -> ready
 * - "Create Effect Object" is disabled until the bundle is ready
 * - Beauty/Style Makeup/Filter/Sticker controls are disabled until the effect object is created
 *
 * This screen intentionally uses runtime-focused validation instead of a Jest component test.
 */
import Slider from '@react-native-community/slider';
import React, { ReactElement } from 'react';
import { StyleSheet } from 'react-native';
import {
  ChannelProfileType,
  ClientRoleType,
  FaceShapeBeautyStyle,
  IRtcEngineEventHandler,
  IVideoEffectObject,
  MediaSourceType,
  RtcConnection,
  RtcStats,
  VideoEffectAction,
  VideoEffectNodeId,
  createAgoraRtcEngine,
} from 'react-native-agora';

import {
  BaseComponent,
  BaseVideoComponentState,
} from '../../../../src/components/BaseComponent';
import {
  AgoraButton,
  AgoraDivider,
  AgoraDropdown,
  AgoraStyle,
  AgoraText,
} from '../../../../src/components/ui';
import Config from '../../../../src/config/agora.config';
import { askMediaAccess } from '../../../../src/utils/permissions';

import { prepareVideoEffectBundle } from './VideoEffectBundle';
import {
  BundleTemplateGroups,
  BundleTemplateOption,
  DEFAULT_SDK_DRIVEN_BEAUTY_OPTIONS,
  SdkDrivenBeautyOptions,
  VideoEffectOperation,
  buildStyleEffectOperations,
  destroyVideoEffectObjectResource,
  extractSdkDrivenBeautyOptionsFromConfig,
  findTemplateOptionByName,
  getDisplayValueForSelectedTemplate,
  isSameTemplateOption,
  isVideoEffectObjectHandleValid,
  isVideoEffectSdkResultSuccess,
  loadBundleTemplateGroupsAndInitialBeautyOptions,
  readBundleTemplateConfig,
  releaseVideoEffectResources,
  syncSavedConfigCacheForBundle,
} from './VideoEffectHelpers';

type BundleStatus = 'preparing' | 'ready' | 'failed';

interface State extends BaseVideoComponentState {
  appliedBeautyOptions: SdkDrivenBeautyOptions | null;
  appliedBeautyTemplate: BundleTemplateOption | null;
  appliedFilterStrength: number | null;
  appliedFilterTemplate: BundleTemplateOption | null;
  appliedStickerTemplate: BundleTemplateOption | null;
  appliedStyleIntensity: number | null;
  appliedStyleMakeupTemplate: BundleTemplateOption | null;
  bundleError?: string;
  bundleStatus: BundleStatus;
  preparedBundlePath?: string;
  templateGroups: BundleTemplateGroups;
  selectedBeautyTemplate: BundleTemplateOption | null;
  selectedStyleMakeupTemplate: BundleTemplateOption | null;
  selectedFilterTemplate: BundleTemplateOption | null;
  selectedStickerTemplate: BundleTemplateOption | null;
  beautyOptions: SdkDrivenBeautyOptions;
  styleIntensity: number;
  filterStrength: number;
  hasVideoEffectObject: boolean;
}

const EMPTY_TEMPLATE_GROUPS: BundleTemplateGroups = {
  beauty: [],
  filter: [],
  sticker: [],
  styleMakeup: [],
};

const FACE_STYLE_ITEMS = [
  { label: 'Default', value: -1 },
  { label: 'Female', value: FaceShapeBeautyStyle.FaceShapeBeautyStyleFemale },
  { label: 'Male', value: FaceShapeBeautyStyle.FaceShapeBeautyStyleMale },
  { label: 'Natural', value: FaceShapeBeautyStyle.FaceShapeBeautyStyleNatural },
];

const FILTER_STRENGTH_FALLBACK = 0.5;
const STYLE_INTENSITY_FALLBACK = 0.95;
const THROTTLE_MS = 120;
const SAVE_RESET_REFRESH_MS = 250;

function getTemplateItems(options: BundleTemplateOption[]) {
  return options.map((option) => ({
    label: option.label,
    value: option.templateName,
  }));
}

function normalizeSliderValue(value: number, step: number) {
  const stepText = `${step}`;
  const precision = stepText.includes('.') ? stepText.split('.')[1].length : 0;
  return Number(value.toFixed(precision));
}

const VideoEffectSlider = (props: {
  disabled?: boolean;
  maximumValue: number;
  minimumValue: number;
  onSlidingComplete: (value: number) => void;
  onValueChange?: (value: number) => void;
  step: number;
  title: string;
  value: number;
}) => {
  const {
    disabled,
    maximumValue,
    minimumValue,
    onSlidingComplete,
    onValueChange,
    step,
    title,
    value,
  } = props;

  return (
    <>
      <AgoraText>{title}</AgoraText>
      <Slider
        disabled={disabled}
        maximumValue={maximumValue}
        minimumTrackTintColor={'#2f74ff'}
        minimumValue={minimumValue}
        onSlidingComplete={(nextValue) => {
          onSlidingComplete(normalizeSliderValue(nextValue, step));
        }}
        onValueChange={(nextValue) => {
          onValueChange?.(normalizeSliderValue(nextValue, step));
        }}
        step={step}
        style={AgoraStyle.slider}
        value={value}
      />
    </>
  );
};

export default class VideoEffect
  extends BaseComponent<{}, State>
  implements IRtcEngineEventHandler
{
  private isMountedFlag = false;
  private beautyRefreshTimer?: ReturnType<typeof setTimeout>;
  private beautyUpdateTimer?: ReturnType<typeof setTimeout>;
  private filterUpdateTimer?: ReturnType<typeof setTimeout>;
  private styleUpdateTimer?: ReturnType<typeof setTimeout>;
  private videoEffectObject?: IVideoEffectObject;

  componentDidMount() {
    this.isMountedFlag = true;
    super.componentDidMount();
  }

  componentWillUnmount() {
    this.isMountedFlag = false;
    super.componentWillUnmount();
  }

  protected createState(): State {
    return {
      appId: Config.appId,
      appliedBeautyOptions: null,
      appliedBeautyTemplate: null,
      appliedFilterStrength: null,
      appliedFilterTemplate: null,
      appliedStickerTemplate: null,
      appliedStyleIntensity: null,
      appliedStyleMakeupTemplate: null,
      beautyOptions: DEFAULT_SDK_DRIVEN_BEAUTY_OPTIONS,
      bundleStatus: 'preparing',
      channelId: Config.channelId,
      enableVideo: true,
      filterStrength: FILTER_STRENGTH_FALLBACK,
      hasVideoEffectObject: false,
      hideAction: true,
      joinChannelSuccess: false,
      remoteUsers: [],
      selectedBeautyTemplate: null,
      selectedFilterTemplate: null,
      selectedStickerTemplate: null,
      selectedStyleMakeupTemplate: null,
      startPreview: false,
      styleIntensity: STYLE_INTENSITY_FALLBACK,
      templateGroups: EMPTY_TEMPLATE_GROUPS,
      token: Config.token,
      uid: Config.uid,
    };
  }

  protected async initRtcEngine() {
    const { appId } = this.state;
    if (!appId) {
      this.error('appId is invalid');
      return;
    }

    this.engine = createAgoraRtcEngine();
    this.engine.initialize({
      appId,
      channelProfile: ChannelProfileType.ChannelProfileLiveBroadcasting,
      logConfig: { filePath: Config.logFilePath },
    });
    this.engine.registerEventHandler(this);

    await askMediaAccess([
      'android.permission.RECORD_AUDIO',
      'android.permission.CAMERA',
    ]);

    this.engine?.enableExtension(
      'agora_video_filters_clear_vision',
      'clear_vision',
      true
    );

    this.engine.enableVideo();
    this.engine.startPreview();
    this.setState({ startPreview: true });

    this.prepareBundleResources();
  }

  protected joinChannel() {
    const { channelId, token, uid } = this.state;
    if (!channelId) {
      this.error('channelId is invalid');
      return;
    }
    if (uid < 0) {
      this.error('uid is invalid');
      return;
    }

    this.engine?.joinChannel(token, channelId, uid, {
      clientRoleType: ClientRoleType.ClientRoleBroadcaster,
    });
  }

  protected leaveChannel() {
    this.clearPendingTimers();
    this.engine?.leaveChannel();
  }

  protected releaseRtcEngine() {
    this.clearPendingTimers();
    releaseVideoEffectResources(this.engine, this.videoEffectObject);
    this.videoEffectObject = undefined;
    this.engine?.unregisterEventHandler(this);
    this.engine?.release();
  }

  onLeaveChannel(connection: RtcConnection, stats: RtcStats) {
    this.info('onLeaveChannel', 'connection', connection, 'stats', stats);
    this.setState({
      joinChannelSuccess: false,
      remoteUsers: [],
    });
  }

  createVideoEffectObject = () => {
    const { preparedBundlePath } = this.state;
    if (!preparedBundlePath) {
      return;
    }

    const videoEffectObject = this.engine?.createVideoEffectObject(
      preparedBundlePath,
      MediaSourceType.PrimaryCameraSource
    ) as IVideoEffectObject | undefined;

    if (!isVideoEffectObjectHandleValid(videoEffectObject)) {
      this.error('createVideoEffectObject failed');
      return;
    }

    this.videoEffectObject = videoEffectObject;
    this.setState({
      hasVideoEffectObject: true,
    });
  };

  destroyVideoEffectObject = () => {
    this.clearPendingTimers();
    destroyVideoEffectObjectResource(this.engine, this.videoEffectObject);
    this.videoEffectObject = undefined;
    this.setState({
      appliedBeautyOptions: null,
      appliedBeautyTemplate: null,
      appliedFilterStrength: null,
      appliedFilterTemplate: null,
      appliedStickerTemplate: null,
      appliedStyleIntensity: null,
      appliedStyleMakeupTemplate: null,
      hasVideoEffectObject: false,
    });
  };

  applyBeauty = () => {
    const { beautyOptions, selectedBeautyTemplate } = this.state;
    if (!this.videoEffectObject || !selectedBeautyTemplate) {
      return;
    }

    const applyResult = this.videoEffectObject.addOrUpdateVideoEffect(
      VideoEffectNodeId.Beauty,
      selectedBeautyTemplate?.templateName ?? ''
    );
    this.handleSdkResult('addOrUpdateVideoEffect(Beauty)', applyResult);
    if (!isVideoEffectSdkResultSuccess(applyResult)) {
      return;
    }
    this.applyOperations(this.buildBeautyOperations(beautyOptions));
    this.setState({
      appliedBeautyOptions: beautyOptions,
      appliedBeautyTemplate: selectedBeautyTemplate,
    });
  };

  removeBeauty = () => {
    this.clearBeautyRefreshTimer();
    this.clearBeautyUpdateTimer();
    const removeResult = this.removeVideoEffectNode(
      VideoEffectNodeId.Beauty,
      'Beauty'
    );
    if (!isVideoEffectSdkResultSuccess(removeResult)) {
      return;
    }
    this.setState({
      appliedBeautyOptions: null,
      appliedBeautyTemplate: null,
    });
  };

  saveBeauty = () => {
    const { appliedBeautyTemplate } = this.state;
    if (!this.videoEffectObject || !appliedBeautyTemplate) {
      return;
    }

    const saveResult = this.videoEffectObject.performVideoEffectAction(
      VideoEffectNodeId.Beauty,
      VideoEffectAction.Save
    );
    this.handleSdkResult('performVideoEffectAction(Save)', saveResult);
    if (!isVideoEffectSdkResultSuccess(saveResult)) {
      return;
    }
    this.scheduleBeautyRefresh(appliedBeautyTemplate);
  };

  resetBeauty = () => {
    const { appliedBeautyTemplate } = this.state;
    if (!this.videoEffectObject || !appliedBeautyTemplate) {
      return;
    }

    const resetResult = this.videoEffectObject.performVideoEffectAction(
      VideoEffectNodeId.Beauty,
      VideoEffectAction.Reset
    );
    this.handleSdkResult('performVideoEffectAction(Reset)', resetResult);
    if (!isVideoEffectSdkResultSuccess(resetResult)) {
      return;
    }
    this.scheduleBeautyRefresh(appliedBeautyTemplate);
  };

  applyStyleMakeup = () => {
    const { selectedStyleMakeupTemplate, styleIntensity } = this.state;
    if (!this.videoEffectObject || !selectedStyleMakeupTemplate) {
      return;
    }

    const applyResult = this.videoEffectObject.addOrUpdateVideoEffect(
      VideoEffectNodeId.StyleMakeup,
      selectedStyleMakeupTemplate?.templateName ?? ''
    );
    this.handleSdkResult('addOrUpdateVideoEffect(StyleMakeup)', applyResult);
    if (!isVideoEffectSdkResultSuccess(applyResult)) {
      return;
    }
    this.applyOperations(
      buildStyleEffectOperations('style_makeup_option', styleIntensity)
    );
    this.setState({
      appliedStyleIntensity: styleIntensity,
      appliedStyleMakeupTemplate: selectedStyleMakeupTemplate,
    });
  };

  removeStyleMakeup = () => {
    this.clearStyleUpdateTimer();
    const removeResult = this.removeVideoEffectNode(
      VideoEffectNodeId.StyleMakeup,
      'StyleMakeup'
    );
    if (!isVideoEffectSdkResultSuccess(removeResult)) {
      return;
    }
    this.setState({
      appliedStyleIntensity: null,
      appliedStyleMakeupTemplate: null,
    });
  };

  applyFilter = () => {
    const { filterStrength, selectedFilterTemplate } = this.state;
    if (!this.videoEffectObject || !selectedFilterTemplate) {
      return;
    }

    const applyResult = this.videoEffectObject.addOrUpdateVideoEffect(
      VideoEffectNodeId.Filter,
      selectedFilterTemplate?.templateName ?? ''
    );
    this.handleSdkResult('addOrUpdateVideoEffect(Filter)', applyResult);
    if (!isVideoEffectSdkResultSuccess(applyResult)) {
      return;
    }
    this.applyOperations(
      buildStyleEffectOperations('filter_effect_option', filterStrength)
    );
    this.setState({
      appliedFilterStrength: filterStrength,
      appliedFilterTemplate: selectedFilterTemplate,
    });
  };

  removeFilter = () => {
    this.clearFilterUpdateTimer();
    const removeResult = this.removeVideoEffectNode(
      VideoEffectNodeId.Filter,
      'Filter'
    );
    if (!isVideoEffectSdkResultSuccess(removeResult)) {
      return;
    }
    this.setState({
      appliedFilterStrength: null,
      appliedFilterTemplate: null,
    });
  };

  applySticker = () => {
    const { selectedStickerTemplate } = this.state;
    if (!this.videoEffectObject || !selectedStickerTemplate) {
      return;
    }

    const applyResult = this.videoEffectObject.addOrUpdateVideoEffect(
      VideoEffectNodeId.Sticker,
      selectedStickerTemplate?.templateName ?? ''
    );
    this.handleSdkResult('addOrUpdateVideoEffect(Sticker)', applyResult);
    if (!isVideoEffectSdkResultSuccess(applyResult)) {
      return;
    }
    this.setState({ appliedStickerTemplate: selectedStickerTemplate });
  };

  removeSticker = () => {
    const removeResult = this.removeVideoEffectNode(
      VideoEffectNodeId.Sticker,
      'Sticker'
    );
    if (!isVideoEffectSdkResultSuccess(removeResult)) {
      return;
    }
    this.setState({ appliedStickerTemplate: null });
  };

  protected renderConfiguration(): ReactElement | undefined {
    const {
      appliedBeautyOptions,
      appliedBeautyTemplate,
      appliedFilterStrength,
      appliedFilterTemplate,
      appliedStickerTemplate,
      appliedStyleIntensity,
      appliedStyleMakeupTemplate,
      beautyOptions,
      bundleError,
      bundleStatus,
      filterStrength,
      hasVideoEffectObject,
      preparedBundlePath,
      selectedBeautyTemplate,
      selectedFilterTemplate,
      selectedStickerTemplate,
      selectedStyleMakeupTemplate,
      styleIntensity,
      templateGroups,
    } = this.state;

    const controlsDisabled = !hasVideoEffectObject;
    const beautyApplied = Boolean(appliedBeautyTemplate);
    const displayedBeautyOptions = getDisplayValueForSelectedTemplate(
      selectedBeautyTemplate,
      appliedBeautyTemplate,
      beautyOptions,
      appliedBeautyOptions
    );
    const displayedFilterStrength = getDisplayValueForSelectedTemplate(
      selectedFilterTemplate,
      appliedFilterTemplate,
      filterStrength,
      appliedFilterStrength
    );
    const filterApplied = Boolean(appliedFilterTemplate);
    const bundleStatusText =
      bundleStatus === 'failed'
        ? `Bundle status: failed${bundleError ? ` (${bundleError})` : ''}`
        : `Bundle status: ${bundleStatus}`;
    const displayedStyleIntensity = getDisplayValueForSelectedTemplate(
      selectedStyleMakeupTemplate,
      appliedStyleMakeupTemplate,
      styleIntensity,
      appliedStyleIntensity
    );
    const styleMakeupApplied = Boolean(appliedStyleMakeupTemplate);
    const stickerApplied = Boolean(appliedStickerTemplate);

    return (
      <>
        <AgoraText style={styles.sectionTitle}>Bundle</AgoraText>
        <AgoraText>{bundleStatusText}</AgoraText>
        <AgoraDivider />
        <AgoraButton
          disabled={!preparedBundlePath || hasVideoEffectObject}
          onPress={this.createVideoEffectObject}
          title={'Create Effect Object'}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={!hasVideoEffectObject}
          onPress={this.destroyVideoEffectObject}
          title={'Destroy Effect Object'}
        />
        <AgoraDivider />

        <AgoraText style={styles.sectionTitle}>Beauty</AgoraText>
        <AgoraDropdown
          enabled={hasVideoEffectObject && templateGroups.beauty.length > 0}
          items={getTemplateItems(templateGroups.beauty)}
          onValueChange={(templateName) => {
            this.selectBeautyTemplate(templateName);
          }}
          title={'Beauty template'}
          value={selectedBeautyTemplate?.templateName}
        />
        {this.renderSelectedTemplateStatus(
          selectedBeautyTemplate,
          appliedBeautyTemplate
        )}
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !selectedBeautyTemplate}
          onPress={this.applyBeauty}
          title={'Apply Beauty'}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !beautyApplied}
          onPress={this.removeBeauty}
          title={'Remove Beauty'}
        />
        <AgoraDivider />
        <VideoEffectSlider
          disabled={controlsDisabled}
          maximumValue={1}
          minimumValue={0}
          onSlidingComplete={(value) => {
            this.updateBeautyOptions({ smoothness: value }, 'commit');
          }}
          onValueChange={(value) => {
            this.updateBeautyOptions({ smoothness: value }, 'throttled');
          }}
          step={0.1}
          title={`smoothness ${displayedBeautyOptions.smoothness}`}
          value={displayedBeautyOptions.smoothness}
        />
        <AgoraDivider />
        <VideoEffectSlider
          disabled={controlsDisabled}
          maximumValue={1}
          minimumValue={0}
          onSlidingComplete={(value) => {
            this.updateBeautyOptions({ lightness: value }, 'commit');
          }}
          onValueChange={(value) => {
            this.updateBeautyOptions({ lightness: value }, 'throttled');
          }}
          step={0.1}
          title={`lightness ${displayedBeautyOptions.lightness}`}
          value={displayedBeautyOptions.lightness}
        />
        <AgoraDivider />
        <VideoEffectSlider
          disabled={controlsDisabled}
          maximumValue={1}
          minimumValue={0}
          onSlidingComplete={(value) => {
            this.updateBeautyOptions({ redness: value }, 'commit');
          }}
          onValueChange={(value) => {
            this.updateBeautyOptions({ redness: value }, 'throttled');
          }}
          step={0.1}
          title={`redness ${displayedBeautyOptions.redness}`}
          value={displayedBeautyOptions.redness}
        />
        <AgoraDivider />
        <VideoEffectSlider
          disabled={controlsDisabled}
          maximumValue={1}
          minimumValue={0}
          onSlidingComplete={(value) => {
            this.updateBeautyOptions({ eyePouch: value }, 'commit');
          }}
          onValueChange={(value) => {
            this.updateBeautyOptions({ eyePouch: value }, 'throttled');
          }}
          step={0.1}
          title={`eye_pouch ${displayedBeautyOptions.eyePouch}`}
          value={displayedBeautyOptions.eyePouch}
        />
        <AgoraDivider />
        <AgoraDropdown
          enabled={hasVideoEffectObject}
          items={FACE_STYLE_ITEMS}
          onValueChange={(faceStyle) => {
            this.updateBeautyOptions({ faceStyle }, 'commit');
          }}
          title={'faceStyle'}
          value={displayedBeautyOptions.faceStyle}
        />
        <AgoraDivider />
        <VideoEffectSlider
          disabled={controlsDisabled}
          maximumValue={100}
          minimumValue={0}
          onSlidingComplete={(value) => {
            this.updateBeautyOptions({ faceIntensity: value }, 'commit');
          }}
          onValueChange={(value) => {
            this.updateBeautyOptions({ faceIntensity: value }, 'throttled');
          }}
          step={1}
          title={`faceIntensity ${displayedBeautyOptions.faceIntensity}`}
          value={displayedBeautyOptions.faceIntensity}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !beautyApplied}
          onPress={this.saveBeauty}
          title={'Save'}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !beautyApplied}
          onPress={this.resetBeauty}
          title={'Reset'}
        />
        <AgoraDivider />

        <AgoraText style={styles.sectionTitle}>Style Makeup</AgoraText>
        <AgoraText style={styles.supportingText}>
          Style Makeup and Filter remain independently controllable here to
          match the Electron VideoEffect sample.
        </AgoraText>
        <AgoraDropdown
          enabled={
            hasVideoEffectObject && templateGroups.styleMakeup.length > 0
          }
          items={getTemplateItems(templateGroups.styleMakeup)}
          onValueChange={(templateName) => {
            this.selectStyleMakeupTemplate(templateName);
          }}
          title={'Style Makeup template'}
          value={selectedStyleMakeupTemplate?.templateName}
        />
        {this.renderSelectedTemplateStatus(
          selectedStyleMakeupTemplate,
          appliedStyleMakeupTemplate
        )}
        <AgoraDivider />
        <VideoEffectSlider
          disabled={controlsDisabled}
          maximumValue={1}
          minimumValue={0}
          onSlidingComplete={(value) => {
            this.updateStyleIntensity(value, 'commit');
          }}
          onValueChange={(value) => {
            this.updateStyleIntensity(value, 'throttled');
          }}
          step={0.1}
          title={`styleIntensity ${displayedStyleIntensity}`}
          value={displayedStyleIntensity}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !selectedStyleMakeupTemplate}
          onPress={this.applyStyleMakeup}
          title={'Apply Style Makeup'}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !styleMakeupApplied}
          onPress={this.removeStyleMakeup}
          title={'Remove Style Makeup'}
        />
        <AgoraDivider />

        <AgoraText style={styles.sectionTitle}>Filter</AgoraText>
        <AgoraDropdown
          enabled={hasVideoEffectObject && templateGroups.filter.length > 0}
          items={getTemplateItems(templateGroups.filter)}
          onValueChange={(templateName) => {
            this.selectFilterTemplate(templateName);
          }}
          title={'Filter template'}
          value={selectedFilterTemplate?.templateName}
        />
        {this.renderSelectedTemplateStatus(
          selectedFilterTemplate,
          appliedFilterTemplate
        )}
        <AgoraDivider />
        <VideoEffectSlider
          disabled={controlsDisabled}
          maximumValue={1}
          minimumValue={0}
          onSlidingComplete={(value) => {
            this.updateFilterStrength(value, 'commit');
          }}
          onValueChange={(value) => {
            this.updateFilterStrength(value, 'throttled');
          }}
          step={0.1}
          title={`strength ${displayedFilterStrength}`}
          value={displayedFilterStrength}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !selectedFilterTemplate}
          onPress={this.applyFilter}
          title={'Apply Filter'}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !filterApplied}
          onPress={this.removeFilter}
          title={'Remove Filter'}
        />
        <AgoraDivider />

        <AgoraText style={styles.sectionTitle}>Sticker</AgoraText>
        <AgoraDropdown
          enabled={hasVideoEffectObject && templateGroups.sticker.length > 0}
          items={getTemplateItems(templateGroups.sticker)}
          onValueChange={(templateName) => {
            this.setState({
              selectedStickerTemplate: findTemplateOptionByName(
                templateGroups.sticker,
                templateName
              ),
            });
          }}
          title={'Sticker template'}
          value={selectedStickerTemplate?.templateName}
        />
        {this.renderSelectedTemplateStatus(
          selectedStickerTemplate,
          appliedStickerTemplate
        )}
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !selectedStickerTemplate}
          onPress={this.applySticker}
          title={'Apply Sticker'}
        />
        <AgoraDivider />
        <AgoraButton
          disabled={controlsDisabled || !stickerApplied}
          onPress={this.removeSticker}
          title={'Remove Sticker'}
        />
      </>
    );
  }

  protected renderAction(): ReactElement | undefined {
    return undefined;
  }

  private async prepareBundleResources() {
    try {
      const prepared = await prepareVideoEffectBundle();
      const loaded = await loadBundleTemplateGroupsAndInitialBeautyOptions(
        prepared.preparedBundlePath
      );
      const selectedStyleMakeupTemplate =
        loaded.templateGroups.styleMakeup[0] ?? null;
      const selectedFilterTemplate = loaded.templateGroups.filter[0] ?? null;
      const selectedStickerTemplate = loaded.templateGroups.sticker[0] ?? null;
      const [styleIntensity, filterStrength] = await Promise.all([
        this.readTemplateNumberOption(
          prepared.preparedBundlePath,
          selectedStyleMakeupTemplate,
          'style_makeup_option',
          'styleIntensity',
          STYLE_INTENSITY_FALLBACK
        ),
        this.readTemplateNumberOption(
          prepared.preparedBundlePath,
          selectedFilterTemplate,
          'filter_effect_option',
          'strength',
          FILTER_STRENGTH_FALLBACK
        ),
      ]);

      if (!this.isMountedFlag) {
        return;
      }

      this.setState({
        beautyOptions: loaded.initialBeautyOptions,
        bundleError: undefined,
        bundleStatus: 'ready',
        filterStrength,
        preparedBundlePath: prepared.preparedBundlePath,
        selectedBeautyTemplate: loaded.selectedBeautyTemplate,
        selectedFilterTemplate,
        selectedStickerTemplate,
        selectedStyleMakeupTemplate,
        styleIntensity,
        templateGroups: loaded.templateGroups,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Unknown bundle preparation error';

      if (!this.isMountedFlag) {
        return;
      }

      this.error('prepareVideoEffectBundle failed', message);
      this.setState({
        bundleError: message,
        bundleStatus: 'failed',
        preparedBundlePath: undefined,
      });
    }
  }

  private applyBeautyOptions(options: SdkDrivenBeautyOptions) {
    this.applyOperations(this.buildBeautyOperations(options));
  }

  private applyOperations(operations: VideoEffectOperation[]) {
    if (!this.videoEffectObject) {
      return;
    }

    operations.forEach((operation) => {
      let result: number | undefined;
      switch (operation.kind) {
        case 'bool':
          result = this.videoEffectObject?.setVideoEffectBoolParam(
            operation.option,
            operation.key,
            operation.value as boolean
          );
          break;
        case 'float':
          result = this.videoEffectObject?.setVideoEffectFloatParam(
            operation.option,
            operation.key,
            operation.value as number
          );
          break;
        case 'int':
          result = this.videoEffectObject?.setVideoEffectIntParam(
            operation.option,
            operation.key,
            operation.value as number
          );
          break;
      }

      this.handleSdkResult(`${operation.option}.${operation.key}`, result);
    });
  }

  private buildBeautyOperations(
    options: SdkDrivenBeautyOptions
  ): VideoEffectOperation[] {
    return [
      {
        key: 'smoothness',
        kind: 'float',
        option: 'beauty_effect_option',
        value: options.smoothness,
      },
      {
        key: 'lightness',
        kind: 'float',
        option: 'beauty_effect_option',
        value: options.lightness,
      },
      {
        key: 'redness',
        kind: 'float',
        option: 'beauty_effect_option',
        value: options.redness,
      },
      {
        key: 'eye_pouch',
        kind: 'float',
        option: 'face_buffing_option',
        value: options.eyePouch,
      },
      {
        key: 'style',
        kind: 'int',
        option: 'face_shape_beauty_option',
        value: options.faceStyle,
      },
      {
        key: 'intensity',
        kind: 'int',
        option: 'face_shape_beauty_option',
        value: options.faceIntensity,
      },
    ];
  }

  private clearBeautyRefreshTimer() {
    if (this.beautyRefreshTimer) {
      clearTimeout(this.beautyRefreshTimer);
      this.beautyRefreshTimer = undefined;
    }
  }

  private clearBeautyUpdateTimer() {
    if (this.beautyUpdateTimer) {
      clearTimeout(this.beautyUpdateTimer);
      this.beautyUpdateTimer = undefined;
    }
  }

  private clearFilterUpdateTimer() {
    if (this.filterUpdateTimer) {
      clearTimeout(this.filterUpdateTimer);
      this.filterUpdateTimer = undefined;
    }
  }

  private clearPendingTimers() {
    this.clearBeautyRefreshTimer();
    this.clearBeautyUpdateTimer();
    this.clearFilterUpdateTimer();
    this.clearStyleUpdateTimer();
  }

  private handleSdkResult(action: string, result: number | undefined) {
    if (typeof result === 'number' && result < 0) {
      this.error(`${action} failed: ${result}`);
    }
  }

  private removeVideoEffectNode(nodeId: number, label: string) {
    const removeResult = this.videoEffectObject?.removeVideoEffect(nodeId);
    this.handleSdkResult(`removeVideoEffect(${label})`, removeResult);
    return removeResult;
  }

  private async readTemplateNumberOption(
    bundlePath: string,
    template: BundleTemplateOption | null,
    option: string,
    key: string,
    fallback: number
  ) {
    if (!template) {
      return fallback;
    }

    try {
      const config = await readBundleTemplateConfig(
        bundlePath,
        template.relativePath
      );
      const optionConfig = config?.[option] as
        | Record<string, unknown>
        | undefined;
      const value = optionConfig?.[key];
      return typeof value === 'number' ? value : fallback;
    } catch (error) {
      this.warn('readTemplateNumberOption failed', option, key, error);
      return fallback;
    }
  }

  private clearStyleUpdateTimer() {
    if (this.styleUpdateTimer) {
      clearTimeout(this.styleUpdateTimer);
      this.styleUpdateTimer = undefined;
    }
  }

  private isAppliedTemplateSelected(
    selectedTemplate: BundleTemplateOption | null,
    appliedTemplate: BundleTemplateOption | null
  ) {
    return isSameTemplateOption(selectedTemplate, appliedTemplate);
  }

  private renderSelectedTemplateStatus(
    selectedTemplate: BundleTemplateOption | null,
    appliedTemplate: BundleTemplateOption | null
  ) {
    if (!appliedTemplate) {
      return undefined;
    }

    const statusText = this.isAppliedTemplateSelected(
      selectedTemplate,
      appliedTemplate
    )
      ? `Applied template: ${appliedTemplate.label}`
      : `Applied template: ${appliedTemplate.label}. Press Apply to switch from the current selection.`;

    return <AgoraText style={styles.supportingText}>{statusText}</AgoraText>;
  }

  private scheduleBeautyRefresh(appliedBeautyTemplate: BundleTemplateOption) {
    const { preparedBundlePath } = this.state;
    if (!preparedBundlePath) {
      return;
    }

    this.clearBeautyRefreshTimer();

    this.beautyRefreshTimer = setTimeout(async () => {
      this.beautyRefreshTimer = undefined;
      try {
        await syncSavedConfigCacheForBundle(preparedBundlePath, [
          appliedBeautyTemplate.relativePath,
        ]);
        const beautyConfig = await readBundleTemplateConfig(
          preparedBundlePath,
          appliedBeautyTemplate.relativePath
        );
        const beautyOptions =
          extractSdkDrivenBeautyOptionsFromConfig(beautyConfig);

        if (!this.isMountedFlag) {
          return;
        }
        if (
          !this.isAppliedTemplateSelected(
            this.state.appliedBeautyTemplate,
            appliedBeautyTemplate
          )
        ) {
          return;
        }

        const nextState: Pick<State, 'appliedBeautyOptions' | 'beautyOptions'> =
          {
            appliedBeautyOptions: beautyOptions,
            beautyOptions: this.isAppliedTemplateSelected(
              this.state.selectedBeautyTemplate,
              appliedBeautyTemplate
            )
              ? beautyOptions
              : this.state.beautyOptions,
          };

        this.setState(nextState);
      } catch (error) {
        this.warn('scheduleBeautyRefresh failed', error);
      }
    }, SAVE_RESET_REFRESH_MS);
  }

  private async selectBeautyTemplate(templateName: string) {
    const {
      appliedBeautyOptions,
      appliedBeautyTemplate,
      beautyOptions,
      preparedBundlePath,
      templateGroups,
    } = this.state;
    const selectedBeautyTemplate = findTemplateOptionByName(
      templateGroups.beauty,
      templateName
    );

    if (!preparedBundlePath || !selectedBeautyTemplate) {
      this.setState({ selectedBeautyTemplate });
      return;
    }

    if (
      this.isAppliedTemplateSelected(
        selectedBeautyTemplate,
        appliedBeautyTemplate
      )
    ) {
      this.setState({
        beautyOptions: appliedBeautyOptions ?? beautyOptions,
        selectedBeautyTemplate,
      });
      return;
    }

    try {
      const beautyConfig = await readBundleTemplateConfig(
        preparedBundlePath,
        selectedBeautyTemplate.relativePath
      );
      const loadedBeautyOptions =
        extractSdkDrivenBeautyOptionsFromConfig(beautyConfig);

      if (!this.isMountedFlag) {
        return;
      }

      this.setState({
        beautyOptions: loadedBeautyOptions,
        selectedBeautyTemplate,
      });
    } catch (error) {
      this.warn('selectBeautyTemplate failed', error);
      if (!this.isMountedFlag) {
        return;
      }
      this.setState({ selectedBeautyTemplate });
    }
  }

  private async selectFilterTemplate(templateName: string) {
    const {
      appliedFilterStrength,
      appliedFilterTemplate,
      filterStrength,
      preparedBundlePath,
      templateGroups,
    } = this.state;
    const selectedFilterTemplate = findTemplateOptionByName(
      templateGroups.filter,
      templateName
    );
    const nextFilterStrength =
      preparedBundlePath &&
      !this.isAppliedTemplateSelected(
        selectedFilterTemplate,
        appliedFilterTemplate
      )
        ? await this.readTemplateNumberOption(
            preparedBundlePath,
            selectedFilterTemplate,
            'filter_effect_option',
            'strength',
            FILTER_STRENGTH_FALLBACK
          )
        : filterStrength;

    if (!this.isMountedFlag) {
      return;
    }

    this.setState({
      filterStrength:
        this.isAppliedTemplateSelected(
          selectedFilterTemplate,
          appliedFilterTemplate
        ) && appliedFilterStrength !== null
          ? appliedFilterStrength
          : nextFilterStrength,
      selectedFilterTemplate,
    });
  }

  private async selectStyleMakeupTemplate(templateName: string) {
    const {
      appliedStyleIntensity,
      appliedStyleMakeupTemplate,
      preparedBundlePath,
      styleIntensity,
      templateGroups,
    } = this.state;
    const selectedStyleMakeupTemplate = findTemplateOptionByName(
      templateGroups.styleMakeup,
      templateName
    );
    const nextStyleIntensity =
      preparedBundlePath &&
      !this.isAppliedTemplateSelected(
        selectedStyleMakeupTemplate,
        appliedStyleMakeupTemplate
      )
        ? await this.readTemplateNumberOption(
            preparedBundlePath,
            selectedStyleMakeupTemplate,
            'style_makeup_option',
            'styleIntensity',
            STYLE_INTENSITY_FALLBACK
          )
        : styleIntensity;

    if (!this.isMountedFlag) {
      return;
    }

    this.setState({
      selectedStyleMakeupTemplate,
      styleIntensity:
        this.isAppliedTemplateSelected(
          selectedStyleMakeupTemplate,
          appliedStyleMakeupTemplate
        ) && appliedStyleIntensity !== null
          ? appliedStyleIntensity
          : nextStyleIntensity,
    });
  }

  private updateBeautyOptions(
    patch: Partial<SdkDrivenBeautyOptions>,
    mode: 'commit' | 'throttled'
  ) {
    const isUpdatingAppliedTemplate =
      Boolean(this.videoEffectObject) &&
      Boolean(this.state.appliedBeautyTemplate) &&
      this.isAppliedTemplateSelected(
        this.state.selectedBeautyTemplate,
        this.state.appliedBeautyTemplate
      );
    const nextOptions = {
      ...this.state.beautyOptions,
      ...patch,
    };
    this.setState({
      appliedBeautyOptions: isUpdatingAppliedTemplate
        ? nextOptions
        : this.state.appliedBeautyOptions,
      beautyOptions: nextOptions,
    });

    if (!isUpdatingAppliedTemplate) {
      return;
    }

    if (mode === 'throttled') {
      this.clearBeautyUpdateTimer();
      this.beautyUpdateTimer = setTimeout(() => {
        this.beautyUpdateTimer = undefined;
        this.applyBeautyOptions(nextOptions);
      }, THROTTLE_MS);
      return;
    }

    this.clearBeautyUpdateTimer();
    this.applyBeautyOptions(nextOptions);
  }

  private updateFilterStrength(
    filterStrength: number,
    mode: 'commit' | 'throttled'
  ) {
    const isUpdatingAppliedTemplate =
      Boolean(this.videoEffectObject) &&
      Boolean(this.state.appliedFilterTemplate) &&
      this.isAppliedTemplateSelected(
        this.state.selectedFilterTemplate,
        this.state.appliedFilterTemplate
      );
    this.setState({
      appliedFilterStrength: isUpdatingAppliedTemplate
        ? filterStrength
        : this.state.appliedFilterStrength,
      filterStrength,
    });
    if (!isUpdatingAppliedTemplate) {
      return;
    }

    if (mode === 'throttled') {
      this.clearFilterUpdateTimer();
      this.filterUpdateTimer = setTimeout(() => {
        this.filterUpdateTimer = undefined;
        this.applyOperations(
          buildStyleEffectOperations('filter_effect_option', filterStrength)
        );
      }, THROTTLE_MS);
      return;
    }

    this.clearFilterUpdateTimer();
    this.applyOperations(
      buildStyleEffectOperations('filter_effect_option', filterStrength)
    );
  }

  private updateStyleIntensity(
    styleIntensity: number,
    mode: 'commit' | 'throttled'
  ) {
    const isUpdatingAppliedTemplate =
      Boolean(this.videoEffectObject) &&
      Boolean(this.state.appliedStyleMakeupTemplate) &&
      this.isAppliedTemplateSelected(
        this.state.selectedStyleMakeupTemplate,
        this.state.appliedStyleMakeupTemplate
      );
    this.setState({
      appliedStyleIntensity: isUpdatingAppliedTemplate
        ? styleIntensity
        : this.state.appliedStyleIntensity,
      styleIntensity,
    });
    if (!isUpdatingAppliedTemplate) {
      return;
    }

    if (mode === 'throttled') {
      this.clearStyleUpdateTimer();
      this.styleUpdateTimer = setTimeout(() => {
        this.styleUpdateTimer = undefined;
        this.applyOperations(
          buildStyleEffectOperations('style_makeup_option', styleIntensity)
        );
      }, THROTTLE_MS);
      return;
    }

    this.clearStyleUpdateTimer();
    this.applyOperations(
      buildStyleEffectOperations('style_makeup_option', styleIntensity)
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  supportingText: {
    color: '#666666',
    marginBottom: 8,
  },
});
