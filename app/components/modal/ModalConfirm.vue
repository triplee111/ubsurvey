<template lang="pug">
#ModalConfirm
  img.material(src="@img/material-after.png")
  img.modalClose(
    src="@img/close.png"
    @click="confirmed")

  img.poker(src="@img/card-before.png")

  p(v-if="params.isValid") {{ gratitude }}
  p(v-else)
    span 很抱歉，
    span {{ params.message }}。

  a.goback(
    :href="osLink"
    target="_self") 回到官网

</template>

<script lang="ts">
import { defineComponent, inject, computed } from 'vue'
import { useRouter } from 'vue-router'

import { ExternalLinks } from '@/types'

export default defineComponent({
  name: 'ModalConfirm',
  props: {
    params: Object
  },
  setup(props, { emit }) {
    const router = useRouter()
    const links = inject<ExternalLinks>('links')

    const gratitude = computed(
      () => props.params?.message || '谢谢您提供宝贵的建议'
    )

    const confirmed = () => {
      if (props.params?.isValid) {
        router.go(0)
      } else {
        emit('close')
      }
    }

    return {
      osLink: links?.osLink,
      gratitude,
      confirmed
    }
  }
})
</script>
