import './extension/IAgoraMediaPlayerExtension';
import { SpatialAudioParams } from './AgoraBase';
import {
  AudioDualMonoMode,
  IAudioPcmFrameSink,
  IAudioSpectrumObserver,
  RawAudioFrameOpModeType,
  RenderModeType,
  VideoFrame,
} from './AgoraMediaBase';
import {
  MediaPlayerState,
  MediaSource,
  PlayerStreamInfo,
} from './AgoraMediaPlayerTypes';
import { IMediaPlayerSourceObserver } from './IAgoraMediaPlayerSource';

/**
 * This class provides media player functions and supports multiple instances.
 */
export abstract class IMediaPlayer {
  /**
   * Gets the ID of the media player.
   *
   * @returns
   * ≥ 0: Success. The ID of the media player. < 0: Failure.
   */
  abstract getMediaPlayerId(): number;

  /**
   * Opens the media resource.
   *
   * If you need to play a media file, make sure you receive the onPlayerSourceStateChanged callback reporting PlayerStateOpenCompleted before calling the play method to play the file.
   *
   * @param url The path of the media file. Both local path and online path are supported.
   * @param startPos The starting position (ms) for playback. Default value is 0.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract open(url: string, startPos: number): number;

  /**
   * Opens a media file and configures the playback scenarios.
   *
   * This method supports opening media files of different sources, including a custom media source, and allows you to configure the playback scenarios.
   *
   * @param source Media resources. See MediaSource.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract openWithMediaSource(source: MediaSource): number;

  /**
   * Plays the media file.
   *
   * After calling open or seek , you can call this method to play the media file.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract play(): number;

  /**
   * Pauses the playback.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract pause(): number;

  /**
   * Stops playing the media track.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract stop(): number;

  /**
   * Resumes playing the media file.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract resume(): number;

  /**
   * Seeks to a new playback position.
   *
   * fter successfully calling this method, you will receive the onPlayerEvent callback, reporting the result of the seek operation to the new playback position. To play the media file from a specific position, do the following: Call this method to seek to the position you want to begin playback. Call the play method to play the media file.
   *
   * @param newPos The new playback position (ms).
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract seek(newPos: number): number;

  /**
   * Sets the pitch of the current media resource.
   *
   * Call this method after calling open .
   *
   * @param pitch Sets the pitch of the local music file by the chromatic scale. The default value is 0, which means keeping the original pitch. The value ranges from -12 to 12, and the pitch value between consecutive values is a chromatic value. The greater the absolute value of this parameter, the higher or lower the pitch of the local music file.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setAudioPitch(pitch: number): number;

  /**
   * Gets the duration of the media resource.
   *
   * @returns
   * The total duration (ms) of the media file.
   */
  abstract getDuration(): number;

  /**
   * Gets current local playback progress.
   *
   * @returns
   * Returns the current playback progress (ms) if the call succeeds. < 0: Failure. See MediaPlayerError .
   */
  abstract getPlayPosition(): number;

  /**
   * Gets the number of the media streams in the media resource.
   *
   * Call this method after calling open .
   *
   * @returns
   * The number of the media streams in the media resource if the method call succeeds. < 0: Failure. See MediaPlayerError .
   */
  abstract getStreamCount(): number;

  /**
   * Gets the detailed information of the media stream.
   *
   * Call this method after calling getStreamCount .
   *
   * @param index The index of the media stream.
   *
   * @returns
   * If the call succeeds, returns the detailed information of the media stream. See PlayerStreamInfo . If the call fails, returns NULL .
   */
  abstract getStreamInfo(index: number): PlayerStreamInfo;

  /**
   * Sets the loop playback.
   *
   * If you want to loop, call this method and set the number of the loops. When the loop finishes, the SDK triggers onPlayerSourceStateChanged and reports the playback state as PlayerStatePlaybackAllLoopsCompleted .
   *
   * @param loopCount The number of times the audio effect loops:
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setLoopCount(loopCount: number): number;

  /**
   * Sets the channel mode of the current audio file.
   *
   * Call this method after calling open .
   *
   * @param speed The playback speed. Agora recommends that you limit this value to between 50 and 400, defined as follows:50: Half the original speed.100: The original speed.400: 4 times the original speed.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setPlaybackSpeed(speed: number): number;

  /**
   * Selects the audio track used during playback.
   *
   * After getting the track index of the audio file, you can call this method to specify any track to play. For example, if different tracks of a multi-track file store songs in different languages, you can call this method to set the playback language. You need to call this method after calling getStreamInfo to get the audio stream index value.
   *
   * @param index The index of the audio track.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract selectAudioTrack(index: number): number;

  /**
   * @ignore
   */
  abstract setPlayerOptionInInt(key: string, value: number): number;

