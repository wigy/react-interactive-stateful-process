import { TextFileLine } from 'interactive-elements';
export declare type ImportLineProps = {
    line: number;
    text: string;
    color?: string;
};
/**
 * Renderer for single line of a text file.
 * @param props
 * @returns
 */
export declare const ImportLine: (props: ImportLineProps) => JSX.Element;
export declare type ImportFileProps = {
    name: string;
    lines: TextFileLine[];
};
/**
 * Line by line display for imported file.
 * @param props
 * @returns
 */
export declare const ImportFile: (props: ImportFileProps) => JSX.Element;
