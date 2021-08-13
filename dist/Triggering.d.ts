import { TriggerName, TriggerHandler, Trigger } from "./Triggers";
import { RenderingProps } from "./Rendering";
import { ActionResult } from "./Actions";
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
    static register<TriggerType = Trigger>(name: TriggerName, handler: TriggerHandler<TriggerType>): TriggerHandler<TriggerType> | null;
    static handle(trigger: Trigger, props: RenderingProps): ActionResult;
}
