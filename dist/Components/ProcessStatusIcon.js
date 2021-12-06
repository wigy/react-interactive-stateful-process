"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessStatusIcon = exports.ProcessStatus = void 0;
const react_1 = __importDefault(require("react"));
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const colors_1 = require("@mui/material/colors");
var ProcessStatus;
(function (ProcessStatus) {
    ProcessStatus["INCOMPLETE"] = "INCOMPLETE";
    ProcessStatus["WAITING"] = "WAITING";
    ProcessStatus["SUCCEEDED"] = "SUCCEEDED";
    ProcessStatus["FAILED"] = "FAILED";
    ProcessStatus["CRASHED"] = "CRASHED";
})(ProcessStatus = exports.ProcessStatus || (exports.ProcessStatus = {}));
/**
 * Display icon for process status.
 * @param props
 * @returns
 */
const ProcessStatusIcon = (props) => {
    const colors = {
        red: colors_1.red[700],
        blue: colors_1.blue[900],
        green: colors_1.green[800]
    };
    switch (props.status) {
        case 'FAILED':
            return react_1.default.createElement(material_1.Typography, { title: props.status, style: { color: colors.red } },
                react_1.default.createElement(icons_material_1.ErrorOutline, null));
        case 'WAITING':
            return react_1.default.createElement(material_1.Typography, { title: props.status, style: { color: colors.blue } },
                react_1.default.createElement(icons_material_1.Timer, null));
        case 'SUCCEEDED':
            return react_1.default.createElement(material_1.Typography, { title: props.status, style: { color: colors.green } },
                react_1.default.createElement(icons_material_1.CheckCircleOutline, null));
        case 'CRASHED':
            return react_1.default.createElement(material_1.Typography, { title: props.status, style: { color: colors.red } },
                react_1.default.createElement(icons_material_1.Warning, null));
        case 'INCOMPLETE':
            return react_1.default.createElement(material_1.Typography, { title: props.status, style: { color: colors.blue } },
                react_1.default.createElement(icons_material_1.HourglassEmpty, null));
    }
    return react_1.default.createElement(material_1.Typography, { title: props.status, style: { color: colors.red } },
        react_1.default.createElement(icons_material_1.Help, null));
};
exports.ProcessStatusIcon = ProcessStatusIcon;
