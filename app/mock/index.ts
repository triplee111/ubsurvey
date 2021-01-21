import { Survey } from '@/types'

const surveyData = [
  {
    id: 1,
    qno: 1,
    content: '題目1',
    comment: '備註',
    type: 'radio-box',
    visible: true,
    validate: {
      required: true
    },
    opts: [
      {
        id: 1,
        item: '選項1'
      },
      {
        id: 2,
        item: '選項2'
      },
      {
        id: 5,
        item: '選項3'
      },
      {
        id: 8,
        item: '選項4'
      }
    ]
  }
]

export default new Promise(resolve => {
  setTimeout(() => resolve(surveyData), 100)
}) as Promise<Survey>
