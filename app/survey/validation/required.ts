import { IVerify, ValidatorOptions } from '@/types'

export default (
  fn: IVerify,
  opts: ValidatorOptions,
  config?: boolean
): IVerify => {
  return (ans, errors = []) => {
    // break 開啟時，已有驗證錯誤就直接回傳
    if (opts.break && errors.length > 0) {
      return fn(ans, errors)
    }

    // 驗證規則
    if ((ans.inputs === '' || ans.select?.length === 0) && config) {
      errors?.push({ rule: 'required' })

      return fn(ans, errors)
    }
    return fn(ans, errors)
  }
}
