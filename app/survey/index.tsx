import { defineComponent, PropType, resolveComponent, computed, provide, inject, Ref } from 'vue'
import { useStore } from 'vuex'
import { RouterView, useRouter, RouteRecordRaw } from 'vue-router'

import { Survey } from '@/types'

import SubjectPagination from './subject/common/SubjectPagination.vue'
import SubjectSubmit from './subject/common/SubjectSubmitBtn.vue'

import _windowSizeObserver from './utils/window-size-observer'
import _scrollHandler from './utils/scroll-handler'
import { useComponentsMap } from './register'

const paginations: number[][] = [[]]

export default defineComponent({
  name: 'SurveyContainer',
  props: {
    // 問卷資料
    survey: {
      type: Array as PropType<Survey>,
      default: () => []
    },
    // parent route name
    parentRouteName: {
      type: String,
      default: ''
    },
    // scroll container
    scrollContainer: {
      type: String,
      default: ''
    },
    // 介面切換的寬度界線
    responseBoundary: {
      type: Number,
      default: 1200
    }
  },
  setup(props, { attrs, emit }) {
    const store = useStore()
    const router = useRouter()
    const compMap = useComponentsMap()

    // eslint-disable-next-line
    const defaults: { single: JSX.Element[], multi: JSX.Element[][] } = {
      single: [],
      multi: [[]]
    }
    let page = 0 // 分頁記錄
    const subjectNums = props.survey.length - 1
    const token = inject<string>('token')
    const timestart = inject<Ref<number>>('timestart')

    // 定義送出的處理流程
    const surveySubmit = async () => {
      try {
        await store.dispatch('survey/submit', {
          token,
          mark: timestart?.value
        })

        emit('confirmed', { isValid: true })
      } catch (err) {
        emit('confirmed', {
          isValid: false,
          message: err.message
        })
      }
    }

    /**
     * 此處的目的是希望依據問卷資料生成對應種類的題目元件，所以不會直接解析所有種類的元件或是預載範本資料
     *
     * 但因為 resolve component 只能在 setup 作用域裡使用(無法異步執行)，需要 props:survey 確定有資料再行驅動
     */
    const renderer = props.survey.reduce((acc, subject, index) => {
      const compName = compMap.get(subject.type)

      if (!compName) return acc

      const SubjectComponent = resolveComponent(compName)
      const jsxElement = (
        // @ts-expect-error
        <SubjectComponent
          aria-label="subject content"
          class="subject"
          data-subject-id={`${subject.type}-${index + 1}`}
          context={subject}
          {...{
            ...attrs
          }}
        />
      )

      acc.single.push(jsxElement)
      acc.multi[page].push(jsxElement)
      paginations[page].push(subject.id)

      if (subject.type === 'divider' || index === subjectNums) {
        acc.multi[page].push(<SubjectPagination />)
      }

      if (subject.type === 'divider' && index !== subjectNums) {
        page++
        acc.multi.push([])
        paginations.push([])
      }

      return acc
    }, defaults)

    provide('paginations', paginations.filter(pids => pids.length > 0))

    /**
     * 因為有單頁(desktop)與分頁(mobile)兩種介面模式，這裡採用 vue-router 進行實作
     * 分別產出兩組對應的 raw route records 與 components，在不同的尺寸下進行動態更新
     */
    const singlePageRouterRecord = {
      path: '/',
      name: 'survey',
      component: defineComponent({
        setup() {
          return () => (
            <div
              aria-label="survey contentainer"
              class="survey-container survey-desktop"
            >
              {renderer.single}
              <SubjectSubmit
                {...{
                  onSubmited: surveySubmit
                }}
              />
            </div>
          )
        }
      })
    }

    const multiPageRouterRecord: RouteRecordRaw = renderer.multi
      .filter(pageGroup => pageGroup.length !== 0)
      .reduce((acc: RouteRecordRaw, pageGroup, index) => {
        acc.children?.push({
          path: `/s/${index + 1}`,
          name: `page${index + 1}`,
          component: {
            setup() {
              return () => (
                <div
                  aria-label="survey content"
                  class="survey-container survey-mobile"
                >
                  {pageGroup}
                </div>
              )
            }
          }
        })

        return acc
      }, {
        path: '/',
        name: 'survey',
        component: <router-view />,
        children: []
      })

    multiPageRouterRecord.children?.push({
      path: '/s/submit',
      name: 'submit',
      component: defineComponent({
        setup() {
          return () => (
            <div
              aria-label="survey content"
              class="survey-container survey-mobile"
            >
              <SubjectPagination />
              <SubjectSubmit
                {...{
                  onSubmited: surveySubmit
                }}
              />
            </div>
          )
        }
      })
    })

    /**
     * 介面互動設定，包含 window resize & anchor scroll
     */
    _windowSizeObserver((device: string) => {
      if (device === 'mobile') {
        let pno = 1

        const flag = computed(() => store.state.survey.subjectFlag)

        if (props.parentRouteName) {
          router.addRoute(props.parentRouteName, multiPageRouterRecord)
        } else {
          router.addRoute(multiPageRouterRecord)
        }

        if (flag.value === -1) {
          router.push({ name: 'page1', params: { pno } })
          return
        }

        for (const qids of paginations) {
          if (qids.includes(flag.value)) {
            router.push({ name: `page${pno}`, params: { pno } })
            return
          }
          pno++
        }
      } else {
        if (props.parentRouteName) {
          router.addRoute(props.parentRouteName, singlePageRouterRecord)
        } else {
          router.addRoute(singlePageRouterRecord)
        }

        router.push({ name: 'survey' })
      }
    }, props.responseBoundary)

    store.subscribeAction(action => {
      if (action.type === 'survey/anchor') {
        _scrollHandler(props.scrollContainer).scrollTo(action.payload)
      }
    })

    return () => (<RouterView />)
  },
  components: {
    SubjectSubmit
  }
})
