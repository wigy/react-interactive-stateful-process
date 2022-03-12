import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, useTheme, Fab, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ProcessStatusIcon } from './ProcessStatusIcon'
import { useAxios, RISP } from '..'
import { DefaultStepView, DefaultStepViewProps } from './DefaultStepView'
import { ProcessModelDetailedData, InteractiveElement, isImportConfigureAction, isImportOpAction, RenderingProps, Setup, TriggerValue, TriggerValues } from 'interactive-elements'
import { ArrowBackOutlined, NavigateBefore, NavigateNext } from '@mui/icons-material'
import { DefaultStateViewProps } from './DefaultStateView'
import { DefaultSummaryViewProps } from './DefaultSummaryView'
import { DefaultErrorView, DefaultErrorViewProps } from './DefaultErrorView'
import { DefaultSuccessView, DefaultSuccessViewProps } from './DefaultSuccessView'
import { DefaultResultViewProps } from './DefaultResultView'
import { ConfigViewProps } from './ConfigView'
import { StepList } from './StepList'
import { ConfigChangeView } from './ConfigChangeView'

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
  configView?: (props: ConfigViewProps) => JSX.Element
  errorView?: (props: DefaultErrorViewProps) => JSX.Element
  successView?: (props: DefaultSuccessViewProps) => JSX.Element
  onActionSuccess?: (result: unknown, trigger: string, props: RenderingProps) => void
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
  if (isImportOpAction(action)) {
    return action.op
  }
  if (isImportConfigureAction(action)) {
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

  const { summaryView, stateView, resultView, configView } = props

  const theme = useTheme()
  const { t } = useTranslation()

  const [process, setProcess] = useState<ProcessModelDetailedData | null>(null)
  const [step, setStep] = useState<number | null>(null)

  // Resolve step.
  let currentStep: number | undefined
  if (props.step !== undefined && props.step !== null) {
    currentStep = props.step
  }
  if (process && (currentStep === null || currentStep === undefined)) {
    currentStep = process.currentStep !== undefined ? process.currentStep : 0
  }

  useAxios({
    // Note, step argument does not do anything except triggers URL refetch.
    url: `${props.api}/${props.id}${currentStep !== undefined ? `?step=${currentStep}` : ''}`,
    token: props.token,
    receiver: setProcess
  })

  useAxios({
    // Note, step argument does not do anything except triggers URL refetch.
    url: currentStep === undefined ? null : `${props.api}/${props.id}/step/${currentStep}`,
    token: props.token,
    receiver: setStep
  })

  if (!process) return <></>

  // Calculate some values for futher use.
  const canChangeStep = process.currentStep !== undefined && process.currentStep !== null && process.steps && process.steps.length > 1
  const hasSteps = process.currentStep !== undefined && process.steps.length > 0
  const lastStep = currentStep !== undefined && process.steps.length > 0 && currentStep === process.steps.length - 1
  const needAnswers = hasSteps && process.status === 'WAITING' && !process.error && currentStep === process.steps.length - 1 && process.steps[currentStep].directions && process.steps[currentStep].directions.type === 'ui'
  const wasConfigured = currentStep !== undefined && currentStep > 0 && process.steps[currentStep - 1] && process.steps[currentStep - 1].directions && process.steps[currentStep - 1].directions.type === 'ui'

  // Handle step change.
  const onChangeStep = (n: number) => {
    props.onChangeStep && props.onChangeStep(n)
  }

  // Handle back button.
  const onBack = () => {
    props.onBack && props.onBack()
  }

  // Handle action success.
  const onActionSuccess = (result: unknown, trigger: string, actionProps: RenderingProps) => {
    if (props.onActionSuccess) {
      props.onActionSuccess(result, trigger, actionProps)
    }
  }

  const StepView = props.stepView || DefaultStepView
  const ErrorView = props.errorView || DefaultErrorView
  const SuccessView = props.successView || DefaultSuccessView

  const operations = ['start'].concat(
    process.steps.filter(step => step.action).map(step => actionStepLabel(step.action))
  ).map(label => t(`step-${label}`))

  // Extract values from the process config.
  const values: TriggerValues = {}
  Object.keys(process.config).forEach(key => {
    values[`configure.${key}`] = process.config[key] as TriggerValue
  })

  return (
    <TableContainer>
      <Table className="ProcessTable" size="small">
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.secondary.main }}>
            <TableCell variant="head" style={{ color: theme.palette.secondary.contrastText }} >
              <IconButton onClick={() => onBack()}>
                <ArrowBackOutlined style={{ color: theme.palette.secondary.contrastText }}/>
              </IconButton>
              # {process.id}
            </TableCell>
            <TableCell variant="head" style={{ color: theme.palette.secondary.contrastText }} align="left">
            </TableCell>
            <TableCell variant="head" style={{ color: theme.palette.secondary.contrastText }} align="left">
              {process.created}
            </TableCell>
            <TableCell variant="head" style={{ color: theme.palette.secondary.contrastText }} align="left">
              {process.name}
            </TableCell>
            <TableCell variant="head" style={{ backgroundColor: 'white' }} align="right">
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
                  style={{ fontSize: '140%', color: 'black', fontWeight: 'bold' }}
                  >
                    {canChangeStep ? (currentStep || 0) + 1 : <>—</>}
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
              <StepList onChangeStep={(step) => onChangeStep(step)} operations={operations} currentStep={currentStep || 0}/>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={5} align="left" style={{ verticalAlign: 'top' }}>
              {lastStep && process.status === 'SUCCEEDED' && <SuccessView step={step} process={process}/>}
              {lastStep && process.error && <ErrorView error={process.error}/>}
              {wasConfigured && <ConfigChangeView step={process.steps[(currentStep || 0) - 1]} />}
              {needAnswers && <>
                <Typography variant="subtitle1"><Trans>Additional information needed</Trans></Typography>
                <RISP
                  key="directions"
                  element={process.steps[currentStep].directions.element as InteractiveElement}
                  values={values}
                  setup={props.setup || { baseUrl: `${props.api}/${process.id}` }}
                  onActionSuccess={onActionSuccess}
                />
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
                  step={step}
                  process={process}
                  summaryView={summaryView}
                  stateView={stateView}
                  resultView={resultView}
                  configView={configView}
                />
              </TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}
