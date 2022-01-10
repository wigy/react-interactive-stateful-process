import { ActionEngine, BooleanRenderer, BoxRenderer, ButtonRenderer, debugActionHandler, FlatRenderer, HtmlRenderer, MessageRenderer, patchActionHandler, postActionHandler, RadioRenderer, RenderingEngine, TextRenderer, TextFileLineRenderer } from '..'

/**
 * Register all renderers and action handlers.
 */
export const RISPProvider = ({ children }) => {

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
