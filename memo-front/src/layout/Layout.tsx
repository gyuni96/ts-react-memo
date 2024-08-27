import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isLoggedInState } from '../recoil/state'
import Header from '../components/ui/Header'
import styled from 'styled-components'
import SideMenu from '../components/ui/SideMenu'

const AppLayout = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login')
    } else {
      navigate('/')
    }
  }, [isLoggedIn])

  return (
    <>
      <Header />
      <Container>
        {isLoggedIn && <SideMenu />}
        <ContentSection $isLoggedIn={isLoggedIn}>
          <Outlet />
        </ContentSection>
      </Container>
    </>
  )
}

export default AppLayout

const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);
`

const ContentSection = styled.section<{ $isLoggedIn: boolean }>`
  width: ${({ $isLoggedIn }) => ($isLoggedIn ? 'calc(100% - 200px)' : '100%')};
`
