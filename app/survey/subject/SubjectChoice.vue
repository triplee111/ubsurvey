<template lang="pug">
SubjectLayout(v-if="isShow")
  template(#question)
    SubjectQuestion(
      :id="`question-${qid}`"
      :qno="qno"
      :content="qContent"
      :isQnoVisible="isQnoVisible"
    )

  template(#helper)
    span.errorMessage(v-show="helpeText") {{ helpeText }}

  template(#answer)
    component(
      :is="getOptsUiComp()"
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
import RadioboxOpts from './element/SubjectRadioOpts.vue'
import MenuOpts from './element/SubjectMenuOpts.vue'
import SubjectQuestion from './element/SubjectQuestion.vue'

export default defineComponent({
  name: 'SubjectChoice',
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

    const answer = (payload: SubjectAnswer) => {
      h.anchor()
      h.reply(payload)
    }

    const getOptsUiComp = () => {
      const ui = props.context.config?.optsUi
      return `${ui?.charAt(0).toUpperCase()}${ui?.slice(1)}Opts`
    }

    return {
      // static
      qid: props.context?.id,
      qno: props.context?.qno,
      qContent: props.context?.content,
      isQnoVisible: props.context?.isQnoVisible,
      opts: props.context?.opts,
      config: props.context?.config,
      // reactive and methods
      isShow: h?.visibility,
      visible: h?.visible,
      anchor: h?.anchor,
      helpeText: message,
      answer,
      getOptsUiComp
    }
  },
  components: {
    SubjectLayout,
    RadioboxOpts,
    MenuOpts,
    SubjectQuestion
  }
})
</script>
