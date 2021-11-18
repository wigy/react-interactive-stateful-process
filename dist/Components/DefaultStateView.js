"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStateView = void 0;
const react_1 = __importDefault(require("react"));
/**
 * Simple JSON display for state.
 * @param props
 * @returns
 */
const DefaultStateView = (props) => {
    if (props.state === null) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("pre", null, JSON.stringify(props.state, null, 2)));
};
exports.DefaultStateView = DefaultStateView;
