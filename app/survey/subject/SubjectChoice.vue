<template lang="pug">
section
  .questionBlock
    p {{ `Q${context.qno} ${context.content}` }}

  .questionBlock
    p
      strong *
      span.errorMessage 此栏位为必填栏位

  .answerBlock(v-if="config.optsUi === 'radiobox'")
    .options(
      v-for="(opt, key) in opts"
      :key="`${qid}-opt-${key + 1}`")
      input(
        :id="`${qid}-radio-${key + 1}`"
        :value="opt.id"
        type="radio")
      label(:for="opt.item") {{ opt.item }}

    .options(v-if="config.others")
      input(
        :id="`${qid}-text-input`"
        type="text")

  .answerBlock(v-else-if="config.optsUi === 'menu'")
    .options
      select
        option(
          v-for="(opt, key) in opts"
          :key="`${qid}-opt-${key + 1}`"
          :value="opt.id")
          | {{ opt.item }}

    .options(v-if="config.others")
      input(
        :id="`${qid}-text-input`"
        type="text")

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Subject } from '@/types'

import { createValidator } from '@/survey/validator'

export default defineComponent({
  name: 'Choice',
  props: {
    context: Object as PropType<Subject>
  },
  setup(props) {
    const v = createValidator({
      required: true,
      optsRange: [2, 5]
    })

    v.verify({ id: 5, select: [] })

    return {
      qid: props.context?.id,
      opts: props.context?.opts,
      config: props.context?.config
    }
  }
})
</script>

<style lang="sass" scoped>
.questionBlock
  color: #424343
  line-height: 2
  > p
    strong,
    .errorMessage
      color: red
    .errorMessage
      font-size: 0.8rem

.answerBlock
  display: flex
  align-items: center
  justify-content: flex-start
  flex-wrap: wrap
  width: 100%

  .options
    padding: 0 20px

    input
      margin-right: 5px

      &[type="text"]
        border-bottom: 1px solid #424343
        margin-left: 5px

    > select
      width: 150px
      border-radius: 4px
</style>
