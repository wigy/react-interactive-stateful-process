"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const interactive_elements_1 = require("interactive-elements");
/**
 * Rendering for text editing element.
 */
const TextRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isTextElement)(element)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = element.label ? element.label : t(`label-${element.name}`);
    const [value, setValue] = react_1.default.useState(props.values[element.name] || '');
    return react_1.default.createElement(material_1.TextField, { label: label, value: value, error: false, autoFocus: true, fullWidth: true, onChange: (e) => {
            setValue(e.target.value);
            element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e.target.value }, props);
        }, onKeyPress: () => null, onKeyUp: () => null, onKeyDown: () => null, onFocus: () => null });
};
exports.TextRenderer = TextRenderer;
