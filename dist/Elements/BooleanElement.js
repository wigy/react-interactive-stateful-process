"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const interactive_elements_1 = require("interactive-elements");
/**
 * Rendering for boolean toggle element.
 */
const BooleanRenderer = (props) => {
    const { element } = props;
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = 'label' in element ? element.label || '' : ((0, interactive_elements_1.isNamedElement)(element) ? t(`label-${element.name}`) : '');
    const [value, setValue] = react_1.default.useState((0, interactive_elements_1.isNamedElement)(element) ? props.values[element.name] : null);
    if (!(0, interactive_elements_1.isBooleanElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    return react_1.default.createElement(material_1.FormControlLabel, { control: react_1.default.createElement(material_1.Checkbox, { checked: !!value, onChange: (e) => {
                setValue(e.target.checked);
                element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: !!e.target.checked }, props);
            }, name: element.name, indeterminate: value === undefined || value === null }), label: label });
};
exports.BooleanRenderer = BooleanRenderer;
//# sourceMappingURL=BooleanElement.js.map