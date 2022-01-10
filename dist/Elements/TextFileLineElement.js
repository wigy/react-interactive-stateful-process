"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextFileLineRenderer = void 0;
const react_1 = __importDefault(require("react"));
const interactive_elements_1 = require("interactive-elements");
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
const __1 = require("..");
const TextFileLineRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isTextFileLineElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    const { line } = element;
    const text = line.text.replace(/\t/g, '⭾');
    return (react_1.default.createElement(material_1.Box, null,
        react_1.default.createElement(material_1.Typography, { variant: "caption" },
            react_1.default.createElement(react_i18next_1.Trans, null, "Line:"),
            " ",
            line.line),
        react_1.default.createElement(material_1.Typography, { sx: { fontFamily: 'monospace' } }, text),
        line.columns && react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(material_1.Typography, { variant: "caption" },
                react_1.default.createElement(react_i18next_1.Trans, null, "Values:")),
            react_1.default.createElement(__1.ConfigView, { config: line.columns }))));
};
exports.TextFileLineRenderer = TextFileLineRenderer;
//# sourceMappingURL=TextFileLineElement.js.map