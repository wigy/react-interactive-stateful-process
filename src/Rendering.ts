import React, { ReactElement } from 'react'
import { Setup } from "./Setup"
import { TriggerValues } from "./Triggers"
import { Element } from "./Elements/index"
import { TextRenderer } from "./Elements/TextElement"
import { FlatRenderer } from "./Elements/FlatElement"
import { ButtonRenderer } from "./Elements/ButtonElement"

/**
 * Readability helper to specify that a string is being used as a renderer name.
 */
export type RendererName = string

/**
 * A parameter collection used when rendering element.
 *
 * @property element Actual top level element to render.
 * @property values A set of values to edit associated with the rendering process.
 * @property setup Global configuration for the rendering system.
 */
export type RenderingProps<SetupType=Setup, ElementType=Element> = {
  element: ElementType,
  values: TriggerValues,
  setup: SetupType
}

/**
 * A function rendering certain type of element providing React Element presentation for it.
 */
export type Renderer<SetupType=Setup, ElementType=Element> = React.FC<RenderingProps<SetupType, ElementType>>

/**
 * Registry for element rendering handlers.
 *
 * This is a global container to register all rendering handlers. It will have
 * all standard element renderers registered by default.
 */
export class RenderingEngine {

  private static renderers: { [key: string]: Renderer} = {}

  /**
   * Register a handler for an element type.
   * @param name
   * @param renderer
   * @returns Old handler if there was any.
   */
  static register<SetupType=Setup, ElementType=Element>(name: RendererName, renderer: Renderer<SetupType, ElementType>): Renderer | null {
    const old = RenderingEngine.renderers[name] || null
    // Not too nice but need to force custom types into registry as well.
    RenderingEngine.renderers[name] = renderer as unknown as Renderer
    return old
  }

  /**
   * Find the registered renderer for the given properties and call the renderer if found.
   * @param props
   * @returns Elements.
   */
  static render(props: RenderingProps): ReactElement | null {
    const { element } = props
    if (!RenderingEngine.renderers[element.type]) {
      throw new Error(`There is no registered renderer for type '${element.type}'.`)
    }
    return RenderingEngine.renderers[element.type](props)
  }
}

RenderingEngine.register('text', TextRenderer)
RenderingEngine.register('flat', FlatRenderer)
RenderingEngine.register('button', ButtonRenderer)
