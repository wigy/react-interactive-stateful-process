import React, { ReactElement } from 'react'
import { Setup } from "./Setup"
import { TriggerValues } from "./Triggers"

import { Element } from "./Elements"
import { TextRenderer } from "./Elements/TextElement"

export type RendererName = string
export type RenderingProps<SetupType=Setup, ElementType=Element> = {
  element: ElementType,
  values: TriggerValues,
  setup: SetupType
}
export type Renderer<SetupType=Setup, ElementType=Element> = React.FC<RenderingProps<SetupType, ElementType>>

/**
 * Registry for element rendering handlers.
 */
export class RenderingEngine {

  private static renderers: { [key: string]: Renderer} = {}

  static register<SetupType=Setup, ElementType=Element>(name: RendererName, renderer: Renderer<SetupType, ElementType>): Renderer | null {
    const old = RenderingEngine.renderers[name] || null
    // Not too nice but need to force custom types into registry as well.
    RenderingEngine.renderers[name] = renderer as unknown as Renderer
    return old
  }

  static render(props: RenderingProps): ReactElement | null {
    const { element } = props
    if (!RenderingEngine.renderers[element.type]) {
      throw new Error(`There is no registered renderer for type '${element.type}'.`)
    }
    return RenderingEngine.renderers[element.type](props)
  }
}

RenderingEngine.register('text', TextRenderer)
