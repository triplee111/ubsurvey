import { Survey } from '@/types'

const surveyData: Survey = [
  {
    id: 8,
    content: '段落標題',
    comment: '',
    type: 'quote',
    visible: true,
    config: {
      quote: '段落說明'
    }
  },
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
  },
  {
    id: 20,
    content: '分隔線/分頁',
    comment: '',
    type: 'divider',
    visible: true
  },
  {
    id: 10,
    content: '段落標題二',
    comment: '',
    type: 'quote',
    visible: true,
    config: {
      quote: '段落說明二'
    }
  },
  {
    id: 2,
    qno: 2,
    content: '題目2',
    comment: '備註',
    type: 'choice',
    visible: true,
    validate: {
      required: true
    },
    config: {
      others: true,
      optsUi: 'menu',
      optsColumn: {
        desktop: 2,
        mobile: 1
      }
    },
    opts: [
      {
        id: 3,
        item: '選項1'
      },
      {
        id: 4,
        item: '選項2'
      },
      {
        id: 6,
        item: '選項3'
      },
      {
        id: 7,
        item: '選項4'
      }
    ]
  },
  {
    id: 3,
    qno: 3,
    content: '題目3',
    comment: '備註',
    type: 'multi-answer',
    visible: true,
    validate: {
      required: true
    },
    config: {
      others: true,
      optsColumn: {
        desktop: 2,
        mobile: 1
      }
    },
    opts: [
      {
        id: 10,
        item: '選項1'
      },
      {
        id: 12,
        item: '選項2'
      },
      {
        id: 15,
        item: '選項3'
      },
      {
        id: 18,
        item: '選項4'
      }
    ]
  },
  {
    id: 4,
    qno: 4,
    content: '題目4',
    comment: '備註',
    type: 'text-input',
    visible: true,
    validate: {
      required: true
    }
  }
]

export default new Promise(resolve => {
  setTimeout(() => resolve(surveyData), 1000)
}) as Promise<Survey>
