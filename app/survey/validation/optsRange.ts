import { IVerify, ValidatorOptions } from '@/types'

export default (
  fn: IVerify,
  opts: ValidatorOptions,
  config: {
    min: number
    max: number
  }
): IVerify => {
  return (ans, errors = []) => {
    // break 開啟時，已有驗證錯誤就直接回傳
    if (opts.break && errors.length > 0) {
      return fn(ans, errors)
    }

    // 驗證規則
    if (
      Array.isArray(ans.select) &&
      (ans.select.length < config.min || ans.select.length > config.max)
    ) {
      errors?.push({
        rule: 'optsRange',
        config
      })

      return fn(ans, errors)
    }
    return fn(ans, errors)
  }
}
