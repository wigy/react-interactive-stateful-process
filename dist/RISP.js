"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RISP = void 0;
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
const RenderingEngine_1 = require("./RenderingEngine");
const interactive_elements_1 = require("interactive-elements");
const mobx_1 = require("mobx");
const ActionEngine_1 = require("./ActionEngine");
/**
 * This is the main entry point for dynamical rendereding.
 *
 * It is very important to add unique `key` attribute if using various instances. Otherwise the
 * different number of hooks in different renderings can throw errors in React.
 *
 * @param props
 * @returns Completely controlled display section.
 */
exports.RISP = (0, mobx_react_1.observer)((rispProps) => {
    const { values, element } = rispProps;
    // Fill in appropriate fields for elements.
    const prepare = (element) => {
        // Named components have values.
        if ((0, interactive_elements_1.isNamedElement)(element)) {
            if (values[element.name] === undefined && element.defaultValue !== undefined) {
                values[element.name] = element.defaultValue;
            }
        }
        // Connect action handlers. We need to put handler every element since unknown future types may not hit isActiveElement().
        element.triggerHandler = async (trigger, props) => {
            if ((0, interactive_elements_1.isNamedElement)(element) && 'value' in trigger) {
                (0, mobx_1.runInAction)(() => (props.values[element.name] = trigger.value));
            }
            if ((0, interactive_elements_1.isActiveElement)(element) && element.actions[trigger.type]) {
                const result = await ActionEngine_1.ActionEngine.handle(element.actions[trigger.type], props);
                if (result.success && rispProps.onActionSuccess) {
                    rispProps.onActionSuccess(result.result, trigger.type, props);
                }
                return result;
            }
            return ActionEngine_1.ActionEngine.success(undefined);
        };
        if ((0, interactive_elements_1.isContainerElement)(element)) {
            for (const e of element.elements) {
                prepare(e);
            }
        }
    };
    prepare(element);
    const ret = RenderingEngine_1.RenderingEngine.render(rispProps);
    if (ret === null) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return ret;
});
//# sourceMappingURL=RISP.js.map