import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import { isLoggedInState, userState } from '../../reducers/state'
import { useRecoilState, useRecoilValue } from 'recoil'
import { login, logout } from '../../reducers/actions'

const Header = () => {
  const [_, setUser] = useRecoilState(userState)
  const isLoggedIn = useRecoilValue(isLoggedInState)

  const handleLogin = () => {
    login(setUser, 'admin')
  }

  const handleLogout = () => {
    logout(setUser)
  }

  return (
    <HeaderWrap>
      <p>Memo</p>
      {isLoggedIn ? (
        <Button onClick={handleLogout}>로그아웃</Button>
      ) : (
        <Button onClick={handleLogin}>로그인</Button>
      )}
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
