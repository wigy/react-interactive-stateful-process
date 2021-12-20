"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postActionHandler = exports.patchActionHandler = exports.debugActionHandler = exports.ActionEngine = void 0;
const mobx_1 = require("mobx");
const interactive_elements_1 = require("interactive-elements");
const axios_1 = __importDefault(require("axios"));
global.ActionEngineHandlers = {};
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
        const old = ActionEngineHandlers[name] || null;
        // Not too nice but need to force custom types into registry as well.
        ActionEngineHandlers[name] = handler;
        return old;
    }
    /**
     * Construct a result indicating a failure in action execution.
     * @param message Reason for the failure.
     * @returns A result object.
     */
    static async fail(message) {
        return {
            success: false,
            message
        };
    }
    /**
     * Return success result from action.
     * @returns
     */
    static async success(result) {
        return {
            success: true,
            result
        };
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
    static async handle(action, props) {
        if (!action) {
            throw new Error('Action engine called without action.');
        }
        // Helper to run action.
        const runAction = async (action, props) => {
            if (!ActionEngineHandlers[action.type]) {
                throw new Error(`There is no action handler for action '${JSON.stringify(action)}'.`);
            }
            let ret;
            await (0, mobx_1.runInAction)(async () => {
                ret = await ActionEngineHandlers[action.type](action, props);
            });
            return ret;
        };
        // Find handler for the given type.
        if (Array.isArray(action)) {
            const messages = [];
            const results = [];
            for (let i = 0; i < action.length; i++) {
                const result = await runAction(action[i], props);
                if (result.success) {
                    results.push(result.result);
                }
                else {
                    messages.push(result.message);
                }
            }
            return messages.length ? { success: false, message: messages.join('\n') } : { success: true, result: results };
        }
        else {
            return runAction(action, props);
        }
    }
}
exports.ActionEngine = ActionEngine;
/**
 * Handler that just prints the content of the trigger, the element and current values to the console.
 * @param trigger
 * @param props
 * @returns
 */
const debugActionHandler = async (action, props) => {
    const { element, values } = props;
    if ((0, interactive_elements_1.isActiveElement)(element)) {
        console.log('Action:', action);
        console.log('Element:', element);
        console.log('Values:', values);
    }
    return { success: true, result: undefined };
};
exports.debugActionHandler = debugActionHandler;
/**
 * Helper to process Axios requests.
 * @param method
 * @param action
 * @param props
 * @returns
 */
async function axiosRequst(method, action, props) {
    const { element, setup, values } = props;
    if ((0, interactive_elements_1.isActiveElement)(element)) {
        if (!setup.baseUrl) {
            throw new Error(`Cannot use ${method} action when setup does not define 'baseUrl'.`);
        }
        const url = `${setup.baseUrl.replace(/\/$/, '')}/${action.url.replace(/^\//, '')}`;
        const call = {
            method,
            url,
            data: values,
            headers: {}
        };
        if (setup.token) {
            call.headers = {
                Authorization: `Bearer ${setup.token}`
            };
        }
        let error;
        const result = await (0, axios_1.default)(call).catch(err => (error = err));
        if (error) {
            if (setup.errorMessage && action.errorMessage) {
                setup.errorMessage(action.errorMessage);
            }
            return { success: false, message: `PATCH ${url} failed: ${error}.` };
        }
        else {
            if (setup.successMessage && action.successMessage) {
                setup.successMessage(action.successMessage);
            }
            return { success: true, result: result.data };
        }
    }
    return { success: true, result: undefined };
}
/**
 * A handler doing PATCH request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
const patchActionHandler = async (action, props) => {
    return axiosRequst('PATCH', action, props);
};
exports.patchActionHandler = patchActionHandler;
/**
 * A handler doing POST request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
const postActionHandler = async (action, props) => {
    return axiosRequst('POST', action, props);
};
exports.postActionHandler = postActionHandler;
