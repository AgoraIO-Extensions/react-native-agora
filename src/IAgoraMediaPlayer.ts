import { PlayerStreamInfo, MediaPlayerState } from './AgoraMediaPlayerTypes';
import { RenderModeType, AudioDualMonoMode } from './AgoraMediaBase';
import { IMediaPlayerSourceObserver } from './IAgoraMediaPlayerSource';
import { SpatialAudioParams } from './AgoraBase';

/*
 * 提供媒体播放器功能的类，支持多实例。
 */
export abstract class IMediaPlayer {
  /*
   * 获取播放器 ID。
   *
   * @returns
   * 方法调用成功，返回播放器 ID。
   * < 0: 方法调用失败。
   */
  abstract getMediaPlayerId(): number;

  /*
   * 打开媒体资源。
   *
   * @param url 设置媒体文件的路径，支持本地和在线文件。 Android 平台上，不支持 URI 格式。
   *
   * @param startPos 设置起始播放位置（毫秒），默认值为 0。
   */
  abstract open(url: string, startPos: number): number;

  /*
   * 播放媒体文件。
   * 调用 open 或 seek 后，你可以调用该方法播放媒体文件。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract play(): number;

  /*
   * 暂停播放。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract pause(): number;

  /*
   * 停止播放。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract stop(): number;

  /*
   * 暂停后恢复播放。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract resume(): number;

  /*
   * 定位到媒体文件的指定播放位置。
   * 成功调用该方法后，你会收到 onPlayerEvent 回调，报告当前播放器发生的事件，如定位开始、定位成功或定位失败。
   * 如果你想定位播放，请进行如下操作： 调用该方法定位。
   * 定位完成后，调用 play 方法播放。
   *
   * @param newPos 指定的位置（毫秒）。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract seek(newPos: number): number;

  /*
   * 调整当前播放的媒体资源的音调。
   * 你需要在调用 open 后调用该方法。
   *
   * @param pitch 按半音音阶调整本地播放的音乐文件的音调，默认值为 0，即不调整音调。取值范围为 [-12,12]，每相邻两个值的音高距离相差半音。取值的绝对值越大，音调升高或降低得越多。
   *
   * @returns
   * 0: 方法调用成功
   * < 0: 方法调用失败
   */
  abstract setAudioPitch(pitch: number): number;

  /*
   * 获取媒体文件总时长。
   *
   * @returns
   * 媒体文件总时长（毫秒）。
   */
  abstract getDuration(): number;

  /*
   * 获取当前播放进度。
   *
   * @returns
   * 方法调用成功，返回当前播放进度（毫秒）。
   * < 0: 方法调用失败，详见 MediaPlayerError 。
   */
  abstract getPlayPosition(): number;

  /*
   * 获取当前媒体文件中媒体流的数量。
   * 你需要在 open 后调用该方法。
   *
   * @returns
   * 方法调用成功，返回该媒体文件中媒体流的数量。
   * < 0: 方法调用失败，详见 MediaPlayerError 。
   */
  abstract getStreamCount(): number;

  /*
   * 通过媒体流的索引值获取媒体流信息。
   * 你需要在 getStreamCount 后调用该方法。
   *
   * @param index 媒体流索引值。
   *
   * @returns
   * 方法调用成功，返回媒体流信息，详见 PlayerStreamInfo 。
   * 方法调用失败，返回 NULL。
   */
  abstract getStreamInfo(index: number): PlayerStreamInfo;

  /*
   * 设置循环播放。
   * 如果你希望循环播放，请调用该方法并设置循环播放次数。
   * 循环播放结束时，SDK 会触发 onPlayerSourceStateChanged 回调，向你报告播放状态为 PlayerStatePlaybackAllLoopsCompleted。
   *
   * @param loopCount 循环播放的次数。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setLoopCount(loopCount: number): number;

  /*
   * TODO(doc)
   */
  abstract muteAudio(audioMute: boolean): number;

  /*
   * TODO(doc)
   */
  abstract isAudioMuted(): boolean;

  /*
   * TODO(doc)
   */
  abstract muteVideo(videoMute: boolean): number;

  /*
   * TODO(doc)
   */
  abstract isVideoMuted(): boolean;

  /*
   * TODO(doc)
   */
  abstract setPlaybackSpeed(speed: number): number;

