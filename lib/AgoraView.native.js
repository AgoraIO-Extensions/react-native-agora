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
const RCTAgoraView = react_native_1.requireNativeComponent("RCTAgoraView");
/**
 * AgoraView is the render layer for rendering video stream
 *
 * This class is used to rendering native sdk stream
 *
 * @props {@link AgoraViewProps}
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
        return htmlProps;
    }
}
exports.default = AgoraView;
//# sourceMappingURL=AgoraView.native.js.map