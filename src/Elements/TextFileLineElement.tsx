import React from 'react'
import { Renderer, RenderingProps } from '../Rendering'
import { isTextFileLineElement } from 'interactive-elements'
import { Box, Typography } from '@mui/material'
import { Trans } from 'react-i18next'
import { ConfigView } from '..'

export const TextFileLineRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isTextFileLineElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }
  const { line } = element
  const text = line.text.replace(/\t/g, ' ⎵ ')

  return (
    <Box>
      <Typography variant="caption"><Trans>Line:</Trans> {line.line}</Typography>
      <Typography sx={{ fontFamily: 'monospace' }}>{text}</Typography>
      {
        line.columns && <>
          <Typography variant="caption"><Trans>Values:</Trans></Typography>
          <ConfigView config={line.columns} />
        </>
      }

    </Box>
  )
}
