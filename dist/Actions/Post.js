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
exports.postActionHandler = void 0;
const ActiveElement_1 = require("../Elements/ActiveElement");
/**
 * A handler doing POST request with the selected all all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
const postActionHandler = (action, props) => __awaiter(void 0, void 0, void 0, function* () {
    const { element, setup, values } = props;
    if (ActiveElement_1.isActiveElement(element)) {
        if (!setup.postUrl) {
            throw new Error(`Cannot use POST action when setup does not define 'postUrl'.`);
        }
        console.log('TODO: POST', values);
    }
    return { success: true };
});
exports.postActionHandler = postActionHandler;
