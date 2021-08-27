import { BooleanElement } from './BooleanElement'
import { TextElement } from './TextElement'
import { ButtonElement } from './ButtonElement'
import { FlatElement } from './FlatElement'

/**
 * Union of all standard element types.
 */
export type Element = BooleanElement | TextElement | ButtonElement | FlatElement
