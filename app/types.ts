/* eslint no-unused-vars: "off" */

export type ExternalLinks = { [porp: string]: string }

export type Obj = {
  [key: string]: number
}

export type DropdwonStyle = {
  width: string
  top: string
  left: string
}

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

export interface ValidateRules {
  required?: boolean
  optsRange?: number[]
}

export interface ValidatorOptions {
  break: boolean
}

export interface SubjectConfig {
  others?: boolean
  optsUi?: 'radiobox' | 'menu'
  optsColumn?: {
    desktop: number
    mobile: number
  }
  optsRange?: {
    min: number
    max: number
  }
  quote?: string
}

export interface Subject {
  id: number
  type: string
  qno?: number
  content: string
  comment?: string
  visible: boolean
  isQnoVisible: boolean
  validate?: ValidateRules
  opts?: Option[]
  config?: SubjectConfig
}

export type Survey = Subject[]

// survey store interface
export interface SubjectAnswer {
  select?: number[]
  inputs?: string
}

export type ErrorRecord = {
  rule: string
  config?: any
}
export interface IVerify {
  (ans: SubjectAnswer, errors?: ErrorRecord[]): ErrorRecord[]
}

export interface SurveyState {
  validation: { [qid: string]: boolean }
  visibility: { [qid: string]: boolean }
  surveyAns: { [qid: string]: SubjectAnswer }
  subjectFlag: number
}

export interface State extends RootState {
  auth: AuthState
  survey: SurveyState
}
