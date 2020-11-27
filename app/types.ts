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

export interface State extends RootState {
  auth: AuthState
}
