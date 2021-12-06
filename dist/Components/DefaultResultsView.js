"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultResultsView = void 0;
const react_1 = __importDefault(require("react"));
/**
 * Simple JSON display for results.
 * @param props
 * @returns
 */
const DefaultResultsView = (props) => {
    if (props.results === null) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return (react_1.default.createElement("pre", null, JSON.stringify(props.results, null, 2)));
};
exports.DefaultResultsView = DefaultResultsView;
