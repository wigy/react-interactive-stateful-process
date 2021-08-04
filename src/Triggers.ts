import { RenderingProps } from "./Rendering"

// TODO: Docs and doc building.
export type TriggerValue = string | number | null | TriggerValue[] | TriggerValues
export interface TriggerValues {
  [key: string]: TriggerValue
}

export type TriggerName = string

export type Trigger = OnChangeTrigger | OnClickTrigger
export interface OnChangeTrigger {
  readonly type: 'onChange'
  name: string
  value: TriggerValue
}
export interface OnClickTrigger {
  readonly type: 'onClick'
}

export interface TriggerHandler {
  (trigger: Trigger, props: RenderingProps): ActionResult
}
export type ActionResult = Promise<any>