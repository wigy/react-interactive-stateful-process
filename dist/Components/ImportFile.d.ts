import { SegmentId, TextFileLine } from 'interactive-elements';
import { DefaultResultViewProps } from './DefaultResultView';
export declare type ImportLineProps = {
    lineNumber: number;
    columns: Record<string, string>;
    text: string;
    segmentId?: string;
    color?: string;
    result?: unknown;
    resultView: (props: DefaultResultViewProps) => JSX.Element;
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
    results?: Record<SegmentId, unknown>;
    resultView: (props: DefaultResultViewProps) => JSX.Element;
};
/**
 * Line by line display for imported file.
 * @param props
 * @returns
 */
export declare const ImportFile: (props: ImportFileProps) => JSX.Element;
