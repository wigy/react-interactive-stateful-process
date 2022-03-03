"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigView = exports.IGNORE_FIELDS = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
const react_i18next_1 = require("react-i18next");
exports.IGNORE_FIELDS = /^(answers|rules)$/;
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
const ConfigView = (props) => {
    const COLUMNS = props.columns || 4;
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    const render = (obj) => {
        let keys, perColumn, idx, column;
        switch (typeof obj) {
            case 'undefined':
                return react_1.default.createElement(react_1.default.Fragment, null, "\u2014");
            case 'object':
                if (obj === null) {
                    return react_1.default.createElement(react_1.default.Fragment, null, "\u2014");
                }
                if (obj instanceof Array) {
                    const values = Object.values(obj);
                    return react_1.default.createElement(react_1.default.Fragment, null, values.map((v, i) => react_1.default.createElement(react_1.default.Fragment, { key: `array${i}` },
                        render(v),
                        i < values.length - 1 ? ', ' : '')));
                }
                keys = Object.keys(obj).filter(k => !exports.IGNORE_FIELDS.test(k)).sort();
                perColumn = Math.ceil(keys.length / COLUMNS);
                idx = 0;
                column = [];
                for (let c = 0; c < COLUMNS; c++) {
                    const row = [];
                    for (let r = 0; r < perColumn; r++) {
                        if (idx < keys.length) {
                            // TODO: Make special marking for { ask: ... }
                            row.push(react_1.default.createElement(react_1.default.Fragment, { key: idx },
                                react_1.default.createElement("div", null,
                                    react_1.default.createElement("strong", null, capitalize(keys[idx]))),
                                react_1.default.createElement("div", null, render(obj[keys[idx]]))));
                        }
                        idx++;
                    }
                    column.push(react_1.default.createElement(material_1.Grid, { key: `column${c}`, item: true }, row));
                }
                return react_1.default.createElement(material_1.Box, { sx: { flexGrow: 1 } },
                    react_1.default.createElement(material_1.Grid, { container: true, justifyContent: "space-evenly", spacing: 4 }, column));
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