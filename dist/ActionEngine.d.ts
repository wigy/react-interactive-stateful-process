import { ActionName, ActionResult, ActionHandler, Action } from './Actions';
import { RenderingProps } from './Rendering';
import { Setup } from './Setup';
import { Element } from './Elements/index';
/**
 * Registry and call API for action handlers.
 */
export declare class ActionEngine {
    private static actions;
    /**
     * Add a handler for the given action.
     * @param name
     * @param handler
     * @returns The old registered handler if there was any.
     */
    static register<SetupType = Setup, ElementType = Element, ActionType = Action>(name: ActionName, handler: ActionHandler<SetupType, ElementType, ActionType>): ActionHandler | null;
    /**
     * Construct a result indicating a failure in action execution.
     * @param message Reason for the failure.
     * @returns A result object.
     */
    static fail(message: string): ActionResult;
    /**
     * Return success result from action.
     * @returns
     */
    static success(): ActionResult;
    /**
     * Processor for a triggered action on the given element.
     * @param trigger
     * @param props
     * @returns The element in the `props` is checked for action definitions.
     * If there is no actions defined, the result is success. If there is a single
     * action, it is executed and the resulting value is returned. If there is
     * an array of actions, all of them are executed. If any of them fails, the
     * result is failure. Otherwise success.
     */
    static handle<ActionType extends Action = Action>(action: ActionType | ActionType[], props: RenderingProps): ActionResult;
}
