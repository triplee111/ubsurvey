<template lang="pug">
SubjectLayout(v-if="isShow")
  template(#question)
    p {{ context.content }}

  template(#helper)
    span.errorMessage(v-show="helpeText") {{ helpeText }}

  template(#option)
    SubjectOptions(
      :opts="opts"
      :config="config"
      @select="answer")

</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { Subject } from '@/types'

import useSubjectHandler from '@/survey/subject'
import SubjectLayout from './element/SubjectLayout.vue'
import SubjectOptions from './element/SubjectOptions.vue'

export default defineComponent({
  name: 'Choice',
  props: {
    context: {
      type: Object as PropType<Subject>,
      required: true
    }
  },
  setup(props) {
    const h = useSubjectHandler(props.context)

    // Container & Validator 不負責產生提示顯示文案
    // 由個別元件控制或額外設定文案機制
    const message = computed(() =>
      h.errors.value.length ? '此栏位为必填栏位' : ''
    )

    const answer = (selected: number) => h.reply({ select: [selected] })

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
    SubjectOptions
  }
})
</script>
