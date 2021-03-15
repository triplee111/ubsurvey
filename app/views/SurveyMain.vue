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
      :survey="surveyData"
      @submited="showConfirm")

ModalContainer

</template>

<script lang="ts">
import Noty from 'noty'
import { defineComponent, ref, watch, onMounted, inject, Ref } from 'vue'
import { useRouter } from 'vue-router'
import ModalContainer, { useModal } from '@act/slime-modal'
import PerfectScrollbar from '@act/perfect-scrollbar'

import { Survey } from '@/types'

import svService from '@/repository/survey'
import { device } from '@/survey/utils/window-size-observer'
import SurveyContainer from '@/survey/index'

export default defineComponent({
  name: 'SurveyMain',
  async setup() {
    const router = useRouter()
    const modal = useModal()

    const surveyData: Ref<Survey> = ref([])
    const token = inject<string>('token')

    onMounted(() => {
      setTimeout(() => {
        const ps = new PerfectScrollbar('#survey-container')
        let unwatch: () => void

        if (device.value === 'mobile') {
          unwatch = watch(router.currentRoute, () =>
            setTimeout(() => ps.update(), 0)
          )
        }

        watch(device, value => {
          if (unwatch) {
            unwatch()
          }

          setTimeout(() => ps.update(), 0)

          if (value === 'mobile') {
            unwatch = watch(router.currentRoute, () =>
              setTimeout(() => ps.update(), 0)
            )
          }
        })
      }, 300)
    })

    if (token) {
      try {
        const data = await svService.getSurvey(token)
        surveyData.value = data.ques
      } catch (err) {
        new Noty({
          type: 'error',
          layout: 'topCenter',
          theme: 'nest',
          text: err.data || '伺服器错误，请稍候再试',
          timeout: 1500,
          id: 'noty-error'
        }).show()
      }
    } else {
      new Noty({
        type: 'error',
        layout: 'topCenter',
        theme: 'nest',
        text: '问卷接口错误，请确认 token 是否存在与是否正确',
        timeout: 1500,
        id: 'noty-error'
      }).show()
    }

    const showConfirm = (payload: { isValid: boolean; message?: string }) => {
      modal.show('confirm', { params: payload })
    }

    return {
      surveyData,
      showConfirm
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
