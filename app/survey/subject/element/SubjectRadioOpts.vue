<template lang="pug">
.optionBlock(
  v-bind="$attrs"
  :style="`--rowCount: ${rowCount}`")
  .options(
    v-for="(opt, key) in opts"
    :key="`opt-${key + 1}`")
    input(
      v-model="selected"
      :id="`radio-${key + 1}`"
      :value="opt.id"
      type="radio")

    label(:for="`radio-${key + 1}`")
      p
        span.radiomark
        span.optionText {{ opt.item }}
      .other(v-if="(key === opts.length - 1) && config.others")
        input(
          v-model="answer.inputs"
          ref="othersInputField"
          type="text")

</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, watch, onMounted } from 'vue'

import { Option, SubjectConfig, SubjectAnswer } from '@/types'
import useRowCounter from '@/survey/utils/row-count-helper'

export default defineComponent({
  name: 'SubjectRadioOpts',
  props: {
    ans: {
      type: Object as PropType<SubjectAnswer>,
      required: true
    },
    opts: {
      type: Object as PropType<Option[]>,
      default: []
    },
    config: Object as PropType<SubjectConfig>
  },
  setup(props, { emit }) {
    const selected = ref(0)
    const othersInputField = ref<HTMLElement>(document.createElement('input'))
    const columnsConfig = props.config?.optsColumn ?? {
      desktop: 2,
      mobile: 1
    }

    const answer = computed({
      get: () => props.ans,
      set: (value: SubjectAnswer) => {
        emit('update:ans', value)
      }
    })

    watch(selected, (value: number) => {
      answer.value.select = [value]

      if (
        props.config?.others &&
        value === props.opts[props.opts.length - 1].id
      ) {
        othersInputField.value?.focus()
      }
    })

    onMounted(() => {
      if (answer.value.select) {
        selected.value = answer.value.select[0]
      }
    })

    const rowCounter = useRowCounter(props.opts.length, columnsConfig)

    return {
      selected,
      answer,
      othersInputField,
      rowCount: rowCounter.rowCount
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
      &[type="radio"]
        width 0
        height 0
        opacity 0
        &:checked
          &+ label
            color #fff
            background-color #1a6a58
            .radiomark
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

      .radiomark
        position relative
        display flex
        align-items center
        justify-content center
        width 16px
        height 16px
        border 1px solid #999
        border-radius 50%
        margin-right 5px

        &::after
          content ''
          display block
          width 12px
          height 12px
          border-radius 50%
          background-color #1a6a58
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
      .radiomark
        border-color #1a6a58

        &::after
          opacity 0.6
</style>
