export declare enum ProcessStatus {
    INCOMPLETE = "INCOMPLETE",
    WAITING = "WAITING",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
    CRASHED = "CRASHED"
}
export declare type ProcessStatusIconProps = {
    status: ProcessStatus;
};
/**
 * Display icon for process status.
 * @param props
 * @returns
 */
export declare const ProcessStatusIcon: (props: ProcessStatusIconProps) => JSX.Element;
