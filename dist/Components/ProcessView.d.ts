import { DefaultStepViewProps } from './DefaultStepView';
import { RenderingProps, Setup } from 'interactive-elements';
import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultSummaryViewProps } from './DefaultSummaryView';
import { DefaultResultViewProps } from './DefaultResultView';
import { ConfigViewProps } from './ConfigView';
export declare type ProcessViewProps = {
    api: string;
    token?: string;
    id: number;
    step?: number;
    setup?: Setup;
    onBack?: () => void;
    onChangeStep?: (step: number) => void;
    stepView?: (props: DefaultStepViewProps) => JSX.Element;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
    resultView?: (props: DefaultResultViewProps) => JSX.Element;
    configView?: (props: ConfigViewProps) => JSX.Element;
    onActionSuccess?: (result: unknown, trigger: string, props: RenderingProps) => void;
};
/**
 * A viewer for process steps.
 * @param props
 * @returns
 */
export declare const ProcessView: (props: ProcessViewProps) => JSX.Element;
