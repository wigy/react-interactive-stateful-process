import React from 'react'
import { Button } from '@mui/material'
import { Renderer, RenderingEngine, RenderingProps } from '../src/Rendering'
import { TriggerEngine } from '../src/Triggering'
import { ActionEngine } from '../src/ActionEngine'
import { ActionHandler, ActiveElement, InteractiveElement, isActiveElement, Setup, TriggerHandler, ViewElement } from 'interactive-elements'

// Example of custom triggers, elements and action handlers.

// Setup:
export type CustomSetup = Setup & { sample: number }

// Trigger:
export interface OnCustomTrigger {
  readonly type: 'onCustom'
  message: string
}
export const onCustomTriggerHandler: TriggerHandler<CustomSetup, InteractiveElement, OnCustomTrigger> = (trigger: OnCustomTrigger, props: RenderingProps) => {
  console.log('We activated onCustom trigger!')
  // Nothing to do. Just pass it to action handler.
  if (isActiveElement(props.element)) {
    return ActionEngine.handle(props.element.actions[trigger.type], props)
  }
  return ActionEngine.success()
}

// Element:
export type CustomElement = ViewElement<
  {
    a: number,
    b: number,
    c: number
  }
> & ActiveElement<CustomSetup, CustomElement, OnCustomTrigger, CustomAction> & { readonly type: 'custom' }

export const CustomRenderer: Renderer<CustomSetup, CustomElement> = (props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element, values } = props
  const standardProps = props
  return <>
    <br/>
    <Button variant="outlined" onClick={() => { element.triggerHandler && element.triggerHandler({ type: 'onCustom', message: 'We do it right!' }, standardProps)}}>Custom</Button><br/>
    Values: <pre>{JSON.stringify(values, null, 2)}</pre>
  </>
}

// Action:
export interface CustomAction {
  readonly type: 'custom'
}
export const customActionHandler: ActionHandler<CustomSetup, CustomElement, CustomAction> = async (action: CustomAction, props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element } = props
  console.log('Custom action handled with data', element.data)
  return { success: true }
}
