<template lang="pug">
#modalSurvey
  .title 填问卷 豪礼三选一
  .subTitle 礼品、彩金、高额存送任您挑
  .scrollContainer(v-perfect-scroll)
    .section(v-for="(section, si) in sections" :key="section.id")
      .sectionTitle {{ section.title }}
      .description {{ section.description }}
      .questionBlock(v-for="(question, qi) in section.questions" :key="question.id")
        p {{ `Q${qi + 1} ${question.subject}` }}
          strong(v-if="question.isRequired") *
        component(:is="inputType[question.type]"
          :question="question"
          v-model:answers="formData[si].questions[qi].answers"
          v-model:context="formData[si].questions[qi].context"
        )
</template>
<script lang="ts">
import {
  defineComponent,
  computed,
  reactive
} from 'vue'
import { useStore } from 'vuex'
import { SurveyPost, QuestionPost } from '@/surveyType'
import Checkbox from './subComponents/Checkbox.vue'
import Radio from './subComponents/Radio.vue'
import Selector from './subComponents/Selector.vue'
import Text from './subComponents/Text.vue'

export default defineComponent({
  name: 'ModalSurvey',
  setup() {
    const store = useStore()
    store.dispatch('survey/getSurvey')
    const sections = computed(() => store.state.survey.sections)
    const tmp: SurveyPost[] = []
    sections.value.forEach(section => {
      const questions: QuestionPost[] = []
      section.questions.forEach(question => {
        const q = {
          id: question.id,
          answers: [],
          context: ''
        }
        questions.push(q)
      })
      const obj = {
        id: section.id,
        questions
      }
      tmp.push(obj)
    })
    const formData = reactive(tmp)
    const inputType = reactive({
      1: 'Radio',
      2: 'Checkbox',
      3: 'Text',
      4: 'Selector'
    })

    return {
      sections,
      formData,
      inputType
    }
  },
  components: {
    Checkbox,
    Radio,
    Selector,
    Text
  }
})
</script>
<style lang="sass" scoped>
#modalSurvey
  position: relative
  display: flex
  flex-direction: column
  justify-content: flex-start
  align-items: center
  width: 50%
  height: 80%
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
      .sectionTitle
        font-size: 20px
        border-bottom: 2px solid #093f33
      .description
        font-size: 16px
      .questionBlock
        color: #424343
        line-height: 2
        > p
          strong
            color: red
</style>
