import { MutationTree, ActionTree } from 'vuex'
import { Survey, State } from '../../types'
import { sectionMock } from '../../mock'

const GET_SURVEY = 'GET_SURVEY' // 取得問卷內容

const state: Survey = {
  sections: [],
  isVerified: true
}

const mutations: MutationTree<typeof state> = {
  [GET_SURVEY](state, res) {
    state.sections = res
  }
}

const actions: ActionTree<typeof state, State> = {
  getSurvey: async ({ commit }) => {
    // TODO: call api and assign to state.sections
    commit(GET_SURVEY, sectionMock)
  },
  postSurvey: async({ commit }, formData) => {
    // TODO: post api and check verification
    console.log(formData)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
