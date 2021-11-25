"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSummaryView = void 0;
const core_1 = require("@material-ui/core");
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
const DefaultSummaryView = (props) => {
    const { step } = props;
    const started = new Date(step.started).getTime();
    const finished = new Date(step.finished).getTime();
    return (react_1.default.createElement(core_1.Typography, { variant: "body2" },
        react_1.default.createElement(react_i18next_1.Trans, null,
            react_1.default.createElement("strong", null, "Process ID")),
        ": ",
        step.processId,
        "\u00A0",
        react_1.default.createElement(react_i18next_1.Trans, null,
            react_1.default.createElement("strong", null, "Step")),
        ": ",
        step.number + 1,
        "\u00A0",
        react_1.default.createElement(react_i18next_1.Trans, null,
            react_1.default.createElement("strong", null, "Handler")),
        ": ",
        step.handler,
        "\u00A0",
        react_1.default.createElement(react_i18next_1.Trans, null,
            react_1.default.createElement("strong", null, "Started")),
        ": ",
        step.started,
        "\u00A0",
        react_1.default.createElement(react_i18next_1.Trans, null,
            react_1.default.createElement("strong", null, "Duration")),
        ": ",
        finished ? `${finished - started}ms` : '—'));
};
exports.DefaultSummaryView = DefaultSummaryView;
