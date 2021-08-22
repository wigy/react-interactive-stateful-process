import React from 'react'
import { Renderer, RenderingEngine, RenderingProps } from "../Rendering"
import { Element } from './index'
import { ContainerElement } from './ContainerElement'

/**
 * A simple element container rendering each contained element one by one in DIV.
 */
export interface FlatElement<ElementType=Element> extends ContainerElement<ElementType> {
  readonly type: string
}

export function isContainerElement(object: any): object is ContainerElement {
  return object.type === 'flat'
}

export const FlatRenderer: Renderer = (props: RenderingProps) => {
  const { element } = props
  if (!isContainerElement(element)) {
    return <></>
  }
  return <>{element.elements.map((element: Element, idx) => <div key={idx}>{RenderingEngine.render({ values: props.values, setup: props.setup, element })}</div>)}</>
}
