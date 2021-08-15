import React from 'react'
import { observer } from 'mobx-react'
import { RenderingEngine, RenderingProps } from './Rendering'
import { Element } from './Elements/index'
import { isNamedElement } from './Elements/NamedElement'
import { isActiveElement } from './Elements/ActiveElement'
import { isContainerElement } from './Elements/ContainerElement'
import { TriggerEngine } from './Triggering'

/**
 * This is the main entry point for dynamical rendereding.
 * @param props
 * @returns Completely controlled display section.
 */
 export const RISP: React.FC<RenderingProps> = observer((props: RenderingProps) => {

  const { values, element } = props

  // Fill in appropriate fields for elements.
  const prepare = (element: Element) => {
      // Named components have values.
      if (isNamedElement(element)) {
        if (values[element.name] !== undefined) {
          element.value = values[element.name]
        } else {
          element.value = null
        }
      }
      // Connect action handlers.
      if (isActiveElement(element)) {
        element.triggerHandler = async (trigger, action, props) => TriggerEngine.handle(trigger, action, props)
      }

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
