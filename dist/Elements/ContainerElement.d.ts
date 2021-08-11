import { Element } from './index';
/**
 * An elment that contains other elements.
 */
export interface ContainerElement {
    elements: Element[];
}
export declare function isContainerElement(object: any): object is ContainerElement;
