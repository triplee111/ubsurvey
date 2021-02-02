<template lang="pug">
SubjectLayout
  template(#section)
    .divider

</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SubjectLayout from './element/SubjectLayout.vue'

export default defineComponent({
  name: 'SubjectDivider',
  components: {
    SubjectLayout
  }
})
</script>
