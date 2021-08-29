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
exports.patchActionHandler = exports.isPatchAction = void 0;
const ActiveElement_1 = require("../Elements/ActiveElement");
function isPatchAction(object) {
    return 'url' in object && object.type === 'patch';
}
exports.isPatchAction = isPatchAction;
/**
 * A handler doing PATCH request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
const patchActionHandler = (action, props) => __awaiter(void 0, void 0, void 0, function* () {
    const { element, setup, values } = props;
    if (ActiveElement_1.isActiveElement(element)) {
        if (!setup.baseUrl) {
            throw new Error(`Cannot use patch action when setup does not define 'baseUrl'.`);
        }
        if (!isPatchAction(action)) {
            throw new Error(`Invalid action ${JSON.stringify(action)} for patch handler received.`);
        }
        const url = `${setup.baseUrl.replace(/\/$/, '')}/${action.url.replace(/^\//, '')}`;
        console.log('TODO: Patch', url, values);
    }
    return { success: true };
});
exports.patchActionHandler = patchActionHandler;
