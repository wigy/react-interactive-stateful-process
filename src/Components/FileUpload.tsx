import React from 'react'
import { encode } from 'base64-arraybuffer'
import { Button } from '@material-ui/core'
import { Trans } from 'react-i18next'

/**
 * Format of the returned file data from the file uploader component.
 */
export type FileUploadData = {
  name: string,
  mimeType: string,
  encoding: string,
  data: string
}

/**
 * Props for the fileuploader.
 */
export type FileUploaderProps = {
  onUpload: (files: FileUploadData[]) => void,
  multiple?: boolean,
  color?: "inherit" | "primary" | "secondary" | "default",
  variant?: "text" | "outlined" | "contained"
}

/**
 * An file uploader utility.
 * @param props.onUpload A function handling the resulting file upload data.
 */
export const FileUploader = (props: FileUploaderProps): React.Element => {

  let uploads: FileUploadData[] = []

  /**
   * Helper to find out if we do base64 encoding or just pass it as a text.
   * @param file
   */
  const isBinary = (file: File): boolean => {
    return !file.type.startsWith('text/')
  }

  /**
   * Helper to read a selected file in.
   * @param file
   * @returns
   */
  const readFileFromInput = async (file: File): Promise<ArrayBuffer> => {
    return new Promise(function (resolve, reject) {
        const reader = new FileReader()
        reader.onerror = reject
        reader.onload = function () { resolve(reader.result as ArrayBuffer) }
        reader.readAsArrayBuffer(file)
    })
  }

  /**
   * Helper to post process selected files.
   * @param binary
   * @param file
   */
  const collectUploadedFile = (binary: ArrayBuffer, file: File): void => {
    if (isBinary(file)) {
      uploads.push({
        name: file.name,
        mimeType: file.type,
        encoding: 'base64',
        data: encode(binary)
      })
    } else {
      const decoder = new TextDecoder("utf-8");
      uploads.push({
        name: file.name,
        mimeType: file.type,
        encoding: 'utf-8',
        data: decoder.decode(binary)
      })
    }
    console.log(uploads);
  }

  /**
   * Handler of the file selection event for the file input component.
   * @param event
   */
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    uploads = []
    for (const file of Array.from(event.target.files)) {
      const binary = await readFileFromInput(file as File).catch(function (reason) {
        console.log(`Error during upload ${reason}`)
        event.target.value = ''
        return null
      })
      if (binary) {
        collectUploadedFile(binary, file as File)
      }
    }
    props.onUpload(uploads)
  }

  return (
    <>
      <input id="file-uploader-input" type="file" multiple={!!props.multiple} hidden onChange={(e) => onFileChange(e)}/>
      <label htmlFor="file-uploader-input">
        <Button component="span" color={props.color} variant={props.variant} >
          <Trans>Upload</Trans>
        </Button>
      </label>
    </>
  )
}
