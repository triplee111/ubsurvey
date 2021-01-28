<template lang="pug">
.questionBlock
  p {{ `Q${context.qno} ${context.content}` }}

.questionBlock
  p
    strong *
    span.errorMessage 此栏位为必填栏位

.answerBlock
  .options(
    v-for="(opt, i) in context.opts"
    :key="`${context.id}-opt-${i + 1}`")
    input(
      :id="opt.id"
      type="checkbox")
    label(:for="opt.item") {{ opt.item }}

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
  setup() {
    const v = createValidator({
      required: true,
      optsRange: [2, 5]
    })

    v.verify({ id: 5, select: [] })
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
  padding: 0 5%
  input[type="text"]
    border-bottom: 1px solid #424343
  .options
    padding: 0 20px
    input
      margin-right: 5px
    label
      input[type="text"]
        width: 100px
        margin-left: 5px
  > input
    width: 100%
  > select
    width: 150px
    border-radius: 4px
</style>
