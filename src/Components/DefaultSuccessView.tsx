import { Card, CardContent, Typography } from '@mui/material'
import { green } from '@mui/material/colors'
import { GetOneProcessResponse, ProcessStatus } from 'interactive-elements'
import React from 'react'
import { Trans } from 'react-i18next'
import { ProcessStatusIcon } from '.'

export type DefaultSuccessViewProps = {
  process: GetOneProcessResponse
}

/**
 * Simple state display showing a success mark if state is success.
 * @param props
 * @returns
 */
export const DefaultSuccessView = (props: DefaultSuccessViewProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
      <ProcessStatusIcon status={'SUCCEEDED' as ProcessStatus}/>
        <Typography sx={{ color: green[900] }}>
          <Trans>Process Was Successfully Completed!</Trans>
        </Typography>
      </CardContent>
    </Card>
  )
}
