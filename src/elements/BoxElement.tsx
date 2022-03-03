import React from 'react'
import { Renderer, RenderingEngine, RenderingProps } from '..'
import { InteractiveElement, isBoxElement } from 'interactive-elements'
import { Box, Card, CardContent, CardHeader } from '@mui/material'

export const BoxRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isBoxElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }
  return <Card variant="outlined">
    <CardContent>
      { ('title' in element) && <CardHeader title={element.title}/>}
      {
        element.elements.map((element: InteractiveElement, idx) => (
          <Box key={idx} sx={{ mt: idx > 0 ? 1.5 : 0 }}>
            {RenderingEngine.render({ values: props.values, setup: props.setup, element })}
          </Box>)
        )
      }
    </CardContent>
  </Card>
}
