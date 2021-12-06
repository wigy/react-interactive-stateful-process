import { GetOneProcessResponse, GetOneStepResponse } from 'interactive-elements';
export declare type DefaultSummaryViewProps = {
    step: GetOneStepResponse;
    process: GetOneProcessResponse;
};
/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export declare const DefaultSummaryView: (props: DefaultSummaryViewProps) => JSX.Element;
