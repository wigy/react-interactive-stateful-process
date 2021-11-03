import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, TextField, MenuItem, useTheme } from '@material-ui/core'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { ProcessStatusIcon } from './ProcessStatusIcon'
import { useAxios } from './useAxios'

export type ProcessViewProps = {
  api: string
  id: number
}

export const ProcessView = (props: ProcessViewProps): React.Element => {

  const [process, setProcess] = useState(null)
  useAxios({ url: `${props.api}/${props.id}`, receiver: setProcess })
  const theme = useTheme()

  if (!process) return <></>

  return (
    <TableContainer>
      <Table className="ProcessTable">
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.primary.main }}>
            <TableCell variant="head" align="left"><Trans>{process.id}</Trans></TableCell>
            <TableCell variant="head" align="left"><Trans>{process.created}</Trans></TableCell>
            <TableCell variant="head" align="left"><Trans>{process.name}</Trans></TableCell>
            <TableCell variant="head" align="left"><ProcessStatusIcon status={process.status}/></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
