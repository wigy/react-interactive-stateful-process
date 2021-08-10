import { ActionHandler } from '../Actions'
import { RenderingProps } from '../Rendering'
import { Trigger } from '../Triggers'
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
export const debugActionHandler: ActionHandler = async (trigger: Trigger, props: RenderingProps) => {
  const { element } = props
  if (isActiveElement(element)) {
    console.log('Action:', element.actions[trigger.type])
    console.log('Element:', element)
    console.log('Values:', props.values)
  }
  return { success: true } // TODO: Format of response?
}
