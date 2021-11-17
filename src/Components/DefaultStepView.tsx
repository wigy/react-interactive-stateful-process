import { GetOneStepResponse } from 'interactive-elements'
import React, { useState } from 'react'
import { useAxios } from './useAxios'
import { DefaultSummaryView } from './DefaultSummaryView'
import { DefaultDirectionsView } from './DefaultDirectionsView'
import { DefaultActionView } from './DefaultActionView'
import { DefaultStateView } from './DefaultStateView'

export type DefaultStepViewProps = {
  api: string
  token?: string
  step: number
  summaryView?: (summary: Record<string, unknown> | null) => JSX.Element
  directionsView?: (directions: Record<string, unknown> | null) => JSX.Element
  actionView?: (action: Record<string, unknown> | null) => JSX.Element
  stateView?: (state: Record<string, unknown> | null) => JSX.Element
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
  const DirectionsView = props.directionsView || DefaultDirectionsView
  const ActionView = props.actionView || DefaultActionView
  const StateView = props.stateView || DefaultStateView

  return (
    <div>
      <SummaryView step={step} />
      <DirectionsView directions={step.directions} />
      <ActionView action={step.action} />
      <StateView state={step.state} />
    </div>
  )
}
