import { runInAction } from 'mobx'
import { TriggerName, TriggerHandler, Trigger, OnChangeTrigger } from "./Triggers"
import { RenderingProps } from "./Rendering"
import { Action, ActionResult } from "./Actions"
import { isNamedElement } from "./Elements/NamedElement"
import { ActionEngine } from "./ActionEngine"
import { isActiveElement } from './Elements/ActiveElement'

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
  static register<TriggerType=Trigger, ActionType=Action>(name: TriggerName, handler: TriggerHandler<TriggerType>): TriggerHandler<TriggerType> | null {
    const old = TriggerEngine.triggers[name] || null
    // Not too nice but need to force custom types into registry as well.
    TriggerEngine.triggers[name] = handler as unknown as TriggerHandler<Trigger>
    return old as unknown as TriggerHandler<TriggerType>
  }

  /**
   * Handler for triggered actions.
   * @param trigger Trigger data.
   * @param action Triggered action or actions if any.
   * @param props
   * @returns
   */
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
    if (isActiveElement(element)) {
      return ActionEngine.handle(element.actions[trigger.type], props)
    }
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
  const { element } = props
  if (isActiveElement(element)) {
    return ActionEngine.handle(element.actions[trigger.type], props)
  }
  return ActionEngine.success()
}
TriggerEngine.register('onClick', passThroughTriggerHandler)
