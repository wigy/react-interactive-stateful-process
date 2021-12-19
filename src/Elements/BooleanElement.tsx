import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Checkbox } from '@mui/material'
import { Renderer, RenderingProps } from '../Rendering'
import { isBooleanElement, isNamedElement, isTextElement } from 'interactive-elements'

/**
 * Rendering for boolean toggle element.
 */
export const BooleanRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props

  const { t } = useTranslation()
  const label = isTextElement(element) && element.label ? element.label : (isNamedElement(element) ? t(`label-${element.name}`) : '')
  const [value, setValue] = React.useState(isNamedElement(element) ? props.values[element.name] : null)

  if (!isBooleanElement(element)) {
    return <></>
  }

  return <FormControlLabel
    control={
      <Checkbox
        checked={!!value}
        onChange={(e) => {
          setValue(e.target.checked)
          element.triggerHandler && element.triggerHandler({ type: 'onChange', name: element.name, value: !!e.target.checked }, props)
        }}
        name={element.name}
        indeterminate={value === undefined || value === null}
      />
    }
    label={label}
  />
}
