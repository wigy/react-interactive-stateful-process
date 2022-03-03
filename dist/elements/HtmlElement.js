"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlRenderer = void 0;
const react_1 = __importDefault(require("react"));
const interactive_elements_1 = require("interactive-elements");
const material_1 = require("@mui/material");
const HtmlRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isHtmlElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    const { html } = element;
    return react_1.default.createElement(material_1.Typography, { dangerouslySetInnerHTML: { __html: html } });
};
exports.HtmlRenderer = HtmlRenderer;
//# sourceMappingURL=HtmlElement.js.map