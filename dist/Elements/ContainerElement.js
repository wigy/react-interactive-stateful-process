"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isContainerElement = void 0;
function isContainerElement(object) {
    return 'elements' in object;
}
exports.isContainerElement = isContainerElement;
