"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const core_1 = require("@material-ui/core");
const interactive_stateful_process_1 = require("interactive-stateful-process");
/**
 * Rendering for boolean toggle element.
 */
const BooleanRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_stateful_process_1.isBooleanElement)(element)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = element.label ? element.label : t(`label-${element.name}`);
    const [value, setValue] = react_1.default.useState(props.values[element.name] || '');
    return react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Checkbox, { checked: !!value, onChange: (e) => {
                setValue(e.target.checked);
                element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: !!e.target.checked }, props);
            }, name: element.name, indeterminate: value === undefined || value === null }), label: label });
};
exports.BooleanRenderer = BooleanRenderer;
