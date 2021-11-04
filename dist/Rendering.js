"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderingEngine = void 0;
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
            throw new Error(`There is no registered renderer for type '${element.type}'.`);
        }
        return RenderingEngineRenderers[element.type](props);
    }
}
exports.RenderingEngine = RenderingEngine;
