import { ActionHandler } from '../Actions';
import { Setup } from '../Setup';
import { Element } from '../Elements/index';
/**
 * Payload of `patch` action.
 */
export interface PatchAction {
    readonly type: 'patch';
    url: string;
}
export declare function isPatchAction(object: any): object is PatchAction;
/**
 * A handler doing PATCH request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export declare const patchActionHandler: ActionHandler<Setup, Element, PatchAction>;
