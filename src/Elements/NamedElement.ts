import { TriggerValue } from "../Triggers";

/**
 * An element that has a name and value.
 */
export interface NamedElement {
  readonly type: string
  name: string
  value: TriggerValue
  label?: string
}

export function isNamedElement(object: any): object is NamedElement {
  return 'name' in object
}
