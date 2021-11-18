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
exports.DefaultStepView = void 0;
const react_1 = __importStar(require("react"));
const useAxios_1 = require("./useAxios");
const DefaultSummaryView_1 = require("./DefaultSummaryView");
const DefaultDirectionsView_1 = require("./DefaultDirectionsView");
const DefaultActionView_1 = require("./DefaultActionView");
const DefaultStateView_1 = require("./DefaultStateView");
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
const DefaultStepView = (props) => {
    const [step, setStep] = (0, react_1.useState)(null);
    (0, useAxios_1.useAxios)({ url: `${props.api}/${props.step}`, token: props.token, receiver: setStep });
    if (!step) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const SummaryView = props.summaryView || DefaultSummaryView_1.DefaultSummaryView;
    const DirectionsView = props.directionsView || DefaultDirectionsView_1.DefaultDirectionsView;
    const ActionView = props.actionView || DefaultActionView_1.DefaultActionView;
    const StateView = props.stateView || DefaultStateView_1.DefaultStateView;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(SummaryView, { step: step }),
        step.directions && react_1.default.createElement(DirectionsView, { directions: step.directions }),
        step.action && react_1.default.createElement(ActionView, { action: step.action }),
        step.state && react_1.default.createElement(StateView, { state: step.state })));
};
exports.DefaultStepView = DefaultStepView;
