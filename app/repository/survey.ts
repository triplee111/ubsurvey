import { AxiosRequestConfig } from 'axios'
import useAgent from '@act/service-agent'

import { SubjectAnswer } from '@/types'

const service = useAgent<AxiosRequestConfig>()

const getSurvey = (token: string, user = '') => {
  if (user) {
    return service.get(
      `fsv/s/t/${token}/u/${user}/p/${process.env.PROJ_PLATFORM}`
    )
  }
  return service.get(`fsv/s/t/${token}/p/${process.env.PROJ_PLATFORM}`)
}

const sendSurvey = (
  token: string,
  {
    user,
    answers,
    mark
  }: {
    user: string
    answers: { [qid: string]: SubjectAnswer }
    mark: number
  }
) => {
  return service.post(`fsv/r/t/${token}/p/${process.env.PROJ_PLATFORM}`, {
    user,
    answers,
    mark
  })
}

export default {
  getSurvey,
  sendSurvey
}
