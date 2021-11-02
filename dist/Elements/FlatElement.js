"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatRenderer = void 0;
const react_1 = __importDefault(require("react"));
const Rendering_1 = require("../Rendering");
const interactive_elements_1 = require("interactive-elements");
const FlatRenderer = (props) => {
    const { element } = props;
    if (!(0, interactive_elements_1.isFlatElement)(element)) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return react_1.default.createElement(react_1.default.Fragment, null, element.elements.map((element, idx) => react_1.default.createElement("div", { key: idx }, Rendering_1.RenderingEngine.render({ values: props.values, setup: props.setup, element }))));
};
exports.FlatRenderer = FlatRenderer;
