"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StepList = void 0;
const material_1 = require("@mui/material");
const react_1 = __importDefault(require("react"));
/**
 * A line showing steps.
 * @param props
 * @returns
 */
const StepList = (props) => {
    return (react_1.default.createElement(material_1.Stepper, { activeStep: props.currentStep || 0 }, props.operations.map((label, idx) => (react_1.default.createElement(material_1.Step, { key: idx },
        react_1.default.createElement(material_1.StepLabel, { onClick: () => props.onChangeStep(idx) }, label))))));
};
exports.StepList = StepList;
//# sourceMappingURL=StepList.js.map