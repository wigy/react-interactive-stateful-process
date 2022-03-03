import { GetOneProcessResponse, GetOneStepResponse } from 'interactive-elements';
import { ConfigViewProps } from './ConfigView';
export declare type DefaultSummaryViewProps = {
    step: GetOneStepResponse;
    process: GetOneProcessResponse;
    configView?: (props: ConfigViewProps) => JSX.Element;
};
/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export declare const DefaultSummaryView: (props: DefaultSummaryViewProps) => JSX.Element;
