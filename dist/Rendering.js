"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingEngine = void 0;
const TextElement_1 = require("./Elements/TextElement");
/**
 * Registry for element rendering handlers.
 */
class RenderingEngine {
    static register(name, renderer) {
        const old = RenderingEngine.renderers[name] || null;
        // Not too nice but need to force custom types into registry as well.
        RenderingEngine.renderers[name] = renderer;
        return old;
    }
    static render(props) {
        const { element } = props;
        if (!RenderingEngine.renderers[element.type]) {
            throw new Error(`There is no registered renderer for type '${element.type}'.`);
        }
        return RenderingEngine.renderers[element.type](props);
    }
}
exports.RenderingEngine = RenderingEngine;
RenderingEngine.renderers = {};
RenderingEngine.register('text', TextElement_1.TextRenderer);
