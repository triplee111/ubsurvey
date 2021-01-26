import * as methods from './validation'

import { ValidateClass } from '@/types'

const Validator = () => {
  let state = true
}

Validator.prototype.verify = (inputs: string, state: boolean) => {
  return state
}

export default (validateClass: ValidateClass) => {
  let validator = Object.create(Validator)

  validator.verify = methods.requried(validator.verify)

  return validator
}
