import Noty from 'noty'
import { MutationTree, ActionTree } from 'vuex'
import { SurveyState, State, SubjectAnswer } from '@/types'

import svService from '@/repository/survey'

const SET_VALIDATION = 'SET_VALIDATION'
const SET_VISIBILITY = 'SET_VISIBILITY'
const SET_ANSWER = 'SET_ANSWER'
const SET_FLAG = 'SET_FLAG'
const RESET_SURVEY_STATE = 'RESET_SURVEY_STATE'

const state: SurveyState = {
  validation: {},
  visibility: {},
  surveyAns: {},
  subjectFlag: -1 // 題目旗標
}

const mutations: MutationTree<typeof state> = {
  [SET_VALIDATION](state, payload: { qid: string; state: boolean }) {
    state.validation[payload.qid] = payload.state
  },
  [SET_VISIBILITY](state, payload: { qid: string; state: boolean }) {
    state.visibility[payload.qid] = payload.state
  },
  [SET_ANSWER](state, { qid, ans }: { qid: string; ans: SubjectAnswer }) {
    state.surveyAns[qid] = { ...ans }
  },
  [SET_FLAG](state, qid) {
    state.subjectFlag = qid
  },
  [RESET_SURVEY_STATE](state) {
    state.validation = {}
    state.surveyAns = {}
    state.subjectFlag = -1
  }
}

const actions: ActionTree<typeof state, State> = {
  verify({ commit }, payload) {
    commit(SET_VALIDATION, payload)
  },
  visible({ commit }, payload) {
    commit(SET_VISIBILITY, payload)
  },
  answer({ commit }, payload) {
    commit(SET_ANSWER, payload)
  },
  anchor({ commit }, qid) {
    commit(SET_FLAG, qid)
  },
  verifyAll({ state }) {
    const ansLength = Object.keys(state.surveyAns).length
    const validatedLength = Object.keys(state.validation).length
    const validations = Object.values(state.validation)

    if (ansLength !== validatedLength || validations.includes(false)) {
      new Noty({
        type: 'error',
        layout: 'topCenter',
        theme: 'nest',
        text: '问卷的回答内容似乎有问题，请您再次检查',
        timeout: 1500,
        id: 'noty-error'
      }).show()

      throw new Error('validate failed')
    }
  },
  submit: async ({ state, dispatch, rootState }, token) => {
    const account = rootState.auth.user.account

    dispatch('progress', true, { root: true })

    try {
      await svService.sendSurvey(token, {
        account,
        answers: state.surveyAns
      })

      dispatch('reset')
    } catch (err) {
      throw new Error(err.data || '伺服器错误，请稍候再试')
    } finally {
      dispatch('progress', false, { root: true })
    }
  },
  reset({ commit }) {
    commit(RESET_SURVEY_STATE)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
