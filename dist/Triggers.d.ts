import { ActionResult } from './Actions';
import { RenderingProps } from './Rendering';
/**
 * A trigger is a data packet initiated by some activity in the application.
 * For example user interaction on UI component. Triggers are mapped to the
 * action handlers when used in RISP.
 */
export declare type Trigger = OnChangeTrigger | OnClickTrigger | {
    readonly type: string;
};
/**
 * This trigger is activated, when value of an input is changed.
 */
export interface OnChangeTrigger {
    readonly type: 'onChange';
    name: string;
    value: TriggerValue;
}
/**
 * This trigger is acticated by clicking on some target.
 */
export interface OnClickTrigger {
    readonly type: 'onClick';
}
/**
 * The handler function is a function converting the trigger data to the action result.
 */
export interface TriggerHandler<TriggerType = Trigger> {
    (trigger: TriggerType, props: RenderingProps): ActionResult;
}
/**
 * A single payload that the trigger can have, i.e. tigger data.
 */
export declare type TriggerValue = string | number | null | TriggerValue[] | TriggerValues;
/**
 * A map of names to trigger values.
 */
export interface TriggerValues {
    [key: string]: TriggerValue;
}
/**
 * Readability helper to specify that a string is being used as a trigger name.
 */
export declare type TriggerName = string;
