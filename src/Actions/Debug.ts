import { ActionHandler } from '../Actions'
import { RenderingProps } from '../Rendering'
import { Trigger } from '../Triggers'
import { ActiveElement } from '../Elements/ActiveElement'
import { Setup } from '../Setup'

export const debugActionHandler: ActionHandler<Setup, ActiveElement> = async (trigger: Trigger, props: RenderingProps) => {
  const { element } = props
  console.log('Action:', element.actions[trigger.type])
  console.log('Element:', element)
  console.log('Values:', props.values)
  return { success: true } // TODO: Format of response?
}
