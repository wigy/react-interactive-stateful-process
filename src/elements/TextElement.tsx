import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@mui/material'
import { Renderer, RenderingProps, RISPProvider } from '..'
import { isNamedElement, isTextElement } from 'interactive-elements'

/**
 * Rendering for text editing element.
 */
export const TextRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props

  const { t } = useTranslation()
  const label = (isTextElement(element) && element.label) ? element.label : ((isNamedElement(element) && element.name) ? t(`label-${element.name}`) : '')
  const [value, setValue] = React.useState<string>(isNamedElement(element) ? props.values[element.name] as string || '' : '')

  if (!isTextElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }

  if (props.values[element.name] !== value) {
    setValue(props.values[element.name] as string)
  }

  return <TextField
    label={label}
    name={element.name}
    value={value || ''}
    error={false}
    autoFocus
    fullWidth
    onChange={(e) => {
      setValue(e.target.value)
      element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: e.target.value }, props)
    }}
    onFocus={() => RISPProvider.onFocus()}
    onBlur={() => RISPProvider.onBlur()}
    onKeyPress={() => null}
    onKeyUp={() => null}
    onKeyDown={() => null}
  />
}
