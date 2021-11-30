import { DefaultConfigViewProps } from './DefaultConfigView';
import { DefaultStepViewProps } from './DefaultStepView';
import { Setup } from 'interactive-elements';
import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultSummaryViewProps } from './DefaultSummaryView';
export declare type ProcessViewProps = {
    api: string;
    token?: string;
    id: number;
    step?: number;
    setup?: Setup;
    onBack?: () => void;
    onChangeStep?: (step: number) => void;
    configView?: (config: DefaultConfigViewProps) => JSX.Element;
    stepView?: (props: DefaultStepViewProps) => JSX.Element;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
};
/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
export declare const ProcessView: (props: ProcessViewProps) => JSX.Element;
