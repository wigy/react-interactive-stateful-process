import React from 'react'
import { observer } from 'mobx-react'
import { RenderingEngine, RenderingProps } from './Rendering'
import { Element } from './Elements/index'
import { isNamedElement } from './Elements/NamedElement'
import { ActiveElement, isActiveElement } from './Elements/ActiveElement'
import { isContainerElement } from './Elements/ContainerElement'
import { TriggerEngine } from './Triggering'

/**
 * This is the main entry point for dynamical rendereding.
 *
 * It is very important to add unique `key` attribute if using various instances. Otherwise the
 * different number of hooks in different renderings can throw errors in React.
 *
 * @param props
 * @returns Completely controlled display section.
 */
 export const RISP: React.FC<RenderingProps> = observer((props: RenderingProps) => {

  const { values, element } = props

  // Fill in appropriate fields for elements.
  const prepare = (element: Element) => {
      // Named components have values.
      if (isNamedElement(element)) {
        if (values[element.name] === undefined) {
          values[element.name] = element.defaultValue || null
        }
      }
      // Connect action handlers. We need to put them to all since unknown future types may not hit isActiveElement().
      (element as ActiveElement).triggerHandler = async (trigger, props) => TriggerEngine.handle(trigger, props)

      if (isContainerElement(element)) {
        for (const e of element.elements) {
          prepare(e)
        }
      }
  }
  prepare(element)

  // TODO: We have full redraw when one component is changed.
  const ret = RenderingEngine.render(props)
  if (ret === null) {
    return <></>
  }
  return ret
})
