import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import { Renderer, RenderingProps } from '../Rendering'
import { isNamedElement, isTextElement } from 'interactive-elements'

/**
 * Rendering for text editing element.
 */
export const TextRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props

  const { t } = useTranslation()
  const label = (isTextElement(element) && element.label) ? element.label : ((isNamedElement(element) && element.name) ? t(`label-${element.name}`) : '')
  const [value, setValue] = React.useState(isNamedElement(element) ? props.values[element.name] || '' : '')

  if (!isTextElement(element)) {
    return <></>
  }

  return <TextField
    label={label}
    value={value}
    error={false}
    autoFocus
    fullWidth
    onChange={(e) => {
      setValue(e.target.value)
      element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e.target.value }, props)
    }}
    onKeyPress={() => null}
    onKeyUp={() => null}
    onKeyDown={() => null}
    onFocus={() => null}
  />
}
