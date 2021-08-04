import React, { ReactElement } from 'react';
import { Setup } from "./Setup";
import { TriggerValues } from "./Triggers";
import { Element } from "./Elements";
export declare type RendererName = string;
export declare type RenderingProps<SetupType = Setup, ElementType = Element> = {
    element: ElementType;
    values: TriggerValues;
    setup: SetupType;
};
export declare type Renderer<SetupType = Setup, ElementType = Element> = React.FC<RenderingProps<SetupType, ElementType>>;
/**
 * Registry for element rendering handlers.
 *
 * This is a global container to register all rendering handlers. It will have
 * all standard element renderers registered by default.
 */
export declare class RenderingEngine {
    private static renderers;
    static register<SetupType = Setup, ElementType = Element>(name: RendererName, renderer: Renderer<SetupType, ElementType>): Renderer | null;
    static render(props: RenderingProps): ReactElement | null;
}
