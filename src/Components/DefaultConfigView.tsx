import React from 'react'
import { ProcessConfig } from 'interactive-elements'

export type DefaultConfigViewProps = {
  config: ProcessConfig
}

/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export const DefaultConfigView = (props: DefaultConfigViewProps): JSX.Element => {

  return (
    <div>
      {Object.keys(props.config).map(name => <span key={name}>{name}: {JSON.stringify(props.config[name])}</span>)}
    </div>
  )
}
