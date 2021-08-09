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
/**
 * Registry for internal event trigger handlers.
 */
class TriggerEngine {
    static register(name, handler) {
        const old = TriggerEngine.triggers[name] || null;
        TriggerEngine.triggers[name] = handler;
        return old;
    }
    static handle(trigger, props) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!TriggerEngine.triggers[trigger.type]) {
                throw new Error(`There is no trigger handler for trigger type '${trigger.type}'.`);
            }
            return TriggerEngine.triggers[trigger.type](trigger, props);
        });
    }
}
exports.TriggerEngine = TriggerEngine;
TriggerEngine.triggers = {};
const onChangeTriggerHandler = (trigger, props) => {
    // TODO: What do we have here? Docs.
    return new Promise(() => 'OK');
};
TriggerEngine.register('onChange', onChangeTriggerHandler);
const passThroughTriggerHandler = (trigger, props) => {
    // TODO: What do we have here? Docs.
    return new Promise(() => 'OK');
};
TriggerEngine.register('onClick', passThroughTriggerHandler);
