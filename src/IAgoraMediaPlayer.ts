import { PlayerStreamInfo, MediaPlayerState } from './AgoraMediaPlayerTypes';
import { RenderModeType, AudioDualMonoMode } from './AgoraMediaBase';
import { IMediaPlayerSourceObserver } from './IAgoraMediaPlayerSource';
import { SpatialAudioParams } from './AgoraBase';

/*
 * This class provides media player functions and supports multiple instances.
 */
export abstract class IMediaPlayer {
  /*
   * Gets the ID of the media player.
   *
   * @returns
   * ≥ 0: Success. The ID of the media player.
   * < 0: Failure.
   */
  abstract getMediaPlayerId(): number;

  /*
   * Opens the media resource.
   *
   * @param url The path of the media file. Both local path and online path are supported.On the Android platform, the URI format is not supported.
   *
   * @param startPos The starting position (ms) for playback. Default value is 0.
   */
  abstract open(url: string, startPos: number): number;

  /*
   * Plays the media file.
   * After calling open or seek, you can call this method to play the media file.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract play(): number;

  /*
   * Pauses the playback.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract pause(): number;

  /*
   * Stops playing the media track.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract stop(): number;

  /*
   * Resumes playing the media file.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract resume(): number;

  /*
   * Seeks to a new playback position.
   * After successfully calling this method, you will receive the onPlayerEvent callback, reporting the result of the seek operation to the new playback position.
   * To play the media file from a specific position, do the following:
   * Call this method to seek to the position you want to begin playback.
   * Call the play method to play the media file.
   *
   * @param newPos The new playback position (ms).
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract seek(newPos: number): number;

  /*
   * Sets the pitch of the current media resource.
   * Call this method after calling open .
   *
   * @param pitch Sets the pitch of the local music file by the chromatic scale. The default value is 0, which means keeping the original pitch. The value ranges from -12 to 12, and the pitch value between consecutive values is a chromatic value. The greater the absolute value of this parameter, the higher or lower the pitch of the local music file.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract setAudioPitch(pitch: number): number;

  /*
   * Gets the duration of the media resource.
   *
   * @returns
   * The total duration (ms) of the media file.
   */
  abstract getDuration(): number;

  /*
   * Gets current local playback progress.
   *
   * @returns
   * Returns the current playback progress (ms) if the call succeeds.
   * < 0: Failure. See MediaPlayerError .
   */
  abstract getPlayPosition(): number;

  /*
   * Gets the number of the media streams in the media resource.
   * Call this method after calling open .
   *
   * @returns
   * The number of the media streams in the media resource if the method call succeeds.
   * < 0: Failure. See MediaPlayerError .
   */
  abstract getStreamCount(): number;

  /*
   * Gets the detailed information of the media stream.
   * Call this method after calling getStreamCount .
   *
   * @param index The index of the media stream.
   *
   * @returns
   * If the call succeeds, returns the detailed information of the media stream. See PlayerStreamInfo .
   * If the call fails, returns NULL.
   */
  abstract getStreamInfo(index: number): PlayerStreamInfo;

  /*
   * Sets the loop playback.
   * If you want to loop, call this method and set the number of the loops.
   * When the loop finishes, the SDK triggers onPlayerSourceStateChanged and reports the playback state as PlayerStatePlaybackAllLoopsCompleted.
   *
   * @param loopCount The number of times the audio effect loops:
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract setLoopCount(loopCount: number): number;

  /*
   * @ignore
   */
  abstract muteAudio(audioMute: boolean): number;

  /*
   * @ignore
   */
  abstract isAudioMuted(): boolean;

  /*
   * @ignore
   */
  abstract muteVideo(videoMute: boolean): number;

  /*
   * @ignore
   */
  abstract isVideoMuted(): boolean;

  /*
   * @ignore
   */
  abstract setPlaybackSpeed(speed: number): number;

  /*
   * @ignore
   */
  abstract selectAudioTrack(index: number): number;

  /*
   * @ignore
   */
  abstract takeScreenshot(filename: string): number;

