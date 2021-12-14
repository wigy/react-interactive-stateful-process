import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, useTheme, Fab, IconButton, Stepper, Step, StepLabel } from '@mui/material'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { ProcessStatusIcon } from './ProcessStatusIcon'
import { useAxios } from './useAxios'
import { DefaultStepView, DefaultStepViewProps } from './DefaultStepView'
import { GetOneProcessResponse, InteractiveElement, isImportActionConf, isImportActionOp, Setup } from 'interactive-elements'
import { ArrowBackOutlined, NavigateBefore, NavigateNext } from '@mui/icons-material'
import { DefaultStateViewProps } from './DefaultStateView'
import { DefaultSummaryViewProps } from './DefaultSummaryView'
import { DefaultErrorView } from './DefaultErrorView'
import { DefaultResultViewProps } from './DefaultResultView'
import { RISP } from '../RISP'

export type ProcessViewProps = {
  api: string
  token?: string
  id: number
  step?: number
  setup?: Setup
  onBack?: () => void
  onChangeStep?: (step: number) => void
  stepView?: (props: DefaultStepViewProps) => JSX.Element
  summaryView?: (props: DefaultSummaryViewProps) => JSX.Element
  stateView?: (props: DefaultStateViewProps) => JSX.Element
  resultView?: (props: DefaultResultViewProps) => JSX.Element
}

/**
 * Construct a text for action taken.
 * @param action
 * @returns
 */
const actionStepLabel = (action: unknown): string => {
  if (action === null) {
    return ''
  }
  if (isImportActionOp(action)) {
    return action.op
  }
  if (isImportActionConf(action)) {
    return 'configuring'
  }
  return JSON.stringify(action)
}

/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
export const ProcessView = (props: ProcessViewProps): JSX.Element => {

  const { summaryView, stateView, resultView } = props

  const theme = useTheme()

  const [process, setProcess] = useState<GetOneProcessResponse | null>(null)
  const [step, setStep] = useState<number | null>(null)

  useAxios({ url: `${props.api}/${props.id}`, token: props.token, receiver: setProcess })

  if (!process) return <></>

  const canChangeStep = process.currentStep !== undefined && process.currentStep !== null && process.steps && process.steps.length > 1
  let currentStep: number | undefined = undefined
  if (props.step !== undefined && props.step !== null) {
    currentStep = props.step
  }
  if (currentStep === null || currentStep === undefined) {
    currentStep = process.currentStep !== undefined ? process.currentStep : 0
  }
  const hasSteps = process.currentStep !== undefined && process.steps.length > 0
  const needAnswers = hasSteps && process.status === 'WAITING' && !process.error && currentStep === process.steps.length - 1 && process.steps[currentStep].directions && process.steps[currentStep].directions.type === 'ui'

  const onChangeStep = (n: number) => {
    props.onChangeStep && props.onChangeStep(n)
    setStep(n)
  }

  const onBack = () => {
    props.onBack && props.onBack()
  }

  const StepView = props.stepView || DefaultStepView
  const ErrorView = DefaultErrorView

  // TODO: Translations.
  const operations = ['start'].concat(process.steps.filter(step => step.action).map(step => actionStepLabel(step.action)))

  return (
    <TableContainer>
      <Table className="ProcessTable" size="small">
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.secondary.main }}>
            <TableCell variant="head" style={{color: theme.palette.secondary.contrastText}} >
              <IconButton onClick={() => onBack()}>
                <ArrowBackOutlined style={{ color: theme.palette.secondary.contrastText }}/>
              </IconButton>
              # {process.id}
            </TableCell>
            <TableCell variant="head" style={{color: theme.palette.secondary.contrastText}} align="left">
            </TableCell>
            <TableCell variant="head" style={{color: theme.palette.secondary.contrastText}} align="left">
              {process.created}
            </TableCell>
            <TableCell variant="head" style={{color: theme.palette.secondary.contrastText}} align="left">
              {process.name}
            </TableCell>
            <TableCell variant="head" style={{backgroundColor: 'white'}} align="right">
              <ProcessStatusIcon status={process.status}/>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={2}>
              <Typography>
                <Fab
                  disabled={!canChangeStep || currentStep === 0}
                  color="secondary"
                  aria-label="previous"
                  onClick={() => onChangeStep(currentStep !== undefined ? currentStep - 1 : 0)}
                  >
                    <NavigateBefore />
                </Fab>
                <Fab
                  disabled
                  style={{fontSize: '140%', color: 'black', fontWeight: 'bold'}}
                  >
                    {canChangeStep ? currentStep + 1 : <>—</>}
                </Fab>
                <Fab
                  disabled={!canChangeStep || currentStep === process.steps.length - 1}
                  color="secondary"
                  aria-label="next"
                  onClick={() => onChangeStep(currentStep !== undefined ? currentStep + 1 : 0)}
                  >
                    <NavigateNext />
                  </Fab>
              </Typography>
            </TableCell>
            <TableCell colSpan={3}>
              <Stepper activeStep={currentStep || 0}>
                {operations.map((label, idx) => (
                  <Step key={idx}>
                    <StepLabel onClick={() => onChangeStep(idx)}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align="left" style={{ verticalAlign: 'top' }}>
              {process.error && <ErrorView error={process.error}/>}
              {needAnswers && <>
                <Typography variant="subtitle1"><Trans>Additional information needed</Trans></Typography>
                <RISP key="directions" element={process.steps[currentStep].directions.element as InteractiveElement} values={{}} setup={props.setup || { baseUrl: `${props.api}/${process.id}` }}/>
              </>}
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
                  process={process}
                  summaryView={summaryView}
                  stateView={stateView}
                  resultView={resultView}
                />
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
