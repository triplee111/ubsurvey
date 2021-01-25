import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import { App, defineAsyncComponent, inject } from 'vue'

const surveyProvider = Symbol('surveyProvider')

export const registerSurveyComponent = (
  SubjectType: Map<string, string>,
  prefix: string | undefined
) => {
  return (app: App) => {
    const registers: Map<string, string> = new Map()

    for (const [type, componentName] of SubjectType) {
      if (!registers.has(type)) {
        const registerName = prefix
          ? `${prefix}-${componentName}`
          : componentName

        const compNameUpperCamelCase = upperFirst(camelCase(registerName))

        app.component(
          registerName,
          defineAsyncComponent(() =>
            import(`./subject/${compNameUpperCamelCase}.vue`)
          )
        )

        registers.set(type, registerName)
      }
    }

    app.provide(surveyProvider, { components: registers })
  }
}

export const useComponentsMap = (): Map<string, string> =>
  (inject(surveyProvider) as any).components
