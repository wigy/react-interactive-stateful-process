"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isButtonElement = exports.ButtonRenderer = void 0;
const react_1 = __importDefault(require("react"));
const core_1 = require("@material-ui/core");
const ButtonRenderer = (props) => {
    const { element } = props;
    if (!isButtonElement(element)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return react_1.default.createElement(core_1.Button, { variant: "outlined", onClick: () => console.log('TODO: Click') }, element.label);
};
exports.ButtonRenderer = ButtonRenderer;
function isButtonElement(object) {
    return object.type === 'button';
}
exports.isButtonElement = isButtonElement;