  /**
   * Sets the private options for the media player.
   *
   * The media player supports setting private options by key and value. Under normal circumstances, you do not need to know the private option settings, and just use the default option settings. Ensure that you call this method before open . If you need to push streams with SEI into the CDN, call setPlayerOptionInString ("sei_data_with_uuid", 1) ; otherwise, the loss of SEI might occurs.
   *
   * @param key The key of the option.
   * @param value The value of the key.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setPlayerOptionInString(key: string, value: string): number;

  /**
   * @ignore
   */
  abstract takeScreenshot(filename: string): number;

  /**
   * @ignore
   */
  abstract selectInternalSubtitle(index: number): number;

  /**
   * @ignore
   */
  abstract setExternalSubtitle(url: string): number;

  /**
   * Gets current playback state.
   *
   * @returns
   * The current playback state. See MediaPlayerState .
   */
  abstract getState(): MediaPlayerState;

  /**
   * Sets whether to mute the media file.
   *
   * @param muted Whether to mute the media file:true: Mute the media file.false: (Default) Unmute the media file.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract mute(muted: boolean): number;

  /**
   * Reports whether the media resource is muted.
   *
   * @returns
   * true : Reports whether the media resource is muted. false : Reports whether the media resource is muted.
   */
  abstract getMute(): boolean;

  /**
   * Adjusts the local playback volume.
   *
   * @param volume The local playback volume, which ranges from 0 to 100:0: Mute.100: (Default) The original volume.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract adjustPlayoutVolume(volume: number): number;

  /**
   * Gets the local playback volume.
   *
   * @returns
   * The local playback volume, which ranges from 0 to 100. 0: Mute. 100: (Default) The original volume.
   */
  abstract getPlayoutVolume(): number;

  /**
   * Adjusts the volume of the media file for publishing.
   *
   * After connected to the Agora server, you can call this method to adjust the volume of the media file heard by the remote user.
   *
   * @param volume The volume, which ranges from 0 to 400:0: Mute.100: (Default) The original volume.400: Four times the original volume (amplifying the audio signals by four times).
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract adjustPublishSignalVolume(volume: number): number;

  /**
   * Gets the volume of the media file for publishing.
   *
   * @returns
   * ≥ 0: The remote playback volume. < 0: Failure.
   */
  abstract getPublishSignalVolume(): number;

