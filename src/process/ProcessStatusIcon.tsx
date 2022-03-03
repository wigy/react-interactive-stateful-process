import React from 'react'
import { Warning, CheckCircleOutline, Timer, ErrorOutline, HourglassEmpty, Help } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { red, green, blue } from '@mui/material/colors'

export enum ProcessStatus {
  INCOMPLETE = 'INCOMPLETE',
  WAITING = 'WAITING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CRASHED = 'CRASHED'
}

export type ProcessStatusIconProps = {
  status: ProcessStatus
}

/**
 * Display icon for process status.
 * @param props
 * @returns
 */
export const ProcessStatusIcon = (props: ProcessStatusIconProps) => {

  const colors = {
    red: red[700],
    blue: blue[900],
    green: green[800]
  }

  switch (props.status) {
    case 'FAILED':
      return <Typography title={props.status} style={{ color: colors.red }}><ErrorOutline /></Typography>
    case 'WAITING':
      return <Typography title={props.status} style={{ color: colors.blue }}><Timer /></Typography>
    case 'SUCCEEDED':
      return <Typography title={props.status} style={{ color: colors.green }}><CheckCircleOutline /></Typography>
    case 'CRASHED':
      return <Typography title={props.status} style={{ color: colors.red }}><Warning /></Typography>
    case 'INCOMPLETE':
      return <Typography title={props.status} style={{ color: colors.blue }}><HourglassEmpty /></Typography>
  }
  return <Typography title={props.status} style={{ color: colors.red }}><Help /></Typography>
}
