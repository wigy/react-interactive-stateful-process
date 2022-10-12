import React from 'react'
import { elementNames, ProcessStepModelData } from 'interactive-elements'
import { ConfigView } from '.'
import { useTranslation } from 'react-i18next'

export type ConfigChangeViewProps = {
  step: ProcessStepModelData
}

/**
 * A viewer for changes made during the interactive step.
 * @param props
 * @returns
 */
export const ConfigChangeView = (props: ConfigChangeViewProps): JSX.Element => {
  const { t } = useTranslation()
  if (!props.step.directions || props.step.directions.type !== 'ui') {
    return <></>
  }
  if (!props.step.action || !props.step.action.configure) {
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
  return <ConfigView ignore={/^_/} title={t('Configured the Following')} config={changes} />
}
