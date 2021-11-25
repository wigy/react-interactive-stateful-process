"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RISPProvider = void 0;
const __1 = require("..");
/**
 * Register all renderers and action handlers.
 */
const RISPProvider = ({ children }) => {
    __1.RenderingEngine.register('boolean', __1.BooleanRenderer);
    __1.RenderingEngine.register('text', __1.TextRenderer);
    __1.RenderingEngine.register('flat', __1.FlatRenderer);
    __1.RenderingEngine.register('button', __1.ButtonRenderer);
    __1.ActionEngine.register('debug', __1.debugActionHandler);
    __1.ActionEngine.register('patch', __1.patchActionHandler);
    __1.ActionEngine.register('post', __1.postActionHandler);
    __1.TriggerEngine.register('onChange', __1.onChangeTriggerHandler);
    __1.TriggerEngine.register('onClick', __1.passThroughTriggerHandler);
    __1.TriggerEngine.register('default', __1.passThroughTriggerHandler);
    return children;
};
exports.RISPProvider = RISPProvider;
