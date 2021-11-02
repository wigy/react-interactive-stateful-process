"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const interactive_elements_1 = require("interactive-elements");
/**
 * Collect all names defined in the element structure.
 * @param element
 */
function elementNames(element) {
    if ((0, interactive_elements_1.isContainerElement)(element)) {
        const vars = new Set();
        for (const sub of element.elements) {
            for (const name of elementNames(sub)) {
                vars.add(name);
            }
        }
        return vars;
    }
    else if ((0, interactive_elements_1.isNamedElement)(element)) {
        return new Set([element.name]);
    }
    return new Set();
}
exports.utils = {
    elementNames
};
