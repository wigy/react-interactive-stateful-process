import { runInAction } from 'mobx'
import { TriggerName, TriggerHandler, Trigger, OnChangeTrigger } from "./Triggers"
import { RenderingProps } from "./Rendering"
import { Action, ActionResult } from "./Actions"
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
  static register<TriggerType=Trigger, ActionType=Action>(name: TriggerName, handler: TriggerHandler<TriggerType, ActionType>): TriggerHandler<TriggerType, ActionType> | null {
    const old = TriggerEngine.triggers[name] || null
    // Not too nice but need to force custom types into registry as well.
    TriggerEngine.triggers[name] = handler as unknown as TriggerHandler<Trigger>
    return old as unknown as TriggerHandler<TriggerType, ActionType>
  }

  /**
   * Handler for triggered actions.
   * @param trigger Trigger data.
   * @param action Triggered action or actions if any.
   * @param props
   * @returns
   */
  static async handle(trigger: Trigger, action: Action | Action[] | undefined, props: RenderingProps): ActionResult {
    if (!TriggerEngine.triggers[trigger.type]) {
      throw new Error(`There is no trigger handler for trigger type '${trigger.type}'.`)
    }
    if (!action) {
      return ActionEngine.fail('No action defined.')
    }
    let ret
    runInAction(async () => {
      if (Array.isArray(action)) {
        ret = []
        for (const act of action) {
          ret.push(await TriggerEngine.triggers[trigger.type](trigger, act, props))
        }
      } else {
        ret = await TriggerEngine.triggers[trigger.type](trigger, action, props)
      }
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
const onChangeTriggerHandler: TriggerHandler = (trigger: OnChangeTrigger, action: Action, props: RenderingProps) => {
  const { element } = props
  if (isNamedElement(element)) {
    element.value = trigger.value
    props.values[trigger.name] = trigger.value
    return ActionEngine.handle(action, props)
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
const passThroughTriggerHandler: TriggerHandler = (trigger: Trigger, action: Action, props: RenderingProps) => {
  return ActionEngine.handle(action, props)
}
TriggerEngine.register('onClick', passThroughTriggerHandler)
