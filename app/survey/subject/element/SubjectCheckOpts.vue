<template lang="pug">
.optionBlock(v-bind="$attrs"
  :style="`--rowCount: ${rowCount}`")
  .options(
    v-for="(opt, key) in opts"
    :key="`opt-${key + 1}`")
    input(
      v-model="selected"
      :id="`checkbox-${key + 1}`"
      :value="opt.id"
      type="checkbox"
      @change="onChange(key)")
    label(:for="`checkbox-${key + 1}`")
      p
        span.checkmark
        span.optionText {{ opt.item }}
      .other(v-if="(key === opts.length - 1) && config.others")
        input(
          v-model="otherText"
          ref="otherRef"
          type="text"
          @input="onChange")

</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from 'vue'
import useRowCounter from '../../utils/row-count-helper'
import { useStore } from 'vuex'

import { Option, SubjectConfig, Obj, SubjectAnswer } from '@/types'

export default defineComponent({
  name: 'SubjectCheckOpts',
  emits: ['updateSelect'], // defined custom event
  props: {
    qid: {
      type: Number,
      default: 0
    },
    opts: {
      type: Object as PropType<Option[]>,
      default: []
    },
    config: Object as PropType<SubjectConfig>
  },
  setup(_props, { emit }) {
    const selected = ref<number[]>([])
    const otherText = ref<string>('')
    const otherRef = ref<HTMLElement>()
    const { qid, config, opts } = toRefs(_props)

    const optLength = opts.value.length
    const column = config?.value?.optsColumn as Obj
    const rowCounter = useRowCounter(optLength, column)

    const store = useStore()
    const ans = store.state.survey.surveyAns[qid.value]
    if (ans) {
      if (ans.select) {
        selected.value = ans.select
      }
      if (ans.inputs) {
        otherText.value = ans.inputs
      }
    }

    const onChange = (key: number): void => {
      if (key === optLength - 1) {
        otherRef.value?.focus()
      }
      const payload: SubjectAnswer = {
        select: selected.value
      }
      const hasOther = selected.value.find(id => id === opts.value[optLength - 1].id)
      if (hasOther && config?.value?.others) {
        payload.inputs = otherText.value
      }
      emit('updateSelect', payload)
    }

    return {
      selected,
      otherText,
      otherRef,
      rowCount: rowCounter.rowCount,
      onChange
    }
  }
})
</script>

<style lang="stylus" scoped>
.optionBlock
  display flex
  align-items flex-start
  justify-content space-between
  flex-wrap wrap
  width 100%

  .options
    width calc(100% / var(--rowCount) - 5px * (var(--rowCount) - 1))
    display flex
    align-items center
    margin-bottom: 10px

    > input
      &[type="checkbox"]
        width 0
        height 0
        opacity 0
        &:checked
          &+ label
            color #fff
            background-color #1a6a58
            .checkmark
              border 1px solid transparent
              background-color #fff
              &::after
                opacity 1
            .other
              display block

    > label
      width 100%
      display flex
      flex-direction column
      padding 0 0.5rem
      border 1px solid #1a6a58
      border-radius 4px
      transition background 0.2s ease-in, color 0.2s ease-in
      cursor pointer

      p
        width 100%
        display flex
        align-items center

      .checkmark
        position relative
        display flex
        align-items center
        justify-content center
        width 16px
        height 16px
        border 1px solid #999
        margin-right 5px

        &::after
          content ''
          display block
          width 6px
          height 11px
          border solid #1a6a58
          border-width 0 2px 2px 0
          transform rotate(45deg)
          opacity 0
          transition opacity  0.2s ease-in

      .optionText
        max-width calc(100% - 30px)

      .other
        display none
        width 100%
        margin 0.5rem 0
        padding 0.5rem
        background-color #fff
        border-radius 4px

        input[type="text"]
          width 100%
          padding 0.4rem
          line-height 1.6
          border-bottom 1px solid #F76C3E
          font-weight normal

    &:hover
      .checkmark
        border-color #1a6a58

        &::after
          opacity 0.6
</style>
