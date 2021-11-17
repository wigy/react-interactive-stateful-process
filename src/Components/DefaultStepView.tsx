import React, { useState } from 'react'
import { ProcessConfig } from 'interactive-elements'
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

  const [step, setStep] = useState<number | null>(null)

  useAxios({ url: `${props.api}/${props.step}`, token: props.token, receiver: setStep })
  // TODO: Is there anything except warning we can display by default?
  return (
    <div>
      {JSON.stringify(step)}
    </div>
  )
}
