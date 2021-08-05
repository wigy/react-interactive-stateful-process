import React from 'react'
import { Renderer, RenderingEngine, RenderingProps } from "../Rendering"
import { Element, ContainerElement } from '../Elements'

/**
 * A simple element container rendering each contained element one by one in DIV.
 */
export interface FlatElement extends ContainerElement {
  readonly type: 'flat'
}

// eslint-disable-next-line
export function isContainerElement(object: any): object is ContainerElement {
  return 'elements' in object
}

export const FlatRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isContainerElement(element)) {
    return <></>
  }
  return <>{element.elements.map((element: Element, idx) => <div key={idx}>{RenderingEngine.render({ values: props.values, setup: props.setup, element })}</div>)}</>
}
