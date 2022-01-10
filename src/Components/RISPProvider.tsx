import { ActionEngine, BooleanRenderer, BoxRenderer, ButtonRenderer, debugActionHandler, FlatRenderer, MessageRenderer, patchActionHandler, postActionHandler, RadioRenderer, RenderingEngine, TextRenderer } from '..'

/**
 * Register all renderers and action handlers.
 */
export const RISPProvider = ({ children }) => {

  RenderingEngine.register('boolean', BooleanRenderer)
  RenderingEngine.register('box', BoxRenderer)
  RenderingEngine.register('text', TextRenderer)
  RenderingEngine.register('flat', FlatRenderer)
  RenderingEngine.register('button', ButtonRenderer)
  RenderingEngine.register('message', MessageRenderer)
  RenderingEngine.register('radio', RadioRenderer)

  ActionEngine.register('debug', debugActionHandler)
  ActionEngine.register('patch', patchActionHandler)
  ActionEngine.register('post', postActionHandler)

  return children
}
