import { ID } from 'interactive-elements';
export declare type ProcessListProps = {
    api: string;
    token?: string;
    onClick?: (id: ID) => void;
};
export declare const ProcessList: (props: ProcessListProps) => JSX.Element;
