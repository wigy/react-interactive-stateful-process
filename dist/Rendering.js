"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingEngine = void 0;
const TextElement_1 = require("./Elements/TextElement");
const FlatElement_1 = require("./Elements/FlatElement");
const ButtonElement_1 = require("./Elements/ButtonElement");
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
        const old = RenderingEngine.renderers[name] || null;
        // Not too nice but need to force custom types into registry as well.
        RenderingEngine.renderers[name] = renderer;
        return old;
    }
    /**
     * Find the registered renderer for the given properties and call the renderer if found.
     * @param props
     * @returns Elements.
     */
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
RenderingEngine.register('flat', FlatElement_1.FlatRenderer);
RenderingEngine.register('button', ButtonElement_1.ButtonRenderer);
