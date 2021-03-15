import { AxiosRequestConfig } from 'axios'
import useAgent from '@act/service-agent'

import { SubjectAnswer } from '@/types'

const service = useAgent<AxiosRequestConfig>()

const getSurvey = (token: string) => {
  return service.get(`fsv/s/t/${token}`)
}

const sendSurvey = (
  token: string,
  {
    account,
    answers
  }: {
    account: string
    answers: { [qid: string]: SubjectAnswer }
  }
) => {
  return service.post(`fsv/r/t/${token}`, {
    account,
    answers
  })
}

export default {
  getSurvey,
  sendSurvey
}
