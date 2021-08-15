import { Action, ActionHandler } from '../Actions'
import { RenderingProps } from '../Rendering'
import { isActiveElement } from '../Elements/ActiveElement'

/**
 * Payload of `debug` action.
 */
export interface DebugAction {
  readonly type: 'debug'
}

/**
 * Handler that just prints the content of the trigger, the element and current values to the console.
 * @param trigger
 * @param props
 * @returns
 */
export const debugActionHandler: ActionHandler = async (action: Action, props: RenderingProps) => {
  const { element, values } = props
  if (isActiveElement(element)) {
    console.log('Action:', action)
    console.log('Element:', element)
    console.log('Values:', values)
  }
  return { success: true }
}
