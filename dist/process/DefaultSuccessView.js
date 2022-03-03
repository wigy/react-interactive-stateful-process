"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultSuccessView = void 0;
const material_1 = require("@mui/material");
const colors_1 = require("@mui/material/colors");
const react_1 = __importDefault(require("react"));
const react_i18next_1 = require("react-i18next");
const _1 = require(".");
/**
 * Simple state display showing a success mark if state is success.
 * @param props
 * @returns
 */
const DefaultSuccessView = (props) => {
    return (react_1.default.createElement(material_1.Card, null,
        react_1.default.createElement(material_1.CardContent, null,
            react_1.default.createElement(_1.ProcessStatusIcon, { status: 'SUCCEEDED' }),
            react_1.default.createElement(material_1.Typography, { sx: { color: colors_1.green[900] } },
                react_1.default.createElement(react_i18next_1.Trans, null, "Process Was Successfully Completed!")))));
};
exports.DefaultSuccessView = DefaultSuccessView;
//# sourceMappingURL=DefaultSuccessView.js.map