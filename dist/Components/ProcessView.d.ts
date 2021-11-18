import { DefaultStepViewProps } from './DefaultStepView';
import { ProcessConfig } from 'interactive-elements';
import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultDirectionsViewProps } from './DefaultDirectionsView';
import { DefaultSummaryViewProps } from './DefaultSummaryView';
import { DefaultActionViewProps } from './DefaultActionView';
export declare type ProcessViewProps = {
    api: string;
    token?: string;
    id: number;
    onBack?: () => void;
    configView?: (config: ProcessConfig) => JSX.Element;
    stepView?: (props: DefaultStepViewProps) => JSX.Element;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    directionsView?: (props: DefaultDirectionsViewProps) => JSX.Element;
    actionView?: (props: DefaultActionViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
};
/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
export declare const ProcessView: (props: ProcessViewProps) => JSX.Element;
