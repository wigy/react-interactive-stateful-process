import { RenderingProps } from "./Rendering";
export declare type TriggerValue = string | number | null | TriggerValue[] | TriggerValues;
export interface TriggerValues {
    [key: string]: TriggerValue;
}
export declare type TriggerName = string;
export declare type Trigger = OnChangeTrigger | OnClickTrigger;
export interface OnChangeTrigger {
    readonly type: 'onChange';
    name: string;
    value: TriggerValue;
}
export interface OnClickTrigger {
    readonly type: 'onClick';
}
export interface TriggerHandler {
    (trigger: Trigger, props: RenderingProps): ActionResult;
}
export declare type ActionResult = Promise<any>;
