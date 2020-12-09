<template lang="pug">
#actMain
  Survey
  ModalContainer
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import ModalContainer from '@act/slime-modal'
import Survey from './Survey.vue'

export default defineComponent({
  name: 'ActMain',
  components: {
    ModalContainer,
    Survey
  }
})
</script>
