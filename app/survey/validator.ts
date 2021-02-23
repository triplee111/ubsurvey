import { ValidateRules, IVerify, ValidatorOptions } from '@/types'
import * as vMethods from './validation'

const Validator: { verify: IVerify } = {
  verify: (ans, errors = []) => {
    const keys = Object.keys(ans)

    if (
      keys.length === 0 ||
      !(keys.includes('select') || keys.includes('inputs'))
    ) {
      throw new Error('Error Answer Format')
    }

    return errors
  }
}

const getVMethodsByName = <T, U extends keyof T>(obj: T) => (key: U) => obj[key]

export const createValidator = (
  rules: ValidateRules,
  option: ValidatorOptions = { break: false }
) => {
  const validator: typeof Validator = Object.create(Validator)

  for (const [method, param] of Object.entries(rules)) {
    if (Object.prototype.hasOwnProperty.call(vMethods, method)) {
      const decorator = getVMethodsByName(vMethods)(
        method as keyof ValidateRules
      )

      validator.verify = decorator(validator.verify, option, param)
    }
  }

  return validator
}
