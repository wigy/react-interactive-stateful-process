import { Setup } from "./Setup"
import { TriggerValues } from "./Triggers"

export type RendererName = string
export type RenderingProps<SetupType=Setup, ElementType=Element> = {
  element: ElementType,
  values: TriggerValues,
  setup: SetupType
}
