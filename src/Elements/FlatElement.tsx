import React from 'react'
import { Renderer, RenderingEngine, RenderingProps } from "../Rendering"
import { InteractiveElement, isFlatElement } from 'interactive-elements'

export const FlatRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isFlatElement(element)) {
    return <></>
  }
  return <>{element.elements.map((element: InteractiveElement, idx) => <div key={idx}>{RenderingEngine.render({ values: props.values, setup: props.setup, element })}</div>)}</>
}
