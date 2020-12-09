const sectionMock = [
  {
    id: 1,
    title: '段落標題1',
    description: '段落敘述1',
    questions: [
      {
        id: 1,
        type: 1, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '題目1',
        isRequired: true,
        needOther: true,
        options: [
          '選項11',
          '選項21',
          '選項31'
        ]
      },
      {
        id: 2,
        type: 2, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '題目2',
        isRequired: true,
        needOther: true,
        options: [
          '選項12',
          '選項22',
          '選項32'
        ]
      }
    ]
  },
  {
    id: 2,
    title: '段落標題2',
    description: '段落敘述2',
    questions: [
      {
        id: 3,
        type: 1, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '題目3',
        isRequired: false,
        needOther: false,
        options: [
          '選項221',
          '選項222',
          '選項223'
        ]
      }
    ]
  },
  {
    id: 3,
    title: '段落標題3',
    description: '段落敘述3',
    questions: [
      {
        id: 4,
        type: 3, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '題目4',
        isRequired: true,
        needOther: false,
        options: []
      }
    ]
  },
  {
    id: 4,
    title: '段落標題4',
    description: '段落敘述4',
    questions: [
      {
        id: 5,
        type: 4, // 1: 單選；2: 複選；3: 簡答；4: 下拉單選
        subject: '題目5',
        isRequired: true,
        needOther: false,
        options: [
          '選項41',
          '選項42',
          '選項43',
          '選項44',
          '選項45',
          '選項46',
          '選項47',
          '選項48',
          '選項49',
          '選項40'
        ]
      }
    ]
  }
]

export {
  sectionMock
}
