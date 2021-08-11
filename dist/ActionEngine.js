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
exports.ActionEngine = void 0;
const Debug_1 = require("./Actions/Debug");
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
     * Processor for a triggered action on the given element.
     * @param trigger
     * @param props
     * @returns The element in the `props` is checked for action definitions.
     * If there is no actions defined, the result is success. If there is a single
     * action, it is executed and the resulting value is returned. If there is
     * an array of actions, all of them are executed. If any of them fails, the
     * result is failure. Otherwise success.
     */
    static handle(trigger, props) {
        return __awaiter(this, void 0, void 0, function* () {
            const { element } = props;
            // Element has no actions defined.
            if (!('actions' in element) || element.actions === undefined) {
                return { success: true };
            }
            // Element has no action handler for the triggered event.
            if (!element.actions[trigger.type]) {
                return { success: true };
            }
            // Helper to run action.
            const runAction = (action, trigger, props) => {
                if (!ActionEngine.actions[action.type]) {
                    throw new Error(`There is no action handler for action '${JSON.stringify(action)}'.`);
                }
                return ActionEngine.actions[action.type](trigger, props);
            };
            // Find handler for the given type.
            const action = element.actions[trigger.type];
            if (Array.isArray(action)) {
                const messages = [];
                for (let i = 0; i < action.length; i++) {
                    const result = yield runAction(action[i], trigger, props);
                    if (!result.success) {
                        messages.push(result.message);
                    }
                }
                return messages.length ? { success: false, message: messages.join('\n') } : { success: true };
            }
            else {
                return runAction(action, trigger, props);
            }
        });
    }
}
exports.ActionEngine = ActionEngine;
ActionEngine.actions = {};
ActionEngine.register('debug', Debug_1.debugActionHandler);
