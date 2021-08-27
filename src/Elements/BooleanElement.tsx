import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormControlLabel, Checkbox } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"
import { ActiveElement } from "./ActiveElement"
import { NamedElement } from "./NamedElement"

/**
 * A boolean toggle element.
 */
 export interface BooleanElement extends ActiveElement, NamedElement {
  readonly type: string
}

export function isBooleanElement(object: any): object is BooleanElement {
  return object.type === 'boolean'
}

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
  const [value, setValue] = React.useState(props.values[element.name] || '')

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
