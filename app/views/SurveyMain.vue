<template lang="pug">
#survey
  .title 填问卷 豪礼三选一
  .subTitle 礼品、彩金、高额存送任您挑

  .scrollContainer(v-perfect-scroll)
    .titleBlock
      .mbTitle 填问卷 豪礼三选一
      .mbSubTitle 礼品、彩金、高额存送任您挑

    SurveyContainer(
      v-if="surveyData.length"
      :survey="surveyData")

    //- TODO: suspend
    //- component(is="radio-box")

    //- .buttonBlock
    //-   //- mobile only
    //-   button.prev(type="button") 上一步
    //-   button.next(type="button") 下一步

    //- .buttonBlock
    //-   button(type="submit") 提交

ModalContainer

</template>

<script lang="ts">
import { defineComponent, ref, Ref } from 'vue'
import ModalContainer from '@act/slime-modal'

import { Survey } from '@/types'

import SurveyContainer from '@/survey/index'
import surveyService from '@/mock/index'

export default defineComponent({
  name: 'SurveyMain',
  setup() {
    const surveyData: Ref<Survey> = ref([])

    surveyService.then(data => {
      surveyData.value = data
    })

    return {
      surveyData
    }
  },
  components: {
    ModalContainer,
    SurveyContainer
  }
})
</script>

<style lang="sass" scoped>
@import '../assets/css/_variable'
#survey
  position: relative
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  width: 50%
  height: 92%
  background: #fff
  padding: 10px
  border-radius: 8px
  color: #093f33
  font-weight: bold
  &::before
    content: ''
    display: block
    position: absolute
    width: calc(100% + 10px)
    height: calc(100% + 10px)
    transform: translateY(-15px)
    border-radius: 8px
    background: linear-gradient(-45deg, #583c26  0%, #fdddb5  11%, #906e49  22%, #906e49  58%, #402617  84%, #a1886d  100%)
    z-index: -1

  .title
    font-size: 50px

  .subTitle
    font-size: 20px
    margin-bottom: 40px

  .scrollContainer
    position: relative
    width: 100%
    padding-left:15%
    padding-right:5%
    margin-right: 10%
    flex: 1

    .titleBlock
      display: none

    // .buttonBlock
    //   display: flex
    //   align-items: center
    //   justify-content: center
    //   padding: 1rem 0
    //   >button
    //     width: 5rem
    //     line-height: 2
    //     color: #fff
    //     border-radius: 4px
    //     font-size: 1.2rem
    //     font-weight: bold
    //     background: linear-gradient(to bottom, #1e4f44, #1a6a58)
    //     cursor: pointer
    //     &.prev,
    //     &.next
    //       display: none

  +pc-width
    width: 90%
    height: 90%

    .title,
    .subTitle
      display: none

    .scrollContainer
      padding-left: 10%
      padding-right: 10%
      margin-right: unset

      .titleBlock
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        margin-bottom: 10px

        .mbTitle
          font-size: 1.5rem

        .mbSubTitle
          font-size: 1rem

      // .buttonBlock
      //   >button
      //     margin: 0 0.5rem
      //     font-size: 1rem
      //     &.prev,
      //     &.next
      //       display: block
</style>
