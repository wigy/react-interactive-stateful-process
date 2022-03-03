"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YesNoRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const interactive_elements_1 = require("interactive-elements");
/**
 * Rendering for boolean toggle element.
 */
const YesNoRenderer = (props) => {
    const { element } = props;
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = 'label' in element ? element.label || '' : ((0, interactive_elements_1.isNamedElement)(element) ? t(`label-${element.name}`) : '');
    const [value, setValue] = react_1.default.useState((0, interactive_elements_1.isNamedElement)(element) ? props.values[element.name] : null);
    if (!(0, interactive_elements_1.isYesNoElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    const yes = t('Yes');
    const no = t('No');
    return react_1.default.createElement(material_1.FormControl, { component: "fieldset" },
        react_1.default.createElement(material_1.FormLabel, { component: "legend" }, label),
        react_1.default.createElement(material_1.RadioGroup, null,
            react_1.default.createElement(material_1.Grid, null,
                react_1.default.createElement(material_1.FormControlLabel, { value: "yes", label: yes, checked: value === true, control: react_1.default.createElement(material_1.Radio, null), onChange: () => {
                        setValue(true);
                        element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: true }, props);
                    } }),
                react_1.default.createElement(material_1.FormControlLabel, { value: "no", label: no, checked: value === false, control: react_1.default.createElement(material_1.Radio, null), onChange: () => {
                        setValue(false);
                        element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: false }, props);
                    } }))));
};
exports.YesNoRenderer = YesNoRenderer;
//# sourceMappingURL=YesNoElement.js.map