import { GetOneStepResponse } from 'interactive-elements'
import React, { useState } from 'react'
import { useAxios } from './useAxios'
import { DefaultSummaryView } from './DefaultSummaryView'
import { DefaultStateView } from './DefaultStateView'
import { DefaultStateViewProps } from './DefaultStateView'
import { DefaultSummaryViewProps } from './DefaultSummaryView'

export type DefaultStepViewProps = {
  api: string
  token?: string
  step: number
  summaryView?: (props: DefaultSummaryViewProps) => JSX.Element
  stateView?: (props: DefaultStateViewProps) => JSX.Element
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

  return (
    <div>
      <SummaryView step={step} />
      {step.state && <StateView state={step.state} />}
    </div>
  )
}
