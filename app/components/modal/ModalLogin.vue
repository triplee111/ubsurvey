<template lang="pug">
#ModalLogin
  img.material(src="@img/material-after.png")
  //- img.modalClose(
  //-   src="@img/close.png"
  //-   @click="$emit('close')"
  //- )

  img.poker(src="@img/card-before.png")

  .loginGroups
    p 会员登入
    AuthInput(
      name="account"
      type="text"
      placeholder="输入会员帐号"
      :disabled="authProgress"
      v-model.trim="accountVal"
      @enter="signin(accountVal)")

    .error-msg {{ errorMsg }}

    .loginBtn(@click="signin(accountVal)") 登入
    a.signup(:href="regLink" target="_blank")
      img(src="@img/penIcon.png")
      p 立即注册

</template>

<script lang="ts">
import { defineComponent, inject, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

import useAuth from '@/components/auth'
import { AuthInput } from '@/components/auth/index'

import { ExternalLinks } from '@/types'

export default defineComponent({
  name: 'ModalLogin',
  setup(_props, { emit }) {
    const links = inject('links') as ExternalLinks

    const store = useStore()
    const account = computed(() => store.state.auth.user.account)

    const accountVal = ref('')

    const auth = useAuth()
    const signin = auth.signin
    const authProgress = auth.authProgress
    const errorMsg = auth.errorMsg

    watch(account, (value: string) => {
      if (value) emit('close')
    })

    return {
      accountVal,
      signin,
      authProgress,
      errorMsg,
      regLink: links.regLink
    }
  },
  components: {
    AuthInput
  }
})
</script>
