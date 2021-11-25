import { GetOneStepResponse } from 'interactive-elements'
import { Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { Trans } from 'react-i18next'

export type DefaultSummaryViewProps = {
  step: GetOneStepResponse
}

/**
 * Default viewer for a process step summary information.
 * @param props
 * @returns
 */
export const DefaultSummaryView = (props: DefaultSummaryViewProps): JSX.Element => {

  const { step } = props

  const started = new Date(step.started).getTime()
  const finished = new Date(step.finished).getTime()

  return (
    <Typography variant="body2">
      <Trans><strong>Process ID</strong></Trans>: {step.processId}
      &nbsp;
      <Trans><strong>Step</strong></Trans>: {step.number + 1}
      &nbsp;
      <Trans><strong>Handler</strong></Trans>: {step.handler}
      &nbsp;
      <Trans><strong>Started</strong></Trans>: {step.started}
      &nbsp;
      <Trans><strong>Duration</strong></Trans>: {finished ? `${finished - started}ms` : '—'}
    </Typography>
  )
}
