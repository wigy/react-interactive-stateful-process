"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultResultView = void 0;
const react_1 = __importDefault(require("react"));
/**
 * Simple JSON display for result.
 * @param props
 * @returns
 */
const DefaultResultView = (props) => {
    if (props.result === null) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("pre", null, JSON.stringify(props.result, null, 2)));
};
exports.DefaultResultView = DefaultResultView;
//# sourceMappingURL=DefaultResultView.js.map