  /*
   * @ignore
   */
  abstract selectInternalSubtitle(index: number): number;

  /*
   * @ignore
   */
  abstract setExternalSubtitle(url: string): number;

  /*
   * Gets current playback state.
   *
   * @returns
   * The current playback state. See MediaPlayerState .
   */
  abstract getState(): MediaPlayerState;

  /*
   * Sets whether to mute the media file.
   *
   * @param mute Whether to mute the media file:
   *  true: Mute the media file.
   *  false: (Default) Unmute the media file.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract mute(mute: boolean): number;

  /*
   * Reports whether the media resource is muted.
   *
   * @returns
   * true: Reports whether the media resource is muted.
   * false: Reports whether the media resource is muted.
   */
  abstract getMute(): boolean;

  /*
   * Adjusts the local playback volume.
   *
   * @param volume The local playback volume, which ranges from 0 to 100:
   *  0: Mute.
   *  100: (Default) The original volume.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract adjustPlayoutVolume(volume: number): number;

  /*
   * Gets the local playback volume.
   *
   * @returns
   * The local playback volume, which ranges from 0 to 100.
   * 0: Mute.
   * 100: (Default) The original volume.
   */
  abstract getPlayoutVolume(): number;

  /*
   * Adjusts the volume of the media file for publishing.
   * After connected to the Agora server, you can call this method to adjust the volume of the media file heard by the remote user.
   *
   * @param volume The volume, which ranges from 0 to 400:
   *  0: Mute.
   *  100: (Default) The original volume.
   *  400: Four times the original volume (amplifying the audio signals by four times).
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract adjustPublishSignalVolume(volume: number): number;

  /*
   * Gets the volume of the media file for publishing.
   *
   * @returns
   * ≥ 0: The remote playback volume.
   * < 0: Failure.
   */
  abstract getPublishSignalVolume(): number;

  /*
   * Sets the view.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract setView(view: any): number;

  /*
   * Sets the render mode of the media player.
   *
   * @param renderMode Sets the render mode of the view. See RenderModeType .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract setRenderMode(renderMode: RenderModeType): number;

  /*
   * Registers a media player observer.
   *
   * @param observer The player observer, listening for events during the playback. See IMediaPlayerSourceObserver .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract registerPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  /*
   * Releases a media player observer.
   *
   * @param observer The player observer, listening for events during the playback. See IMediaPlayerSourceObserver .
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract unregisterPlayerSourceObserver(
    observer: IMediaPlayerSourceObserver
  ): number;

  /*
   * @ignore
   */
  abstract setAudioDualMonoMode(mode: AudioDualMonoMode): number;

  /*
   * @ignore
   */
  abstract getPlayerSdkVersion(): string;

  /*
   * @ignore
   */
  abstract getPlaySrc(): string;

  /*
   * Opens the media resource, and requests all the CDN routes of the media resources through the self-developed scheduling center.
   * After you call this method, Agora opens the media resources and tries to obtain all the CDN routes for playing the media resource. By default, Agora uses the first CDN route for playing, and you can call the switchAgoraCDNLineByIndex method to switch routes.
   * If you want to improve the security of the connection and the privacy of media files, contact to determine the sign and the ts fields for authentication. Once the fields are determined, use them as the query parameter of the URL to update the URL of the media resource. For example:
   * The URL of the media file to be opened :rtmp://$domain/$appName/$streamName.
   * The URL updated by the authentication of the media file to be opened: rtmp://$domain/$appName/$streamName?ts=$ts&sign=$sign Authentication information:
   * sign: An encrypted string calculated according to the MD5 algorithm based on authKey, appName, streamName and ts. You need to for your authKey.
   * ts: The timestamp when the authentication information expires. You can set the validity period of the authentication information according to your scenarios. For example, 24h or 1h30m20s.
   *
   * @param src The URL of the media resource.
   *
   * @param startPos The starting position (ms) for playback. The default value is 0. This value can be empty if the media resource to be played is live streams.
   */
  abstract openWithAgoraCDNSrc(src: string, startPos: number): number;

