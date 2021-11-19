import { Card, CardContent, CardHeader, Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { Trans } from 'react-i18next'

export type DefaultErrorViewProps = {
  error: string
}

/**
 * Simple pre-formatted error display.
 * @param props
 * @returns
 */
export const DefaultErrorView = (props: DefaultErrorViewProps): JSX.Element => {
  const { palette } = useTheme()
  return (
    <Card style={{ backgroundColor: 'rgba(0,0,0,0.05)' }}>
      <CardHeader style={{color: palette.error.main }} title={<Trans>Error</Trans>}/>
      <CardContent>
        <pre>{props.error}</pre>
      </CardContent>
    </Card>
  )
}
