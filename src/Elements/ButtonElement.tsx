import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@mui/material'
import { Renderer, RenderingProps } from '../Rendering'
import { isButtonElement } from 'interactive-elements'

export const ButtonRenderer: Renderer = (props: RenderingProps) => {
  const { t } = useTranslation()
  const { element } = props
  if (!isButtonElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }
  const label = t(`label-${element.label}`)
  return <Button
      variant="outlined"
      onClick={() => { element.triggerHandler && element.triggerHandler({ type: 'onClick' }, props) } }
    >
      {label}
    </Button>
}
