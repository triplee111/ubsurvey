<template lang="pug">
.answerBlock
  input(
    type="text"
    :value="context"
    @input="handleInput")

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
  },
  setup(props, { emit }) {
    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement

      emit('update:context', target.value)
      emit('update:showError', false)
    }
    return {
      handleInput
    }
  }
})
</script>
