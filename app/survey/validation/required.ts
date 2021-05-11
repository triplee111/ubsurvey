import { IVerify, ValidatorOptions } from '@/types'

export default (fn: IVerify, opts: ValidatorOptions, config?: boolean): IVerify => {
  return (ans, errors = []) => {
    // break 開啟時，已有驗證錯誤就直接回傳
    if (opts.break && errors.length > 0) {
      return fn(ans, errors)
    }

    if (config) {
      // 文字輸入題型
      if (!ans.select && typeof ans.inputs === 'string' && ans.inputs === '') {
        errors?.push({ rule: 'required' })

        return fn(ans, errors)
      }

      // 選擇題型
      if (Array.isArray(ans.select) && ans.select?.length === 0) {
        errors?.push({ rule: 'required' })

        return fn(ans, errors)
      }
    }

    return fn(ans, errors)
  }
}
