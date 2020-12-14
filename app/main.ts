import '@css/reset.css'
import '@css/main.sass'

import { createApp } from 'vue'
import { createModal } from '@act/slime-modal'

import { InitResolve } from './types'

import App from './App.vue'
import store from './store'

import actService from '@/repository/activity'

const EXTERNAL_LINKS = {
  osLink: '#',
  csLink: '#',
  appLink: '#',
  testLink: '#',
  epayLink: '#',
  bonusLink: '#',
  termsLink: '#',
  act1Link: 'https://new.ub727.com/ub/xmaslot', // 聖誕拉霸
  act2Link: 'https://new.ub727.com/ub/xmasav' // 聖誕AV
}

const app = createApp(App)

actService
  .init()
  .then(({ actTitle, links, copy }: InitResolve) => {
    app
      .provide('actTitle', actTitle)
      .provide('links', {
        ...EXTERNAL_LINKS,
        ...links
      })
      .provide('copy', copy)
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
    app.use(store).use(createModal('modal')).mount('#app')
  })
