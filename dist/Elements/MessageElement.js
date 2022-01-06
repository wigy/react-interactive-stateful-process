"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRenderer = void 0;
const react_1 = __importDefault(require("react"));
const interactive_elements_1 = require("interactive-elements");
const material_1 = require("@mui/material");
const MessageRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isMessageElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    const { severity, text } = element;
    return react_1.default.createElement(material_1.Alert, { severity: severity },
        severity,
        " ",
        text);
};
exports.MessageRenderer = MessageRenderer;
