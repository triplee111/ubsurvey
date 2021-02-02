<template lang="pug">
SubjectLayout
  template(#section)
    .buttonBlock
      //- mobile only
      button.pagination.prev(
        v-if="pageCurrent > 1"
        type="button"
        @click.prevent="goPrev") 上一步

      button.pagination.next(
        v-if="pageCurrent < pageNums"
        type="button"
        @click.prevent="goNext") 下一步

      button.pagination.next(
        v-if="pageCurrent === pageNums"
        type="button"
        @click.prevent="goSubmit") 下一步

</template>

<script lang="ts">
import { defineComponent, inject, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import SubjectLayout from './SubjectLayout.vue'

export default defineComponent({
  name: 'SubjectPagination',
  setup() {
    const router = useRouter()
    const route = useRoute()

    const paginations = inject('paginations') as number[][]
    const pageNums = paginations.length

    const pageCurrent = ref(parseInt(route.params.pno as string))

    const goPrev = () =>
      router.push({
        name: `page${pageCurrent.value - 1}`,
        params: { pno: pageCurrent.value - 1 }
      })

    const goNext = () =>
      router.push({
        name: `page${pageCurrent.value + 1}`,
        params: { pno: pageCurrent.value + 1 }
      })

    const goSubmit = () => router.push({ name: 'submit' })

    return {
      // static
      pageNums,
      // dynamic & methods
      pageCurrent,
      goPrev,
      goNext,
      goSubmit
    }
  },
  components: {
    SubjectLayout
  }
})
</script>

<style lang="sass" scoped>
@import '@css/variable'
.buttonBlock
  display: flex
  align-items: center
  justify-content: center
  padding: 1rem 0

  .pagination
    width: 5rem
    line-height: 2
    color: #fff
    border-radius: 4px
    font-size: 1.2rem
    font-weight: bold
    background: linear-gradient(to bottom, #1e4f44, #1a6a58)
    cursor: pointer

    &.prev,
    &.next
      display: none

    +pc-width
      margin: 0 0.5rem
      font-size: 1rem

      &.prev,
      &.next
        display: block
</style>
