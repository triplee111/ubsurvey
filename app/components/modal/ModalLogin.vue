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
import Noty from 'noty'
import { defineComponent, inject, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

import svService from '@/repository/survey'

import useAuth from '@/components/auth'
import { AuthInput } from '@/components/auth/index'

import { ExternalLinks } from '@/types'

export default defineComponent({
  name: 'ModalLogin',
  setup(_props, { emit }) {
    const links = inject('links') as ExternalLinks
    const token = inject<string>('token')

    const store = useStore()
    const account = computed(() => store.state.auth.user.account)

    const accountVal = ref('')

    const auth = useAuth()
    const signin = auth.signin
    const authProgress = auth.authProgress
    const errorMsg = auth.errorMsg

    watch(account, async (value: string) => {
      if (value) {
        try {
          await svService.getSurvey(
            token as string,
            store.state.auth.user.account
          )

          emit('close')
        } catch (err) {
          new Noty({
            type: 'error',
            layout: 'topCenter',
            theme: 'nest',
            text: err.data || '伺服器错误，请稍候再试',
            timeout: 1500,
            id: 'noty-error'
          }).show()
        }
      }
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
