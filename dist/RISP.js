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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RISP = void 0;
const react_1 = __importDefault(require("react"));
const mobx_react_1 = require("mobx-react");
const Rendering_1 = require("./Rendering");
const NamedElement_1 = require("./Elements/NamedElement");
const ContainerElement_1 = require("./Elements/ContainerElement");
const Triggering_1 = require("./Triggering");
/**
 * This is the main entry point for dynamical rendereding.
 *
 * It is very important to add unique `key` attribute if using various instances. Otherwise the
 * different number of hooks in different renderings can throw errors in React.
 *
 * @param props
 * @returns Completely controlled display section.
 */
exports.RISP = mobx_react_1.observer((props) => {
    const { values, element } = props;
    // Fill in appropriate fields for elements.
    const prepare = (element) => {
        // Named components have values.
        if (NamedElement_1.isNamedElement(element)) {
            if (values[element.name] === undefined) {
                values[element.name] = element.defaultValue || null;
            }
        }
        // Connect action handlers. We need to put them to all since unknown future types may not hit isActiveElement().
        element.triggerHandler = (trigger, props) => __awaiter(void 0, void 0, void 0, function* () { return Triggering_1.TriggerEngine.handle(trigger, props); });
        if (ContainerElement_1.isContainerElement(element)) {
            for (const e of element.elements) {
                prepare(e);
            }
        }
    };
    prepare(element);
    const ret = Rendering_1.RenderingEngine.render(props);
    if (ret === null) {
        return react_1.default.createElement(react_1.default.Fragment, null);
    }
    return ret;
});
