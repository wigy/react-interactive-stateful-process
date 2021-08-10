import { DebugAction } from "./Actions/Debug"
import { PostAction } from "./Actions/Post"
import { ActiveElement } from "./Elements/ActiveElement"
import { RenderingProps } from "./Rendering"
import { Setup } from "./Setup"
import { Trigger } from "./Triggers"

/**
 * Readability helper to specify that a string is being used as a trigger name.
 */
export type ActionName = string

/**
 * Payload for the action execution.
 */
export type Action = DebugAction | PostAction

/**
 * An action definition collection.
 */
export interface Actions {
  [key: string]: Action | Action[]
}

export type ActionResult = Promise<any> /* TODO: What do we have here? */

/**
 * A function processing an action.
 */
export interface ActionHandler<SetupType=Setup, ElementType=ActiveElement, TriggerType=Trigger> {
  (trigger: TriggerType, props: RenderingProps<SetupType, ElementType>): ActionResult
}
