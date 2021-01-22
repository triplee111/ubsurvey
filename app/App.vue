<template lang="pug">
AppHeader

SurveyMain

AppFooter

BounceLoading(v-show="inProgress")

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { AppHeader, AppFooter } from './components/layout'
import SurveyMain from './views/SurveyMain.vue'
import BounceLoading from './components/BounceLoading.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const inProgress = computed(() => store.state.inProgress)

    return { inProgress }
  },
  components: {
    AppHeader,
    SurveyMain,
    AppFooter,
    BounceLoading
  }
})
</script>
