<template lang="pug">
.submitBlock
  button.submit-btn(
    type="submit"
    @click.prevent="submit") 提交

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'SubjectSubmitBtn',
  setup(_props, { emit }) {
    const store = useStore()

    const submit = async () => {
      await store.dispatch('survey/verifyAll')

      emit('submited')
    }

    return {
      submit
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
