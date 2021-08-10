import { Setup } from '../Setup'
import { Actions, ActionHandler } from '../Actions'
import { Trigger } from '../Triggers'

/**
 * Generic interface for all elements that can define action handlers.
 */
export interface ActiveElement<SetupType=Setup, ElementType=Element, TriggerType=Trigger> {
  readonly type: string
  actionHandler: ActionHandler<SetupType, ElementType, TriggerType>
  actions: Actions
  label?: string
}

export function isActiveElement(object: any): object is ActiveElement {
  return !!object.actions
}
