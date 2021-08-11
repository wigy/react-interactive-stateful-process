import { TextElement } from './TextElement';
import { ButtonElement } from './ButtonElement';
import { FlatElement } from './FlatElement';
/**
 * An elment that contains other elements.
 */
export interface ContainerElement {
    elements: Element[];
}
export declare type Element = TextElement | ButtonElement | FlatElement;
