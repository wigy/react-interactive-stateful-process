"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaseRenderer = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const interactive_elements_1 = require("interactive-elements");
const CaseRenderer = (props) => {
    const { element, values } = props;
    if (!(0, interactive_elements_1.isCaseElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    const { cases, condition } = element;
    const noValue = values[condition] === undefined || values[condition] === null;
    const defaultValue = element.defaultValue === undefined ? undefined : element.defaultValue;
    const selectedCase = noValue ? defaultValue : values[condition];
    const rendering = {};
    for (const [value, element] of Object.entries(cases)) {
        rendering[value] = __1.RenderingEngine.render({ values: props.values, setup: props.setup, element });
    }
    return react_1.default.createElement(react_1.default.Fragment, null, Object.entries(rendering).map(([value, jsx]) => (react_1.default.createElement("div", { key: value, style: { display: `${value}` === `${selectedCase}` ? 'block' : 'none' } }, jsx))));
};
exports.CaseRenderer = CaseRenderer;
//# sourceMappingURL=CaseElement.js.map