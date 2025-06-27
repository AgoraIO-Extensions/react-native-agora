import { Platform } from 'react-native';
import { createCheckers } from 'ts-interface-checker';

import { VideoViewSetupMode } from '../AgoraBase';
import { RtcRendererViewProps } from '../AgoraRtcRenderView';
import {
  AgoraPip,
  AgoraPipOptions,
  AgoraPipStateChangedObserver,
} from '../IAgoraPip';
import { IAgoraPipEvent } from '../extension/IAgoraPipExtension';
import AgoraRtcNg from '../specs';
import IAgoraPipTI from '../ti/IAgoraPip-ti';

import { getParams } from './IAgoraRtcRenderView';
import {
  DeviceEventEmitter,
  EVENT_TYPE,
  EventProcessor,
} from './IrisApiEngine';

const checkers = createCheckers(IAgoraPipTI);

export function processAgoraPipObserver(
  handler: AgoraPipStateChangedObserver,
  event: string,
  jsonParams: any
) {
  switch (event) {
    case 'onPipStateChanged':
      if (handler.onPipStateChanged !== undefined) {
        handler.onPipStateChanged(jsonParams.state, jsonParams.error);
      }
      break;
  }
}

export class AgoraPipInternal implements AgoraPip {
  static _agora_pip_observers: AgoraPipStateChangedObserver[] = [];
  private _pipSubViews: RtcRendererViewProps[] = [];
  private _pipContentView: number = 0;

  pipIsSupported(): boolean {
    return AgoraRtcNg.pipIsSupported();
  }
  pipIsAutoEnterSupported(): boolean {
    return AgoraRtcNg.pipIsAutoEnterSupported();
  }
  isPipActivated(): boolean {
    return AgoraRtcNg.isPipActivated();
  }
  pipSetup(options: AgoraPipOptions): boolean {
    if (typeof options === 'object') {
      if (Platform.OS === 'ios') {
        return this.pipSetupForIos(options);
      } else {
        return AgoraRtcNg.pipSetup(options);
      }
    } else {
      return false;
    }
  }
  pipStart(): boolean {
    return AgoraRtcNg.pipStart();
  }
  pipStop(): void {
    AgoraRtcNg.pipStop();
  }
  pipDispose(): void {
    AgoraRtcNg.pipDispose();
    if (Platform.OS === 'ios') {
      this.disposeAllNativeViews();
    }
  }

  private disposeAllNativeViews() {
    if (this._pipSubViews.length > 0) {
      this._pipSubViews.forEach((videoStream) => {
        this.disposeNativeViewByVideoStream(videoStream);
      });
      this._pipSubViews = [];
      if (this._pipContentView !== 0) {
        AgoraRtcNg.nativeViewDestroy({ viewId: this._pipContentView });
        this._pipContentView = 0;
      }
    }
  }

  private disposeNativeViewByVideoStream(videoStream: RtcRendererViewProps) {
    videoStream.canvas.setupMode = VideoViewSetupMode.VideoViewSetupRemove;
    AgoraRtcNg.callApi(getParams(videoStream));
    AgoraRtcNg.nativeViewDestroy({ viewId: videoStream.canvas.view });
  }

  private pipSetupForIos(options: AgoraPipOptions): boolean {
    if (this._pipContentView === 0) {
      this._pipContentView = AgoraRtcNg.nativeViewCreate();
    }
    if (options.videoStreams && options.videoStreams.length > 0) {
      // 1. find items to remove in _pipSubViews (not in new videoStreams)
      const toRemove = this._pipSubViews.filter(
        (subView) =>
          !options.videoStreams!.some(
            (stream) => stream.canvas.uid === subView.canvas.uid
          )
      );

      // remove not needed views
      toRemove.forEach((item) => {
        this.disposeNativeViewByVideoStream(item);
        const index = this._pipSubViews.findIndex(
          (sv) => sv.canvas.uid === item.canvas.uid
        );
        if (index !== -1) {
          this._pipSubViews.splice(index, 1);
        }
      });

      // 2. process each videoStream
      for (let index = 0; index < options.videoStreams.length; index++) {
        const videoStream = options.videoStreams[index];
        if (!videoStream) {
          continue;
        }
        // find if exist same uid view
        const existingViewIndex = this._pipSubViews.findIndex(
          (sv) => sv.canvas.uid === videoStream.canvas.uid
        );

        if (existingViewIndex !== -1) {
          // exist, keep view value, update other properties
          const existingView =
            this._pipSubViews?.[existingViewIndex]?.canvas.view;
          if (existingView) {
            videoStream.canvas.view = existingView;
          }
          // currently, we do not update other properties of the view
          this._pipSubViews[existingViewIndex] = videoStream;
        } else {
          // not exist, create new view
          videoStream.canvas.view = AgoraRtcNg.nativeViewCreate();
          this._pipSubViews.push(videoStream);
          // set view params
          AgoraRtcNg.callApi(getParams(videoStream));
        }
        // set parent view
        AgoraRtcNg.nativeViewSetParent({
          viewId: videoStream.canvas.view,
          parentViewId: this._pipContentView,
          indexOfParentView: index,
        });
      }

      // // set content view layout
      AgoraRtcNg.nativeViewSetLayout({
        viewId: this._pipContentView,
        layout: options.contentViewLayout,
      });
    }

    options.contentView = this._pipContentView;
    return AgoraRtcNg.pipSetup(options);
  }

  release() {
    AgoraPipInternal._agora_pip_observers = [];
    this.removeAllListeners();
    this.pipDispose();
  }

  _addListenerPreCheck<EventType extends keyof IAgoraPipEvent>(
    eventType: EventType
  ): boolean {
    if (
      checkers.AgoraPipStateChangedObserver?.strictTest({
        [eventType]: undefined,
      })
    ) {
      if (AgoraPipInternal._agora_pip_observers.length === 0) {
        console.error(
          'Please call `registerPipObserver` before you want to receive event by `addListener`'
        );
        return false;
      }
    }
    return true;
  }

  addListener<EventType extends keyof IAgoraPipEvent>(
    eventType: EventType,
    listener: IAgoraPipEvent[EventType]
  ): void {
    this._addListenerPreCheck(eventType);
    const callback = (eventProcessor: EventProcessor<any>, data: any) => {
      if (eventProcessor.type(data) !== EVENT_TYPE.IAgoraPip) {
        return;
      }
      eventProcessor.func.map((it) => {
        it({ [eventType]: listener }, eventType, data);
      });
    };
    // @ts-ignore
    listener!.agoraCallback = callback;
    DeviceEventEmitter.addListener(eventType, callback);
  }

  removeListener<EventType extends keyof IAgoraPipEvent>(
    eventType: EventType,
    listener?: IAgoraPipEvent[EventType]
  ) {
    DeviceEventEmitter.removeListener(
      eventType,
      // @ts-ignore
      listener?.agoraCallback ?? listener
    );
  }

  removeAllListeners<EventType extends keyof IAgoraPipEvent>(
    eventType?: EventType
  ) {
    DeviceEventEmitter.removeAllListeners(eventType);
  }

  registerPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void {
    if (
      !AgoraPipInternal._agora_pip_observers.find((value) => value === observer)
    ) {
      AgoraPipInternal._agora_pip_observers.push(observer);
    }
  }

  unregisterPipStateChangedObserver(
    observer: AgoraPipStateChangedObserver
  ): void {
    AgoraPipInternal._agora_pip_observers =
      AgoraPipInternal._agora_pip_observers.filter(
        (value) => value !== observer
      );
  }
}
