import { InteractiveElement } from 'interactive-elements';
/**
 * Collect all names defined in the element structure.
 * @param element
 */
declare function elementNames(element: InteractiveElement): Set<unknown>;
export declare const utils: {
    elementNames: typeof elementNames;
};
export {};
