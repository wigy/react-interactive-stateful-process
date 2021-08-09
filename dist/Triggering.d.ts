import { TriggerName, TriggerHandler, Trigger } from "./Triggers";
import { RenderingProps } from "./Rendering";
import { ActionResult } from "./Actions";
/**
 * Registry for internal event trigger handlers.
 */
export declare class TriggerEngine {
    private static triggers;
    static register(name: TriggerName, handler: TriggerHandler): TriggerHandler | null;
    static handle(trigger: Trigger, props: RenderingProps): ActionResult;
}
