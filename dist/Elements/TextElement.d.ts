import { Renderer } from "../Rendering";
/**
 * A text editing element.
 */
export interface TextElement {
    readonly type: string;
}
export declare function isTextElement(object: any): object is TextElement;
export declare const TextRenderer: Renderer;
