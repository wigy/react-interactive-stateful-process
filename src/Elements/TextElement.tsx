import React from 'react'
import { TextField } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"
import { ActiveElement } from "./ActiveElement"

/**
 * A text editing element.
 */
 export interface TextElement extends ActiveElement {
  readonly type: string
}

export function isTextElement(object: any): object is TextElement {
  return object.type === 'text'
}

/**
 * Rendering for text editing element.
 */
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
