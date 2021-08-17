import React from 'react';
import { observable, runInAction } from 'mobx'
import { Paper } from '@material-ui/core'
import { RISP } from '../src/RISP';
import { ViewElement } from '../src/Elements/ViewElement';
import { ActiveElement, isActiveElement } from '../src/Elements/ActiveElement';
import { Setup } from '../src/Setup';
import { Renderer, RenderingEngine, RenderingProps } from '../src/Rendering';
import { TriggerEngine } from '../src/Triggering';
import { Trigger, TriggerHandler, TriggerValues } from '../src/Triggers';
import { ActionEngine } from '../src/ActionEngine';
import { Action, ActionHandler } from '../src/Actions';
import { Element } from '../src/Elements/index';
import { observer } from 'mobx-react';

// Example of custom triggers, elements and action handlers.
// Setup:
type CustomSetup = Setup & { sample: number }

// Trigger:
export interface OnCustomTrigger {
  readonly type: 'onCustom'
  message: string
}
const onCustomTriggerHandler: TriggerHandler<OnCustomTrigger> = (trigger: OnCustomTrigger, props: RenderingProps) => {
  console.log('We activated onCustom trigger!')
  // Nothing to do. Just pass it to action handler.
  if (isActiveElement(props.element)) {
    return ActionEngine.handle(props.element.actions[trigger.type], props)
  }
  return ActionEngine.success()
}
TriggerEngine.register('onCustom', onCustomTriggerHandler)

// Element:
type CustomElement = ViewElement<
  {
    a: number,
    b: number,
    c: number
  }
> & ActiveElement<CustomSetup, CustomElement, OnCustomTrigger> & { readonly type: 'custom' }

const CustomRenderer: Renderer<CustomSetup, CustomElement> = (props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element, values } = props
  // TODO: Pass templates via trigger handler to deeper in order to fix this.
  const standardProps = props as unknown as  RenderingProps<Setup, Element>
  return <>
    <br/>
    <button onClick={() => { element.triggerHandler({ type: 'onCustom', message: 'We do it right!' }, standardProps)}}>Custom</button><br/>
    Values: <pre>{JSON.stringify(values, null, 2)}</pre>
  </>
}
RenderingEngine.register('custom', CustomRenderer)

// Action:
const customActionHandler: ActionHandler<CustomSetup, CustomElement> = async (action: Action, props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element } = props
  console.log('Custom action handled with data', element.data)
  return { success: true }
}
ActionEngine.register('custom', customActionHandler)

const App = observer(() => {

  const setup: CustomSetup = {
    sample: 999
  }

  let values: TriggerValues = observable({
    a: '',
    b: ''
  })

  // TODO: Cannot define yet element type smoothly here. Need to reorganize types a bit.
  const element = {
    type: 'flat',
    elements: [
      {
        type: 'text',
        actions: {},
        label: 'First value',
        name: 'a',
        value: ''
      },
      {
        type: 'text',
        actions: {},
        label: 'Second value',
        name: 'b',
        value: ''
      },
      {
        type: 'custom',
        data: {
          a: 1, b: 2, c: 3
        },
        actions: {
          onCustom: { type: 'custom' }
        },
      }
    ]
  }

  return (
    <Paper style={{ padding: '1rem' }} elevation={4}>
      App is Up!
      <br />
      <RISP element={element} values={values} setup={setup}/>
      <button onClick={() => { runInAction(() => {values.a = ''; values.b = ''})}}>RESET</button>
      <button onClick={() => { runInAction(() => {values.a = 'ABCDE' })}}>CHANGE A</button>
      <button onClick={() => { runInAction(() => values.b = 'FGHIJ')}}>CHANGE B</button>
    </Paper>
  );
})

export default App;
