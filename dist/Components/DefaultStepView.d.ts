import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultDirectionsViewProps } from './DefaultDirectionsView';
import { DefaultSummaryViewProps } from './DefaultSummaryView';
export declare type DefaultStepViewProps = {
    api: string;
    token?: string;
    step: number;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    directionsView?: (props: DefaultDirectionsViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
};
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export declare const DefaultStepView: (props: DefaultStepViewProps) => JSX.Element;
