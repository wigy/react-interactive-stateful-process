import React, { ReactElement } from 'react'
import { TextField } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"

export interface TextElement {
  readonly type: string
}

export const TextRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  return <TextField
    label="label"
    value="value"
    error={false}
    autoFocus
    fullWidth
    onChange={(e) => {
      console.log('TODO: Handle actions')
    }}
    onKeyPress={() => null}
    onKeyUp={() => null}
    onKeyDown={() => null}
    onFocus={() => null}
  />
}
