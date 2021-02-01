<template lang="pug">
.answerBlock
  .options(
    v-for="(option, i) in question.options"
    :key="option")
    input(
      v-model="checkedList"
      type="checkbox"
      :id="option"
      :value="i"
      @change="handleChange")
    label(:for="option") {{ option }}

  .options(v-if="question.needOther")
    input(
      v-model="checkedList"
      type="checkbox"
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
import { defineComponent, ref, computed, toRefs, PropType } from 'vue'
import { QuestionState } from '@/types'

export default defineComponent({
  name: 'Checkbox',
  props: {
    question: {
      type: Object as PropType<QuestionState>,
      default: null
    },
    answers: {
      type: Array || String,
      default: null
    },
    context: {
      type: String,
      default: null
    }
  },
  setup(props, { emit }) {
    const checkedList = ref([] as number[])
    const text = ref('')

    const handleChange = () => {
      emit('update:answers', checkedList.value)
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
    const includeOther = computed(() => checkedList.value.includes(l))

    const handleInput = (e: Event) => {
      if (includeOther.value) {
        const target = e.target as HTMLInputElement
        emit('update:context', target.value)
      }
    }

    return {
      checkedList,
      text,
      handleChange,
      includeOther,
      handleInput
    }
  }
})
</script>
