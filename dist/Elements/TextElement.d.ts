import { Renderer } from "../Rendering";
import { ActiveElement } from "./ActiveElement";
/**
 * A text editing element.
 */
export interface TextElement extends ActiveElement {
    readonly type: string;
}
export declare function isTextElement(object: any): object is TextElement;
/**
 * Rendering for text editing element.
 */
export declare const TextRenderer: Renderer;
