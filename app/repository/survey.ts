import { AxiosRequestConfig } from 'axios'

import useAgent from '@act/service-agent'

const service = useAgent<AxiosRequestConfig>()

const getSurvey = (token: string) => {
  return service.get(`fsv/s/t/${token}`)
}

export default {
  getSurvey
}
