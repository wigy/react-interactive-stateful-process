import { Action, ActionResult } from './Actions'
import { Element } from './Elements/index'
import { RenderingProps } from './Rendering'
import { Setup } from './Setup'

/**
 * A trigger is a data packet initiated by some activity in the application.
 * For example user interaction on UI component. Triggers are mapped to the
 * action handlers when used in RISP.
 */
export type Trigger = OnChangeTrigger | OnClickTrigger | { readonly type: string }

/**
 * This trigger is activated, when value of an input is changed.
 */
export interface OnChangeTrigger {
  readonly type: 'onChange'
  name: string
  value: TriggerValue
}

/**
 * This trigger is acticated by clicking on some target.
 */
export interface OnClickTrigger {
  readonly type: 'onClick'
}

/**
 * The handler function is a function converting the trigger data to the action result.
 */
export interface TriggerHandler<SetupType=Setup, ElementType=Element, TriggerType=Trigger> {
  (trigger: TriggerType, props: RenderingProps<SetupType, ElementType>): ActionResult
}

/**
 * A single payload that the trigger can have, i.e. tigger data.
 */
export type TriggerValue = string | number | boolean | null | TriggerValue[] | TriggerValues

/**
 * A map of names to trigger values.
 */
export interface TriggerValues {
  [key: string]: TriggerValue
}

/**
 * Readability helper to specify that a string is being used as a trigger name.
 */
 export type TriggerName = string
