"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const material_1 = require("@mui/material");
const interactive_elements_1 = require("interactive-elements");
const ButtonRenderer = (props) => {
    const { t } = (0, react_i18next_1.useTranslation)();
    const { element, values } = props;
    if (!(0, interactive_elements_1.isButtonElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    const label = t(`label-${element.label}`);
    const requirements = element.requires ? (typeof element.requires === 'string' ? [element.requires] : element.requires) : [];
    const allGood = requirements.filter(r => !values[r]).length === 0;
    return react_1.default.createElement(material_1.Button, { variant: "outlined", disabled: !allGood, onClick: () => { element.triggerHandler && element.triggerHandler({ type: 'onClick' }, props); } }, label);
};
exports.ButtonRenderer = ButtonRenderer;
//# sourceMappingURL=ButtonElement.js.map