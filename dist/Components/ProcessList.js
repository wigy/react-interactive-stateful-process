"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessList = void 0;
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const ProcessStatusIcon_1 = require("./ProcessStatusIcon");
const useAxios_1 = require("./useAxios");
/**
 * A table view for a list of processes collected from the given API.
 * @param props
 * @returns
 */
const ProcessList = (props) => {
    const [processes, setProcesses] = (0, react_1.useState)([]);
    (0, useAxios_1.useAxios)({ url: `${props.api}`, token: props.token, receiver: setProcesses });
    return (react_1.default.createElement(core_1.TableContainer, null,
        react_1.default.createElement(core_1.Table, { className: "ProcessTable" },
            react_1.default.createElement(core_1.TableHead, null,
                react_1.default.createElement(core_1.TableRow, null,
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(react_i18next_1.Trans, null, "#")),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(react_i18next_1.Trans, null, "Date")),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(react_i18next_1.Trans, null, "Process Name")),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(react_i18next_1.Trans, null, "Status")))),
            react_1.default.createElement(core_1.TableBody, null, processes.map(process => (react_1.default.createElement(core_1.TableRow, { key: process.id, onClick: () => { props.onClick && props.onClick(process.id); } },
                react_1.default.createElement(core_1.TableCell, null, process.id),
                react_1.default.createElement(core_1.TableCell, null, process.created),
                react_1.default.createElement(core_1.TableCell, null, process.name),
                react_1.default.createElement(core_1.TableCell, null,
                    react_1.default.createElement(ProcessStatusIcon_1.ProcessStatusIcon, { status: process.status })))))))));
};
exports.ProcessList = ProcessList;
