import React from 'react';
import { AgoraViewProps } from "./types";
/**
 * AgoraView is the render layer for rendering video stream
 *
 * This class is used to rendering native sdk stream
 *
 * @props {@link AgoraViewProps}
 */
export default class AgoraView extends React.Component<AgoraViewProps> {
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
