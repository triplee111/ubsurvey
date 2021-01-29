import { MutationTree, ActionTree } from 'vuex'
import { SurveyState, State, SubjectAnswer } from '@/types'

const SET_VALIDATION = 'SET_VALIDATION'
const SET_VISIBILITY = 'SET_VISIBILITY'
const SET_ANSWER = 'SET_ANSWER'

const state: SurveyState = {
  validation: {},
  visibility: {},
  surveyAns: {}
}

const mutations: MutationTree<typeof state> = {
  [SET_VALIDATION](state, payload: { qid: string; state: boolean }) {
    state.validation[payload.qid] = payload.state
  },
  [SET_VISIBILITY](state, payload: { qid: string; state: boolean }) {
    state.visibility[payload.qid] = payload.state
  },
  [SET_ANSWER](state, { qid, ans }: { qid: string; ans: SubjectAnswer }) {
    state.surveyAns[qid] = ans
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
