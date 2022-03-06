import React from 'react'
import { ImportState, isImportState, ProcessConfig, SegmentId } from 'interactive-elements'
import { ImportFile, ImportFileProps } from './ImportFile'
import { DefaultResultViewProps } from './DefaultResultView'

export type ImportStateViewProps = {
  state: Record<string, unknown>
  config: ProcessConfig
  resultView: (props: DefaultResultViewProps) => JSX.Element
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

  const result = state.result ? state.result as Record<SegmentId, unknown> : undefined
  return (
    <div>
      {Object.entries(state.files).map(([name, file]) => (
        <ImportFile
          key={name}
          name={name}
          config={props.config}
          resultView={props.resultView}
          result={result}
          lines={file.lines}
        />
      ))}
    </div>
  )
}
