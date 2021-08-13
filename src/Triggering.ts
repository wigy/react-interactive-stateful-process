import { runInAction } from 'mobx'
import { TriggerName, TriggerHandler, Trigger, OnChangeTrigger } from "./Triggers"
import { RenderingProps } from "./Rendering"
import { ActionResult } from "./Actions"
import { isNamedElement } from "./Elements/NamedElement"
import { ActionEngine } from "./ActionEngine"

/**
 * Registry for internal event trigger handlers.
 */
 export class TriggerEngine {

  private static triggers: { [key: string]: TriggerHandler} = {}

  /**
   * Add a trigger handler function to the registry.
   * @param name Name of the trigger.
   * @param handler Function executing trigger handling.
   * @returns
   */
  static register<TriggerType=Trigger>(name: TriggerName, handler: TriggerHandler<TriggerType>): TriggerHandler<TriggerType> | null {
    const old = TriggerEngine.triggers[name] || null
    // Not too nice but need to force custom types into registry as well.
    TriggerEngine.triggers[name] = handler as unknown as TriggerHandler<Trigger>
    return old as unknown as TriggerHandler<TriggerType>
  }

  static async handle(trigger: Trigger, props: RenderingProps): ActionResult {
    if (!TriggerEngine.triggers[trigger.type]) {
      throw new Error(`There is no trigger handler for trigger type '${trigger.type}'.`)
    }
    let ret
    runInAction(() => {
      ret = TriggerEngine.triggers[trigger.type](trigger, props)
    })
    return ret
  }
}

/**
 * A handler changing the value in the rendering props before passing the trigger to the action handler.
 * @param trigger
 * @param props
 * @returns
 */
const onChangeTriggerHandler: TriggerHandler = (trigger: OnChangeTrigger, props: RenderingProps) => {
  const { element } = props
  if (isNamedElement(element)) {
    element.value = trigger.value
    props.values[trigger.name] = trigger.value
    return ActionEngine.handle(trigger, props)
  }
  return ActionEngine.fail(`The element ${JSON.stringify(element)} is not compatible with onChange.`)
}
TriggerEngine.register('onChange', onChangeTriggerHandler)

/**
 * A default handler that passes trigger as is to the action handler.
 * @param trigger
 * @param props
 * @returns
 */
const passThroughTriggerHandler: TriggerHandler = (trigger: Trigger, props: RenderingProps) => {
  return ActionEngine.handle(trigger, props)
}
TriggerEngine.register('onClick', passThroughTriggerHandler)
