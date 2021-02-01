<template lang="pug">
SubjectLayout(v-if="isShow")
  template(#question)
    p {{ context.content }}

  template(#helper)
    span.errorMessage(v-show="helpeText") {{ helpeText }}

  template(#answer)
    input.subject-input-text-field(
      @input="answer"
      @focusin="anchor"
      type="text")

</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { Subject } from '@/types'

import useSubjectHandler from '@/survey/subject'
import SubjectLayout from './element/SubjectLayout.vue'

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

    const message = computed(() =>
      h.errors.value.length ? '此栏位为必填栏位' : ''
    )

    const answer = (value: number) => h.reply({ select: [value] })

    return {
      // static
      qid: props.context?.id,
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
    SubjectLayout
  }
})
</script>

<style lang="stylus">
input
  &[type="text"]
  &.subject-input-text-field
    border-bottom 1px solid #424343
    width 100%
</style>
