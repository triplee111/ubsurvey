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

/** survey interface */
type Nullable<T> = T | null
export interface QuestionState {
  id: number
  type: number
  subject: string
  isRequired: boolean
  needOther: boolean
  options: Nullable<string[]>
}

export interface SectionState {
  id: number
  title: string
  description: string
  questions: QuestionState[]
}

export interface Survey {
  sections: SectionState[]
}

export interface State extends RootState {
  auth: AuthState
  survey: Survey
}
