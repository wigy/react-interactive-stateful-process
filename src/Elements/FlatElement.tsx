import React from 'react'
import { Renderer, RenderingEngine, RenderingProps } from "../Rendering"
import { Element, isFlatElement } from 'interactive-stateful-process'

export const FlatRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isFlatElement(element)) {
    return <></>
  }
  return <>{element.elements.map((element: Element, idx) => <div key={idx}>{RenderingEngine.render({ values: props.values, setup: props.setup, element })}</div>)}</>
}
