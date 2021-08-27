import { Action, ActionHandler } from '../Actions'
import { isActiveElement } from '../Elements/ActiveElement'
import { RenderingProps } from '../Rendering'
import { Setup } from '../Setup'
import { Element } from '../Elements/index'

/**
 * Payload of `patch` action.
 */
 export interface PatchAction {
  readonly type: 'patch'
  url: string
}

export function isPatchAction(object: any): object is PatchAction {
  return 'url' in object && object.type === 'patch'
}

/**
 * A handler doing PATCH request with the selected all all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export const patchActionHandler: ActionHandler<Setup, Element, PatchAction> = async (action: PatchAction, props: RenderingProps) => {
  const { element, setup, values } = props
  if (isActiveElement(element)) {
    if (!setup.baseUrl) {
      throw new Error(`Cannot use patch action when setup does not define 'baseUrl'.`)
    }
    if (!isPatchAction(action)) {
      throw new Error(`Invalid action ${JSON.stringify(action)} for patch handler received.`)
    }
    const url = `${setup.baseUrl.replace(/\/$/, '')}/${action.url.replace(/^\//, '')}`
    console.log('TODO: Patch', url, values)
  }
  return { success: true }
}
