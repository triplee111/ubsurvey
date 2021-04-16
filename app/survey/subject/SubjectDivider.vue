<template lang="pug">
SubjectLayout
  template(#section)
    .divider
      //- TODO:

</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SubjectLayout from './common/SubjectLayout.vue'

export default defineComponent({
  name: 'SubjectDivider',
  components: {
    SubjectLayout
  }
})
</script>
