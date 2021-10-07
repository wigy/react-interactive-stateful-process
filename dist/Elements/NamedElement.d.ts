import { TriggerValue } from "../Triggers";
/**
 * An element that has a name and a value.
 */
export interface NamedElement {
    readonly type: string;
    name: string;
    defaultValue?: TriggerValue;
    label?: string;
}
export declare function isNamedElement(object: any): object is NamedElement;
