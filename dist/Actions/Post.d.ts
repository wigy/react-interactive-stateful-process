import { ActionHandler } from '../Actions';
/**
 * Payload of `post` action.
 */
export interface PostAction {
    readonly type: 'post';
    url: string;
}
/**
 * A handler doing POST request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export declare const postActionHandler: ActionHandler;
