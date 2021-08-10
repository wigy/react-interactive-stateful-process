import React, { ReactElement } from 'react'
import { Button } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"
import { ActiveElement } from './ActiveElement'

/**
 * An element activating an action when clicked.
 */
export interface ButtonElement extends ActiveElement {
  readonly type: string
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

export function isButtonElement(object: any): object is ButtonElement {
  return object.type === 'button'
}
