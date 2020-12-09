<template lang="pug">
.answerBlock
  select(v-model="selected"
    @change="handleChange"
  )
    option(v-for="(option, i) in question.options"
      :key="option"
      :value="i"
    ) {{ option }}
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Selector',
  props: {
    question: {
      type: Object,
      default: null
    },
    answers: {
      type: Array || String,
      default: null
    }
  },
  setup(props, { emit }) {
    const selected = ref('')
    const handleChange = () => {
      emit('update:answers', [selected.value])
      emit('update:showError', false)
    }
    return {
      selected,
      handleChange
    }
  }
})
</script>
