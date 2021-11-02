import { Button } from '@material-ui/core'
import { Renderer, RenderingEngine, RenderingProps } from '../src/Rendering'
import { TriggerEngine } from '../src/Triggering'
import { ActionEngine } from '../src/ActionEngine'
import { ActionHandler, ActiveElement, Element, isActiveElement, Setup, TriggerHandler, ViewElement } from 'interactive-elements'

// Example of custom triggers, elements and action handlers.

// Setup:
export type CustomSetup = Setup & { sample: number }

// Trigger:
export interface OnCustomTrigger {
  readonly type: 'onCustom'
  message: string
}
const onCustomTriggerHandler: TriggerHandler<CustomSetup, Element, OnCustomTrigger> = (trigger: OnCustomTrigger, props: RenderingProps) => {
  console.log('We activated onCustom trigger!')
  // Nothing to do. Just pass it to action handler.
  if (isActiveElement(props.element)) {
    return ActionEngine.handle(props.element.actions[trigger.type], props)
  }
  return ActionEngine.success()
}
TriggerEngine.register<CustomSetup, Element, OnCustomTrigger>('onCustom', onCustomTriggerHandler)

// Element:
export type CustomElement = ViewElement<
  {
    a: number,
    b: number,
    c: number
  }
> & ActiveElement<CustomSetup, CustomElement, OnCustomTrigger, CustomAction> & { readonly type: 'custom' }

const CustomRenderer: Renderer<CustomSetup, CustomElement> = (props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element, values } = props
  const standardProps = props
  return <>
    <br/>
    <Button variant="outlined" onClick={() => { element.triggerHandler && element.triggerHandler({ type: 'onCustom', message: 'We do it right!' }, standardProps)}}>Custom</Button><br/>
    Values: <pre>{JSON.stringify(values, null, 2)}</pre>
  </>
}
RenderingEngine.register('custom', CustomRenderer)

// Action:
export interface CustomAction {
  readonly type: 'custom'
}
const customActionHandler: ActionHandler<CustomSetup, CustomElement, CustomAction> = async (action: CustomAction, props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element } = props
  console.log('Custom action handled with data', element.data)
  return { success: true }
}
ActionEngine.register('custom', customActionHandler)
