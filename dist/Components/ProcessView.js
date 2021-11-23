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
const DefaultConfigView_1 = require("./DefaultConfigView");
const DefaultStepView_1 = require("./DefaultStepView");
const icons_1 = require("@material-ui/icons");
const DefaultErrorView_1 = require("./DefaultErrorView");
/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
const ProcessView = (props) => {
    const { summaryView, directionsView, actionView, stateView } = props;
    const theme = (0, core_1.useTheme)();
    const [process, setProcess] = (0, react_1.useState)(null);
    const [step, setStep] = (0, react_1.useState)(null);
    (0, useAxios_1.useAxios)({ url: `${props.api}/${props.id}`, token: props.token, receiver: setProcess });
    if (!process)
        return react_1.default.createElement(react_1.default.Fragment, null);
    const canChangeStep = process.currentStep !== undefined && process.currentStep !== null && process.steps && process.steps.length > 1;
    const currentStep = step === null ? (process.currentStep !== undefined ? process.currentStep : 0) : step;
    const hasSteps = process.currentStep !== undefined && process.steps.length > 0;
    const onPreviousStep = () => {
        setStep(currentStep - 1);
    };
    const onNextStep = () => {
        setStep(currentStep + 1);
    };
    const onBack = () => {
        props.onBack && props.onBack();
    };
    const ConfigView = props.configView || DefaultConfigView_1.DefaultConfigView;
    const StepView = props.stepView || DefaultStepView_1.DefaultStepView;
    const ErrorView = DefaultErrorView_1.DefaultErrorView;
    const operations = process.steps.map(step => step.action ? JSON.stringify(step.action) : '');
    return (react_1.default.createElement(core_1.TableContainer, null,
        react_1.default.createElement(core_1.Table, { className: "ProcessTable", size: "small" },
            react_1.default.createElement(core_1.TableHead, null,
                react_1.default.createElement(core_1.TableRow, { style: { backgroundColor: theme.palette.secondary.main } },
                    react_1.default.createElement(core_1.TableCell, { variant: "head" },
                        react_1.default.createElement(core_1.IconButton, { onClick: () => onBack() },
                            react_1.default.createElement(icons_1.ArrowBackOutlined, { style: { color: theme.palette.secondary.contrastText } }))),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }, process.id),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }, process.created),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }, process.name),
                    react_1.default.createElement(core_1.TableCell, { variant: "head", align: "right" },
                        react_1.default.createElement(ProcessStatusIcon_1.ProcessStatusIcon, { status: process.status })))),
            react_1.default.createElement(core_1.TableBody, null,
                react_1.default.createElement(core_1.TableRow, null,
                    react_1.default.createElement(core_1.TableCell, { colSpan: 5 },
                        react_1.default.createElement(core_1.Stepper, { activeStep: currentStep }, operations.map((label) => (react_1.default.createElement(core_1.Step, { key: label },
                            react_1.default.createElement(core_1.StepLabel, null, label))))))),
                react_1.default.createElement(core_1.TableRow, null,
                    react_1.default.createElement(core_1.TableCell, null),
                    react_1.default.createElement(core_1.TableCell, { colSpan: 3, align: "left" },
                        process.config && react_1.default.createElement(ConfigView, { config: process.config }),
                        process.error && react_1.default.createElement(ErrorView, { error: process.error })),
                    react_1.default.createElement(core_1.TableCell, { align: "right" },
                        react_1.default.createElement(core_1.Typography, { noWrap: true },
                            react_1.default.createElement(core_1.Fab, { disabled: !canChangeStep || currentStep === 0, color: "secondary", "aria-label": "previous", onClick: onPreviousStep },
                                react_1.default.createElement(icons_1.NavigateBefore, null)),
                            react_1.default.createElement(core_1.Fab, { disabled: true, style: { fontSize: '140%', color: 'black', fontWeight: 'bold' } }, canChangeStep ? currentStep + 1 : react_1.default.createElement(react_1.default.Fragment, null, "\u2014")),
                            react_1.default.createElement(core_1.Fab, { disabled: !canChangeStep || currentStep === process.steps.length - 1, color: "secondary", "aria-label": "previous", onClick: onNextStep },
                                react_1.default.createElement(icons_1.NavigateNext, null))))),
                hasSteps &&
                    react_1.default.createElement(core_1.TableRow, null,
                        react_1.default.createElement(core_1.TableCell, { colSpan: 5, align: "left" },
                            react_1.default.createElement(StepView, { api: `${props.api}/${props.id}/step`, token: props.token, step: currentStep, summaryView: summaryView, directionsView: directionsView, actionView: actionView, stateView: stateView })))))));
};
exports.ProcessView = ProcessView;
