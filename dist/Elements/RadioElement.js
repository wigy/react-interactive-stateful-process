"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const interactive_elements_1 = require("interactive-elements");
const material_1 = require("@mui/material");
/**
 * Rendering for radio group element.
 */
const RadioRenderer = (props) => {
    const { element } = props;
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = ((0, interactive_elements_1.isRadioElement)(element) && element.label) ? element.label : (((0, interactive_elements_1.isNamedElement)(element) && element.name) ? t(`label-${element.name}`) : '');
    const [value, setValue] = react_1.default.useState((0, interactive_elements_1.isNamedElement)(element) ? props.values[element.name] || '' : '');
    if (!(0, interactive_elements_1.isRadioElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    return (react_1.default.createElement(material_1.FormControl, { component: "fieldset" },
        react_1.default.createElement(material_1.FormLabel, { component: "legend" }, label),
        react_1.default.createElement(material_1.RadioGroup, null, Object.entries(element.options).map(([k, v]) => react_1.default.createElement(material_1.FormControlLabel, { key: k, value: k, control: react_1.default.createElement(material_1.Radio, null), label: v, checked: value === k, onChange: () => {
                setValue(k);
                element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: k }, props);
            } })))));
};
exports.RadioRenderer = RadioRenderer;
