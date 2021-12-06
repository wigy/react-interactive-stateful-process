import React from 'react'
import { ProcessConfig } from 'interactive-elements'
import { Typography } from '@mui/material'
import { Trans } from 'react-i18next'

export type ConfigViewProps = {
  title?: string
  config: ProcessConfig
}

/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export const ConfigView = (props: ConfigViewProps): JSX.Element => {

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const render = (obj: unknown): JSX.Element => {
    switch (typeof obj) {
      case 'undefined':
        return <>—</>

      case 'object':
        if (obj === null) {
          return <>—</>
        }
        if (obj instanceof Array) {
          const values = Object.values(obj)
          return <>{
            values.map((v, i) =>
              <React.Fragment key={i}>{render(v)}{i < values.length - 1 ? ', ': ''}</React.Fragment>
            )
          }</>
        }
        return <dl>
          {Object.keys(obj).sort().map(k => <React.Fragment key={k}>
            <dt><strong>{capitalize(k)}</strong></dt>
            <dd>{render(obj[k])}</dd>
          </React.Fragment>)}
        </dl>

      case 'string':
        return <>{obj === '' ? <br/> : obj}</>

      case 'boolean':
        // TODO: Translate.
        return obj ? <>Yes</> : <>No</>

      default:
        return <>{JSON.stringify(obj)}</>
    }
  }
  return (
    <>
      {props.title && <Typography variant="subtitle1"><Trans>{props.title}</Trans></Typography>}
      {render(props.config)}
    </>
  )
}
