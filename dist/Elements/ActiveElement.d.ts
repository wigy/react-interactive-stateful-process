import { Setup } from '../Setup';
import { Actions } from '../Actions';
import { Element } from './index';
import { TriggerHandler, Trigger } from '../Triggers';
/**
 * Generic interface for all elements that can define action handlers.
 */
export interface ActiveElement<SetupType = Setup, ElementType = Element, TriggerType = Trigger> {
    readonly type: string;
    triggerHandler: TriggerHandler<SetupType, ElementType, TriggerType>;
    actions: Actions;
    label?: string;
}
export declare function isActiveElement(object: any): object is ActiveElement;
