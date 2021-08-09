export interface DebugAction {
    readonly type: 'debug';
}
export declare type Action = DebugAction;
export declare type ActionResult = Promise<any>;
