import React from 'react';
import { AgoraViewProps } from "./types";
/**
 * AgoraView is the render layer for rendering video stream
 *
 * This class is used to rendering native sdk stream
 * @props {@link AgoraViewProps}
 *
 * @descrption AgoraViewProps has four properties.
 * @property mode: {@link AgoraViewMode}, this property will setup video render mode. You could see more [details](https://docs.agora.io/en/Interactive%20Broadcast/API%20Reference/java/classio_1_1agora_1_1rtc_1_1_rtc_engine.html#ac08882c4d0ec47b329900df169493673)
 * @property showLocalVideo: boolean, this property will render local video, NOTICE: IF YOU SET showLocalVideo YOU CANNOT SET remoteUid
 * @property remoteUid: number, this property will render video with remote uid, NOTICE: IF YOU SET remoteUid YOU CANNOT SET showLocalVideo
 * @property zOrderMediaOverlay: boolean, this property will working for android side and it likes zIndex behaviour on web side.
 *
 * @noInheritDoc
 */
export default class AgoraView extends React.Component<AgoraViewProps, {}, {}> {
    /**
     * render
     *
     * It would render view for VideoStream
     */
    render(): JSX.Element;
    /**
     * getHTMLProps
     *
     * get agora view props
     */
    private getHTMLProps;
}
