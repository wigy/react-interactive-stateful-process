import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@mui/material'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { ProcessStatusIcon } from './ProcessStatusIcon'
import { useAxios } from '..'
import { GetAllProcessesApiResponse, ID } from 'interactive-elements'

export type ProcessListProps = {
  api: string,
  token?: string,
  onClick?: (id: ID) => void
}

/**
 * A table view for a list of processes collected from the given API.
 * @param props
 * @returns
 */
export const ProcessList = (props: ProcessListProps): JSX.Element => {

  const [processes, setProcesses] = useState<GetAllProcessesApiResponse>([])
  useAxios({ url: `${props.api}`, token: props.token, receiver: setProcesses })

  return (
    <TableContainer>
      <Table className="ProcessTable" size="small">
        <TableHead>
          <TableRow>
            <TableCell variant="head" align="left"><Trans>#</Trans></TableCell>
            <TableCell variant="head" align="left"><Trans>Date</Trans></TableCell>
            <TableCell variant="head" align="left"><Trans>Process Name</Trans></TableCell>
            <TableCell variant="head" align="left"><Trans>Status</Trans></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          processes.map(process => (
            <TableRow key={process.id} onClick={() => { props.onClick && props.onClick(process.id) }}>
              <TableCell>{process.id}</TableCell>
              <TableCell>{process.created}</TableCell>
              <TableCell>{process.name}</TableCell>
              <TableCell><ProcessStatusIcon status={process.status}/></TableCell>
            </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </TableContainer>
  )
}