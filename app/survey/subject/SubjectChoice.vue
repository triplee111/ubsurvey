<template lang="pug">
SubjectLayout(v-if="isShow")
  template(#question)
    SubjectQuestion(
      :id="`question-${qid}`"
      :que="question")

  template(#helper)
    span.errorMessage(v-show="helpeText") {{ helpeText }}

  template(#answer)
    component(
      v-model:ans="answer"
      :is="getOptsUiComp()"
      :opts="opts"
      :config="config")

</template>

<script lang="ts">
import { defineComponent, PropType, computed, watch } from 'vue'

import { Subject, SubjectAnswer } from '@/types'

import useSubjectHandler from '@/survey/subject'
import SubjectLayout from './common/SubjectLayout.vue'
import SubjectQuestion from './element/SubjectQuestion.vue'
import RadioboxOpts from './element/SubjectRadioOpts.vue'
import MenuOpts from './element/SubjectMenuOpts.vue'

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

    const isShow = h.visibility
    const answer = h.init()

    // Container & Validator 不負責產生提示顯示文案
    // 由個別元件控制或額外設定文案機制
    const message = computed(() =>
      h.errors.value.length ? '此题为必选题目' : ''
    )

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let unwatchAns: () => void = () => {}

    watch(
      isShow,
      (value: boolean) => {
        if (value) {
          unwatchAns = watch(answer, (value: SubjectAnswer) => {
            h.anchor()
            h.reply(value)
          })
        } else {
          unwatchAns()
          ;(answer as { select: [] }).select = []

          if (Object.prototype.hasOwnProperty.call(answer, 'inputs')) {
            delete (answer as { inputs?: string }).inputs
          }
        }
      },
      { immediate: true }
    )

    const getOptsUiComp = () => {
      const ui = props.context.config?.optsUi
      return `${ui?.charAt(0).toUpperCase()}${ui?.slice(1)}Opts`
    }

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
      isShow,
      helpeText: message,
      getOptsUiComp,
      answer
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
