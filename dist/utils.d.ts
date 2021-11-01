import { Element } from "interactive-stateful-process";
/**
 * Collect all names defined in the element structure.
 * @param element
 */
declare function elementNames(element: Element): Set<unknown>;
export declare const utils: {
    elementNames: typeof elementNames;
};
export {};
