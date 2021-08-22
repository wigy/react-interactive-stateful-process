import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"
import { ActiveElement } from './ActiveElement'

/**
 * An element activating an action when clicked.
 */
export interface ButtonElement extends ActiveElement {
  readonly type: 'string'
  label: string
}

export function isButtonElement(object: any): object is ButtonElement {
  return object.type === 'button'
}

export const ButtonRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isButtonElement(element)) {
    return <></>
  }
  const { t } = useTranslation()
  const label = t(`label-${element.label}`)
  return <Button
      variant="outlined"
      onClick={() => { element.triggerHandler && element.triggerHandler({ type: 'onClick' }, props)} }
    >
      {label}
    </Button>
}
