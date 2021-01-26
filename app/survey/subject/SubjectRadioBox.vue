<template lang="pug">
.subject
  .questionBlock
    span test
  .answerBlock
    .options

</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Subject } from '@/types'

export default defineComponent({
  name: 'RadioBox',
  props: {
    context: Object as PropType<Subject>
  }
})
</script>
