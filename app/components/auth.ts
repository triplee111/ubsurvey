import { computed } from 'vue'
import { useStore } from 'vuex'

export default function() {
  const store = useStore()

  const accountInStore = computed(() => store.state.auth.user.account)
  const errorMsg = computed(() => store.state.auth.validation)
  const authProgress = computed(() => store.state.auth.inProgress)

  const signin = async function(account: string, password = '') {
    if (errorMsg.value) {
      reset()
    }

    account = account.toLowerCase().replace(/[&\\#,+()@$~%.'":*<>{}!`&^]/g, '')

    if (account === '') {
      store.dispatch('auth/setError', 'ACCOUNT_EMPTY')
      return false
    }

    if (account === accountInStore.value) {
      signout() // 同樣帳號先進行登出
    }

    await store.dispatch('auth/signin', { account, password })
  }

  const signout = async function() {
    await store.dispatch('auth/signout')
  }

  const reset = function() {
    store.dispatch('auth/resetValidation')
  }

  return {
    account: accountInStore,
    authProgress,
    errorMsg,
    signin,
    signout,
    reset
  }
}
