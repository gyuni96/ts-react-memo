import styled from 'styled-components'
import Button from '../common/Button'
import { isLoggedInState, userState } from '../../recoil/state'
import { useRecoilState, useRecoilValue } from 'recoil'
import { logout } from '../../recoil/actions'

const Header = () => {
  const [_, setUser] = useRecoilState(userState)
  const isLoggedIn = useRecoilValue(isLoggedInState)

  // const handleLogin = () => {
  //   login(setUser, 'admin')
  // }

  const handleLogout = () => {
    logout(setUser)
  }

  return (
    <HeaderWrap>
      <HeaderTitle>Memo</HeaderTitle>
      {isLoggedIn && <Button onClick={handleLogout}>로그아웃</Button>}
    </HeaderWrap>
  )
}

export default Header

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 60px;
  background-color: #333;
  color: #fff;
  font-size: 24px;
`
const HeaderTitle = styled.p`
  font-size: 24px;
  color: #fff;
`
