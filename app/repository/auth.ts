import useAgent from '@act/service-agent'

const service = useAgent()

// 平台會員登入
const signin = (account: string, password: string) => {
  return service.post(`bbinAuth/ajaxSignin/${process.env.PROJ_PLATFORM}`, {
    account,
    password
  })
}

export default {
  signin
}
