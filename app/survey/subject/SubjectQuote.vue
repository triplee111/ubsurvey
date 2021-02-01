<template lang="pug">
SubjectLayout
  template(#section)
    .sectionTitle {{ context.content }}
    .description {{ config.quote }}

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Subject } from '@/types'

import SubjectLayout from './element/SubjectLayout.vue'

import RadioboxOpts from './element/SubjectRadioOpts.vue'
import MenuOpts from './element/SubjectMenuOpts.vue'

export default defineComponent({
  name: 'SubjectQuote',
  props: {
    context: {
      type: Object as PropType<Subject>,
      required: true
    }
  },
  setup(props) {
    return {
      // static
      qid: props.context?.id,
      config: props.context?.config
    }
  },
  components: {
    SubjectLayout,
    RadioboxOpts,
    MenuOpts
  }
})
</script>

<style lang="stylus">
.sectionTitle
  font-size 20px
  border-bottom 2px solid #093f33
.description
  font-size 16px
</style>
