import { DefaultResultViewProps } from './DefaultResultView';
export declare type ImportStateViewProps = {
    state: Record<string, unknown>;
    resultView: (props: DefaultResultViewProps) => JSX.Element;
};
/**
 * Simple JSON display for state.
 * @param props
 * @returns
 */
export declare const ImportStateView: (props: ImportStateViewProps) => JSX.Element;