  /**
   * Sets the view.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setView(view: any): number;

  /**
   * Sets the render mode of the media player.
   *
   * @param renderMode Sets the render mode of the view. See RenderModeType.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setRenderMode(renderMode: RenderModeType): number;

  /**
   * Registers a media player observer.
   *
   * @param observer The player observer, listening for events during the playback. See IMediaPlayerSourceObserver.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract registerPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  /**
   * Releases a media player observer.
   *
   * @param observer The player observer, listening for events during the playback. See IMediaPlayerSourceObserver.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract unregisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  /**
   * Registers an audio frame observer object.
   *
   * @param observer The audio frame observer, reporting the reception of each audio frame. See IAudioPcmFrameSink.
   * @param mode The use mode of the audio frame. See RawAudioFrameOpModeType.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract registerAudioFrameObserver(
    observer: IAudioPcmFrameSink,
    mode?: RawAudioFrameOpModeType
  ): number;

  /**
   * Unregisters an audio frame observer.
   *
   * @param observer The audio observer. See IAudioPcmFrameSink.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract unregisterAudioFrameObserver(observer: IAudioPcmFrameSink): number;

  /**
   * Registers a video frame observer object.
   *
   * You need to implement the IMediaPlayerVideoFrameObserver class in this method and register callbacks according to your scenarios. After you successfully register the video frame observer, the SDK triggers the registered callbacks each time a video frame is received.
   *
   * @param observer The video observer, reporting the reception of each video frame. See IMediaPlayerVideoFrameObserver.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract registerVideoFrameObserver(
    observer: IMediaPlayerVideoFrameObserver
  ): number;

  /**
   * Unregisters the video frame observer.
   *
   * @param observer The video observer, reporting the reception of each video frame. See IMediaPlayerVideoFrameObserver.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract unregisterVideoFrameObserver(
    observer: IMediaPlayerVideoFrameObserver
  ): number;

  /**
   * @ignore
   */
  abstract registerMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver,
    intervalInMS: number
  ): number;

  /**
   * @ignore
   */
  abstract unregisterMediaPlayerAudioSpectrumObserver(
    observer: IAudioSpectrumObserver
  ): number;

  /**
   * Sets the channel mode of the current audio file.
   *
   * In a stereo music file, the left and right channels can store different audio data. According to your needs, you can set the channel mode to original mode, left channel mode, right channel mode, or mixed channel mode. For example, in the KTV scenario, the left channel of the music file stores the musical accompaniment, and the right channel stores the singing voice. If you only need to listen to the accompaniment, call this method to set the channel mode of the music file to left channel mode; if you need to listen to the accompaniment and the singing voice at the same time, call this method to set the channel mode to mixed channel mode. Call this method after calling open . This method only applies to stereo audio files.
   *
   * @param mode The channel mode. See AudioDualMonoMode.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setAudioDualMonoMode(mode: AudioDualMonoMode): number;

  /**
   * @ignore
   */
  abstract getPlayerSdkVersion(): string;

  /**
   * Gets the path of the media resource being played.
   *
   * @returns
   * The path of the media resource being played.
   */
  abstract getPlaySrc(): string;

  /**
   * @ignore
   */
  abstract openWithAgoraCDNSrc(src: string, startPos: number): number;

  /**
   * @ignore
   */
  abstract getAgoraCDNLineCount(): number;

  /**
   * @ignore
   */
  abstract switchAgoraCDNLineByIndex(index: number): number;

  /**
   * @ignore
   */
  abstract getCurrentAgoraCDNIndex(): number;

  /**
   * @ignore
   */
  abstract enableAutoSwitchAgoraCDN(enable: boolean): number;

  /**
   * @ignore
   */
  abstract renewAgoraCDNSrcToken(token: string, ts: number): number;

  /**
   * @ignore
   */
  abstract switchAgoraCDNSrc(src: string, syncPts?: boolean): number;

  /**
   * Switches the media resource being played.
   *
   * You can call this method to switch the media resource to be played according to the current network status. For example: When the network is poor, the media resource to be played is switched to a media resource address with a lower bitrate. When the network is good, the media resource to be played is switched to a media resource address with a higher bitrate. After calling this method, if you receive the PlayerEventSwitchComplete event in the onPlayerEvent callback, the switch is successful; If you receive the PlayerEventSwitchError event in the onPlayerEvent callback, the switch fails. Ensure that you call this method after open . To ensure normal playback, pay attention to the following when calling this method: Do not call this method when playback is paused. Do not call the seek method during switching. Before switching the media resource, make sure that the playback position does not exceed the total duration of the media resource to be switched.
   *
   * @param src The URL of the media resource.
   * @param syncPts Whether to synchronize the playback position (ms) before and after the switch:true: Synchronize the playback position before and after the switch.false: (Default) Do not synchronize the playback position before and after the switch.Make sure to set this parameter as false if you need to play live streams, or the switch fails. If you need to play on-demand streams, you can set the value of this parameter according to your scenarios.
   *
   * @returns
   * < 0: Failure.
   */
  abstract switchSrc(src: string, syncPts?: boolean): number;

  /**
   * Preloads a media resource.
   *
   * You can call this method to preload a media resource into the playlist. If you need to preload multiple media resources, you can call this method multiple times. After calling this method, if you receive the PlayerPreloadEventComplete event in the onPreloadEvent callback, the preload is successful; If you receive the PlayerPreloadEventError event in the onPreloadEvent callback, the preload fails. If the preload is successful and you want to play the media resource, call playPreloadedSrc ; if you want to clear the playlist, call stop . Agora does not support preloading duplicate media resources to the playlist. However, you can preload the media resources that are being played to the playlist again.
   *
   * @param src The URL of the media resource.
   * @param startPos The starting position (ms) for playing after the media resource is preloaded to the playlist. When preloading a live stream, set this parameter to 0.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract preloadSrc(src: string, startPos: number): number;

  /**
   * Plays preloaded media resources.
   *
   * After calling the preloadSrc method to preload the media resource into the playlist, you can call this method to play the preloaded media resource. After calling this method, if you receive the onPlayerSourceStateChanged callback which reports the PlayerStatePlaying state, the playback is successful. If you want to change the preloaded media resource to be played, you can call this method again and specify the URL of the new media resource that you want to preload. If you want to replay the media resource, you need to call preloadSrc to preload the media resource to the playlist again before playing. If you want to clear the playlist, call the stop method. If you call this method when playback is paused, this method does not take effect until playback is resumed.
   *
   * @param src The URL of the media resource in the playlist must be consistent with the src set by the preloadSrc method; otherwise, the media resource cannot be played.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract playPreloadedSrc(src: string): number;

  /**
   * Unloads media resources that are preloaded.
   *
   * This method cannot release the media resource being played.
   *
   * @param src The URL of the media resource.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract unloadSrc(src: string): number;

  /**
   * Enables or disables the spatial audio effect for the media player.
   *
   * After successfully setting the spatial audio effect parameters of the media player, the SDK enables the spatial audio effect for the media player, and the local user can hear the media resources with a sense of space. If you need to disable the spatial audio effect for the media player, set the params parameter to null.
   *
   * @returns
   * 0: Success. < 0: Failure.
   */
  abstract setSpatialAudioParams(params: SpatialAudioParams): number;

  /**
   * @ignore
   */
  abstract setSoundPositionParams(pan: number, gain: number): number;
}

