<template lang="pug">
AppHeader

ActMain

AppFooter

ModalContainer

BounceComponent(v-show="inProgress")

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

import { AppHeader, AppFooter } from './components/layout'
import SurveyMain from './views/SurveyMain.vue'
import ModalContainer from '@act/slime-modal'
import BounceComponent from './components/BounceLoading.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const inProgress = computed(() => store.state.inProgress)

    return { inProgress }
  },
  components: {
    AppHeader,
    ActMain,
    AppFooter,
    ModalContainer,
    BounceComponent
  }
})
</script>
