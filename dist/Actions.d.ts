import { RenderingProps } from "./Rendering";
import { Setup } from "./Setup";
import { Trigger } from "./Triggers";
export declare type ActionName = string;
export interface DebugAction {
    readonly type: 'debug';
}
export declare type Action = DebugAction;
export interface Actions {
    [key: string]: Action | Action[];
}
export declare type ActionResult = Promise<any>;
export interface ActionHandler<SetupType = Setup, ElementType = Element, TriggerType = Trigger> {
    (trigger: TriggerType, props: RenderingProps<SetupType, ElementType>): ActionResult;
}
