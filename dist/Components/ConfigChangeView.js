"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigChangeView = exports.IGNORE_FIELDS = void 0;
const react_1 = __importDefault(require("react"));
const interactive_elements_1 = require("interactive-elements");
const _1 = require(".");
const react_i18next_1 = require("react-i18next");
exports.IGNORE_FIELDS = /^(answers|rules)$/;
/**
 * A viewer for changes made during the interactive step.
 * @param props
 * @returns
 */
const ConfigChangeView = (props) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    if (props.step.directions.type !== 'ui') {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const names = [...(0, interactive_elements_1.elementNames)(props.step.directions.element)].sort();
    const changes = {};
    for (let name of names) {
        if (name.startsWith('configure.')) {
            name = name.substr(10);
            changes[name] = props.step.action.configure[name];
        }
    }
    return react_1.default.createElement(_1.ConfigView, { title: t('Configured the Following'), config: changes });
};
exports.ConfigChangeView = ConfigChangeView;
//# sourceMappingURL=ConfigChangeView.js.map