import { DebugAction } from "./Actions/Debug";
import { PostAction } from "./Actions/Post";
import { Element } from "./Elements/index";
import { RenderingProps } from "./Rendering";
import { Setup } from "./Setup";
import { Trigger } from "./Triggers";
/**
 * Readability helper to specify that a string is being used as a trigger name.
 */
export declare type ActionName = string;
/**
 * Payload for the action execution.
 */
export declare type Action = DebugAction | PostAction;
/**
 * An action definition collection.
 */
export interface Actions {
    [key: string]: Action | Action[];
}
export interface SuccessgulActionResult {
    success: true;
}
export interface FailedActionResult {
    success: false;
    message: string;
}
export declare type ActionResult = Promise<SuccessgulActionResult | FailedActionResult>;
/**
 * A function processing an action.
 */
export interface ActionHandler<SetupType = Setup, ElementType = Element, TriggerType = Trigger> {
    (trigger: TriggerType, props: RenderingProps<SetupType, ElementType>): ActionResult;
}
