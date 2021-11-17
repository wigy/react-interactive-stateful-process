import React from 'react'

export type DefaultActionViewProps = {
  action: Record<string, unknown> | null
}

/**
 * Simple JSON display for action.
 * @param props
 * @returns
 */
export const DefaultActionView = (props: DefaultActionViewProps): JSX.Element => {

  if (props.action === null) {
    return <></>
  }

  return (
    <pre>
      {JSON.stringify(props.action, null, 2)}
    </pre>
  )
}
