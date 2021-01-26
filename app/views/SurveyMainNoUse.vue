<template lang="pug">
#actMain
  form#survey(@submit="handleOnSubmit")
    .title 填问卷 豪礼三选一
    .subTitle 礼品、彩金、高额存送任您挑

    .scrollContainer(v-perfect-scroll)
      .section

        .titleBlock
          .mbTitle 填问卷 豪礼三选一
          .mbSubTitle 礼品、彩金、高额存送任您挑

        //- TODO: 引言題
        .subject
          .sectionTitle {{ sections[0].title }}
          .description {{ sections[0].description }}

        //- TODO: 一般題
        .subject(
          v-for="(question, qi) in sections[0].questions"
          :key="question.id")

          .questionBlock
            p {{ `Q${qi + 1} ${question.subject}` }}

              //- TODO: error handler

          .questionBlock
            p
              strong(v-if="question.isRequired") *
              span.errorMessage(v-if="formData[0].questions[qi].showError") 此栏位为必填栏位

          .answerBlock
            .options(
              v-for="(option, i) in question.options"
              :key="option")
              input(
                type="checkbox"
                :id="option")
              label(:for="option") {{ option }}

            .options(v-if="question.needOther")
              input(
                type="checkbox"
                :id="`${question.id}-其他`"
                :value="question.options.length")

              label(:for="`${question.id}-其他`") 其他
                input(type="text")

            //- component(
            //-   v-model:answers="formData[si].questions[qi].answers"
            //-   v-model:context="formData[si].questions[qi].context"
            //-   v-model:showError="formData[si].questions[qi].showError"
            //-   :is="inputType[question.type]"
            //-   :question="question")

      //- TODO
      .buttonBlock
        //- mobile only
        button.prev(
          v-show="currentStep !== 0"
          type="button"
          @click="changeStep(currentStep - 1)") 上一步
        button.next(
          v-show="currentStep !== sections.length - 1"
          type="button"
          @click="checkValidateByStep()") 下一步

      .buttonBlock
        button(
          type="submit"
          :class="{ isSubmitShow: currentStep === sections.length - 1 }") 提交

ModalContainer

</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import ModalContainer, { useModal } from '@act/slime-modal'

import { SurveyPost, QuestionPost } from '@/types'

import Checkbox from '@/components/question/QueCheckbox.vue'
import Radio from '@/components/question/QueRadio.vue'
import Selector from '@/components/question/QueSelector.vue'
import Text from '@/components/question/QueInputText.vue'

export default defineComponent({
  name: 'Survey',
  setup() {
    const store = useStore()

    store.dispatch('survey/getSurvey')

    const sections = computed(() => store.state.survey.sections)

    const tmp: SurveyPost[] = []

    sections.value.forEach(section => {
      const questions: QuestionPost[] = []
      section.questions.forEach(question => {
        const { id } = question
        const q = {
          id, // question id
          answers: [], // QType: 1、2、4 時，資料型態為 array
          context: '', // QType: 3 或有 "其他" 選項內容
          showError: false // for 驗證用
        }
        questions.push(q)
      })
      const obj = {
        id: section.id, // sections id
        questions
      }
      tmp.push(obj)
    })

    const modal = useModal()
    const formData = reactive(tmp)
    const inputType = {
      1: 'Radio',
      2: 'Checkbox',
      3: 'Text',
      4: 'Selector'
    }

    const currentStep = ref(0)

    const checkAllValidate = (): boolean => {
      const arr: boolean[] = []
      formData.forEach((data, i) => {
        data.questions.forEach((q, qi) => {
          const { isRequired, type } = sections.value[i].questions[qi]
          if (isRequired) {
            let status = !!q.answers?.length
            if (type === 3) {
              status = !!q.context
            }
            formData[i].questions[qi].showError = !status
            arr.push(status)
          }
        })
      })
      return arr.every(Boolean)
    }

    const checkValidateByStep = () => {
      const arr: boolean[] = []
      formData[currentStep.value].questions.forEach((q, qi) => {
        const { isRequired, type } = sections.value[
          currentStep.value
        ].questions[qi]
        if (isRequired) {
          let status = !!q.answers?.length
          if (type === 3) {
            status = !!q.context
          }
          formData[currentStep.value].questions[qi].showError = !status
          arr.push(status)
        }
      })
      if (arr.every(Boolean)) {
        changeStep(currentStep.value + 1)
      }
    }

    const changeStep = (step: number) => {
      currentStep.value = step
    }

    const handleOnSubmit = async (e: Event) => {
      e.preventDefault()

      if (checkAllValidate()) {
        await store.dispatch('survey/postSurvey', formData)
        modal.show('Confirm')
      }
    }

    return {
      sections,
      formData,
      inputType,
      currentStep,
      changeStep,
      checkAllValidate,
      checkValidateByStep,
      handleOnSubmit
    }
  },
  components: {
    Checkbox,
    Radio,
    Selector,
    Text,
    ModalContainer
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
    .section
      margin-bottom: 30px
      line-height: 1.5
      .titleBlock
        display: none
      .sectionTitle
        font-size: 20px
        border-bottom: 2px solid #093f33
      .description
        font-size: 16px
      .questionBlock
        color: #424343
        line-height: 2
        > p
          strong,
          .errorMessage
            color: red
          .errorMessage
            font-size: 0.8rem
    .buttonBlock
      display: flex
      align-items: center
      justify-content: center
      padding: 1rem 0
      >button
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
    width: 90%
    height: 90%
    .title,
    .subTitle
      display: none
    .scrollContainer
      padding-left: 10%
      padding-right: 10%
      margin-right: unset
      .section
        // display: none
        // &.show
        //   display: block
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
      .buttonBlock
        >button
          margin: 0 0.5rem
          font-size: 1rem
          &.prev,
          &.next
            display: block
          &[type="submit"]
            display: none
            &.isSubmitShow
              display: block
</style>
