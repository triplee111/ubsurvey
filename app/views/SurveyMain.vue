<template lang="pug">
#survey
  .title 填问卷 豪礼三选一
  .subTitle 礼品、彩金、高额存送任您挑

  #survey-container.scrollContainer
    .titleBlock
      .mbTitle 填问卷 豪礼三选一
      .mbSubTitle 礼品、彩金、高额存送任您挑

    SurveyContainer(
      v-if="surveyData.length"
      :survey="surveyData")

ModalContainer

</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, inject, Ref } from 'vue'
import ModalContainer from '@act/slime-modal'
import PerfectScrollbar from '@act/perfect-scrollbar'

import { Survey } from '@/types'

import { device } from '@/survey/utils/window-size-observer'
import SurveyContainer from '@/survey/index'
import service from '@/repository/survey'

export default defineComponent({
  name: 'SurveyMain',
  async setup() {
    const surveyData: Ref<Survey> = ref([])
    const token = inject<string>('token')

    onMounted(() => {
      setTimeout(() => {
        const ps = new PerfectScrollbar('#survey-container')

        watch(device, () => setTimeout(() => ps.update(), 400))
      }, 300)
    })

    if (token) {
      try {
        const data = await service.getSurvey(token)
        surveyData.value = data.ques
      } catch (err) {
        alert(err)
      }
    } else {
      alert('empty token')
    }

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
@import '@css/variable'
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
    margin-bottom: 20px

  .scrollContainer
    position: relative
    width: 100%
    padding-left:15%
    padding-right:5%
    margin-right: 10%
    flex: 1

    .titleBlock
      display: none

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
</style>
