import camelCase from 'lodash/camelCase'

const requireModule = require.context(
  // Search for files in the current directory.
  '.',
  // Search for files in subdirectories.
  true,
  // Include any .js or .ts files that are not this file or a unit test or types.
  /^((?!index|types|\.unit\.).)*\.(ts|js)$/
)

const modules = {}

requireModule.keys().forEach(fileName => {
  // Get the module path as an array.
  const moduleName: string = camelCase(
    fileName
      // Remove the "./" from the beginning.
      .replace(/^\.\//, '')
      // Remove the file extension from the end.
      .replace(/\.\w+$/, '')
  )

  Object.assign(modules, {
    [moduleName]: {
      // add namespace here
      namespaced: true,
      ...requireModule(fileName).default
    }
  })
})

export default modules
