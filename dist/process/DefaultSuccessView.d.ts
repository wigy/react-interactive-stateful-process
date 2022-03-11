import { ProcessModelDetailedData, ProcessStepModelData } from 'interactive-elements';
export declare type DefaultSuccessViewProps = {
    process: ProcessModelDetailedData;
    step: ProcessStepModelData;
};
/**
 * Simple state display showing a success mark if state is success.
 * @param props
 * @returns
 */
export declare const DefaultSuccessView: (props: DefaultSuccessViewProps) => JSX.Element;
