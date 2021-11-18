"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultConfigView = void 0;
const react_1 = __importDefault(require("react"));
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
const DefaultConfigView = (props) => {
    return (react_1.default.createElement("div", null, Object.keys(props.config).map(name => react_1.default.createElement("span", { key: name },
        name,
        ": ",
        JSON.stringify(props.config[name])))));
};
exports.DefaultConfigView = DefaultConfigView;
