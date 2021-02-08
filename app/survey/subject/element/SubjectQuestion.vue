<template lang="pug">
.question
  p.qNo(
    v-if="isQnoVisible"
    ref="qNoRef"
    :style="`left: -${width + 5}px`"
  ) {{ `${qno}.` }}
  p.qContent {{ content }}
</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
export default defineComponent({
  name: 'SubjectQuestion',
  props: {
    qno: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      default: ''
    },
    isQnoVisible: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const qNoRef = ref<HTMLElement>()
    const width = ref(0)

    onMounted(() => {
      if (qNoRef.value) {
        width.value = qNoRef.value.offsetWidth
      }
    })

    return {
      qNoRef,
      width
    }
  }
})
</script>
<style lang="stylus" scoped>
.question
  position: relative;
  display flex
  align-items center
  .qNo
    position absolute
</style>
