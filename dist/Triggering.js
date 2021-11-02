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
exports.TriggerEngine = void 0;
const mobx_1 = require("mobx");
const interactive_elements_1 = require("interactive-elements");
const ActionEngine_1 = require("./ActionEngine");
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
        const old = TriggerEngine.triggers[name] || null;
        // Not too nice but need to force custom types into registry as well.
        TriggerEngine.triggers[name] = handler;
        return old;
    }
    /**
     * Handler for triggered actions.
     * @param trigger Trigger data.
     * @param action Triggered action or actions if any.
     * @param props
     * @returns
     */
    static handle(trigger, props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!TriggerEngine.triggers[trigger.type]) {
                throw new Error(`There is no trigger handler for trigger type '${trigger.type}'.`);
            }
            let ret;
            (0, mobx_1.runInAction)(() => {
                ret = TriggerEngine.triggers[trigger.type](trigger, props);
            });
            return ret;
        });
    }
}
exports.TriggerEngine = TriggerEngine;
TriggerEngine.triggers = {};
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
TriggerEngine.register('onChange', onChangeTriggerHandler);
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
TriggerEngine.register('onClick', passThroughTriggerHandler);
TriggerEngine.register('default', passThroughTriggerHandler);
