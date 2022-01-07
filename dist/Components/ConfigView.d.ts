/// <reference types="react" />
import { ProcessConfig } from 'interactive-elements';
export declare type ConfigViewProps = {
    title?: string;
    config: ProcessConfig;
};
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export declare const ConfigView: (props: ConfigViewProps) => JSX.Element;
