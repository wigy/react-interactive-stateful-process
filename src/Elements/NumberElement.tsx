import React from 'react'
import { useTranslation } from 'react-i18next'
import { InputAdornment, TextField } from '@mui/material'
import { Renderer, RenderingProps } from '../RenderingEngine'
import { isNamedElement, isNumberElement } from 'interactive-elements'
import { RISPProvider } from '../RISPProvider'

/**
 * Rendering for text editing element.
 */
export const NumberRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props

  const { t } = useTranslation()
  const label = (isNumberElement(element) && element.label) ? element.label : ((isNamedElement(element) && element.name) ? t(`label-${element.name}`) : '')
  const [value, setValue] = React.useState<string>(isNamedElement(element) ? props.values[element.name] as string || '' : '')

  if (!isNumberElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }

  if (props.values[element.name] !== value) {
    setValue(props.values[element.name] as string)
  }

  return <TextField
    label={label}
    value={value}
    type="number"
    error={false}
    autoFocus
    InputProps={{
      endAdornment: <InputAdornment position="end">{element.unit || ''}</InputAdornment>,
    }}
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
