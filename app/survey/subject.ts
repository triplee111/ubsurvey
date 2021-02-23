import { useStore } from 'vuex'
import { computed, watch, ref, reactive, Ref } from 'vue'

import { Subject, SubjectAnswer, ErrorRecord } from '@/types'
import { createValidator } from '@/survey/validator'

export default (subject: Subject) => {
  const qid = subject.id.toString()
  const store = useStore()
  const errors: Ref<ErrorRecord[]> = ref([])

  const visibility = computed(() => store.state.survey.visibility[qid])
  const answer = computed(() => store.state.survey.surveyAns[qid])

  const init = () => {
    if (answer.value) return reactive({ ...answer.value })

    return subject.opts && subject.opts.length
      ? reactive({ select: [] })
      : reactive({ inputs: '' })
  }

  const visible = (payload: { qid: string; state: boolean }) => {
    store.dispatch('survey/visible', payload)
  }

  const reply = (ans: SubjectAnswer) => {
    store.dispatch('survey/answer', { qid, ans })
  }

  const anchor = () => {
    store.dispatch('survey/anchor', subject.id)
  }

  if (subject.validate && subject.visible) {
    const v = createValidator(subject.validate) // 注入設定產生對應的驗證器

    watch(
      answer,
      (value: SubjectAnswer) => {
        if (value) {
          // 在沒有設定 break = true 的情況，每一次驗證會驗證該題設定的全部規則
          // 若目標規則有錯誤會產生一個錯誤物件，最後回傳一組錯誤物件陣列
          errors.value = v.verify(value)

          store.dispatch('survey/verify', {
            qid,
            state: !errors.value.length
          })
        }
      },
      { immediate: true }
    )

    store.subscribeAction((action, state) => {
      if (
        action.type === 'survey/verifyAll' &&
        !Object.prototype.hasOwnProperty.call(state.survey.validation, qid)
      ) {
        const ans =
          subject.opts && subject.opts.length ? { select: [] } : { inputs: '' }

        reply(ans)

        errors.value = v.verify(ans)

        store.dispatch('survey/verify', {
          qid,
          state: !errors.value.length
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
