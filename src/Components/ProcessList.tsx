import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody } from '@material-ui/core'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { ProcessStatusIcon } from './ProcessStatusIcon'
import { useAxios } from './useAxios'
import { GetAllProcessesApiResponse, ID } from 'interactive-elements'

export type ProcessListProps = {
  api: string,
  onClick?: (id: ID) => void
}

export const ProcessList = (props: ProcessListProps): JSX.Element => {

  const [processes, setProcesses] = useState<GetAllProcessesApiResponse>([])
  useAxios({ url: `${props.api}`, receiver: setProcesses })

  return (
    <TableContainer>
      <Table className="ProcessTable">
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
