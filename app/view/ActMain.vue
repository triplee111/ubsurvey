<template lang="pug">
#actMain
#webView
  ModalContainer
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import ModalContainer, { useModal } from '@act/slime-modal'

export default defineComponent({
  name: 'ActMain',
  setup() {
    const modal = useModal()
    modal.show('Survey')
    return {
    }
  },
  components: {
    ModalContainer
  }
})
</script>
