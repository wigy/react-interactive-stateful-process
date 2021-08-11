import { ActionHandler } from '../Actions';
/**
 * Payload of `debug` action.
 */
export interface DebugAction {
    readonly type: 'debug';
}
/**
 * Handler that just prints the content of the trigger, the element and current values to the console.
 * @param trigger
 * @param props
 * @returns
 */
export declare const debugActionHandler: ActionHandler;
