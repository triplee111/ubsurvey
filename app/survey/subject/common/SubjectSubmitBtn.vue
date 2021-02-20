<template lang="pug">
.submitBlock
  button.submit-btn(
    type="submit"
    @click.prevent="submitSurvey") 提交

</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SubjectSubmitBtn',
  setup() {
    const store = useStore()

    const ansLength = computed(
      () => Object.keys(store.state.survey.surveyAns).length
    )
    const validatedLength = computed(
      () => Object.keys(store.state.survey.validation).length
    )
    const validations = computed(() =>
      Object.values(store.state.survey.validation)
    )

    const submitSurvey = async () => {
      await store.dispatch('survey/verifyAll')

      if (
        ansLength.value !== validatedLength.value ||
        validations.value.includes(false)
      ) {
        // TODO: alert

        return false
      }

      // TODO: show confirm

      store.dispatch('survey/submit')

      // TODO: show response
    }

    return {
      submitSurvey
    }
  }
})
</script>

<style lang="sass" scoped>
@import '@css/variable'
.submitBlock
  display: flex
  align-items: center
  justify-content: center
  padding: 1rem 0

  .submit-btn
    width: 5rem
    line-height: 2
    color: #fff
    border-radius: 4px
    font-size: 1.2rem
    font-weight: bold
    background: linear-gradient(to bottom, #1e4f44, #1a6a58)
    cursor: pointer
</style>
