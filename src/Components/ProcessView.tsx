import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, TextField, MenuItem, useTheme, Fab, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { ProcessStatusIcon } from './ProcessStatusIcon'
import { useAxios } from './useAxios'
import { DefaultConfigView, DefaultConfigViewProps } from './DefaultConfigView'
import { DefaultStepView, DefaultStepViewProps } from './DefaultStepView'
import { GetOneProcessResponse, GetOneStepResponse, ProcessConfig } from 'interactive-elements'
import { ArrowBackOutlined, NavigateBefore, NavigateNext } from '@material-ui/icons'
import { DefaultStateViewProps } from './DefaultStateView'
import { DefaultDirectionsViewProps } from './DefaultDirectionsView'
import { DefaultSummaryViewProps } from './DefaultSummaryView'
import { DefaultActionViewProps } from './DefaultActionView'
import { DefaultErrorView } from './DefaultErrorView'

export type ProcessViewProps = {
  api: string
  token?: string
  id: number
  onBack?: () => void
  configView?: (config: DefaultConfigViewProps) => JSX.Element
  stepView?: (props: DefaultStepViewProps) => JSX.Element
  summaryView?: (props: DefaultSummaryViewProps) => JSX.Element
  directionsView?: (props: DefaultDirectionsViewProps) => JSX.Element
  actionView?: (props: DefaultActionViewProps) => JSX.Element
  stateView?: (props: DefaultStateViewProps) => JSX.Element
}

/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
export const ProcessView = (props: ProcessViewProps): JSX.Element => {

  const { summaryView, directionsView, actionView, stateView } = props

  const theme = useTheme()

  const [process, setProcess] = useState<GetOneProcessResponse | null>(null)
  const [step, setStep] = useState<number | null>(null)

  useAxios({ url: `${props.api}/${props.id}`, token: props.token, receiver: setProcess })

  if (!process) return <></>

  const canChangeStep = process.currentStep !== undefined && process.currentStep !== null && process.steps && process.steps > 1
  const currentStep = step === null ? (process.currentStep !== undefined ? process.currentStep : 0) : step
  const hasSteps = process.currentStep !== undefined && process.steps > 0

  const onPreviousStep = () => {
    setStep(currentStep - 1)
  }

  const onNextStep = () => {
    setStep(currentStep + 1)
  }

  const onBack = () => {
    props.onBack && props.onBack()
  }

  const ConfigView = props.configView || DefaultConfigView
  const StepView = props.stepView || DefaultStepView
  const ErrorView = DefaultErrorView

  return (
    <TableContainer>
      <Table className="ProcessTable" size="small">
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.secondary.main }}>
            <TableCell variant="head">
              <IconButton onClick={() => onBack()}>
                <ArrowBackOutlined style={{ color: theme.palette.secondary.contrastText }}/>
              </IconButton>
            </TableCell>
            <TableCell variant="head" style={{color: theme.palette.secondary.contrastText}} align="left">{process.id}</TableCell>
            <TableCell variant="head" style={{color: theme.palette.secondary.contrastText}} align="left">{process.created}</TableCell>
            <TableCell variant="head" style={{color: theme.palette.secondary.contrastText}} align="left">{process.name}</TableCell>
            <TableCell variant="head" align="right"><ProcessStatusIcon status={process.status}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell></TableCell>
            <TableCell colSpan={3} align="left">
              {process.config && <ConfigView config={process.config}/>}
              {process.error && <ErrorView error={process.error}/>}
            </TableCell>
            <TableCell align="right">
              <Fab disabled={!canChangeStep || currentStep === 0} color="secondary" aria-label="previous" onClick={onPreviousStep}><NavigateBefore /></Fab>
              <Fab disabled style={{fontSize: '140%', color: 'black', fontWeight: 'bold'}}>
              {canChangeStep ? currentStep + 1 : <>—</>}
              </Fab>
              <Fab disabled={!canChangeStep || currentStep === process.steps - 1} color="secondary" aria-label="previous" onClick={onNextStep}><NavigateNext /></Fab>
            </TableCell>
          </TableRow>
          {
            hasSteps &&
            <TableRow>
              <TableCell colSpan={5} align="left">
                <StepView
                  api={`${props.api}/${props.id}/step`}
                  token={props.token}
                  step={currentStep}
                  summaryView={summaryView}
                  directionsView={directionsView}
                  actionView={actionView}
                  stateView={stateView}/>
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
