import { MutationTree, ActionTree } from 'vuex'
import { AuthState, State } from '@/types'

import authService from '@/repository/auth'
import messageSet from '@/units/message.json'

const SET_USER_STATUS = 'SET_USER_STATUS' // 設定使用者的登入資訊
const RESET_USER_STATUS = 'RESET_USER_STATUS' // 清空登入狀態，使用者登出
const SET_VALIDATION = 'SET_VALIDATION' // 設定驗證結果文字
const CHANGE_IS_IN_PROGRESS = 'CHANGE_IS_IN_PROGRESS' // 改變'是否在驗證中'的狀態

const state: AuthState = {
  user: {
    account: '',
    level: '',
    agent: '',
    regDate: ''
  },
  validation: '',
  inProgress: false
}

const mutations: MutationTree<typeof state> = {
  [SET_USER_STATUS](state, { account, agent, level, regDate }) {
    state.user = {
      ...state.user,
      account,
      level: level,
      agent: agent,
      regDate: regDate
    }
  },
  [RESET_USER_STATUS](state) {
    state.user = {
      account: '',
      level: '',
      agent: '',
      regDate: ''
    }
  },
  [SET_VALIDATION](state, message) {
    state.validation = message
  },
  [CHANGE_IS_IN_PROGRESS](state, bool) {
    state.inProgress = bool
  }
}

const actions: ActionTree<typeof state, State> = {
  signin: async ({ commit, dispatch }, { account, password }) => {
    commit(CHANGE_IS_IN_PROGRESS, true)

    try {
      const response = await authService.signin(account, password) // 登入api, 開發時請開啟 mock

      const userStatus = {
        account: response.account,
        agent: response.agent || '',
        level: response.level || '',
        regDate: response.regDate || ''
      }

      commit(SET_USER_STATUS, userStatus)
    } catch (err) {
      const errorMsgCode = err.data && err.data.msg ? err.data.msg : 'DEFAULT'

      dispatch('setError', errorMsgCode)
    } finally {
      commit(CHANGE_IS_IN_PROGRESS, false) // 進度狀態改變為結束
    }
  },
  signout: ({ commit }) => {
    commit(RESET_USER_STATUS)
  },
  setError: ({ commit }, errorMsg) => {
    const validation = Object.prototype.hasOwnProperty.call(
      messageSet.AUTH,
      errorMsg
    )
      ? (messageSet.AUTH as { [prop: string]: string })[errorMsg]
      : errorMsg

    commit(SET_VALIDATION, validation)
  },
  resetValidation: ({ commit }) => {
    commit(SET_VALIDATION, '')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
