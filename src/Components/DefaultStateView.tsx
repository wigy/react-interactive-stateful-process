import React from 'react'

export type DefaultStateViewProps = {
  state: Record<string, unknown> | null
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

  return (
    <pre>
      {JSON.stringify(props.state, null, 2)}
    </pre>
  )
}
