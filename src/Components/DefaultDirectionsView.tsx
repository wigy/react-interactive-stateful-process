import React from 'react'

export type DefaultDirectionsViewProps = {
  directions: Record<string, unknown> | null
}

/**
 * Simple JSON display for directions.
 * @param props
 * @returns
 */
export const DefaultDirectionsView = (props: DefaultDirectionsViewProps): JSX.Element => {

  if (props.directions === null) {
    return <></>
  }

  return (
    <pre>
      {JSON.stringify(props.directions, null, 2)}
    </pre>
  )
}
