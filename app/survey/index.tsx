import { defineComponent, PropType, resolveComponent } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import { Survey } from '@/types'

import _windowSizeObserver from './utils/window-size-observer'
import { useComponentsMap } from './register'

export default defineComponent({
  name: 'SurveyContainer',
  props: {
    // 問卷資料
    survey: {
      type: Object as PropType<Survey>,
      default: []
    },
    // 介面切換的寬度界線
    responseBoundary: {
      type: Number,
      default: 1200
    }
  },
  setup(props, { attrs }) {
    const router = useRouter()
    const compMap = useComponentsMap()

    // eslint-disable-next-line
    const defaults: { single: JSX.Element[], multi: JSX.Element[][] } = {
      single: [],
      multi: [[]]
    }
    let page = 0 // 分頁記錄

    /**
     * 此處的目的是希望依據問卷資料生成對應種類的題目元件，所以不會直接解析所有種類的元件或是預載範本資料
     *
     * 但因為 resolve component 只能在 setup 作用域裡使用(無法異步執行)，需要 props:survey 確定有資料再行驅動
     * 目前是透過在父元件使用 v-if 控制啟動流程
     */
    const renderer = props.survey.reduce((acc, subject, index) => {
      const compName = compMap.get(subject.type)

      if (!compName) return acc

      const SubjectComponent = resolveComponent(compName)
      const jsxElement = (
        // @ts-expect-error
        <SubjectComponent
          aria-label="subject"
          class="subject-container"
          data-subject-id={`${subject.type}-${index + 1}`}
          context={subject}
          {...{
            ...attrs
          }}
        />
      )

      acc.single.push(jsxElement)
      acc.multi[page].push(jsxElement)

      if (subject.type === 'divider') {
        page++
        acc.multi.push([])
      }

      return acc
    }, defaults)

    /**
     * 因為有單頁(desktop)與分頁(mobile)兩種介面模式，這裡採用 vue-router 進行實作
     * 分別產出兩組對應的 raw route records 與 components，在不同的尺寸下進行動態更新
     */
    const singlePageRouterRecord = {
      path: '/',
      name: 'survey',
      component: {
        setup() {
          return () => (
            <div
              aria-label="survey content"
              class="survey-container survey-desktop"
            >
              {renderer.single}
            </div>
          )
        }
      }
    }

    const multiPageRouterRecord = renderer.multi.reduce((acc, pageGroup, index) => {
      (acc.children as any[]).push({
        path: `/s/${index + 1}`,
        name: `step${index + 1}`,
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

    _windowSizeObserver((device: string) => {
      if (device === 'mobile') {
        router.addRoute(multiPageRouterRecord)
        router.push({ name: 'step1' }) // TODO: push to specific flag
      } else {
        router.addRoute(singlePageRouterRecord)
        router.push({ name: 'survey' })
      }
    }, props.responseBoundary)

    return () => (<RouterView />)
  }
})
