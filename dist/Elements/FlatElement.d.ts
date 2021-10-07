import { Renderer } from "../Rendering";
import { Element } from './index';
import { ContainerElement } from './ContainerElement';
/**
 * A simple element container rendering each contained element one by one in DIV.
 */
export interface FlatElement<ElementType = Element> extends ContainerElement<ElementType> {
    readonly type: string;
}
export declare function isContainerElement(object: any): object is ContainerElement;
export declare const FlatRenderer: Renderer;
