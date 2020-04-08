"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const RtcEngine_native_1 = tslib_1.__importDefault(require("./RtcEngine.native"));
const RtcRenderView_native_1 = require("./RtcRenderView.native");
exports.RtcPreviewView = RtcRenderView_native_1.RtcPreviewView;
exports.RtcRemoteView = RtcRenderView_native_1.RtcRemoteView;
const Types = tslib_1.__importStar(require("./Types"));
exports.Types = Types;
exports.default = RtcEngine_native_1.default;
//# sourceMappingURL=index.js.map