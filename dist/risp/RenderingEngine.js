"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingEngine = void 0;
const react_1 = __importDefault(require("react"));
const material_1 = require("@mui/material");
global.RenderingEngineRenderers = {};
/**
 * Registry for element rendering handlers.
 *
 * This is a global container to register all rendering handlers. It will have
 * all standard element renderers registered by default.
 */
class RenderingEngine {
    /**
     * Register a handler for an element type.
     * @param name
     * @param renderer
     * @returns Old handler if there was any.
     */
    static register(name, renderer) {
        const old = RenderingEngineRenderers[name] || null;
        // Not too nice but need to force custom types into registry as well.
        RenderingEngineRenderers[name] = renderer;
        return old;
    }
    /**
     * Find the registered renderer for the given properties and call the renderer if found.
     * @param props
     * @returns Elements.
     */
    static render(props) {
        const { element } = props;
        if (!RenderingEngineRenderers[element.type]) {
            console.error(`There is no registered renderer for type '${element.type}'.`);
            return react_1.default.createElement(material_1.Typography, { color: "error" }, JSON.stringify(element));
        }
        return RenderingEngineRenderers[element.type](props);
    }
}
exports.RenderingEngine = RenderingEngine;
//# sourceMappingURL=RenderingEngine.js.map