"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importDefault(require("react"));
const react_native_1 = require("react-native");
const RCTAgoraView = react_native_1.requireNativeComponent("RCTAgoraView");
/**
 * @class AgoraView
 */
class AgoraView extends react_1.default.Component {
    render() {
        return (react_1.default.createElement(RCTAgoraView, Object.assign({}, this.getHTMLProps())));
    }
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