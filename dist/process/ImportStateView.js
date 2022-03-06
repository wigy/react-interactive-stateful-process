"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportStateView = void 0;
const react_1 = __importDefault(require("react"));
const interactive_elements_1 = require("interactive-elements");
const ImportFile_1 = require("./ImportFile");
/**
 * Simple JSON display for state.
 * @param props
 * @returns
 */
const ImportStateView = (props) => {
    if (props.state === null) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    if (!(0, interactive_elements_1.isImportState)(props.state)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    const state = props.state;
    const result = state.result ? state.result : undefined;
    return (react_1.default.createElement("div", null, Object.entries(state.files).map(([name, file]) => (react_1.default.createElement(ImportFile_1.ImportFile, { key: name, name: name, config: props.config, resultView: props.resultView, result: result, lines: file.lines })))));
};
exports.ImportStateView = ImportStateView;
//# sourceMappingURL=ImportStateView.js.map