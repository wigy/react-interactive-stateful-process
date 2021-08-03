import { Setup } from "./Setup";
import { TriggerValues } from "./Triggers";
export declare type RendererName = string;
export declare type RenderingProps<SetupType = Setup, ElementType = Element> = {
    element: ElementType;
    values: TriggerValues;
    setup: SetupType;
};
