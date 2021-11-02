import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"
import { isButtonElement } from 'interactive-elements'

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
