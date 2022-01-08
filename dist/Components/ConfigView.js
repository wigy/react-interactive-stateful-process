"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigView = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
const ConfigView = (props) => {
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const render = (obj) => {
        switch (typeof obj) {
            case 'undefined':
                return react_1.default.createElement(react_1.default.Fragment, null, "\u2014");
            case 'object':
                if (obj === null) {
                    return react_1.default.createElement(react_1.default.Fragment, null, "\u2014");
                }
                if (obj instanceof Array) {
                    const values = Object.values(obj);
                    return react_1.default.createElement(react_1.default.Fragment, null, values.map((v, i) => react_1.default.createElement(react_1.default.Fragment, { key: i },
                        render(v),
                        i < values.length - 1 ? ', ' : '')));
                }
                return react_1.default.createElement("dl", null, Object.keys(obj).sort().map(k => react_1.default.createElement(react_1.default.Fragment, { key: k },
                    react_1.default.createElement("dt", null,
                        react_1.default.createElement("strong", null, capitalize(k))),
                    react_1.default.createElement("dd", null, render(obj[k])))));
            case 'string':
                return react_1.default.createElement(react_1.default.Fragment, null, obj === '' ? react_1.default.createElement("br", null) : obj);
            case 'boolean':
                // TODO: Translate.
                return obj ? react_1.default.createElement(react_1.default.Fragment, null, "Yes") : react_1.default.createElement(react_1.default.Fragment, null, "No");
            default:
                return react_1.default.createElement(react_1.default.Fragment, null, JSON.stringify(obj));
        }
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        props.title && react_1.default.createElement(material_1.Typography, { variant: "subtitle1" },
            react_1.default.createElement(react_i18next_1.Trans, null, props.title)),
        render(props.config)));
};
exports.ConfigView = ConfigView;
//# sourceMappingURL=ConfigView.js.map