<template lang="pug">
SubjectLayout(v-if="isShow")
  template(#question)
    p {{ context.content }}

  template(#helper)
    span.errorMessage(v-show="helpeText") {{ helpeText }}

  template(#answer)
    CheckOpts(
      :qid="qid"
      :opts="opts"
      :config="config"
      @updateSelect="answer")

</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { Subject, SubjectAnswer } from '@/types'

import useSubjectHandler from '@/survey/subject'
import SubjectLayout from './element/SubjectLayout.vue'

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

    const message = computed(() =>
      h.errors.value.length ? '此栏位为必填栏位' : ''
    )

    const answer = (payload: SubjectAnswer) => {
      h.anchor()
      h.reply(payload)
    }

    return {
      // static
      qid: props.context?.id,
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
    CheckOpts
  }
})
</script>
