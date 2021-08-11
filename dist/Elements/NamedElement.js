"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNamedElement = void 0;
function isNamedElement(object) {
    return 'name' in object;
}
exports.isNamedElement = isNamedElement;
