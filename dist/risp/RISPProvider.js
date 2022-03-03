"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RISPProvider = void 0;
const __1 = require("..");
const ActionEngine_1 = require("./ActionEngine");
const RenderingEngine_1 = require("./RenderingEngine");
let onBlurHook, onFocusHook;
/**
 * Register all renderers and action handlers.
 */
const RISPProvider = (props) => {
    const { onBlur, onFocus, children } = props;
    onBlurHook = onBlur;
    onFocusHook = onFocus;
    RenderingEngine_1.RenderingEngine.register('boolean', __1.BooleanRenderer);
    RenderingEngine_1.RenderingEngine.register('box', __1.BoxRenderer);
    RenderingEngine_1.RenderingEngine.register('button', __1.ButtonRenderer);
    RenderingEngine_1.RenderingEngine.register('case', __1.CaseRenderer);
    RenderingEngine_1.RenderingEngine.register('flat', __1.FlatRenderer);
    RenderingEngine_1.RenderingEngine.register('html', __1.HtmlRenderer);
    RenderingEngine_1.RenderingEngine.register('message', __1.MessageRenderer);
    RenderingEngine_1.RenderingEngine.register('number', __1.NumberRenderer);
    RenderingEngine_1.RenderingEngine.register('radio', __1.RadioRenderer);
    RenderingEngine_1.RenderingEngine.register('text', __1.TextRenderer);
    RenderingEngine_1.RenderingEngine.register('textFileLine', __1.TextFileLineRenderer);
    RenderingEngine_1.RenderingEngine.register('yesno', __1.YesNoRenderer);
    ActionEngine_1.ActionEngine.register('debug', ActionEngine_1.debugActionHandler);
    ActionEngine_1.ActionEngine.register('patch', ActionEngine_1.patchActionHandler);
    ActionEngine_1.ActionEngine.register('post', ActionEngine_1.postActionHandler);
    if (props.onInit) {
        props.onInit();
    }
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