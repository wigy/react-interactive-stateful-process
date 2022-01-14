import { ActionEngine, BooleanRenderer, BoxRenderer, ButtonRenderer, debugActionHandler, FlatRenderer, HtmlRenderer, MessageRenderer, patchActionHandler, postActionHandler, RadioRenderer, RenderingEngine, TextRenderer, TextFileLineRenderer } from '..'

let onBlurHook, onFocusHook

/**
 * Register all renderers and action handlers.
 */
export const RISPProvider = ({ onBlur, onFocus, children }) => {
  onBlurHook = onBlur
  onFocusHook = onFocus
  RenderingEngine.register('boolean', BooleanRenderer)
  RenderingEngine.register('box', BoxRenderer)
  RenderingEngine.register('button', ButtonRenderer)
  RenderingEngine.register('flat', FlatRenderer)
  RenderingEngine.register('html', HtmlRenderer)
  RenderingEngine.register('message', MessageRenderer)
  RenderingEngine.register('radio', RadioRenderer)
  RenderingEngine.register('text', TextRenderer)
  RenderingEngine.register('textFileLine', TextFileLineRenderer)

  ActionEngine.register('debug', debugActionHandler)
  ActionEngine.register('patch', patchActionHandler)
  ActionEngine.register('post', postActionHandler)

  return children
}

RISPProvider.onBlur = () => {
  if (onBlurHook) onBlurHook()
}

RISPProvider.onFocus = () => {
  if (onFocusHook) onFocusHook()
}
