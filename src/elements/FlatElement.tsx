import React from 'react'
import { Renderer, RenderingEngine, RenderingProps } from '..'
import { InteractiveElement, isFlatElement } from 'interactive-elements'
import { Box } from '@mui/material'

export const FlatRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isFlatElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }
  return <>{
    element.elements.map((element: InteractiveElement, idx) => (
      <Box key={idx} sx={{ mt: idx > 0 ? 1.5 : 0 }}>
        {RenderingEngine.render({ values: props.values, setup: props.setup, element })}
      </Box>)
    )
  }</>
}
