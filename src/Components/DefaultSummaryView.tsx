import { GetOneProcessResponse, GetOneStepResponse } from 'interactive-elements'
import { Card, CardContent, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Settings } from '@mui/icons-material'
import { ConfigView } from '.'

export type DefaultSummaryViewProps = {
  step: GetOneStepResponse
  process: GetOneProcessResponse
}

/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export const DefaultSummaryView = (props: DefaultSummaryViewProps): JSX.Element => {

  const { step } = props
  const { t } = useTranslation()
  const [ showConfig, setShowConfig ] = useState<boolean>(false)
  const started = new Date(step.started).getTime()
  const finished = new Date(step.finished).getTime()

  return (
    <>
      <Typography variant="body2">
        <Trans><strong>Process ID</strong></Trans>: {step.processId}
        &nbsp;
        <Trans><strong>Step</strong></Trans>: {step.number + 1}
        &nbsp;
        <Trans><strong>Handler</strong></Trans>: {step.handler}
        &nbsp;
        <Trans><strong>Started</strong></Trans>: {step.started}
        &nbsp;
        <Trans><strong>Duration</strong></Trans>: {finished ? `${finished - started}ms ` : '— '}
        <IconButton
          size="small"
          title={showConfig ? t('Hide configuration') : t('Show configuration')}
          onClick={() => setShowConfig(!showConfig)}
        >
          <Settings/>
        </IconButton>
      </Typography>
      { showConfig &&
        <Card style={{ marginBottom: '0.5em' }}>
          <CardContent>
            <ConfigView title={t('Configuration')} config={props.process.config}/>
          </CardContent>
        </Card>}
    </>
  )
}
