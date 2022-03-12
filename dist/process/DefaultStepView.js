"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStepView = void 0;
const react_1 = __importDefault(require("react"));
const DefaultSummaryView_1 = require("./DefaultSummaryView");
const DefaultStateView_1 = require("./DefaultStateView");
const DefaultResultView_1 = require("./DefaultResultView");
const ConfigView_1 = require("./ConfigView");
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
const DefaultStepView = (props) => {
    const { step } = props;
    if (!step) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const SummaryView = props.summaryView || DefaultSummaryView_1.DefaultSummaryView;
    const StateView = props.stateView || DefaultStateView_1.DefaultStateView;
    const ResultView = props.resultView || DefaultResultView_1.DefaultResultView;
    const configView = props.configView || ConfigView_1.ConfigView;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(SummaryView, { step: step, process: props.process, configView: configView }),
        step.state && react_1.default.createElement(StateView, { config: props.process.config, state: step.state, resultView: ResultView })));
};
exports.DefaultStepView = DefaultStepView;
//# sourceMappingURL=DefaultStepView.js.map