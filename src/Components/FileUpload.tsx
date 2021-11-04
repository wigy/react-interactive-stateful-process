import React from 'react'
import { encode } from 'base64-arraybuffer'
import { Button } from '@material-ui/core'
import { Trans } from 'react-i18next'

/**
 * Format of the returned file data from the file uploader component.
 */
export type FileUploadData = {
  name: string,
  type: string,
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
export const FileUploader = (props: FileUploaderProps): JSX.Element => {

  let uploads: FileUploadData[] = []

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
    uploads.push({
      name: file.name,
      type: file.type,
      encoding: 'base64',
      data: encode(binary)
    })
  }

  /**
   * Handler of the file selection event for the file input component.
   * @param event
   */
  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    uploads = []
    if (event.target.files) {
      for (const file of Array.from(event.target.files)) {
        const binary = await readFileFromInput(file as File).catch(function (reason) {
          console.log(`Error during upload ${reason}`)
          return null
        })
        if (binary) {
          collectUploadedFile(binary, file as File)
        }
        event.target.value = ''
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
