"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultErrorView = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
/**
 * Simple pre-formatted error display.
 * @param props
 * @returns
 */
const DefaultErrorView = (props) => {
    const { palette } = (0, material_1.useTheme)();
    return (react_1.default.createElement(material_1.Card, { style: { backgroundColor: 'rgba(0,0,0,0.05)' } },
        react_1.default.createElement(material_1.CardHeader, { style: { color: palette.error.main }, title: react_1.default.createElement(react_i18next_1.Trans, null, "Error") }),
        react_1.default.createElement(material_1.CardContent, { sx: { fontFamily: 'monospace' } },
            react_1.default.createElement(material_1.Typography, null, props.error.split('\n').map((line, idx) => react_1.default.createElement(react_1.default.Fragment, { key: idx },
                line,
                react_1.default.createElement("br", null)))))));
};
exports.DefaultErrorView = DefaultErrorView;
