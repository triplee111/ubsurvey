<template lang="pug">
.optionBlock(
  v-if="config.optsUi === 'radiobox'"
  v-bind="$attrs")
  .options(
    v-for="(opt, key) in opts"
    :key="`opt-${key + 1}`")
    input(
      v-model="selected"
      :id="`radio-${key + 1}`"
      :value="opt.id"
      type="radio")
    label(:for="opt.item") {{ opt.item }}

  //- TODO: OTHERS
  //- .options(v-if="config.others")
  //-   input#others-input(type="text")

.optionBlock(
  v-else-if="config.optsUi === 'menu'"
  v-bind="$attrs")
  select.menu(v-model="selected")
    option(
      v-for="(opt, key) in opts"
      :key="`opt-${key + 1}`"
      :value="opt.id")
      | {{ opt.item }}

  //- TODO: OTHERS
  //- .options(v-if="config.others")
  //-   input#others-input(type="text")

</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import { Option, SubjectConfig } from '@/types'

export default defineComponent({
  name: 'SubjectOptions',
  props: {
    opts: {
      type: Object as PropType<Option[]>,
      default: []
    },
    config: Object as PropType<SubjectConfig>
  },
  setup(_props, { emit }) {
    const selected = ref(0)

    watch(selected, value => emit('select', value))

    return {
      selected
    }
  }
})
</script>

<style lang="stylus" scoped>
.optionBlock
  display flex
  align-items center
  justify-content flex-start
  flex-wrap wrap
  width 100%

  .options
    padding-right: 20px

    > input
      margin-right: 5px

      &[type="text"]
        border-bottom: 1px solid #424343
        margin-left: 5px

  .menu
    width: 150px
    border-radius: 4px
</style>
