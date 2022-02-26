import React from 'react'
import { encode } from 'base64-arraybuffer'
import { Button, IconButton } from '@mui/material'
import { Trans } from 'react-i18next'
import { UploadFile } from '@mui/icons-material'

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
  color?: 'inherit' | 'error' | 'success' | 'primary' | 'secondary' | 'info' | 'warning',
  variant?: 'text' | 'outlined' | 'contained',
  disabled?: boolean
  text?: string
  icon?: JSX.Element | ''
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

  const noIcon = props.icon !== undefined && !props.icon
  const noText = props.text !== undefined && !props.text
  const text = props.text || <Trans>Upload</Trans>
  const icon = noIcon ? undefined : (props.icon || <UploadFile />)

  return (
    <>
      <input id="file-uploader-input" disabled={!!props.disabled} type="file" multiple={!!props.multiple} hidden onChange={(e) => onFileChange(e)}/>
      <label htmlFor="file-uploader-input">
        { noText &&
          <Button component="span" disabled={!!props.disabled} color={props.color}>{icon}</Button>
        }
        { !noText &&
          <Button component="span" disabled={!!props.disabled} startIcon={icon} color={props.color} variant={props.variant} >
            {text}
          </Button>
        }
      </label>
    </>
  )
}
