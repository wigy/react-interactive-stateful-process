import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { useAxios } from './useAxios'

export type DefaultStepViewProps = {
  api: string
  token?: string
  step: number
}

/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export const DefaultStepView = (props: DefaultStepViewProps): JSX.Element => {

  const [step, setStep] = useState<any | null>(null) // TODO: Define type.

  useAxios({ url: `${props.api}/${props.step}`, token: props.token, receiver: setStep })

  if (!step) {
    return <></>
  }

  const started = new Date(step.started).getTime()
  const finished = new Date(step.finished).getTime()

  return (
    <div>
      <Trans>Process ID</Trans>: {step.processId}
      &nbsp;
      <Trans>Step</Trans>: {step.number + 1}
      &nbsp;
      <Trans>Handler</Trans>: {step.handler}
      &nbsp;
      <Trans>Started</Trans>: {step.started}
      &nbsp;
      <Trans>Duration</Trans>: {(finished - started)}ms
    <pre>
      {JSON.stringify(step, null, 2)}
    </pre>
    </div>
  )
}
