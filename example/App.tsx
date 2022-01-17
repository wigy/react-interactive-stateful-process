import React, { useState } from 'react'
import axios from 'axios'
import { observable, runInAction } from 'mobx'
import { Button, Paper, Typography } from '@mui/material'
import { RISP } from '../src/RISP'
import { observer } from 'mobx-react'
import { FileUploader } from '../src/Components'
import { InteractiveElement, FlatElement, TriggerValues, ID } from 'interactive-elements'
import { customActionHandler, CustomElement, CustomRenderer, CustomSetup } from './Components'
import { ActionEngine } from '../src/ActionEngine'
import { RenderingEngine } from '../src/RenderingEngine'
import { ProcessList } from '../src/Components/ProcessList'
import { ProcessView } from '../src/Components/ProcessView'
import { ImportStateView } from '../src/Components/ImportStateView'
import { JsonEditor } from '../src/Components/JsonEditor'

const API = 'http://localhost:3302/api/isp'

RenderingEngine.register('custom', CustomRenderer)
ActionEngine.register('custom', customActionHandler)

/**
 * Sample application.
 */
const App = observer(() => {

  const setup: CustomSetup = {
    baseUrl: 'http://localhost',
    sample: 999
  }

  const values: TriggerValues = observable({
    a: '',
    b: ''
  })

  const element: FlatElement<CustomElement | InteractiveElement> = {
    type: 'flat',
    elements: [
      {
        type: 'box',
        title: 'This is a Box',
        elements: [
          {
            type: 'text',
            label: 'First value',
            actions: {},
            name: 'a'
          },
          {
            type: 'text',
            label: 'Second value',
            actions: {},
            name: 'b'
          },
          {
            type: 'html',
            html: '<hr/><div style="color: blue"><b>Bold</b> <i>Italic</i></div><hr/>',
          },
          {
            type: 'textFileLine',
            line: {
              text: '04.01.2021\t02.01.2021\t02.01.2021\tSome random text\t10450 90360 02020 77839',
              line: 4,
              columns: {
                'Field 1': '04.01.2021',
                'Field 2': '02.01.2021',
                'Field 3': '02.01.2021',
                Text: 'Some random text',
                'Some Ref': '10450 90360 02020 77839'
              },
              segmentId: 'abcde123456'
            }
          }
        ]
      },
      {
        type: 'radio',
        label: 'Third value',
        options: {
          'Value 1': 'V1',
          'Value 2': 'V2',
          'Value 3': 'V3'
        },
        actions: {},
        name: 'c'
      },
      {
        type: 'case',
        condition: 'c',
        default: 'V1',
        cases: {
          V1: { type: 'message', severity: 'info', text: 'First set of elements in case.' },
          V2: { type: 'message', severity: 'warning', text: 'Second set of elements in case.' },
          V3: { type: 'message', severity: 'error', text: 'Third set of elements in case.' },
        }
      },
      {
        type: 'custom',
        data: {
          a: 1, b: 2, c: 3
        },
        actions: {
        }
      },
      {
        type: 'message',
        severity: 'error',
        text: 'Hello, this is an error message.'
      },
      {
        type: 'message',
        severity: 'success',
        text: 'Hello, this is a success message.'
      },
    ]
  }

  const onUpload = async (files) => {
    console.log('Uploading', files.map(f => f.name))
    const resp = await axios.post(API, { files }).catch(err => console.error(err))
    console.log('=>', resp)
  }

  // TODO: Update of RISP text fields has stopped working. Is it due to messed up node_module cross-project linking in dev machine?

  const [processId, setProcessId] = useState<ID>()
  const [step, setStep] = useState<number>()
  const [jsonEdit, setJsonEdit] = useState<boolean>(false)

  return (
    <>
      <JsonEditor
        visible={jsonEdit}
        json={{ a: '1212' }}
        title="Sample JSON Editor"
        onCancel={() => setJsonEdit(false)}
        onSave={(json) => { console.log(json); setJsonEdit(false) } }
      />
      <Button variant="outlined" onClick={() => { setJsonEdit(true) }}>JSON EDIT</Button>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Upload Tester</Typography>
        <FileUploader onUpload={(files) => onUpload(files)} color="primary" variant="contained"/>
      </Paper>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Processes</Typography>
        {processId && <ProcessView
          api={API}
          id={processId}
          stateView={ImportStateView}
          step={step}
          onBack={() => setProcessId(null)}
          onChangeStep={(s) => setStep(s)}
        />}
        {!processId && <ProcessList
          api={API}
          onClick={id => setProcessId(id)}
        />}
      </Paper>

      <Paper style={{ margin: '1rem', padding: '1rem' }} elevation={4}>
        <Typography className="text" variant="h3">Element Test Dashboard</Typography>
        <RISP key="demo1" element={element as InteractiveElement} values={values} setup={setup}/>
        <br/>
        <Button variant="outlined" onClick={() => { runInAction(() => { values.a = ''; values.b = '' }) }}>RESET</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => { values.a = 'ABCDE' }) }}>CHANGE A</Button>
        <Button variant="outlined" onClick={() => { runInAction(() => (values.b = 'FGHIJ')) }}>CHANGE B</Button>
      </Paper>
    </>
  )
})

export default App
