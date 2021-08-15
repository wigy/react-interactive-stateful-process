import { DebugAction } from "./Actions/Debug"
import { PostAction } from "./Actions/Post"
import { Element } from "./Elements/index"
import { RenderingProps } from "./Rendering"
import { Setup } from "./Setup"

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

/**
 * A result retuned by the action handler.
 */
export type ActionResult = Promise<SuccessgulActionResult | FailedActionResult>

/**
 * A successful result retuned by the action handler.
 */
 export interface SuccessgulActionResult {
  success: true
}

/**
 * A failure result retuned by the action handler.
 */
export interface FailedActionResult {
  success: false
  message: string
}

/**
 * A function processing an action.
 */
export interface ActionHandler<SetupType=Setup, ElementType=Element, ActionType=Action> {
  (action: ActionType, props: RenderingProps<SetupType, ElementType>): ActionResult
}
