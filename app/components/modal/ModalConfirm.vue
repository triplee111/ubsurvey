<template lang="pug">
#ModalConfirm
  img.material(:src="require('@img/material-after.png')")
  img.modalClose(
    :src="require('@img/close.png')"
    @click="close()")

  img.poker(:src="require('@img/card-before.png')")

  p(v-if="isVerified") 谢谢您提供宝贵的建议
  p(v-else)
    span 很抱歉，
    span 您不在本次问卷调查名单中。
  a.goback(:href="links.osLink") 回到官网

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useModal } from '@act/slime-modal'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ModalConfirm',
  inject: ['links'],
  setup() {
    const modal = useModal()
    const store = useStore()
    const isVerified = computed(() => store.state.survey.isVerified)

    return {
      close: modal.close,
      isVerified
    }
  }
})
</script>
