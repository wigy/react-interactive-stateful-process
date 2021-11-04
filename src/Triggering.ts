import { runInAction } from 'mobx'
import { TriggerName, TriggerHandler, Trigger, OnChangeTrigger, Setup, isNamedElement, isActiveElement } from "interactive-elements"
import { RenderingProps } from "./Rendering"
import { ActionEngine } from "./ActionEngine"
import { InteractiveElement, Action, ActionResult } from 'interactive-elements'

/**
 * Registry where all trigger handlers has been stored.
 */
export type TriggerHandlerRegistry = { [key: string]: TriggerHandler }
declare global {
  var TriggerEngineHandlers: TriggerHandlerRegistry
}
declare var TriggerEngineHandlers
global.TriggerEngineHandlers = {}

/**
 * Registry for internal event trigger handlers.
 */
export class TriggerEngine {

  /**
   * Add a trigger handler function to the registry.
   * @param name Name of the trigger.
   * @param handler Function executing trigger handling.
   * @returns
   */
  static register<SetupType = Setup, ElementType = InteractiveElement, TriggerType = Trigger, ActionType = Action>(name: TriggerName, handler: TriggerHandler<SetupType, ElementType, TriggerType>): TriggerHandler<SetupType, ElementType, TriggerType> | null {
    const old = TriggerEngineHandlers[name] || null
    // Not too nice but need to force custom types into registry as well.
    TriggerEngineHandlers[name] = handler as unknown as TriggerHandler<Setup, InteractiveElement, Trigger>
    return old as unknown as TriggerHandler<SetupType, ElementType, TriggerType>
  }

  /**
   * Handler for triggered actions.
   * @param trigger Trigger data.
   * @param action Triggered action or actions if any.
   * @param props
   * @returns
   */
  static async handle(trigger: Trigger, props: RenderingProps): ActionResult {
    if (!TriggerEngineHandlers[trigger.type]) {
      throw new Error(`There is no trigger handler for trigger type '${trigger.type}'.`)
    }
    let ret
    runInAction(() => {
      ret = TriggerEngineHandlers[trigger.type](trigger, props)
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
export const onChangeTriggerHandler: TriggerHandler = (trigger: OnChangeTrigger, props: RenderingProps) => {
  const { element } = props
  if (isNamedElement(element)) {
    props.values[trigger.name] = trigger.value
    if (isActiveElement(element) && element.actions[trigger.type]) {
      return ActionEngine.handle(element.actions[trigger.type], props)
    } else {
      return ActionEngine.success()
    }
  }
  return ActionEngine.fail(`The element ${JSON.stringify(element)} is not compatible with onChange.`)
}

/**
 * A default handler that passes trigger as is to the action handler.
 * @param trigger
 * @param props
 * @returns
 */
export const passThroughTriggerHandler: TriggerHandler = (trigger: Trigger, props: RenderingProps) => {
  const { element } = props
  if (isActiveElement(element) && element.actions[trigger.type]) {
    return ActionEngine.handle(element.actions[trigger.type], props)
  } else {
    return ActionEngine.handle(trigger as Action, props)
  }
}
