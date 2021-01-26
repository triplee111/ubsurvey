import { MutationTree, ActionTree } from 'vuex'
import { SurveyState, State } from '../../types'

const state: SurveyState = {
  surveyState: [],
  surveyAns: []
}

const mutations: MutationTree<typeof state> = {}

const actions: ActionTree<typeof state, State> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