  /*
   * 指定当前音频文件的播放音轨。
   * 获取音频文件的音轨索引后，你可以调用该方法指定任一音轨进行播放。例如，如果一个多音轨文件的不同音轨存放了不同语言的歌曲，则你可以调用该方法设置播放语言。
   * 你需要在调用 getStreamInfo 获取音频流索引值后调用该方法。
   *
   * @param index 音轨的索引值。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract selectAudioTrack(index: number): number;

  /*
   * TODO(doc)
   */
  abstract takeScreenshot(filename: string): number;

  /*
   * TODO(doc)
   */
  abstract selectInternalSubtitle(index: number): number;

  /*
   * TODO(doc)
   */
  abstract setExternalSubtitle(url: string): number;

  /*
   * 获取播放器当前状态。
   *
   * @returns
   * 播放器当前状态，详见 MediaPlayerState 。
   */
  abstract getState(): MediaPlayerState;

  /*
   * 设置是否静音。
   *
   * @param mute 静音选项。 true：静音。
   *  false：（默认）不静音。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract mute(mute: boolean): number;

  /*
   * 获取当前播放的媒体文件是否静音。
   *
   * @returns
   * true：当前播放的媒体文件为静音。
   * false：当前播放的媒体文件没有静音。
   */
  abstract getMute(): boolean;

  /*
   * 调节本地播放音量。
   *
   * @param volume 本地播放音量，取值范围从 0 到 100： 0: 无声。
   *  100: （默认）媒体文件的原始播放音量。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract adjustPlayoutVolume(volume: number): number;

  /*
   * 获取当前本地播放音量。
   *
   * @returns
   * 返回当前本地播放音量，取值范围从 0 到 100： 0: 无声。
   * 100: （默认）媒体文件的原始播放音量。
   */
  abstract getPlayoutVolume(): number;

  /*
   * 调节远端用户听到的音量。
   * 连接到 Agora 服务器后，你可以调用该方法，调节远端用户听到的媒体文件的音量。
   *
   * @param volume 信号音量，取值范围从 0 到 400： 0: 无声。
   *  100: （默认）媒体文件的原始音量。
   *  400: 原始音量的四倍（自带溢出保护）。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract adjustPublishSignalVolume(volume: number): number;

  /*
   * 获取远端用户听到的音量。
   *
   * @returns
   * ≥ 0: 播放文件的远端播放音量。
   * < 0: 方法调用失败。
   */
  abstract getPublishSignalVolume(): number;

  /*
   * 设置播放器渲染视图。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setView(view: any): number;

  /*
   * 设置播放器视图的渲染模式。
   *
   * @param renderMode 播放器视图的渲染模式。详见 RenderModeType 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setRenderMode(renderMode: RenderModeType): number;

  /*
   * 注册一个播放观测器。
   *
   * @param observer 播放观测器，报告播放中的事件，详见 IMediaPlayerSourceObserver 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract registerPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  /*
   * 取消注册播放观测器。
   *
   * @param observer 播放观测器，报告播放中的事件，详见 IMediaPlayerSourceObserver 。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract unregisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  /*
   * TODO(doc)
   */
  abstract setAudioDualMonoMode(mode: AudioDualMonoMode): number;

  /*
   * TODO(doc)
   */
  abstract getPlayerSdkVersion(): string;

  /*
   * TODO(doc)
   */
  abstract getPlaySrc(): string;

  /*
   * 打开媒体资源，并通过自研调度中心请求媒体资源的所有 CDN 线路。
   * 调用该方法后，Agora 会打开媒体资源并通过自研调度中心请求媒体资源的所有 CDN 线路。Agora 默认使用第一个线路，你也可以通过 switchAgoraCDNLineByIndex 自行切换线路。
   * 如果你希望保障连接和播放媒体资源的安全性，你可以协商鉴权字段 (sign) 和鉴权过期时间 (ts)。确定字段后，请将其作为 URL 的 query parameter 以更新媒体资源的网路路径。例如： 媒体资源网络路径为 rtmp://$domain/$appName/$streamName
   * 通过鉴权信息更新过的媒体资源网络路径为 rtmp://$domain/$appName/$streamName?ts=$ts&sign=$sign 鉴权信息说明： sign : 通过 authKey + appName + streamName + ts 进行 md5 算法加密得出的鉴权字段。你需要咨询你的 authKey 字段内容。
   * ts : 鉴权过期时间。你可以指定再过多久鉴权过期。例如， 24h 或 1h30m20s。
   *
   * @param src 媒体资源的网络路径。
   *
   * @param startPos 设置起始播放位置 (毫秒)，默认值为 0。如果媒体资源为直播流，则无需赋值。
   */
  abstract openWithAgoraCDNSrc(src: string, startPos: number): number;

