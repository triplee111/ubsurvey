import { useStore } from 'vuex'
import { computed, watch, ref, reactive, Ref } from 'vue'
// import useScrollHandler from './utils/scroll-handler'

import { Subject, SubjectAnswer, ErrorRecord } from '@/types'
import { createValidator } from '@/survey/validator'

export default (subject: Subject) => {
  const qid = subject.id.toString()
  const store = useStore()
  const subjectFlag = computed(() => store.state.survey.subjectFlag)

  const errors: Ref<ErrorRecord[]> = ref([])

  const visibility = computed(() => store.state.survey.visibility[qid])
  const answer = computed(() => store.state.survey.surveyAns[qid])

  // const scrollHandler = useScrollHandler()

  const init = () => {
    if (answer.value) return reactive({ ...answer.value })

    return subject.opts && subject.opts.length
      ? reactive({ select: [] })
      : reactive({})
  }

  const visible = (payload: { qid: string; state: boolean }) => {
    store.dispatch('survey/visible', payload)
  }

  const reply = (ans: SubjectAnswer) => {
    store.dispatch('survey/answer', { qid, ans })
  }

  const anchor = () => {
    if (Number(qid) === subjectFlag.value) return
    store.dispatch('survey/anchor', subject.id)
    // scrollHandler.scrollTo(qid)
  }

  if (subject.validate) {
    const v = createValidator(subject.validate)

    watch(answer, (value: SubjectAnswer) => {
      // 在沒有設定 break = true 的情況，每一次驗證會驗證該題設定的全部規則
      // 若目標規則有錯誤會產生一個錯誤物件，最後回傳一組錯誤物件陣列
      errors.value = v.verify(value)
    })

    store.subscribeAction((action, state) => {
      if (
        action.type === 'survey/submit' &&
        !Object.prototype.hasOwnProperty.call(state.survey.validation, qid)
      ) {
        errors.value = v.verify({
          select: [],
          inputs: ''
        })
      }
    })
  }

  visible({ qid, state: subject.visible }) // default visibility

  return {
    visibility,
    errors,
    init,
    reply,
    visible,
    anchor
  }
}
