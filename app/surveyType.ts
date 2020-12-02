type Nullable<T> = T | null

export interface QuestionPost {
  id: number
  answers: Nullable<number[]>
  context: string
}

export interface SurveyPost {
  id: number
  questions: QuestionPost[]
}
