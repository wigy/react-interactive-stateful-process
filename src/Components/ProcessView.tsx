import { TableContainer, Table, TableHead, TableCell, TableRow, TableBody, Typography, TextField, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'
import { useAxios } from './useAxios'

export type ProcessViewProps = {
  api: string
  id: number
}

export const ProcessView = (props: ProcessViewProps): React.Element => {

  const [process, setProcess] = useState(null)
  useAxios({ url: `${props.api}/${props.id}`, receiver: setProcess })

  return (
    <div>
      {JSON.stringify(process)}
    </div>
  )
}
