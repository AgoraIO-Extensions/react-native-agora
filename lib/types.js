"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * AgoraViewMode
 * @mode hidden Uniformly scale the video until it fills the visible boundaries (cropped). One dimension of the video may have clipped contents.
 * @mode FIT Uniformly scale the video until one of its dimension fits the boundary (zoomed to fit). Areas that are not filled due to the disparity in the aspect ratio are filled with black.
 */
var AgoraViewMode;
(function (AgoraViewMode) {
    AgoraViewMode[AgoraViewMode["HIDDEN"] = 1] = "HIDDEN";
    AgoraViewMode[AgoraViewMode["FIT"] = 2] = "FIT";
})(AgoraViewMode = exports.AgoraViewMode || (exports.AgoraViewMode = {}));
var VideoCodecProfile;
(function (VideoCodecProfile) {
    VideoCodecProfile[VideoCodecProfile["BASELINE"] = 66] = "BASELINE";
    VideoCodecProfile[VideoCodecProfile["MAIN"] = 77] = "MAIN";
    VideoCodecProfile[VideoCodecProfile["HIGH"] = 100] = "HIGH";
})(VideoCodecProfile = exports.VideoCodecProfile || (exports.VideoCodecProfile = {}));
var AudioCodecProfile;
(function (AudioCodecProfile) {
    AudioCodecProfile[AudioCodecProfile["LC_AAC"] = 0] = "LC_AAC";
    AudioCodecProfile[AudioCodecProfile["HE_AAC"] = 1] = "HE_AAC";
})(AudioCodecProfile = exports.AudioCodecProfile || (exports.AudioCodecProfile = {}));
var AudioSampleRate;
(function (AudioSampleRate) {
    AudioSampleRate[AudioSampleRate["TYPE_32000"] = 32000] = "TYPE_32000";
    AudioSampleRate[AudioSampleRate["TYPE_44100"] = 44100] = "TYPE_44100";
    AudioSampleRate[AudioSampleRate["TYPE_48000"] = 48000] = "TYPE_48000";
})(AudioSampleRate = exports.AudioSampleRate || (exports.AudioSampleRate = {}));
/**
 * AgoraChannelStereo
 * @note Agora’s self-defined audio channel type. We recommend choosing ONE or TWO. Special players are required if you choose TRHEE, FOUR or FIVE:
 */
var AudioChannelStereo;
(function (AudioChannelStereo) {
    AudioChannelStereo[AudioChannelStereo["ONE"] = 1] = "ONE";
    AudioChannelStereo[AudioChannelStereo["TWO"] = 2] = "TWO";
    AudioChannelStereo[AudioChannelStereo["TRHEE"] = 3] = "TRHEE";
    AudioChannelStereo[AudioChannelStereo["FOUR"] = 4] = "FOUR";
    AudioChannelStereo[AudioChannelStereo["FIVE"] = 5] = "FIVE";
})(AudioChannelStereo = exports.AudioChannelStereo || (exports.AudioChannelStereo = {}));
//# sourceMappingURL=types.js.map