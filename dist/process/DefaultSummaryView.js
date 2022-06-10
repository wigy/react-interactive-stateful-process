"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.DefaultSummaryView = void 0;
const material_1 = require("@mui/material");
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const icons_material_1 = require("@mui/icons-material");
const ConfigView_1 = require("./ConfigView");
/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
const DefaultSummaryView = (props) => {
    const { step } = props;
    const { t } = (0, react_i18next_1.useTranslation)();
    const [showConfig, setShowConfig] = (0, react_1.useState)(false);
    const started = new Date(step.started).getTime();
    const finished = new Date(step.finished).getTime();
    const UsedConfigView = props.configView || ConfigView_1.ConfigView;
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(material_1.Typography, { variant: "body2" },
            react_1.default.createElement(react_1.default.Fragment, null,
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
                finished ? `${finished - started}ms ` : '— ',
                react_1.default.createElement(material_1.ToggleButton, { size: "small", value: "showConfig", selected: showConfig, title: showConfig ? t('Hide configuration') : t('Show configuration'), onClick: () => setShowConfig(!showConfig) },
                    react_1.default.createElement(icons_material_1.Settings, null)))),
        showConfig &&
            react_1.default.createElement(material_1.Card, { style: { marginBottom: '0.5em' } },
                react_1.default.createElement(material_1.CardContent, null,
                    react_1.default.createElement(UsedConfigView, { title: t('Configuration'), config: props.process.config })))));
};
exports.DefaultSummaryView = DefaultSummaryView;
//# sourceMappingURL=DefaultSummaryView.js.map