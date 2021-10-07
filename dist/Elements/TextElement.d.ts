import { Renderer } from "../Rendering";
import { ActiveElement } from "./ActiveElement";
import { NamedElement } from "./NamedElement";
/**
 * A text editing element.
 */
export interface TextElement extends ActiveElement, NamedElement {
    readonly type: string;
}
export declare function isTextElement(object: any): object is TextElement;
/**
 * Rendering for text editing element.
 */
export declare const TextRenderer: Renderer;
