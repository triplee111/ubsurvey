import { Survey } from '@/types'

const surveyData: Survey = [
  {
    id: 1,
    qno: 1,
    content: '題目1',
    comment: '備註',
    type: 'choice',
    visible: true,
    validate: {
      required: true
    },
    config: {
      others: true,
      optsUi: 'radiobox',
      optsColumn: {
        desktop: 2,
        mobile: 1
      }
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
  // {
  //   id: 1,
  //   qno: 1,
  //   content: '題目1',
  //   comment: '備註',
  //   type: 'radio-box',
  //   visible: true,
  //   validate: {
  //     required: true
  //   },
  //   opts: [
  //     {
  //       id: 1,
  //       item: '選項1'
  //     },
  //     {
  //       id: 2,
  //       item: '選項2'
  //     },
  //     {
  //       id: 5,
  //       item: '選項3'
  //     },
  //     {
  //       id: 8,
  //       item: '選項4'
  //     }
  //   ]
  // }
]

export default new Promise(resolve => {
  setTimeout(() => resolve(surveyData), 1000)
}) as Promise<Survey>
