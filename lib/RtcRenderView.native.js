"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const react_native_1 = require("react-native");
const RCTRtcSurfaceView = react_native_1.requireNativeComponent('RCTAgoraRtcSurfaceView');
class RtcSurfaceView extends react_1.Component {
    render() {
        return (react_1.default.createElement(RCTRtcSurfaceView, Object.assign({}, this.props)));
    }
}
const RCTRtcTextureView = react_native_1.requireNativeComponent('RCTAgoraRtcTextureView');
class RtcTextureView extends react_1.Component {
    render() {
        return (react_1.default.createElement(RCTRtcTextureView, Object.assign({}, this.props)));
    }
}
var RtcPreviewView;
(function (RtcPreviewView) {
    class SurfaceView extends react_1.Component {
        render() {
            return (react_1.default.createElement(RtcSurfaceView, Object.assign({}, this.props, { uid: 0 })));
        }
    }
    RtcPreviewView.SurfaceView = SurfaceView;
    class TextureView extends react_1.Component {
        render() {
            return (react_1.default.createElement(RtcTextureView, Object.assign({}, this.props, { uid: 0 })));
        }
    }
    RtcPreviewView.TextureView = TextureView;
})(RtcPreviewView = exports.RtcPreviewView || (exports.RtcPreviewView = {}));
var RtcRemoteView;
(function (RtcRemoteView) {
    class SurfaceView extends react_1.Component {
        render() {
            return (react_1.default.createElement(RtcSurfaceView, Object.assign({}, this.props)));
        }
    }
    RtcRemoteView.SurfaceView = SurfaceView;
    class TextureView extends react_1.Component {
        render() {
            return (react_1.default.createElement(RtcTextureView, Object.assign({}, this.props)));
        }
    }
    RtcRemoteView.TextureView = TextureView;
})(RtcRemoteView = exports.RtcRemoteView || (exports.RtcRemoteView = {}));
//# sourceMappingURL=RtcRenderView.native.js.map