import { ID } from 'interactive-elements';
export declare type ConfigChangeViewProps = {
    step: {
        id: ID;
        action: Record<string, unknown>;
        directions: Record<string, unknown>;
        number: number;
        started: Date;
        finished: Date;
    };
};
/**
 * A viewer for changes made during the interactive step.
 * @param props
 * @returns
 */
export declare const ConfigChangeView: (props: ConfigChangeViewProps) => JSX.Element;
