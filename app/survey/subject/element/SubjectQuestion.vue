<template lang="pug">
.question
  p.qNo(
    ref="qNoRef"
    :style="`left: -${width + 5}px`") {{ `${qno}.` }}

  p.qContent {{ content }}

</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'SubjectQuestion',
  props: {
    qno: Number,
    content: String
  },
  setup() {
    const qNoRef = ref<HTMLElement>(document.createElement('p'))
    const width = computed(() => qNoRef.value.offsetWidth)

    return {
      qNoRef,
      width
    }
  }
})
</script>

<style lang="stylus" scoped>
.question
  position relative
  display flex
  align-items center
  .qNo
    position absolute
    font-size 0.75rem
    top 2.5px
</style>
