import { ActionEngine, BooleanRenderer, ButtonRenderer, debugActionHandler, FlatRenderer, onChangeTriggerHandler, passThroughTriggerHandler, RenderingEngine, TextRenderer, TriggerEngine } from '..'

/**
 * Register all renderers and action handlers.
 */
export const RISPProvider = ({ children }) => {

  RenderingEngine.register('boolean', BooleanRenderer)
  RenderingEngine.register('text', TextRenderer)
  RenderingEngine.register('flat', FlatRenderer)
  RenderingEngine.register('button', ButtonRenderer)

  ActionEngine.register('debug', debugActionHandler)

  TriggerEngine.register('onChange', onChangeTriggerHandler)
  TriggerEngine.register('onClick', passThroughTriggerHandler)
  TriggerEngine.register('default', passThroughTriggerHandler)

  return children
}