  /*
   * 获取媒体资源的 CDN 线路数量。
   *
   * @returns
   * > 0：方法调用成功，返回媒体资源的 CDN 线路数量。
   * ≤ 0：方法调用失败。
   */
  abstract getAgoraCDNLineCount(): number;

  /*
   * 切换媒体资源的 CDN 线路。
   * 通过 openWithAgoraCDNSrc 打开媒体资源后，如果你想切换媒体资源 CDN 线路，你可以调用该方法。 请在 openWithAgoraCDNSrc 后调用该方法。
   * 该方法在 play 前后均可调用。如果你在 play 前调用该方法，切换不会立即生效。SDK 会等待播放完成后再切换媒体资源的 CDN 线路。
   *
   * @param index CDN 线路索引。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract switchAgoraCDNLineByIndex(index: number): number;

  /*
   * 获取当前使用的媒体资源的 CDN 线路索引。
   *
   * @returns
   * ≥ 0: 方法调用成功，返回媒体资源的 CDN 线路索引。数值范围为 [0, getAgoraCDNLineCount())。
   * < 0: 方法调用失败。
   */
  abstract getCurrentAgoraCDNIndex(): number;

  /*
   * 开启/关闭自动切换媒体资源的 CDN 线路。
   * 如果你想设置 SDK 根据网络情况自动切换媒体资源 CDN 线路，你可以调用该方法。 请在 openWithAgoraCDNSrc 前调用该方法。
   *
   * @param enable 设置是否开启自动切换媒体资源的 CDN 线路: true：开启自动切换媒体资源的 CDN 线路。
   *  false：(默认) 关闭自动切换媒体资源的 CDN 线路。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract enableAutoSwitchAgoraCDN(enable: boolean): number;

  /*
   * 更新媒体资源网络路径的鉴权信息。
   * 当鉴权信息过期（超出 ts 时间）时，你可以调用 openWithAgoraCDNSrc 或 switchAgoraCDNSrc 重新打开或切换媒体资源，并传入带新鉴权信息（如更新 ts 字段内容）的媒体资源网络路径。
   * 如果你在切换媒体资源线路 ( switchAgoraCDNLineByIndex ) 时遇到鉴权信息过期，你需要调用该方法并传入新的鉴权信息，以更新该媒体资源网络路径的鉴权信息。更新鉴权信息后，你还需调用 switchAgoraCDNLineByIndex 才能完成线路切换。 为避免鉴权信息频繁过期，请务必根据场景需求设置合适的 ts 字段内容或。
   *
   * @param token 鉴权字段。即鉴权信息中的 sign 字段。
   *
   * @param ts 鉴权过期时间。即鉴权信息中的 ts 字段。
   */
  abstract renewAgoraCDNSrcToken(token: string, ts: number): number;

  /*
   * 切换媒体资源。
   * 如果你希望保障连接和播放媒体资源的安全性，你可以协商鉴权字段 (sign) 和鉴权过期时间 (ts)。确定字段后，请将其作为 URL 的 query parameter 以更新媒体资源的网路路径。例如： 媒体资源网络路径为 rtmp://$domain/$appName/$streamName
   * 通过鉴权信息更新过的媒体资源网络路径为 rtmp://$domain/$appName/$streamName?ts=$ts&sign=$sign 鉴权信息说明： sign : 通过 authKey + appName + streamName + ts 进行 md5 算法加密得出的鉴权字段。你需要咨询你的 authKey 字段内容。
   * ts : 鉴权过期时间。你可以指定再过多久鉴权过期。例如， 24h 或 1h30m20s。 如果用户需要自定义播放线路，你可以调用该方法实现媒体资源切换。Agora 会通过自研调度中心支持调度线路，提升观看用户体验。如果用户不需要自定义播放线路，你可以调用 switchSrc 实现媒体资源切换。
   * 请在 openWithAgoraCDNSrc 后调用该方法。
   * 该方法在 play 前后均可调用。如果你在 play 前调用该方法，SDK 会等你调用 play 后再完成线路切换。
   *
   * @param src 媒体资源的网络路径。
   *
   * @param syncPts 是否同步切换前后的起始播放位置:
   *  true：同步。
   *  false：(默认) 不同步。 如果媒体资源为直播流，你只能将该参数设置为 false，否则 SDK 切换媒体资源会失败。如果媒体资源为点播流，你可以根据场景需求对该参数赋值。
   */
  abstract switchAgoraCDNSrc(src: string, syncPts?: boolean): number;

