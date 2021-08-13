import { ActionHandler } from '../Actions'
import { isActiveElement } from '../Elements/ActiveElement'
import { RenderingProps } from '../Rendering'
import { Trigger } from '../Triggers'

/**
 * Payload of `post` action.
 */
 export interface PostAction {
  readonly type: 'post'
}

/**
 * A handler doing POST request with the selected all all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export const postActionHandler: ActionHandler = async (trigger: Trigger, props: RenderingProps) => {
  const { element, setup } = props
  if (isActiveElement(element)) {
    if (!setup.postUrl) {
      throw new Error(`Cannot use POST action when setup does not define 'postUrl'.`)
    }
    console.log('TODO: POST', props.values)
  }
  return { success: true }
}
