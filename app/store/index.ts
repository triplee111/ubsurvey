import { createStore } from 'vuex'
import { RootState } from '@/types'

// modules
import modules from './sub'

const CHANGE_IS_IN_PROGRESS = 'CHANGE_IS_IN_PROGRESS'

export default createStore<RootState>({
  state: {
    inProgress: false
  },
  mutations: {
    [CHANGE_IS_IN_PROGRESS](state, bool) {
      state.inProgress = bool
    }
  },
  actions: {
    progress({ commit }, bool) {
      commit(CHANGE_IS_IN_PROGRESS, bool)
    }
  },
  modules,
  strict: process.env.NODE_ENV !== 'production'
})
