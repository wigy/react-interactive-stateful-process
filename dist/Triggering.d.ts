import { TriggerName, TriggerHandler, Trigger } from "./Triggers";
import { RenderingProps } from "./Rendering";
import { Action, ActionResult } from "./Actions";
import { Setup } from './Setup';
import { Element } from './Elements/index';
/**
 * Registry for internal event trigger handlers.
 */
export declare class TriggerEngine {
    private static triggers;
    /**
     * Add a trigger handler function to the registry.
     * @param name Name of the trigger.
     * @param handler Function executing trigger handling.
     * @returns
     */
    static register<SetupType = Setup, ElementType = Element, TriggerType = Trigger, ActionType = Action>(name: TriggerName, handler: TriggerHandler<SetupType, ElementType, TriggerType>): TriggerHandler<SetupType, ElementType, TriggerType> | null;
    /**
     * Handler for triggered actions.
     * @param trigger Trigger data.
     * @param action Triggered action or actions if any.
     * @param props
     * @returns
     */
    static handle(trigger: Trigger, props: RenderingProps): ActionResult;
}
