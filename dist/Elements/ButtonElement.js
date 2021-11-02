"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonRenderer = void 0;
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const core_1 = require("@material-ui/core");
const interactive_elements_1 = require("interactive-elements");
const ButtonRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isButtonElement)(element)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const { t } = (0, react_i18next_1.useTranslation)();
    const label = t(`label-${element.label}`);
    return react_1.default.createElement(core_1.Button, { variant: "outlined", onClick: () => { element.triggerHandler && element.triggerHandler({ type: 'onClick' }, props); } }, label);
};
exports.ButtonRenderer = ButtonRenderer;
