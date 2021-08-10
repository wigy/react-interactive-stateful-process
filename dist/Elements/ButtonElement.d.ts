import { Renderer } from "../Rendering";
import { ActiveElement } from './ActiveElement';
/**
 * An element activating an action when clicked.
 */
export interface ButtonElement extends ActiveElement {
    readonly type: string;
    label: string;
}
export declare const ButtonRenderer: Renderer;
export declare function isButtonElement(object: any): object is ButtonElement;
