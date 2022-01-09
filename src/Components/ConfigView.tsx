import React from 'react'
import { ProcessConfig } from 'interactive-elements'
import { Box, Grid, Typography } from '@mui/material'
import { Trans } from 'react-i18next'

export type ConfigViewProps = {
  title?: string
  config: ProcessConfig
  columns?: number
}

/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export const ConfigView = (props: ConfigViewProps): JSX.Element => {

  const COLUMNS = props.columns || 4

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const render = (obj: unknown): JSX.Element => {
    let keys, perColumn, idx, column

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
              <React.Fragment key={i}>{render(v)}{i < values.length - 1 ? ', ' : ''}</React.Fragment>
            )
          }</>
        }

        keys = Object.keys(obj).sort()
        perColumn = Math.ceil(keys.length / COLUMNS)
        idx = 0
        column = []
        for (let c = 0; c < COLUMNS; c++) {
          const row: JSX.Element[] = []
          for (let r = 0; r < perColumn; r++) {
            if (idx < keys.length) {
              row.push(<>
                <div><strong>{capitalize(keys[idx])}</strong></div>
                <div>{render(obj[keys[idx]])}</div>
              </>)
            }
            idx++
          }
          column.push(<Grid item>{row}</Grid>)
        }

        return <Box sx={{ flexGrow: 1 }}><Grid container justifyContent="space-evenly" spacing={4}>{column}</Grid></Box>

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
