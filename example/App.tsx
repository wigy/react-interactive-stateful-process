import React from 'react'
import { observable, runInAction } from 'mobx'
import { Button, Paper, TextField, Typography } from '@material-ui/core'
import { RISP } from '../src/RISP'
import { ViewElement } from '../src/Elements/ViewElement'
import { ActiveElement, isActiveElement } from '../src/Elements/ActiveElement'
import { Setup } from '../src/Setup'
import { Renderer, RenderingEngine, RenderingProps } from '../src/Rendering'
import { TriggerEngine } from '../src/Triggering'
import { TriggerHandler, TriggerValues } from '../src/Triggers'
import { ActionEngine } from '../src/ActionEngine'
import { ActionHandler } from '../src/Actions'
import { Element } from '../src/Elements/index'
import { observer } from 'mobx-react'
import { FlatElement } from '../src/Elements/FlatElement'
import { FileUploader } from '../src/Components'

// Example of custom triggers, elements and action handlers.
// Setup:
type CustomSetup = Setup & { sample: number }

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
type CustomElement = ViewElement<
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
interface CustomAction {
  readonly type: 'custom'
}
const customActionHandler: ActionHandler<CustomSetup, CustomElement, CustomAction> = async (action: CustomAction, props: RenderingProps<CustomSetup, CustomElement>) => {
  const { element } = props
  console.log('Custom action handled with data', element.data)
  return { success: true }
}
ActionEngine.register('custom', customActionHandler)

/**
 * Sample application.
 */
const App = observer(() => {

  const setup: CustomSetup = {
    sample: 999
  }

  let values: TriggerValues = observable({
    a: '',
    b: ''
  })

  const element: FlatElement<CustomElement | Element> = {
    type: 'flat',
    elements: [
      {
        type: 'text',
        actions: {},
        label: 'First value',
        name: 'a'
      },
      {
        type: 'text',
        actions: {},
        label: 'Second value',
        name: 'b'
      },
      {
        type: 'custom',
        data: {
          a: 1, b: 2, c: 3
        },
        actions: {
          onCustom: { type: 'custom' }
        }
      }
    ]
  }

  // TODO: Update of RISP text fields has stopped working. Is it due to messed up node_module cross-project linking in dev machine?
  return (
    <>
      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Some Elements</Typography>
        <RISP key="demo1" element={element} values={values} setup={setup}/>
        <Button variant="outlined" onClick={() => { runInAction(() => {values.a = ''; values.b = ''})}}>RESET</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => {values.a = 'ABCDE' })}}>CHANGE A</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => values.b = 'FGHIJ')}}>CHANGE B</Button>
      </Paper>
      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Uploading</Typography>
        <FileUploader onUpload={(files) => console.log(files)} />
      </Paper>
    </>
  )
})

export default App;
