import { AxiosRequestConfig } from 'axios'

import useAgent from '@act/service-agent'

const endpoint = 'ub/ubsurvey'

/**
 * 如果需要覆寫選用 agent 封裝的設定時，需要指定該 agent 參數的宣告型別
 * 本例預設的 agent 為 axios，所以引用 AxiosRequestConfig 型別，並在初始化時代入
 */
const service = useAgent<AxiosRequestConfig>()

// 取得初始資料
const init = () => {
  return service.get(`${endpoint}/init`)
}

export default {
  init
}
