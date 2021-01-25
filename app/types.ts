/* eslint no-unused-vars: "off" */

export type ExternalLinks = { [porp: string]: string }

export interface InitResolve {
  actTitle: string
  links: ExternalLinks
  copy: { [prop: string]: any }
}

export interface AuthState {
  user: {
    account: string
    level: string
    agent: string
    regDate: string
  }
  validation: string
  inProgress: boolean
}

export interface RootState {
  inProgress: boolean
}

// survey interface
export interface IResizeCallBack {
  (_device: string): void
}

export interface Option {
  id: number
  item: string
  jumpTo?: number // 跳題
  concatTo?: number // 接題
}

export interface ValidateClass {
  required?: boolean
  optsRange?: number[]
}

export interface Subject {
  id: number
  type: string
  qno?: number
  content: string
  comment?: string
  visible: boolean
  validate: ValidateClass
  opts?: Option[]
}

export type Survey = Subject[]

// survey store interface
interface SubjectState {
  no: number
  visible: boolean
  validate: boolean
}

interface SubjectAnswer {
  id: number
  select?: number | number[]
  inputs?: string
}

export interface SurveyState {
  surveyState: SubjectState[]
  surveyAns: SubjectAnswer[]
}

export interface State extends RootState {
  auth: AuthState
  survey: SurveyState
}
