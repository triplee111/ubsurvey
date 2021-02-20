<template lang="pug">
SubjectLayout(v-if="isShow")
  template(#question)
    SubjectQuestion(
      :id="`question-${qid}`"
      :que="question")

  template(#helper)
    span.errorMessage(v-show="helpeText") {{ helpeText }}

  template(#answer)
    input.subject-input-text-field(
      v-model.trim.lazy="answer.inputs"
      type="text"
      @focusin="anchor")

</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch } from 'vue'

import { Subject, SubjectAnswer } from '@/types'

import useSubjectHandler from '@/survey/subject'
import SubjectLayout from './common/SubjectLayout.vue'
import SubjectQuestion from './element/SubjectQuestion.vue'

export default defineComponent({
  name: 'SubjectTextInput',
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
      config: props.context?.config,
      // reactive and methods
      isShow: h?.visibility,
      visible: h?.visible,
      anchor: h?.anchor,
      helpeText: message,
      answer
    }
  },
  components: {
    SubjectLayout,
    SubjectQuestion
  }
})
</script>

<style lang="stylus">
input
  &[type="text"]
    width 100%
    padding 0.4rem
    line-height 1.5
    border-bottom 1px solid #1a6a58
    font-weight normal
    &:focus
      border-color #F76C3E
</style>
