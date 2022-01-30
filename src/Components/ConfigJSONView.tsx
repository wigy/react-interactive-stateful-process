import React from 'react'
import { ProcessConfig } from 'interactive-elements'
import { Box, Typography } from '@mui/material'
import { Trans } from 'react-i18next'

import { IGNORE_FIELDS } from './ConfigView'

export type ConfigJSONViewProps = {
  title?: string
  config: ProcessConfig
}

/**
 * Configuration viewer for a process configuration displaying it as raw JSON.
 * @param props
 * @returns
 */
export const ConfigJSONView = (props: ConfigJSONViewProps): JSX.Element => {

  const config: Record<string, unknown> = {}

  Object.keys(props.config).forEach(key => {
    if (!IGNORE_FIELDS.test(key)) {
      config[key] = props.config[key]
    }
  })

  return (
    <>
      {props.title && <Typography variant="subtitle1"><Trans>{props.title}</Trans></Typography>}
      <Box sx={{ fontFamily: 'monospace' }}>
        <pre>
          {JSON.stringify(config, null, 2)}
        </pre>
      </Box>
    </>
  )
}

ConfigJSONView.foo = 2112
