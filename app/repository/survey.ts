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
    user,
    answers
  }: {
    user: string
    answers: { [qid: string]: SubjectAnswer }
  }
) => {
  return service.post(`fsv/r/t/${token}`, {
    user,
    answers
  })
}

export default {
  getSurvey,
  sendSurvey
}
