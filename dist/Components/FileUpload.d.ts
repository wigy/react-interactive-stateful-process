/**
 * Format of the returned file data from the file uploader component.
 */
export declare type FileUploadData = {
    name: string;
    type: string;
    encoding: string;
    data: string;
};
/**
 * Props for the fileuploader.
 */
export declare type FileUploaderProps = {
    onUpload: (files: FileUploadData[]) => void;
    multiple?: boolean;
    color?: "inherit" | "primary" | "secondary" | "default";
    variant?: "text" | "outlined" | "contained";
};
/**
 * An file uploader utility.
 * @param props.onUpload A function handling the resulting file upload data.
 */
export declare const FileUploader: (props: FileUploaderProps) => any;
