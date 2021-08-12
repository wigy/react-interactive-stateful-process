"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
const ContainerElement_1 = require("./Elements/ContainerElement");
const NamedElement_1 = require("./Elements/NamedElement");
/**
 * Collect all names defined in the element structure.
 * @param element
 */
function elementNames(element) {
    if (ContainerElement_1.isContainerElement(element)) {
        const vars = new Set();
        for (const sub of element.elements) {
            for (const name of elementNames(sub)) {
                vars.add(name);
            }
        }
        return vars;
    }
    else if (NamedElement_1.isNamedElement(element)) {
        return new Set([element.name]);
    }
    return new Set();
}
exports.utils = {
    elementNames
};
