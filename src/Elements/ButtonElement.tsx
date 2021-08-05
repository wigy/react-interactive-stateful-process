import React, { ReactElement } from 'react'
import { Button } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"

/**
 * An element activating an action when clicked.
 */
export interface ButtonElement extends Element {
  readonly type: 'button'
  label: string
}

export const ButtonRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isButtonElement(element)) {
    return <></>
  }
  return <Button
      variant="outlined"
      onClick={() => console.log('TODO: Click')}
    >
      {element.label}
    </Button>
}

// eslint-disable-next-line
export function isButtonElement(object: any): object is ButtonElement {
  return object.type === 'button'
}
