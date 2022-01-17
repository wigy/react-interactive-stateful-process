"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RISPProvider = void 0;
const __1 = require("..");
let onBlurHook, onFocusHook;
/**
 * Register all renderers and action handlers.
 */
const RISPProvider = (props) => {
    const { onBlur, onFocus, children } = props;
    onBlurHook = onBlur;
    onFocusHook = onFocus;
    __1.RenderingEngine.register('boolean', __1.BooleanRenderer);
    __1.RenderingEngine.register('box', __1.BoxRenderer);
    __1.RenderingEngine.register('button', __1.ButtonRenderer);
    __1.RenderingEngine.register('flat', __1.FlatRenderer);
    __1.RenderingEngine.register('html', __1.HtmlRenderer);
    __1.RenderingEngine.register('message', __1.MessageRenderer);
    __1.RenderingEngine.register('radio', __1.RadioRenderer);
    __1.RenderingEngine.register('text', __1.TextRenderer);
    __1.RenderingEngine.register('textFileLine', __1.TextFileLineRenderer);
    __1.ActionEngine.register('debug', __1.debugActionHandler);
    __1.ActionEngine.register('patch', __1.patchActionHandler);
    __1.ActionEngine.register('post', __1.postActionHandler);
    return children;
};
exports.RISPProvider = RISPProvider;
/**
 * Extrnal calling interface for hooks.
 */
exports.RISPProvider.onBlur = () => {
    if (onBlurHook)
        onBlurHook();
};
exports.RISPProvider.onFocus = () => {
    if (onFocusHook)
        onFocusHook();
};
//# sourceMappingURL=RISPProvider.js.map