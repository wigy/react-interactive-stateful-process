import { RenderingProps } from "./Rendering"
import { Setup } from "./Setup"
import { Trigger } from "./Triggers"

export type ActionName = string

export interface DebugAction {
  readonly type: 'debug'
}
export type Action = DebugAction

export interface Actions {
  [key: string]: Action | Action[]
}

export type ActionResult = Promise<any> /* TODO: What do we have here? */

export interface ActionHandler<SetupType=Setup, ElementType=Element, TriggerType=Trigger> {
  (trigger: TriggerType, props: RenderingProps<SetupType, ElementType>): ActionResult
}
