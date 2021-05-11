<template lang="pug">
.optionBlock(
  v-bind="$attrs"
  :style="`--rowCount: ${rowCount}`")
  .options(
    v-for="(opt, key) in opts"
    :key="`opt-${opt.id}`")
    input(
      v-model="answer.select"
      :id="`checkbox-${opt.id}`"
      :value="opt.id"
      type="checkbox"
      @change="onChange(key)")

    label(:for="`checkbox-${opt.id}`")
      p
        span.checkmark
        span.optionText {{ opt.item }}
      .other(v-if="(key === opts.length - 1) && config.others")
        input(
          v-model="answer.inputs"
          ref="othersInputField"
          type="text")

</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue'

import { Option, SubjectConfig, SubjectAnswer } from '@/types'
import useRowCounter from '@/survey/utils/row-count-helper'

export default defineComponent({
  name: 'SubjectCheckOpts',
  props: {
    ans: {
      type: Object as PropType<SubjectAnswer>,
      required: true
    },
    opts: {
      type: Array as PropType<Option[]>,
      default: () => []
    },
    config: Object as PropType<SubjectConfig>
  },
  setup(props, { emit }) {
    const othersInputField = ref<HTMLElement>(document.createElement('input'))
    const columnsConfig = props.config?.optsColumn ?? {
      desktop: 2,
      mobile: 1
    }
    const rowCounter = useRowCounter(props.opts.length, columnsConfig)

    const answer = computed({
      get: () => props.ans,
      set: (value: SubjectAnswer) => {
        emit('update:ans', value)
      }
    })

    const onChange = (key: number) => {
      if (props.config?.others && key === props.opts.length - 1) {
        othersInputField.value?.focus()
      }
    }

    return {
      answer,
      othersInputField,
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
          line-height 1.5
          border-bottom 1px solid #1a6a58
          font-weight normal
          &:focus
            border-color #F76C3E
    &:hover
      .checkmark
        border-color #1a6a58

        &::after
          opacity 0.6
</style>
