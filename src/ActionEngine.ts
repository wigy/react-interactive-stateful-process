import { runInAction } from 'mobx'
import { ActionName, ActionResult, ActionHandler, Action, Setup, InteractiveElement, isActiveElement, PatchAction, PostAction } from 'interactive-elements'
import { RenderingProps } from './Rendering'
import axios from 'axios'

/**
 * Registry where all action handlers has been stored.
 */
export type ActionHandlerRegistry = { [key: string]: ActionHandler }
declare global {
  // eslint-disable-next-line no-var
  var ActionEngineHandlers: ActionHandlerRegistry
}
declare let ActionEngineHandlers
global.ActionEngineHandlers = {}

/**
 * Registry and call API for action handlers.
 */
export class ActionEngine {

  /**
   * Add a handler for the given action.
   * @param name
   * @param handler
   * @returns The old registered handler if there was any.
   */
  static register<SetupType = Setup, ElementType = InteractiveElement, ActionType = Action>(name: ActionName, handler: ActionHandler<SetupType, ElementType, ActionType>): ActionHandler | null {
    const old = ActionEngineHandlers[name] || null
    // Not too nice but need to force custom types into registry as well.
    ActionEngineHandlers[name] = handler as unknown as ActionHandler
    return old
  }

  /**
   * Construct a result indicating a failure in action execution.
   * @param message Reason for the failure.
   * @returns A result object.
   */
  static async fail(message: string): Promise<ActionResult> {
    return {
      success: false,
      message
    }
  }

  /**
   * Return success result from action.
   * @returns
   */
  static async success(result: unknown): Promise<ActionResult> {
    return {
      success: true,
      result
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
  static async handle<ActionType extends Action = Action>(action: ActionType | ActionType[], props: RenderingProps): Promise<ActionResult> {
    if (!action) {
      throw new Error('Action engine called without action.')
    }
    // Helper to run action.
    const runAction = async (action, props) => {
      if (!ActionEngineHandlers[action.type]) {
        throw new Error(`There is no action handler for action '${JSON.stringify(action)}'.`)
      }
      let ret
      await runInAction(async () => {
        ret = await ActionEngineHandlers[action.type](action, props)
      })
      return ret
    }

    // Find handler for the given type.
    if (Array.isArray(action)) {
      const messages: string[] = []
      const results: unknown[] = []
      for (let i = 0; i < action.length; i++) {
        const result = await runAction(action[i], props)
        if (result.success) {
          results.push(result.result)
        } else {
          messages.push(result.message)
        }
      }
      return messages.length ? { success: false, message: messages.join('\n') } : { success: true, result: results }
    } else {
      return runAction(action, props)
    }
  }
}

/**
 * Handler that just prints the content of the trigger, the element and current values to the console.
 * @param trigger
 * @param props
 * @returns
 */
export const debugActionHandler: ActionHandler = async (action: Action, props: RenderingProps) => {
  const { element, values } = props
  if (isActiveElement(element)) {
    console.log('Action:', action)
    console.log('Element:', element)
    console.log('Values:', values)
  }
  return { success: true, result: undefined }
}

/**
 * Helper to process Axios requests.
 * @param method
 * @param action
 * @param props
 * @returns
 */
async function axiosRequst(method: 'PATCH' | 'POST', action: PatchAction | PostAction, props: RenderingProps): Promise<ActionResult> {
  const { element, setup, values } = props
  if (isActiveElement(element)) {
    if (!setup.baseUrl) {
      throw new Error(`Cannot use ${method} action when setup does not define 'baseUrl'.`)
    }

    const url = `${setup.baseUrl.replace(/\/$/, '')}/${action.url.replace(/^\//, '')}`
    const call = {
      method,
      url,
      data: values,
      headers: {}
    }
    if (setup.token) {
      call.headers = {
        Authorization: `Bearer ${setup.token}`
      }
    }

    let error
    const result = await axios(call).catch(err => (error = err))

    if (error) {
      if (setup.errorMessage && action.errorMessage) {
        setup.errorMessage(action.errorMessage)
      }
      return { success: false, message: `PATCH ${url} failed: ${error}.` }
    } else {
      if (setup.successMessage && action.successMessage) {
        setup.successMessage(action.successMessage)
      }
      return { success: true, result: result.data }
    }
  }
  return { success: true, result: undefined }
}

/**
 * A handler doing PATCH request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export const patchActionHandler: ActionHandler = async (action: PatchAction, props: RenderingProps) => {
  return axiosRequst('PATCH', action, props)
}

/**
 * A handler doing POST request with the selected or all values to the configured URL.
 * @param trigger
 * @param props
 * @returns
 */
export const postActionHandler: ActionHandler = async (action: PostAction, props: RenderingProps) => {
  return axiosRequst('POST', action, props)
}
