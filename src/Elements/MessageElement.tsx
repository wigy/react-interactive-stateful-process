import React from 'react'
import { Renderer, RenderingProps } from '../RenderingEngine'
import { isMessageElement } from 'interactive-elements'
import { Alert } from '@mui/material'

export const MessageRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isMessageElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }
  const { severity, text } = element
  return <Alert severity={severity}>{text}</Alert>
}