  /*
   * Gets the number of CDN routes for the media resource.
   *
   * @returns
   * > 0: Success. Returns the number of CDN routes for the media resource.
   * ≤ 0: Failure.
   */
  abstract getAgoraCDNLineCount(): number;

  /*
   * Changes the CDN route for playing the media resource.
   * After calling openWithAgoraCDNSrc to open the media resource, you can call this method if you want to change the CDN routes for playing the media resource. Call this method after calling openWithAgoraCDNSrc .
   * You can call this method either before or after play . If you call this method before play, the switch does not take effect immediately. The SDK waits for the playback to complete before switching the CDN line of the media resource.
   *
   * @param index The index of the CDN routes.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract switchAgoraCDNLineByIndex(index: number): number;

  /*
   * Gets the CDN routes index of the current media resource.
   *
   * @returns
   * ≥ 0: Success. Returns the number of CDN routes for the media resource. The value range is [0, getAgoraCDNLineCount()).
   * < 0: Failure.
   */
  abstract getCurrentAgoraCDNIndex(): number;

  /*
   * Enables/Disables the automatic switch of the CDN routes for playing the media resource.
   * You can call this method if you want the SDK to automatically switch the CDN routes according to your network conditions. Call this method before openWithAgoraCDNSrc .
   *
   * @param enable Whether to enable the automatic switch of the CDN routes for playing the media resource:
   *  true: Enables the automatic switch of the CDN routes.
   *  false: (Default) Disables the automatic switch of the CDN routes.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract enableAutoSwitchAgoraCDN(enable: boolean): number;

  /*
   * Renew the authentication information for the URL of the media resource to be played.
   * When the authentication information expires (exceeds the ts field), you can call the openWithAgoraCDNSrc method to reopen the media resource or the switchAgoraCDNSrc method to switch the media resource, and then pass in the authenticated URL (with the ts field updated) of the media resource.
   * If your authentication information expires when you call the ( switchAgoraCDNLineByIndex ) to switch the CDN route for playing the media resource, you need to call this method to pass in the updated authentication information to update the authentication information of the media resource URL. After updating the authentication information, you need to call switchAgoraCDNLineByIndex to complete the route switching. To avoid frequent expiration of authentication information, ensure that you set the ts field appropriately or according to the scenario requirements.
   *
   * @param token The authentication field. See the sign field of the authentication information.
   *
   * @param ts The timestamp when the authentication information expires. See the ts field of the authentication information.
   */
  abstract renewAgoraCDNSrcToken(token: string, ts: number): number;

  /*
   * Switches the media resource being played.
   * If you want to improve the security of the connection and the privacy of media files, contact to determine the sign and the ts fields for authentication. Once the fields are determined, use them as the query parameter of the URL to update the URL of the media resource. For example:
   * The URL of the media file to be opened :rtmp://$domain/$appName/$streamName.
   * The URL updated by the authentication of the media file to be opened: rtmp://$domain/$appName/$streamName?ts=$ts&sign=$sign Authentication information:
   * sign: An encrypted string calculated according to the MD5 algorithm based on authKey, appName, streamName and ts. You need to for your authKey.
   * ts: The timestamp when the authentication information expires. You can set the validity period of the authentication information according to your scenarios. For example, 24h or 1h30m20s. If you want to customize the CDN routes for playing the media resource, call this method to switch media resources. Agora changes the CDN route through the self-developed scheduling center to improve the viewing experience. If you do not need to customize CDN routes for playing the media resource, call the switchSrc method to switch media resources.
   * Call this method after calling openWithAgoraCDNSrc .
   * You can call this method either before or after play . If you call this method before play, the SDK waits for you to call play before completing the route switch.
   *
   * @param src The URL of the media resource.
   *
   * @param syncPts Whether to synchronize the playback position (ms) before and after the switch:
   *  true: Synchronize the playback position before and after the switch.
   *  false: (Default) Do not synchronize the playback position before and after the switch. falseMake sure to set this parameter as if you need to play live streams, or the switch fails. If you need to play on-demand streams, you can set the value of this parameter according to your scenarios.
   */
  abstract switchAgoraCDNSrc(src: string, syncPts?: boolean): number;

