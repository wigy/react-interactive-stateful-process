import { Setup } from '../Setup';
import { Actions, ActionHandler } from '../Actions';
import { Trigger } from '../Triggers';
export interface ActiveElement<SetupType = Setup, ElementType = Element, TriggerType = Trigger> {
    readonly type: string;
    actionHandler: ActionHandler<SetupType, ElementType, TriggerType>;
    actions: Actions;
    label?: string;
}
export declare function isActiveElement(object: any): object is ActiveElement;
