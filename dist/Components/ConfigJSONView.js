"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigJSONView = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
const ConfigView_1 = require("./ConfigView");
/**
 * Configuration viewer for a process configuration displaying it as raw JSON.
 * @param props
 * @returns
 */
const ConfigJSONView = (props) => {
    const config = {};
    Object.keys(props.config).forEach(key => {
        if (!ConfigView_1.IGNORE_FIELDS.test(key)) {
            config[key] = props.config[key];
        }
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.title && react_1.default.createElement(material_1.Typography, { variant: "subtitle1" },
            react_1.default.createElement(react_i18next_1.Trans, null, props.title)),
        react_1.default.createElement(material_1.Box, { sx: { fontFamily: 'monospace' } },
            react_1.default.createElement("pre", null, JSON.stringify(config, null, 2)))));
};
exports.ConfigJSONView = ConfigJSONView;
exports.ConfigJSONView.foo = 2112;
//# sourceMappingURL=ConfigJSONView.js.map