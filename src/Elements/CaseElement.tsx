import React from 'react'
import { Renderer, RenderingEngine, RenderingProps } from '../RenderingEngine'
import { isCaseElement } from 'interactive-elements'

export const CaseRenderer: Renderer = (props: RenderingProps) => {
  const { element, values } = props
  if (!isCaseElement(element)) {
    throw new Error(`Wrong renderer ${JSON.stringify(element)}.`)
  }
  const { cases, condition } = element
  const noValue = values[condition] === undefined || values[condition] === null
  const defaultValue = element.default === undefined ? undefined : element.default
  const caseValue = noValue ? defaultValue : values[condition]
  const value = cases[`${caseValue}`]

  if (value === undefined) {
    return <></>
  }
  return RenderingEngine.render({ values: props.values, setup: props.setup, element: value })
}
