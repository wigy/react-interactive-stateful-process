/// <reference types="react" />
import { GetOneProcessResponse } from 'interactive-elements';
import { DefaultSummaryViewProps } from './DefaultSummaryView';
import { DefaultStateViewProps } from './DefaultStateView';
import { DefaultResultViewProps } from './DefaultResultView';
export declare type DefaultStepViewProps = {
    api: string;
    token?: string;
    step: number;
    process: GetOneProcessResponse;
    summaryView?: (props: DefaultSummaryViewProps) => JSX.Element;
    stateView?: (props: DefaultStateViewProps) => JSX.Element;
    resultView?: (props: DefaultResultViewProps) => JSX.Element;
};
/**
 * Default viewer for a process configuration displaying names and values as is on one single line.
 * @param props
 * @returns
 */
export declare const DefaultStepView: (props: DefaultStepViewProps) => JSX.Element;
