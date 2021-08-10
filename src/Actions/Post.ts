import { ActionHandler } from '../Actions'
import { RenderingProps } from '../Rendering'
import { Trigger } from '../Triggers'
import { ActiveElement } from '../Elements/ActiveElement'
import { Setup } from '../Setup'

export const postActionHandler: ActionHandler<Setup, ActiveElement> = async (trigger: Trigger, props: RenderingProps) => {
  const { element } = props
  console.log('TODO: POST', props.values)
  return { success: true }
}
