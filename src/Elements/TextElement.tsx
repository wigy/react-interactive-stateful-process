import React from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '@material-ui/core'
import { Renderer, RenderingProps } from "../Rendering"
import { ActiveElement } from "./ActiveElement"
import { isNamedElement, NamedElement } from "./NamedElement"

/**
 * A text editing element.
 */
 export interface TextElement extends ActiveElement, NamedElement {
  readonly type: string
}

export function isTextElement(object: any): object is TextElement {
  return object.type === 'text'
}

/**
 * Rendering for text editing element.
 */
export const TextRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isTextElement(element)) {
    return <></>
  }

  const { t } = useTranslation()
  const label = element.label ? element.label : t(`label-${element.name}`)

  return <TextField
    label={label}
    value={element.value}
    error={false}
    autoFocus
    fullWidth
    onChange={(e) => {
      if (element.actionHandler) element.actionHandler({ type: 'onChange', name: element.name, value: e.target.value }, props)
    }}
    onKeyPress={() => null}
    onKeyUp={() => null}
    onKeyDown={() => null}
    onFocus={() => null}
  />
}
