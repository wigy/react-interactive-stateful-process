/// <reference types="react" />
import { ProcessConfig } from 'interactive-elements';
export declare type DefaultResultViewProps = {
    config: ProcessConfig;
    result: unknown;
};
/**
 * Simple JSON display for result.
 * @param props
 * @returns
 */
export declare const DefaultResultView: (props: DefaultResultViewProps) => JSX.Element;
