import { GetOneStepResponse } from 'interactive-elements'
import { Typography } from '@material-ui/core'
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

  const [step, setStep] = useState<GetOneStepResponse | null>(null)

  useAxios({ url: `${props.api}/${props.step}`, token: props.token, receiver: setStep })

  if (!step) {
    return <></>
  }

  const started = new Date(step.started).getTime()
  const finished = new Date(step.finished).getTime()

  return (
    <div>
      <Typography variant="body2">
      <Trans><strong>Process ID</strong></Trans>: {step.processId}
      &nbsp;
      <Trans><strong>Step</strong></Trans>: {step.number + 1}
      &nbsp;
      <Trans><strong>Handler</strong></Trans>: {step.handler}
      &nbsp;
      <Trans><strong>Started</strong></Trans>: {step.started}
      &nbsp;
      <Trans><strong>Duration</strong></Trans>: {(finished - started)}ms
      </Typography>
      <pre>
        {JSON.stringify(step, null, 2)}
      </pre>
    </div>
  )
}
