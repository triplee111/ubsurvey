<template lang="pug">
SubjectLayout(v-if="isShow")
  template(#question)
    SubjectQuestion(
      :id="`question-${qid}`"
      :que="question")

  template(#helper)
    span.errorMessage(v-show="helpeText") {{ helpeText }}

  template(#answer)
    CheckOpts(
      v-model:ans="answer"
      :opts="opts"
      :config="config")

</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch } from 'vue'

import { Subject, SubjectAnswer } from '@/types'

import useSubjectHandler from '@/survey/subject'
import SubjectLayout from './common/SubjectLayout.vue'
import SubjectQuestion from './element/SubjectQuestion.vue'
import CheckOpts from './element/SubjectCheckOpts.vue'

export default defineComponent({
  name: 'SubjectMultiAns',
  props: {
    context: {
      type: Object as PropType<Subject>,
      required: true
    }
  },
  setup(props) {
    const h = useSubjectHandler(props.context)

    const answer = h.init()

    const message = computed(() => {
      if (h.errors.value.length) {
        const error = h.errors.value.shift() // 只選擇第一個錯誤顯示提示

        if (error?.rule === 'optsRange') {
          const { min, max } = error.config

          if (min === max) {
            return `请选择 ${max} 个选项`
          }

          if (min === 0) {
            return `最多可选择 ${max} 个选项`
          }

          return `请选择 ${min} 到 ${max} 个选项`
        }

        return '此题为必选题目'
      }
    })

    watch(answer, (value: SubjectAnswer) => {
      h.anchor()
      h.reply(value)
    })

    return {
      // static
      qid: props.context?.id,
      question: {
        no: props.context?.qno,
        content: props.context.content
      },
      opts: props.context?.opts,
      config: props.context?.config,
      // reactive and methods
      isShow: h?.visibility,
      visible: h?.visible,
      helpeText: message,
      answer
    }
  },
  components: {
    SubjectLayout,
    CheckOpts,
    SubjectQuestion
  }
})
</script>
