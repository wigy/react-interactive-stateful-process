import React from 'react'
import { TextField } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"

/**
 * A text editing element.
 */
 export interface TextElement {
  readonly type: string
}

// eslint-disable-next-line
export function isTextElement(object: any): object is TextElement {
  return object.type === 'text'
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
