import { IVerify, ValidatorOptions } from '@/types'

export default (
  fn: IVerify,
  opts: ValidatorOptions,
  config: number[]
): IVerify => {
  return (ans, errors = []) => {
    // break 開啟時，已有驗證錯誤就直接回傳
    if (opts.break && errors.length > 0) {
      return fn(ans, errors)
    }

    // 驗證規則
    if (
      Array.isArray(ans.select) &&
      (ans.select.length < config[0] || ans.select.length > config[0])
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
