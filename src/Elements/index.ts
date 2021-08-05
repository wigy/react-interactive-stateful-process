import { TextElement } from './TextElement'
export * from './TextElement'

export interface ContainerElement {
  elements: Element[]
}

export type Element = TextElement
