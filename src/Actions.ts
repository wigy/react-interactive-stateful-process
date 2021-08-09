export interface DebugAction {
  readonly type: 'debug'
}
export type Action = DebugAction

export type ActionResult = Promise<any> /* TODO: What do we have here? */
