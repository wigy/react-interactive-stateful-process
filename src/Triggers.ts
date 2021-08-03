import { RenderingProps } from "./Rendering"

export type TriggerValue = string | number | null | TriggerValue[] | TriggerValues
export interface TriggerValues {
  [key: string]: TriggerValue
}

export type TriggerName = string
export interface OnChangeTrigger {
  readonly type: 'onChange'
  name: string
  value: TriggerValue
}
export interface OnClickTrigger {
  readonly type: 'onClick'
}
export type Trigger = OnChangeTrigger | OnClickTrigger
export interface TriggerHandler {
  (trigger: Trigger, props: RenderingProps): ActionResult
}
export type ActionResult = Promise<any>
