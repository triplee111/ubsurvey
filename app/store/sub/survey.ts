import { MutationTree, ActionTree } from 'vuex'
import { Survey, State } from '../../types'
import { sectionMock } from '../../mock'

const GET_SURVEY = 'GET_SURVEY' // 取得問卷內容

const state: Survey = {
  sections: []
}

const mutations: MutationTree<typeof state> = {
  [GET_SURVEY](state, res) {
    state.sections = res
  }
}

const actions: ActionTree<typeof state, State> = {
  getSurvey: async ({ commit }) => {
    commit(GET_SURVEY, sectionMock)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
