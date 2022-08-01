"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoxRenderer = void 0;
const react_1 = __importDefault(require("react"));
const __1 = require("..");
const interactive_elements_1 = require("interactive-elements");
const material_1 = require("@mui/material");
const BoxRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isBoxElement)(element)) {
        throw new Error(`Wrong renderer ${JSON.stringify(element)}.`);
    }
    return react_1.default.createElement(material_1.Card, { variant: "outlined" },
        ('title' in element) && react_1.default.createElement(material_1.CardHeader, { title: element.title }),
        react_1.default.createElement(material_1.CardContent, null, element.elements.map((element, idx) => (react_1.default.createElement(material_1.Box, { key: idx, sx: { mt: idx > 0 ? 1.5 : 0 } }, __1.RenderingEngine.render({ values: props.values, setup: props.setup, element }))))));
};
exports.BoxRenderer = BoxRenderer;
//# sourceMappingURL=BoxElement.js.map