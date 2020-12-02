<template lang="pug">
.answerBlock
  input(type="text" :value="context"
    @input="$emit('update:context', $event.target.value)"
  )
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Text',
  props: {
    question: {
      type: Object,
      default: null
    },
    context: {
      type: String,
      default: null
    }
  }
})
</script>
