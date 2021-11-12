import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, TextField, MenuItem, useTheme, Fab } from '@material-ui/core'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { ProcessStatusIcon } from './ProcessStatusIcon'
import { useAxios } from './useAxios'
import { GetOneProcessResponse } from 'interactive-elements'
import { NavigateBefore, NavigateNext } from '@material-ui/icons'

export type ProcessViewProps = {
  api: string
  token?: string
  id: number
}

export const ProcessView = (props: ProcessViewProps): JSX.Element => {

  const theme = useTheme()

  const [process, setProcess] = useState<GetOneProcessResponse | null>(null)
  const [step, setStep] = useState<number | null>(null)

  useAxios({ url: `${props.api}/${props.id}`, token: props.token, receiver: setProcess })

  if (!process) return <></>

  const canChangeStep = process.currentStep !== undefined && process.currentStep !== null && process.steps && process.steps > 1
  const currentStep = step === null ? (process.currentStep !== undefined ? process.currentStep : 0) : step

  const onPreviousStep = () => {
    setStep(currentStep - 1)
  }

  const onNextStep = () => {
    setStep(currentStep + 1)
  }

  return (
    <TableContainer>
      <Table className="ProcessTable">
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.secondary.main, color: 'red' }}>
            <TableCell variant="head" style={{color: theme.palette.text.secondary}} align="left">{process.id}</TableCell>
            <TableCell variant="head" style={{color: theme.palette.text.secondary}} align="left">{process.created}</TableCell>
            <TableCell variant="head" style={{color: theme.palette.text.secondary}} align="left">{process.name}</TableCell>
            <TableCell variant="head" align="right"><ProcessStatusIcon status={process.status}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={3} align="left">TODO: Configuration {JSON.stringify(process.config)}</TableCell>
            <TableCell align="right">
              <Fab disabled={!canChangeStep || currentStep === 0} color="secondary" aria-label="previous" onClick={onPreviousStep}><NavigateBefore /></Fab>
              <Fab disabled style={{fontSize: '140%', color: 'black', fontWeight: 'bold'}}>
              {canChangeStep ? currentStep + 1 : <>—</>}
              </Fab>
              <Fab disabled={!canChangeStep || !process.steps || currentStep === process.steps - 1} color="secondary" aria-label="previous" onClick={onNextStep}><NavigateNext /></Fab>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
