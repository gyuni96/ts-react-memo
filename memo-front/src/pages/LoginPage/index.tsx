import { useRecoilState } from 'recoil'
import Button from '../../components/common/Button'
import { login } from '../../reducers/actions'
import { userState } from '../../reducers/state'

const LoginPage = () => {
  const [_, setUser] = useRecoilState(userState)
  const handleLogin = () => {
    login(setUser, 'admin')
  }

  return (
    <>
      <p>로그인 페이지 입니다.</p>
      <Button onClick={handleLogin}>로그인</Button>
    </>
  )
}

export default LoginPage
