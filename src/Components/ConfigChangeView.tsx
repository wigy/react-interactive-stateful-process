import React from 'react'
import { elementNames, ID } from 'interactive-elements'
import { ConfigView } from '.'
import { useTranslation } from 'react-i18next'

export const IGNORE_FIELDS = /^(answers|rules)$/

export type ConfigChangeViewProps = {
  step: {
    id: ID
    action: Record<string, unknown>
    directions: Record<string, unknown>
    number: number
    started: Date
    finished: Date
  }
}

/**
 * A viewer for changes made during the interactive step.
 * @param props
 * @returns
 */
export const ConfigChangeView = (props: ConfigChangeViewProps): JSX.Element => {
  const { t } = useTranslation()
  if (props.step.directions.type !== 'ui') {
    return <></>
  }
  const names = [...elementNames(props.step.directions.element)].sort()
  const changes = {}
  for (let name of names) {
    if (name.startsWith('configure.')) {
      name = name.substr(10)
      changes[name] = (props.step.action.configure as Record<string, unknown>)[name]
    }
  }
  return <ConfigView title={t('Configured the Following')} config={changes} />
}
