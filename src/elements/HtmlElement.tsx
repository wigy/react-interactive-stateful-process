import React from 'react'
import { Renderer, RenderingProps } from '..'
import { isHtmlElement } from 'interactive-elements'
import { Typography } from '@mui/material'

export const HtmlRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isHtmlElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }
  const { html } = element
  return <Typography dangerouslySetInnerHTML={{ __html: html }}></Typography>
}
