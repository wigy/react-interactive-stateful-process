import { BooleanRenderer, BoxRenderer, ButtonRenderer, FlatRenderer, HtmlRenderer, MessageRenderer, RadioRenderer, TextRenderer, TextFileLineRenderer } from './Elements'
import { ActionEngine, debugActionHandler, patchActionHandler, postActionHandler } from './ActionEngine'
import { RenderingEngine } from './RenderingEngine'

let onBlurHook, onFocusHook

export type RISPProviderProps = {
  children: JSX.Element
  onBlur?: () => void | Promise<void>
  onFocus?: () => void | Promise<void>
}

/**
 * Register all renderers and action handlers.
 */
export const RISPProvider = (props: RISPProviderProps) => {
  const { onBlur, onFocus, children } = props
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

/**
 * Extrnal calling interface for hooks.
 */
RISPProvider.onBlur = () => {
  if (onBlurHook) onBlurHook()
}

RISPProvider.onFocus = () => {
  if (onFocusHook) onFocusHook()
}
