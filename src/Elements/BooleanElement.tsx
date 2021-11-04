import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"
import { isBooleanElement } from 'interactive-elements'

/**
 * Rendering for boolean toggle element.
 */
export const BooleanRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isBooleanElement(element)) {
    return <></>
  }

  const { t } = useTranslation()
  const label = element.label ? element.label : t(`label-${element.name}`)
  const [value, setValue] = useState<boolean | null>(props.values[element.name] as boolean || null)

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
