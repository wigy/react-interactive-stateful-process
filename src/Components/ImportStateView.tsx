import React from 'react'
import { ImportState, isImportState, SegmentId } from 'interactive-elements'
import { ImportFile, ImportFileProps } from './ImportFile'
import { DefaultResultViewProps } from './DefaultResultView'

export type ImportStateViewProps = {
  state: Record<string, unknown>
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
  const files: ImportFileProps[] = []

  Object.keys(state.files).forEach(name => files.push({
    name,
    lines: state.files[name].lines,
    resultView: props.resultView
  }))

  const results = state.results ? state.results as Record<SegmentId, unknown> : undefined
  return (
    <div>
      {files.map(file => <ImportFile key={file.name} resultView={props.resultView} results={results} name={file.name} lines={file.lines} />)}
    </div>
  )
}