  /*
   * 切换媒体资源。
   * 你可以根据当前网络状态调用该方法切换播放的媒体资源的码率。例如： 在网络较差时，将播放的媒体资源切换为较低码率的媒体资源地址。
   * 在网络较好时，将播放的媒体资源切换为较高码率的媒体资源地址。 调用该方法后，如果你收到 onPlayerEvent 回调报告事件 PlayerEventSwitchComplete，则媒体资源切换成功；如果你收到 onPlayerEvent 回调报告事件 PlayerEventSwitchError，则媒体资源切换失败。
   * 如果用户需要自定义播放线路，你可以调用 switchAgoraCDNSrc 实现媒体资源切换。Agora 会通过自研调度中心支持调度线路，提升观看用户体验。如果用户不需要自定义播放线路，你可以调用 switchSrc 实现媒体资源切换。 请确保在 open 之后调用该方法。
   * 为保证播放正常，请在调用该方法时注意如下： 不要在播放暂停时调用该方法。
   * 不要在切换码率过程中调用 seek 。
   * 确保切换码率前的播放位置不大于待切换的媒体资源总时长。
   *
   * @param syncPts 是否同步切换前后的起始播放位置:
   *  true：同步。
   *  false：(默认) 不同步。 如果媒体资源为直播流，你只能将该参数设置为 false，否则 SDK 切换媒体资源会失败。如果媒体资源为点播流，你可以根据场景需求对该参数赋值。
   *
   * @param src 媒体资源的网络路径。
   */
  abstract switchSrc(src: string, syncPts?: boolean): number;

  /*
   * 预加载媒体资源。
   * 你可以调用该方法将一个媒体资源预加载到播放列表中。如果需要预加载多个媒体资源，你可以多次调用该方法。
   * 调用该方法后，如果收到 onPreloadEvent 回调报告事件 PlayerPreloadEventComplete，则预加载成功；如果你收到 onPreloadEvent 回调报告事件 PlayerPreloadEventError，则预加载失败。
   * 预加载成功后，如果你想播放媒体资源，请调用 playPreloadedSrc ；如果你想清空播放列表，请调用 stop 。 Agora 不支持你预加载重复的媒体资源到播放列表，但支持你将正在播放的媒体资源再次预加载到播放列表。
   *
   * @param src 媒体资源的网络路径。
   *
   * @param startPos 预加载到播放列表后，开始播放时的起始位置（毫秒）。预加载直播流时，将该参数设置为 0。
   */
  abstract preloadSrc(src: string, startPos: number): number;

  /*
   * 播放预加载的媒体资源。
   * 调用 preloadSrc 方法将媒体资源预加载到播放列表后，可以调用该方法播放已预加载的媒体资源。调用该方法后，如果你收到 onPlayerSourceStateChanged 回调报告状态 PlayerStatePlaying，则表示播放成功。
   * 如果你想更换播放的预加载媒体资源，你可以再次调用该方法并指定新的媒体资源路径。如果你想重新播放媒体资源，你需要在播放前调用 preloadSrc 重新将该媒体资源预加载到播放列表。如果你想清空播放列表，请调用 stop 。 如果你在播放暂停时调用该方法，该方法会在恢复播放后才生效。
   *
   * @param src 播放列表中的媒体资源 URL 地址，必须与 preloadSrc 方法设置的 src 一致，否则无法播放。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract playPreloadedSrc(src: string): number;

  /*
   * 释放预加载的媒体资源。
   * 该方法不支持释放当前播放的媒体资源。
   *
   * @param src 媒体资源的网络路径。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract unloadSrc(src: string): number;

  /*
   * 开启或关闭媒体播放器的空间音效。
   * 成功设置媒体播放器的空间音效参数后，SDK 会开启媒体播放器的空间音效，即本地用户听媒体资源会有空间感。
   * 如果需关闭媒体播放器的空间音效，你需要将 params 参数设为空。
   *
   * @returns
   * 0: 方法调用成功。
   * < 0: 方法调用失败。
   */
  abstract setSpatialAudioParams(params: SpatialAudioParams): number;

  /*
   * TODO(doc)
   */
  abstract setPlayerOptionInInt(key: string, value: number): number;

  /*
   * TODO(doc)
   */
  abstract setPlayerOptionInString(key: string, value: string): number;
}
