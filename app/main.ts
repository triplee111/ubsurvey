import '@css/reset.css'
import '@css/main.sass'

import 'noty/lib/noty.css'
import 'noty/lib/themes/nest.css'

import { createApp } from 'vue'
import { createModal } from '@act/slime-modal'

import { InitResolve } from './types'

import App from './App.vue'
import store from './store'
import router from './router'
import { registerSurveyComponent } from './survey/register'

import actService from '@/repository/activity'

const EXTERNAL_LINKS = {
  osLink: '#',
  csLink: '#',
  appLink: '#',
  testLink: '#',
  epayLink: '#',
  bonusLink: '#',
  termsLink: '#'
}

/**
 * index 0 為後端設定的題目類型字串，index 1 為前台製定的元件名稱(kebab-case)
 * 可依據需求自行調整與擴充
 */
const SubjectType = new Map([
  ['choice', 'choice'],
  ['multi-answer', 'multi-ans'],
  ['metrix', 'metrix'],
  ['text-input', 'text-input'],
  ['slider', 'slider'],
  ['quote', 'quote'],
  ['divider', 'divider']
])

const app = createApp(App)

actService
  .init()
  .then(({ actTitle, links, copy, token }: InitResolve & { token: string }) => {
    app
      .provide('actTitle', actTitle)
      .provide('links', {
        ...EXTERNAL_LINKS,
        ...links
      })
      .provide('copy', copy)
      .provide('token', token)
  })
  .catch(() => {
    app
      .provide('actTitle', '')
      .provide('links', {
        ...EXTERNAL_LINKS
      })
      .provide('copy', '')
  })
  .finally(() => {
    app
      .use(store)
      .use(router)
      .use(createModal('modal'))
      .use(registerSurveyComponent(SubjectType, 'subject')) // async define subject component and inject map with type to component
      .mount('#app')
  })