  /*
   * Switches the media resource being played.
   * You can call this method to switch the media resource to be played according to the current network status. For example:
   * When the network is poor, the media resource to be played is switched to a media resource address with a lower bitrate.
   * When the network is good, the media resource to be played is switched to a media resource address with a higher bitrate. After calling this method, if you receive the PlayerEventSwitchComplete event in the onPlayerEvent callback, the switch is successful; If you receive the PlayerEventSwitchError event in the onPlayerEvent callback, the switch fails.
   * If you want to customize CDN routes for playing the media resource, call the switchAgoraCDNSrc method to switch media resources. Agora changes the CDN route through the self-developed scheduling center to improve the viewing experience. If you do not need to customize CDN routes for playing the media resource, call the switchSrc method to switch media resources. Ensure that you call this method after open .
   * To ensure normal playback, pay attention to the following when calling this method:
   * Do not call this method when playback is paused.
   * Do not call the seek method during switching.
   * Before switching the media resource, make sure that the playback position does not exceed the total duration of the media resource to be switched.
   *
   * @param syncPts Whether to synchronize the playback position (ms) before and after the switch:
   *  true: Synchronize the playback position before and after the switch.
   *  false: (Default) Do not synchronize the playback position before and after the switch. falseMake sure to set this parameter as if you need to play live streams, or the switch fails. If you need to play on-demand streams, you can set the value of this parameter according to your scenarios.
   *
   * @param src The URL of the media resource.
   */
  abstract switchSrc(src: string, syncPts?: boolean): number;

  /*
   * Preloads a media resource.
   * You can call this method to preload a media resource into the playlist. If you need to preload multiple media resources, you can call this method multiple times.
   * After calling this method, if you receive the PlayerPreloadEventComplete event in the onPreloadEvent callback, the preload is successful; If you receive the PlayerPreloadEventError event in the onPreloadEvent callback, the preload fails.
   * If the preload is successful and you want to play the media resource, call playPreloadedSrc ; if you want to clear the playlist, call stop . Agora does not support preloading duplicate media resources to the playlist. However, you can preload the media resources that are being played to the playlist again.
   *
   * @param src The URL of the media resource.
   *
   * @param startPos The starting position (ms) for playing after the media resource is preloaded to the playlist. When preloading a live stream, set this parameter to 0.
   */
  abstract preloadSrc(src: string, startPos: number): number;

  /*
   * Plays preloaded media resources.
   * After calling the preloadSrc method to preload the media resource into the playlist, you can call this method to play the preloaded media resource. After calling this method, if you receive the onPlayerSourceStateChanged callback which reports the PlayerStatePlaying state, the playback is successful.
   * If you want to change the preloaded media resource to be played, you can call this method again and specify the URL of the new media resource that you want to preload. If you want to replay the media resource, you need to call preloadSrc to preload the media resource to the playlist again before playing. If you want to clear the playlist, call the stop method. If you call this method when playback is paused, this method does not take effect until playback is resumed.
   *
   * @param src The URL of the media resource in the playlist must be consistent with the src set by the preloadSrc method; otherwise, the media resource cannot be played.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract playPreloadedSrc(src: string): number;

  /*
   * Unloads media resources that are preloaded.
   * This method cannot release the media resource being played.
   *
   * @param src The URL of the media resource.
   *
   * @returns
   * 0: Success.
   * < 0: Failure.
   */
  abstract unloadSrc(src: string): number;

  /*
   * @ignore
   */
  abstract setSpatialAudioParams(params: SpatialAudioParams): number;

  /*
   * @ignore
   */
  abstract setPlayerOptionInInt(key: string, value: number): number;

  /*
   * @ignore
   */
  abstract setPlayerOptionInString(key: string, value: string): number;
}
