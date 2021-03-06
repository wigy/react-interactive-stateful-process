"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const __1 = require("..");
const interactive_elements_1 = require("interactive-elements");
/**
 * Rendering for text editing element.
 */
const TextRenderer = (props) => {
    const { element } = props;
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = ((0, interactive_elements_1.isTextElement)(element) && element.label) ? element.label : (((0, interactive_elements_1.isNamedElement)(element) && element.name) ? t(`label-${element.name}`) : '');
    const [value, setValue] = react_1.default.useState((0, interactive_elements_1.isNamedElement)(element) ? props.values[element.name] || '' : '');
    if (!(0, interactive_elements_1.isTextElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    if (props.values[element.name] !== value) {
        setValue(props.values[element.name]);
    }
    return react_1.default.createElement(material_1.TextField, { label: label, name: element.name, value: value || '', error: false, autoFocus: true, fullWidth: true, onChange: (e) => {
            setValue(e.target.value);
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e.target.value }, props);
        }, onFocus: () => __1.RISPProvider.onFocus(), onBlur: () => __1.RISPProvider.onBlur(), onKeyPress: () => null, onKeyUp: () => null, onKeyDown: () => null });
};
exports.TextRenderer = TextRenderer;
//# sourceMappingURL=TextElement.js.map