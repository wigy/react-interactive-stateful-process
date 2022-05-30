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
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const ProcessStatusIcon_1 = require("./ProcessStatusIcon");
const __1 = require("..");
const DefaultStepView_1 = require("./DefaultStepView");
const interactive_elements_1 = require("interactive-elements");
const icons_material_1 = require("@mui/icons-material");
const DefaultErrorView_1 = require("./DefaultErrorView");
const DefaultSuccessView_1 = require("./DefaultSuccessView");
const StepList_1 = require("./StepList");
const ConfigChangeView_1 = require("./ConfigChangeView");
/**
 * Construct a text for action taken.
 * @param action
 * @returns
 */
const actionStepLabel = (action) => {
    if (action === null) {
        return '';
    }
    if ((0, interactive_elements_1.isImportOpAction)(action)) {
        return action.op;
    }
    if ((0, interactive_elements_1.isImportConfigureAction)(action)) {
        return 'configuring';
    }
    if ((0, interactive_elements_1.isImportAnswerAction)(action)) {
        return 'answer';
    }
    return JSON.stringify(action);
};
/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
const ProcessView = (props) => {
    const { summaryView, stateView, resultView, configView } = props;
    const theme = (0, material_1.useTheme)();
    const { t } = (0, react_i18next_1.useTranslation)();
    const [process, setProcess] = (0, react_1.useState)(null);
    const [step, setStep] = (0, react_1.useState)(null);
    // Resolve step.
    let currentStep;
    if (props.step !== undefined && props.step !== null) {
        currentStep = props.step;
    }
    if (process && (currentStep === null || currentStep === undefined)) {
        currentStep = process.currentStep !== undefined ? process.currentStep : 0;
    }
    (0, __1.useAxios)({
        // Note, step argument does not do anything except triggers URL refetch.
        url: `${props.api}/${props.id}${currentStep !== undefined ? `?step=${currentStep}` : ''}`,
        token: props.token,
        receiver: setProcess
    });
    (0, __1.useAxios)({
        // Note, step argument does not do anything except triggers URL refetch.
        url: currentStep === undefined ? null : `${props.api}/${props.id}/step/${currentStep}`,
        token: props.token,
        receiver: setStep
    });
    if (!process)
        return react_1.default.createElement(react_1.default.Fragment, null);
    // Calculate some values for futher use.
    const canChangeStep = process.currentStep !== undefined && process.currentStep !== null && process.steps && process.steps.length > 1;
    const hasSteps = process.currentStep !== undefined && process.steps.length > 0;
    const lastStep = currentStep !== undefined && process.steps.length > 0 && currentStep === process.steps.length - 1;
    const directions = currentStep !== undefined && process.steps[currentStep] ? process.steps[currentStep].directions || {} : {};
    const needAnswers = (hasSteps &&
        process.status === 'WAITING' &&
        !process.error &&
        currentStep === process.steps.length - 1 &&
        directions.type === 'ui');
    const wasConfigured = (currentStep !== undefined &&
        currentStep > 0 &&
        process.steps[currentStep - 1] &&
        process.steps[currentStep - 1].directions &&
        directions.type === 'ui');
    // Handle step change.
    const onChangeStep = (n) => {
        props.onChangeStep && props.onChangeStep(n);
    };
    // Handle back button.
    const onBack = () => {
        props.onBack && props.onBack();
    };
    // Handle action success.
    const onActionSuccess = (result, trigger, actionProps) => {
        if (props.onActionSuccess) {
            props.onActionSuccess(result, trigger, actionProps);
        }
    };
    const StepView = props.stepView || DefaultStepView_1.DefaultStepView;
    const ErrorView = props.errorView || DefaultErrorView_1.DefaultErrorView;
    const SuccessView = props.successView || DefaultSuccessView_1.DefaultSuccessView;
    const operations = ['start'].concat(process.steps.filter(step => step.action).map(step => actionStepLabel(step.action))).map(label => t(`step-${label}`));
    // Extract values from the process config.
    const values = {};
    Object.keys(process.config).forEach(key => {
        values[`configure.${key}`] = process.config[key];
    });
    return (react_1.default.createElement(material_1.TableContainer, null,
        react_1.default.createElement(material_1.Table, { className: "ProcessTable", size: "small" },
            react_1.default.createElement(material_1.TableHead, null,
                react_1.default.createElement(material_1.TableRow, { style: { backgroundColor: theme.palette.secondary.main } },
                    react_1.default.createElement(material_1.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText } },
                        react_1.default.createElement(material_1.IconButton, { onClick: () => onBack() },
                            react_1.default.createElement(icons_material_1.ArrowBackOutlined, { style: { color: theme.palette.secondary.contrastText } })),
                        "# ",
                        process.id),
                    react_1.default.createElement(material_1.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }),
                    react_1.default.createElement(material_1.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }, `${process.created}`),
                    react_1.default.createElement(material_1.TableCell, { variant: "head", style: { color: theme.palette.secondary.contrastText }, align: "left" }, process.name),
                    react_1.default.createElement(material_1.TableCell, { variant: "head", style: { backgroundColor: 'white' }, align: "right" },
                        react_1.default.createElement(ProcessStatusIcon_1.ProcessStatusIcon, { status: process.status })))),
            react_1.default.createElement(material_1.TableBody, null,
                react_1.default.createElement(material_1.TableRow, null,
                    react_1.default.createElement(material_1.TableCell, { colSpan: 2 },
                        react_1.default.createElement(material_1.Typography, null,
                            react_1.default.createElement(material_1.Fab, { disabled: !canChangeStep || currentStep === 0, color: "secondary", "aria-label": "previous", onClick: () => onChangeStep(currentStep !== undefined ? currentStep - 1 : 0) },
                                react_1.default.createElement(icons_material_1.NavigateBefore, null)),
                            react_1.default.createElement(material_1.Fab, { disabled: true, style: { fontSize: '140%', color: 'black', fontWeight: 'bold' } }, canChangeStep ? (currentStep || 0) + 1 : react_1.default.createElement(react_1.default.Fragment, null, "\u2014")),
                            react_1.default.createElement(material_1.Fab, { disabled: !canChangeStep || currentStep === process.steps.length - 1, color: "secondary", "aria-label": "next", onClick: () => onChangeStep(currentStep !== undefined ? currentStep + 1 : 0) },
                                react_1.default.createElement(icons_material_1.NavigateNext, null)))),
                    react_1.default.createElement(material_1.TableCell, { colSpan: 3 },
                        react_1.default.createElement(StepList_1.StepList, { onChangeStep: (step) => onChangeStep(step), operations: operations, currentStep: currentStep || 0 }))),
                react_1.default.createElement(material_1.TableRow, null,
                    react_1.default.createElement(material_1.TableCell, { colSpan: 5, align: "left", style: { verticalAlign: 'top' } },
                        lastStep && process.status === 'SUCCEEDED' && step !== null && react_1.default.createElement(SuccessView, { step: step, process: process }),
                        lastStep && process.error && react_1.default.createElement(ErrorView, { error: process.error }),
                        wasConfigured && react_1.default.createElement(ConfigChangeView_1.ConfigChangeView, { step: process.steps[(currentStep || 0) - 1] }),
                        needAnswers && react_1.default.createElement(react_1.default.Fragment, null,
                            react_1.default.createElement(material_1.Typography, { variant: "subtitle1" },
                                react_1.default.createElement(react_i18next_1.Trans, null, "Additional information needed")),
                            react_1.default.createElement(__1.RISP, { key: "directions", element: directions.element, values: values, setup: props.setup || { baseUrl: `${props.api}/${process.id}` }, onActionSuccess: onActionSuccess })))),
                hasSteps &&
                    react_1.default.createElement(material_1.TableRow, null,
                        react_1.default.createElement(material_1.TableCell, { colSpan: 5, align: "left" },
                            react_1.default.createElement(StepView, { api: `${props.api}/${props.id}/step`, token: props.token, step: step, process: process, summaryView: summaryView, stateView: stateView, resultView: resultView, configView: configView })))))));
};
exports.ProcessView = ProcessView;
//# sourceMappingURL=ProcessView.js.map