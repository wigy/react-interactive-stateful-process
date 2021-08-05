"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRenderer = exports.isTextElement = void 0;
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
// eslint-disable-next-line
function isTextElement(object) {
    return object.type === 'text';
}
exports.isTextElement = isTextElement;
const TextRenderer = (props) => {
    const { element } = props;
    return react_1.default.createElement(core_1.TextField, { label: "label", value: "value", error: false, autoFocus: true, fullWidth: true, onChange: (e) => {
            console.log('TODO: Handle actions');
        }, onKeyPress: () => null, onKeyUp: () => null, onKeyDown: () => null, onFocus: () => null });
};
exports.TextRenderer = TextRenderer;
