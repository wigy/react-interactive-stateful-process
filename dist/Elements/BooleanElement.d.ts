import { Renderer } from "../Rendering";
import { ActiveElement } from "./ActiveElement";
import { NamedElement } from "./NamedElement";
/**
 * A boolean toggle element.
 */
export interface BooleanElement extends ActiveElement, NamedElement {
    readonly type: string;
}
export declare function isBooleanElement(object: any): object is BooleanElement;
/**
 * Rendering for boolean toggle element.
 */
export declare const BooleanRenderer: Renderer;
