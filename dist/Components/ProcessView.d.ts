export declare type ProcessStepProps = {
    api: string;
    proccessId: number;
    index: number;
};
export declare const ProcessStep: (props: ProcessStepProps) => JSX.Element;
export declare type ProcessViewProps = {
    api: string;
    proccessId: number;
};
/**
 * A viewer for single process with step browsing capabilities.
 * @param props
 * @returns
 */
export declare const ProcessView: (props: ProcessViewProps) => JSX.Element;
