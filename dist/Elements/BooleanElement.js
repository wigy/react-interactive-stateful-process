"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
exports.BooleanRenderer = void 0;
const react_1 = __importStar(require("react"));
const react_i18next_1 = require("react-i18next");
const core_1 = require("@material-ui/core");
const interactive_elements_1 = require("interactive-elements");
/**
 * Rendering for boolean toggle element.
 */
const BooleanRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isBooleanElement)(element)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = element.label ? element.label : t(`label-${element.name}`);
    const [value, setValue] = (0, react_1.useState)(props.values[element.name] || null);
    return react_1.default.createElement(core_1.FormControlLabel, { control: react_1.default.createElement(core_1.Checkbox, { checked: !!value, onChange: (e) => {
                setValue(e.target.checked);
                element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: !!e.target.checked }, props);
            }, name: element.name, indeterminate: value === undefined || value === null }), label: label });
};
exports.BooleanRenderer = BooleanRenderer;
