import { TriggerName, TriggerHandler, Trigger, OnChangeTrigger } from "./Triggers"
import { RenderingProps } from "./Rendering"
import { ActionResult } from "./Actions"

/**
 * Registry for internal event trigger handlers.
 */
 export class TriggerEngine {

  private static triggers: { [key: string]: TriggerHandler} = {}

  static register(name: TriggerName, handler: TriggerHandler): TriggerHandler | null {
    const old = TriggerEngine.triggers[name] || null
    TriggerEngine.triggers[name] = handler
    return old
  }

  static async handle(trigger: Trigger, props: RenderingProps): ActionResult {
    if (!TriggerEngine.triggers[trigger.type]) {
      throw new Error(`There is no trigger handler for trigger type '${trigger.type}'.`)
    }
    return TriggerEngine.triggers[trigger.type](trigger, props)
  }
}

const onChangeTriggerHandler: TriggerHandler = (trigger: OnChangeTrigger, props: RenderingProps) => {
  // TODO: What do we have here? Docs.
  return new Promise(() => 'OK')
}
TriggerEngine.register('onChange', onChangeTriggerHandler)

const passThroughTriggerHandler: TriggerHandler = (trigger: OnChangeTrigger, props: RenderingProps) => {
  // TODO: What do we have here? Docs.
  return new Promise(() => 'OK')
}
TriggerEngine.register('onClick', passThroughTriggerHandler)
