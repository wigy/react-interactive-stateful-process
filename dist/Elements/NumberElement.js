"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const interactive_elements_1 = require("interactive-elements");
const RISPProvider_1 = require("../RISPProvider");
/**
 * Rendering for text editing element.
 */
const NumberRenderer = (props) => {
    const { element } = props;
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = ((0, interactive_elements_1.isNumberElement)(element) && element.label) ? element.label : (((0, interactive_elements_1.isNamedElement)(element) && element.name) ? t(`label-${element.name}`) : '');
    const [value, setValue] = react_1.default.useState((0, interactive_elements_1.isNamedElement)(element) ? props.values[element.name] || '' : '');
    if (!(0, interactive_elements_1.isNumberElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    if (props.values[element.name] !== value) {
        setValue(props.values[element.name]);
    }
    return react_1.default.createElement(material_1.TextField, { label: label, value: value, type: "number", error: false, autoFocus: true, InputProps: {
            endAdornment: react_1.default.createElement(material_1.InputAdornment, { position: "end" }, element.unit || ''),
        }, onChange: (e) => {
            setValue(e.target.value);
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e.target.value }, props);
        }, onFocus: () => RISPProvider_1.RISPProvider.onFocus(), onBlur: () => RISPProvider_1.RISPProvider.onBlur(), onKeyPress: () => null, onKeyUp: () => null, onKeyDown: () => null });
};
exports.NumberRenderer = NumberRenderer;
//# sourceMappingURL=NumberElement.js.map