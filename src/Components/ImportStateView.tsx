import React from 'react'
import { ImportState, isImportState } from 'interactive-elements'
import { ImportFile, ImportFileProps } from './ImportFile'

export type ImportStateViewProps = {
  state: Record<string, unknown>
}

/**
 * Simple JSON display for state.
 * @param props
 * @returns
 */
export const ImportStateView = (props: ImportStateViewProps): JSX.Element => {

  if (props.state === null) {
    return <></>
  }

  if (!isImportState(props.state)) {
    return <></>
  }

  const state: ImportState = props.state
  const files: ImportFileProps[] = []

  Object.keys(state.files).forEach(name => files.push({
    name,
    lines: state.files[name].lines
  }))

  return (
    <div>
      {files.map(file => <ImportFile key={file.name} name={file.name} lines={file.lines} />)}
    </div>
  )
}
