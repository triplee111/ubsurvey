<template lang="pug">
.answerBlock
  .options(
    v-for="(option, i) in question.options"
    :key="option")
    input(
      v-model="active"
      type="radio"
      :id="option"
      :value="i"
      @change="handleChange")
    label(:for="option") {{ option }}

  .options(v-if="question.needOther")
    input(
      v-model="active"
      type="radio"
      :id="`${question.id}-其他`"
      :value="question.options.length"
      @change="handleChange")

    label(:for="`${question.id}-其他`") 其他
      input(
        v-model="text"
        type="text"
        @input="handleInput")

</template>

<script lang="ts">
import { defineComponent, ref, computed, toRefs } from 'vue'

export default defineComponent({
  name: 'Radio',
  props: {
    question: {
      type: Object,
      default: null
    },
    answers: {
      type: [String, Array],
      default: null
    },
    context: {
      type: String,
      default: null
    }
  },
  setup(props, { emit }) {
    const active = ref('')
    const text = ref('')

    const handleChange = () => {
      emit('update:answers', [active.value])
      emit('update:showError', false)
      if (!includeOther.value) {
        text.value = ''
        emit('update:context', '')
      } else {
        emit('update:context', text.value)
      }
    }

    const { question } = toRefs(props)
    const l = question.value.options?.length || -1
    const includeOther = computed(() => active.value === l)

    const handleInput = (e: Event) => {
      if (includeOther.value) {
        const target = e.target as HTMLInputElement
        emit('update:context', target.value)
      }
    }

    return {
      active,
      text,
      handleChange,
      includeOther,
      handleInput
    }
  }
})
</script>
