"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_native_1 = require("react-native");
/**
 * Import RCTAgoraView from native binding.
 *
 * This @object is used to bridge native layer between react layer.
 */
const RCTAgoraView = react_native_1.requireNativeComponent("RCTAgoraVideoView");
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
class AgoraView extends react_1.default.Component {
    /**
     * render
     *
     * It would render view for VideoStream
     */
    render() {
        return (react_1.default.createElement(RCTAgoraView, Object.assign({}, this.getHTMLProps())));
    }
    /**
     * getHTMLProps
     *
     * get agora view props
     */
    getHTMLProps() {
        let htmlProps = {};
        for (let key in this.props) {
            htmlProps[key] = this.props[key];
        }
        // convert uint32 to int32 for android
        if (react_native_1.Platform.OS === 'android') {
            const int32 = new Int32Array(1);
            int32[0] = htmlProps.remoteUid;
            htmlProps.remoteUid = int32[0];
        }
        return htmlProps;
    }
}
exports.default = AgoraView;
//# sourceMappingURL=AgoraView.native.js.map