import difference from 'lodash/difference'
import { useStore } from 'vuex'
import { computed, watch, ref, reactive, Ref } from 'vue'

import { Subject, SubjectAnswer, Option, ErrorRecord } from '@/types'
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

  const toggle = (payload: { qid: string; state: boolean }) => {
    store.dispatch('survey/toggle', payload)
  }

  const reply = (ans: SubjectAnswer) => {
    // concat handler
    if (subject.opts) {
      concatHandler(
        subject.opts,
        ans.select as number | number[],
        answer.value?.select
      ) // 第三個參數為 store 中的舊數值
    }

    store.dispatch('survey/answer', { qid, ans })
  }

  const anchor = () => {
    store.dispatch('survey/anchor', subject.id)
  }

  const concatHandler = async (
    opts: Option[],
    select: number | number[],
    preSelect?: number | number[]
  ) => {
    if (preSelect) {
      const canceled = Array.isArray(preSelect)
        ? difference(preSelect, select as number[])
        : [preSelect]

      for (const oid of canceled) {
        const opt = opts.find(opt => opt.id === oid)

        if (opt?.concat) {
          for (const qid of opt.concat) {
            store.dispatch('survey/dropAnswer', qid)

            toggle({
              qid: qid.toString(),
              state: false
            })
          }
        }
      }
    }

    const added = Array.isArray(select)
      ? preSelect
        ? difference(select, preSelect as number[])
        : select
      : [select]

    for (const oid of added) {
      const opt = opts.find(opt => opt.id === oid)

      if (opt?.concat) {
        for (const qid of opt.concat) {
          toggle({
            qid: qid.toString(),
            state: true
          })
        }
      }
    }
  }

  if (subject.validate) {
    const v = createValidator(subject.validate) // 注入設定產生對應的驗證器

    watch(
      answer,
      (value: SubjectAnswer) => {
        if (value && visibility.value) {
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
        !Object.prototype.hasOwnProperty.call(state.survey.validation, qid) &&
        visibility.value
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

  toggle({ qid, state: subject.visible }) // default visibility

  return {
    preAns: answer,
    visibility,
    errors,
    init,
    reply,
    toggle,
    anchor
  }
}
