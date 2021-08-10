import { ActionName, ActionResult, ActionHandler } from './Actions'
import { RenderingProps } from './Rendering'
import { Setup } from './Setup'
import { Trigger } from './Triggers'
import { Element } from './Elements/index'
import { debugActionHandler } from './Actions/Debug'

/**
 * Registry and call API for action handlers.
 */
export class ActionEngine {

  private static actions: { [key: string]: ActionHandler} = {}

  /**
   * Add a handler for the given action.
   * @param name
   * @param handler
   * @returns The old registered handler if there was any.
   */
  static register<SetupType=Setup, ElementType=Element>(name: ActionName, handler: ActionHandler<SetupType, ElementType>): ActionHandler | null {
    const old = ActionEngine.actions[name] || null
    // Not too nice but need to force custom types into registry as well.
    ActionEngine.actions[name] = handler as unknown as ActionHandler
    return old
  }

  /**
   * Construct a result indicating a failure in action execution.
   * @param message Reason for the failure.
   * @returns A result object.
   */
  static async fail(message: string): ActionResult {
    return {
      success: false,
      message
    }
  }

  /**
   * Processor for a triggered action on the given element.
   * @param trigger
   * @param props
   * @returns The element in the `props` is checked for action definitions.
   * If there is no actions defined, the result is success. If there is a single
   * action, it is executed and the resulting value is returned. If there is
   * an array of actions, all of them are executed. If any of them fails, the
   * result is failure. Otherwise success.
   */
  static async handle(trigger: Trigger, props: RenderingProps): ActionResult {
    const { element } = props
    // Element has no actions defined.
    if (! ('actions' in element) || element.actions === undefined) {
      return { success: true }
    }
    // Element has no action handler for the triggered event.
    if (!element.actions[trigger.type]) {
      return { success: true }
    }
    // Helper to run action.
    const runAction = (action, trigger, props) => {
      if (!ActionEngine.actions[action.type]) {
        throw new Error(`There is no action handler for action '${JSON.stringify(action)}'.`)
      }
      return ActionEngine.actions[action.type](trigger, props)
    }

    // Find handler for the given type.
    const action = element.actions[trigger.type]
    if (Array.isArray(action)) {
      const messages: string[] = []
      for ( let i = 0; i < action.length; i++) {
        const result = await runAction(action[i], trigger, props)
        if (!result.success) {
          messages.push(result.message)
        }
      }
      return messages.length ? { success: false, message: messages.join('\n') } : { success: true }
    } else {
      return runAction(action, trigger, props)
    }
  }
}

ActionEngine.register('debug', debugActionHandler)
