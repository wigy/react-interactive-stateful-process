import { TextFileLine } from 'interactive-elements'
import React from 'react'

export type ImportFileProps = {
  name: string
  lines: TextFileLine[]
}

/**
 * Line by line display for imported file.
 * @param props
 * @returns
 */
export const ImportFile = (props: ImportFileProps): JSX.Element => {

  return (
    <pre>
      FILE {props.name}
      LINES {JSON.stringify(props.lines)}
    </pre>
  )
}