/**
 * This class provides methods to manage cached media files.
 */
export abstract class IMediaPlayerCacheManager {
  /**
   * Deletes all cached media files in the media player.
   *
   * The cached media file currently being played will not be deleted.
   *
   * @returns
   * 0: Success. < 0: Failure. See MediaPlayerError .
   */
  abstract removeAllCaches(): number;

  /**
   * Deletes a cached media file that is the least recently used.
   *
   * You can call this method to delete a cached media file when the storage space for the cached files is about to reach its limit. After you call this method, the SDK deletes the cached media file that is least used. The cached media file currently being played will not be deleted.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract removeOldCache(): number;

  /**
   * Deletes a cached media file.
   *
   * The cached media file currently being played will not be deleted.
   *
   * @param uri The URI (Uniform Resource Identifier) of the media file to be deleted.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract removeCacheByUri(uri: string): number;

  /**
   * Sets the storage path for the media files that you want to cache.
   *
   * Make sure IRtcEngine is initialized before you call this method.
   *
   * @param path The absolute path of the media files to be cached. Ensure that the directory for the media files exists and is writable.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract setCacheDir(path: string): number;

  /**
   * Sets the maximum number of media files that can be cached.
   *
   * @param count The maximum number of media files that can be cached. The default value is 1,000.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract setMaxCacheFileCount(count: number): number;

  /**
   * Sets the maximum size of the aggregate storage space for cached media files.
   *
   * @param cacheSize The maximum size (bytes) of the aggregate storage space for cached media files. The default value is 1 GB.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract setMaxCacheFileSize(cacheSize: number): number;

  /**
   * Sets whether to delete cached media files automatically.
   *
   * If you enable this function to remove cached media files automatically, when the cached media files exceed either the number or size limit you set, the SDK automatically deletes the least recently used cache file.
   *
   * @param enable Whether to enable the SDK to delete cached media files automatically:true: Delete cached media files automatically.false: (Default) Do not delete cached media files automatically.
   *
   * @returns
   * 0: Success.
   *  < 0: Failure. See MediaPlayerError .
   */
  abstract enableAutoRemoveCache(enable: boolean): number;

  /**
   * Gets the storage path of the cached media files.
   *
   * If you have not called the setCacheDir method to set the storage path for the media files to be cached before calling this method, you get the default storage path used by the SDK.
   *
   * @param length An input parameter; the maximum length of the cache file storage path string.
   *
   * @returns
   * The call succeeds, and the SDK returns the storage path of the cached media files. < 0: Failure. See MediaPlayerError .
   */
  abstract getCacheDir(length: number): string;

  /**
   * Gets the maximum number of media files that can be cached.
   *
   * By default, the maximum number of media files that can be cached is 1,000.
   *
   * @returns
   * > 0: The call succeeds and returns the maximum number of media files that can be cached. < 0: Failure. See MediaPlayerError .
   */
  abstract getMaxCacheFileCount(): number;

  /**
   * Gets the maximum size of the aggregate storage space for cached media files.
   *
   * By default, the maximum size of the aggregate storage space for cached media files is 1 GB. You can call the setMaxCacheFileSize method to set the limit according to your scenarios.
   *
   * @returns
   * > 0: The call succeeds and returns the maximum size (in bytes) of the aggregate storage space for cached media files. < 0: Failure. See MediaPlayerError .
   */
  abstract getMaxCacheFileSize(): number;

  /**
   * Gets the number of media files that are cached.
   *
   * @returns
   * ≥ 0: The call succeeds and returns the number of media files that are cached. < 0: Failure. See MediaPlayerError .
   */
  abstract getCacheFileCount(): number;
}

/**
 * The video frame observer for the media player.
 */
export interface IMediaPlayerVideoFrameObserver {
  /**
   * Occurs each time the player receives a video frame.
   *
   * After registering the video frame observer, the callback occurs every time the player receives a video frame, reporting the detailed information of the video frame.
   *
   * @param frame Video frame information. See VideoFrame.
   */
  onFrame?(frame: VideoFrame): void;
}
