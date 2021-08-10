import { ActionName, ActionResult, ActionHandler } from './Actions';
import { RenderingProps } from './Rendering';
import { Setup } from './Setup';
import { Trigger } from './Triggers';
import { Element } from './Elements/index';
/**
 * Registry and call API for action handlers.
 */
export declare class ActionEngine {
    private static actions;
    static register<SetupType = Setup, ElementType = Element>(name: ActionName, handler: ActionHandler<SetupType, ElementType>): ActionHandler | null;
    static fail(message: string): ActionResult;
    static handle(trigger: Trigger, props: RenderingProps): ActionResult;
}
