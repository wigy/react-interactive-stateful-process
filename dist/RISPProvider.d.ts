export declare type RISPProviderProps = {
    children: JSX.Element;
    onBlur?: () => void | Promise<void>;
    onFocus?: () => void | Promise<void>;
};
/**
 * Register all renderers and action handlers.
 */
export declare const RISPProvider: {
    (props: RISPProviderProps): JSX.Element;
    /**
     * Extrnal calling interface for hooks.
     */
    onBlur(): void;
    onFocus(): void;
};
