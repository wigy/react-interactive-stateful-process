import { Element } from './index';
/**
 * An elment that contains other elements.
 */
export interface ContainerElement<ElementType = Element> {
    elements: ElementType[];
}
export declare function isContainerElement(object: any): object is ContainerElement;
