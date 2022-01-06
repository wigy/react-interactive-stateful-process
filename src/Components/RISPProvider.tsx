import { ActionEngine, BooleanRenderer, ButtonRenderer, debugActionHandler, FlatRenderer, MessageRenderer, patchActionHandler, postActionHandler, RenderingEngine, TextRenderer } from '..'

/**
 * Register all renderers and action handlers.
 */
export const RISPProvider = ({ children }) => {

  RenderingEngine.register('boolean', BooleanRenderer)
  RenderingEngine.register('text', TextRenderer)
  RenderingEngine.register('flat', FlatRenderer)
  RenderingEngine.register('button', ButtonRenderer)
  RenderingEngine.register('message', MessageRenderer)

  ActionEngine.register('debug', debugActionHandler)
  ActionEngine.register('patch', patchActionHandler)
  ActionEngine.register('post', postActionHandler)

  return children
}
