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
exports.ProcessView = void 0;
const core_1 = require("@material-ui/core");
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const ProcessStatusIcon_1 = require("./ProcessStatusIcon");
const useAxios_1 = require("./useAxios");
const ProcessView = (props) => {
    const [process, setProcess] = (0, react_1.useState)(null);
    (0, useAxios_1.useAxios)({ url: `${props.api}/${props.id}`, receiver: setProcess });
    const theme = (0, core_1.useTheme)();
    if (!process)
        return react_1.default.createElement(react_1.default.Fragment, null);
    return (react_1.default.createElement(core_1.TableContainer, null,
        react_1.default.createElement(core_1.Table, { className: "ProcessTable" },
            react_1.default.createElement(core_1.TableHead, null,
                react_1.default.createElement(core_1.TableRow, { style: { backgroundColor: theme.palette.primary.main } },
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(react_i18next_1.Trans, null, process.id)),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(react_i18next_1.Trans, null, process.created)),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(react_i18next_1.Trans, null, process.name)),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "left" },
                        react_1.default.createElement(ProcessStatusIcon_1.ProcessStatusIcon, { status: process.status })))),
            react_1.default.createElement(core_1.TableBody, null))));
};
exports.ProcessView = ProcessView;
