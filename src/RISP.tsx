import React from 'react'
import { observer } from 'mobx-react'
import { RenderingEngine, RenderingProps } from './Rendering'
import { InteractiveElement, ActiveElement, isContainerElement, isNamedElement, isActiveElement } from 'interactive-elements'
import { runInAction } from 'mobx'
import { ActionEngine } from './ActionEngine'

export type RISPProps = RenderingProps & {
  onActionSuccess?: (result: unknown, trigger: string, props: RenderingProps) => void
}

/**
 * This is the main entry point for dynamical rendereding.
 *
 * It is very important to add unique `key` attribute if using various instances. Otherwise the
 * different number of hooks in different renderings can throw errors in React.
 *
 * @param props
 * @returns Completely controlled display section.
 */
export const RISP: React.FC<RISPProps> = observer((rispProps: RISPProps) => {

  const { values, element } = rispProps

  // Fill in appropriate fields for elements.
  const prepare = (element: InteractiveElement) => {
    // Named components have values.
    if (isNamedElement(element)) {
      if (values[element.name] === undefined) {
        values[element.name] = element.defaultValue || null
      }
    }
    // Connect action handlers. We need to put handler every element since unknown future types may not hit isActiveElement().
    (element as ActiveElement).triggerHandler = async (trigger, props) => {

      if (isNamedElement(element) && 'value' in trigger) {
        runInAction(() => (props.values[element.name] = trigger.value))
      }

      if (isActiveElement(element) && element.actions[trigger.type]) {
        const result = await ActionEngine.handle(element.actions[trigger.type], props)
        if (result.success && rispProps.onActionSuccess) {
          rispProps.onActionSuccess(result.result, trigger.type, props)
        }
        return result
      }

      return ActionEngine.success(undefined)
    }

    if (isContainerElement(element)) {
      for (const e of element.elements) {
        prepare(e)
      }
    }
  }

  prepare(element)

  const ret = RenderingEngine.render(rispProps)
  if (ret === null) {
    return <></>
  }
  return ret
})
