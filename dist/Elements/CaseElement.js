"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseRenderer = void 0;
const react_1 = __importDefault(require("react"));
const RenderingEngine_1 = require("../RenderingEngine");
const interactive_elements_1 = require("interactive-elements");
const CaseRenderer = (props) => {
    const { element, values } = props;
    if (!(0, interactive_elements_1.isCaseElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    const { cases, condition } = element;
    const noValue = values[condition] === undefined || values[condition] === null;
    const defaultValue = element.default === undefined ? undefined : element.default;
    const caseValue = noValue ? defaultValue : values[condition];
    const value = cases[`${caseValue}`];
    if (value === undefined) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return react_1.default.createElement("div", null,
        "CASE ",
        caseValue,
        " ",
        JSON.stringify(value),
        RenderingEngine_1.RenderingEngine.render({ values: props.values, setup: props.setup, element: value }));
};
exports.CaseRenderer = CaseRenderer;
//# sourceMappingURL=CaseElement.js.map