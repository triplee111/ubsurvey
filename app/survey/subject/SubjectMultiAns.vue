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

    const message = computed(() =>
      h.errors.value.length ? '此栏位为必填栏位' : ''
    )

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
