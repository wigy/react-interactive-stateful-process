import { GetOneProcessResponse, GetOneStepResponse } from 'interactive-elements'
import React, { useState } from 'react'
import { useAxios } from '..'
import { DefaultSummaryView, DefaultSummaryViewProps } from './DefaultSummaryView'
import { DefaultStateView, DefaultStateViewProps } from './DefaultStateView'
import { DefaultResultView, DefaultResultViewProps } from './DefaultResultView'
import { ConfigView, ConfigViewProps } from './ConfigView'

export type DefaultStepViewProps = {
  api: string
  token?: string
  step: number
  process: GetOneProcessResponse
  summaryView?: (props: DefaultSummaryViewProps) => JSX.Element
  stateView?: (props: DefaultStateViewProps) => JSX.Element
  resultView?: (props: DefaultResultViewProps) => JSX.Element
  configView?: (props: ConfigViewProps) => JSX.Element
}

/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export const DefaultStepView = (props: DefaultStepViewProps): JSX.Element => {

  const [step, setStep] = useState<GetOneStepResponse | null>(null)

  useAxios({ url: `${props.api}/${props.step}`, token: props.token, receiver: setStep })

  if (!step) {
    return <></>
  }

  const SummaryView = props.summaryView || DefaultSummaryView
  const StateView = props.stateView || DefaultStateView
  const ResultView = props.resultView || DefaultResultView
  const configView = props.configView || ConfigView

  return (
    <div>
      <SummaryView step={step} process={props.process} configView={configView} />
      {step.state && <StateView config={props.process.config} state={step.state} resultView={ResultView}/>}
    </div>
  )
}
