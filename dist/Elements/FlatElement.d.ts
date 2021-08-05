import { Renderer } from "../Rendering";
import { ContainerElement } from '../Elements';
/**
 * A simple element container rendering each contained element one by one in DIV.
 */
export interface FlatElement extends ContainerElement {
    readonly type: 'flat';
}
export declare function isContainerElement(object: any): object is ContainerElement;
export declare const FlatRenderer: Renderer;
