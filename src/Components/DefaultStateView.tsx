import React from 'react'
import { DefaultResultViewProps } from './DefaultResultView'

export type DefaultStateViewProps = {
  state: Record<string, unknown> | null
  resultView: (props: DefaultResultViewProps) => JSX.Element
}

/**
 * Simple JSON display for state.
 * @param props
 * @returns
 */
export const DefaultStateView = (props: DefaultStateViewProps): JSX.Element => {

  if (props.state === null) {
    return <></>
  }

  const ResultView = props.resultView
  return <>
    <pre>
      {JSON.stringify(props.state, null, 2)}
    </pre>
    { props.state.results && <ResultView result={props.state.results}/>}
  </>
}
