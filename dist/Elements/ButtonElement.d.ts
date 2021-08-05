import { Renderer } from "../Rendering";
/**
 * An element activating an action when clicked.
 */
export interface ButtonElement extends Element {
    readonly type: 'button';
    label: string;
}
export declare const ButtonRenderer: Renderer;
export declare function isButtonElement(object: any): object is ButtonElement;
