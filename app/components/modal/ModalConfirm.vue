<template lang="pug">
#ModalConfirm
  img.material(src="@img/material-after.png")
  img.modalClose(
    src="@img/close.png"
    @click="confirmed")

  img.poker(src="@img/card-before.png")

  p(v-if="params.isValid") {{ params.message }}
  p(v-else)
    span 很抱歉，
    span {{ params.message }}。

  a.goback(
    :href="osLink"
    target="_self") 回到官网

</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'
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

    const confirmed = () => {
      if (props.params?.isValid) {
        links?.osLink ? (window.location.href = links.osLink) : router.go(0)
      } else {
        emit('close')
      }
    }

    return {
      osLink: links?.osLink,
      confirmed
    }
  }
})
</script>
