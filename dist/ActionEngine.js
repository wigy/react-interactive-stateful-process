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
exports.debugActionHandler = exports.ActionEngine = void 0;
const mobx_1 = require("mobx");
const interactive_elements_1 = require("interactive-elements");
/**
 * Registry and call API for action handlers.
 */
class ActionEngine {
    /**
     * Add a handler for the given action.
     * @param name
     * @param handler
     * @returns The old registered handler if there was any.
     */
    static register(name, handler) {
        const old = ActionEngine.actions[name] || null;
        // Not too nice but need to force custom types into registry as well.
        ActionEngine.actions[name] = handler;
        return old;
    }
    /**
     * Construct a result indicating a failure in action execution.
     * @param message Reason for the failure.
     * @returns A result object.
     */
    static fail(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                success: false,
                message
            };
        });
    }
    /**
     * Return success result from action.
     * @returns
     */
    static success() {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                success: true
            };
        });
    }
    /**
     * Processor for a triggered action on the given element.
     * @param trigger
     * @param props
     * @returns The element in the `props` is checked for action definitions.
     * If there is no actions defined, the result is success. If there is a single
     * action, it is executed and the resulting value is returned. If there is
     * an array of actions, all of them are executed. If any of them fails, the
     * result is failure. Otherwise success.
     */
    static handle(action, props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!action) {
                throw new Error(`Action engine called without action.`);
            }
            // Helper to run action.
            const runAction = (action, props) => __awaiter(this, void 0, void 0, function* () {
                if (!ActionEngine.actions[action.type]) {
                    throw new Error(`There is no action handler for action '${JSON.stringify(action)}'.`);
                }
                let ret;
                (0, mobx_1.runInAction)(() => __awaiter(this, void 0, void 0, function* () {
                    ret = yield ActionEngine.actions[action.type](action, props);
                }));
                return ret;
            });
            // Find handler for the given type.
            if (Array.isArray(action)) {
                const messages = [];
                for (let i = 0; i < action.length; i++) {
                    const result = yield runAction(action[i], props);
                    if (!result.success) {
                        messages.push(result.message);
                    }
                }
                return messages.length ? { success: false, message: messages.join('\n') } : { success: true };
            }
            else {
                return runAction(action, props);
            }
        });
    }
}
exports.ActionEngine = ActionEngine;
ActionEngine.actions = {};
/**
 * Handler that just prints the content of the trigger, the element and current values to the console.
 * @param trigger
 * @param props
 * @returns
 */
const debugActionHandler = (action, props) => __awaiter(void 0, void 0, void 0, function* () {
    const { element, values } = props;
    if ((0, interactive_elements_1.isActiveElement)(element)) {
        console.log('Action:', action);
        console.log('Element:', element);
        console.log('Values:', values);
    }
    return { success: true };
});
exports.debugActionHandler = debugActionHandler;
