"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.debugActionHandler = void 0;
const ActiveElement_1 = require("../Elements/ActiveElement");
/**
 * Handler that just prints the content of the trigger, the element and current values to the console.
 * @param trigger
 * @param props
 * @returns
 */
const debugActionHandler = (trigger, props) => __awaiter(void 0, void 0, void 0, function* () {
    const { element } = props;
    if (ActiveElement_1.isActiveElement(element)) {
        console.log('Action:', element.actions[trigger.type]);
        console.log('Element:', element);
        console.log('Values:', props.values);
    }
    return { success: true };
});
exports.debugActionHandler = debugActionHandler;
