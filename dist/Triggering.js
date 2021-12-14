"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passThroughTriggerHandler = exports.onChangeTriggerHandler = exports.TriggerEngine = void 0;
const mobx_1 = require("mobx");
const interactive_elements_1 = require("interactive-elements");
const ActionEngine_1 = require("./ActionEngine");
global.TriggerEngineHandlers = {};
/**
 * Registry for internal event trigger handlers.
 */
class TriggerEngine {
    /**
     * Add a trigger handler function to the registry.
     * @param name Name of the trigger.
     * @param handler Function executing trigger handling.
     * @returns
     */
    static register(name, handler) {
        const old = TriggerEngineHandlers[name] || null;
        // Not too nice but need to force custom types into registry as well.
        TriggerEngineHandlers[name] = handler;
        return old;
    }
    /**
     * Handler for triggered actions.
     * @param trigger Trigger data.
     * @param action Triggered action or actions if any.
     * @param props
     * @returns
     */
    static async handle(trigger, props) {
        if (!TriggerEngineHandlers[trigger.type]) {
            throw new Error(`There is no trigger handler for trigger type '${trigger.type}'.`);
        }
        let ret;
        (0, mobx_1.runInAction)(() => {
            ret = TriggerEngineHandlers[trigger.type](trigger, props);
        });
        return ret;
    }
}
exports.TriggerEngine = TriggerEngine;
/**
 * A handler changing the value in the rendering props before passing the trigger to the action handler.
 * @param trigger
 * @param props
 * @returns
 */
const onChangeTriggerHandler = (trigger, props) => {
    const { element } = props;
    if ((0, interactive_elements_1.isNamedElement)(element)) {
        props.values[trigger.name] = trigger.value;
        if ((0, interactive_elements_1.isActiveElement)(element) && element.actions[trigger.type]) {
            return ActionEngine_1.ActionEngine.handle(element.actions[trigger.type], props);
        }
        else {
            return ActionEngine_1.ActionEngine.success();
        }
    }
    return ActionEngine_1.ActionEngine.fail(`The element ${JSON.stringify(element)} is not compatible with onChange.`);
};
exports.onChangeTriggerHandler = onChangeTriggerHandler;
/**
 * A default handler that passes trigger as is to the action handler.
 * @param trigger
 * @param props
 * @returns
 */
const passThroughTriggerHandler = (trigger, props) => {
    const { element } = props;
    if ((0, interactive_elements_1.isActiveElement)(element) && element.actions[trigger.type]) {
        return ActionEngine_1.ActionEngine.handle(element.actions[trigger.type], props);
    }
    else {
        return ActionEngine_1.ActionEngine.handle(trigger, props);
    }
};
exports.passThroughTriggerHandler = passThroughTriggerHandler;
