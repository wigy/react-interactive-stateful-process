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
const ProcessStatusIcon_1 = require("./ProcessStatusIcon");
const useAxios_1 = require("./useAxios");
const icons_1 = require("@material-ui/icons");
const ProcessView = (props) => {
    const theme = (0, core_1.useTheme)();
    const [process, setProcess] = (0, react_1.useState)(null);
    const [step, setStep] = (0, react_1.useState)(null);
    (0, useAxios_1.useAxios)({ url: `${props.api}/${props.id}`, token: props.token, receiver: setProcess });
    if (!process)
        return react_1.default.createElement(react_1.default.Fragment, null);
    const canChangeStep = process.currentStep !== undefined && process.currentStep !== null && process.steps && process.steps > 1;
    const currentStep = step === null ? (process.currentStep !== undefined ? process.currentStep : 0) : step;
    const onPreviousStep = () => {
        setStep(currentStep - 1);
    };
    const onNextStep = () => {
        setStep(currentStep + 1);
    };
    return (react_1.default.createElement(core_1.TableContainer, null,
        react_1.default.createElement(core_1.Table, { className: "ProcessTable" },
            react_1.default.createElement(core_1.TableHead, null,
                react_1.default.createElement(core_1.TableRow, { style: { backgroundColor: theme.palette.secondary.main, color: 'red' } },
                    react_1.default.createElement(core_1.TableCell, { variant: "head", style: { color: theme.palette.text.secondary }, align: "left" }, process.id),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", style: { color: theme.palette.text.secondary }, align: "left" }, process.created),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", style: { color: theme.palette.text.secondary }, align: "left" }, process.name),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "right" },
                        react_1.default.createElement(ProcessStatusIcon_1.ProcessStatusIcon, { status: process.status })))),
            react_1.default.createElement(core_1.TableBody, null,
                react_1.default.createElement(core_1.TableRow, null,
                    react_1.default.createElement(core_1.TableCell, { colSpan: 3, align: "left" },
                        "TODO: Configuration ",
                        JSON.stringify(process.config)),
                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                        react_1.default.createElement(core_1.Fab, { disabled: !canChangeStep || currentStep === 0, color: "secondary", "aria-label": "previous", onClick: onPreviousStep },
                            react_1.default.createElement(icons_1.NavigateBefore, null)),
                        react_1.default.createElement(core_1.Fab, { disabled: true, style: { fontSize: '140%', color: 'black', fontWeight: 'bold' } }, canChangeStep ? currentStep + 1 : react_1.default.createElement(react_1.default.Fragment, null, "\u2014")),
                        react_1.default.createElement(core_1.Fab, { disabled: !canChangeStep || !process.steps || currentStep === process.steps - 1, color: "secondary", "aria-label": "previous", onClick: onNextStep },
                            react_1.default.createElement(icons_1.NavigateNext, null))))))));
};
exports.ProcessView = ProcessView;
