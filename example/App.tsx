import React, { useState } from 'react'
import axios from 'axios'
import { observable, runInAction } from 'mobx'
import { Button, Paper, Typography } from '@material-ui/core'
import { RISP } from '../src/RISP'
import { observer } from 'mobx-react'
import { FileUploader } from '../src/Components'
import { InteractiveElement, FlatElement, TriggerValues } from 'interactive-elements'
import { customActionHandler, CustomElement, CustomRenderer, CustomSetup, OnCustomTrigger, onCustomTriggerHandler } from './Components'
import { TriggerEngine } from '../src/Triggering'
import { ActionEngine } from '../src/ActionEngine'
import { RenderingEngine } from '../src/Rendering'
import { ProcessList } from '../src/Components/ProcessList'
import { ProcessView } from '../src/Components/ProcessView'

const API = 'http://localhost:3302/api/isp'

TriggerEngine.register<CustomSetup, InteractiveElement, OnCustomTrigger>('onCustom', onCustomTriggerHandler)
RenderingEngine.register('custom', CustomRenderer)
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

  const element: FlatElement<CustomElement | InteractiveElement> = {
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

  const onUpload = async (files) => {
    console.log('Uploading', files.map(f => f.name));
    const resp = await axios.post(API, { files }).catch(err => console.error(err))
    console.log('=>', resp)
  }

  // TODO: Update of RISP text fields has stopped working. Is it due to messed up node_module cross-project linking in dev machine?

  const [ processId, setProcessId ] = useState(7)

  return (
    <>
      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Upload Tester</Typography>
        <FileUploader onUpload={(files) => onUpload(files)} color="primary" variant="contained"/>
      </Paper>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Processes</Typography>
        {processId && <ProcessView api={API} id={processId} />}
        {!processId && <ProcessList api={API} onClick={id => setProcessId(id)}/>}
      </Paper>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Element Test Dashboard</Typography>
        <RISP key="demo1" element={element} values={values} setup={setup}/>
        <Button variant="outlined" onClick={() => { runInAction(() => {values.a = ''; values.b = ''})}}>RESET</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => {values.a = 'ABCDE' })}}>CHANGE A</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => values.b = 'FGHIJ')}}>CHANGE B</Button>
      </Paper>
    </>
  )
})

export default App;
