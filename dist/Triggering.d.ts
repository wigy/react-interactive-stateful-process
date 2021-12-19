import { TriggerName, TriggerHandler, Trigger, Setup, InteractiveElement, Action, ActionResult } from 'interactive-elements';
import { RenderingProps } from './Rendering';
/**
 * Registry where all trigger handlers has been stored.
 */
export declare type TriggerHandlerRegistry = {
    [key: string]: TriggerHandler;
};
declare global {
    var TriggerEngineHandlers: TriggerHandlerRegistry;
}
/**
 * Registry for internal event trigger handlers.
 */
export declare class TriggerEngine {
    /**
     * Add a trigger handler function to the registry.
     * @param name Name of the trigger.
     * @param handler Function executing trigger handling.
     * @returns
     */
    static register<SetupType = Setup, ElementType = InteractiveElement, TriggerType = Trigger, ActionType = Action>(name: TriggerName, handler: TriggerHandler<SetupType, ElementType, TriggerType>): TriggerHandler<SetupType, ElementType, TriggerType> | null;
    /**
     * Handler for triggered actions.
     * @param trigger Trigger data.
     * @param action Triggered action or actions if any.
     * @param props
     * @returns
     */
    static handle(trigger: Trigger, props: RenderingProps): ActionResult;
}
/**
 * A handler changing the value in the rendering props before passing the trigger to the action handler.
 * @param trigger
 * @param props
 * @returns
 */
export declare const onChangeTriggerHandler: TriggerHandler;
/**
 * A default handler that passes trigger as is to the action handler.
 * @param trigger
 * @param props
 * @returns
 */
export declare const passThroughTriggerHandler: TriggerHandler;
