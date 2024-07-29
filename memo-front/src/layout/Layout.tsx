import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isLoggedInState } from '../reducers/state'
import Header from '../components/common/Header'

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
      <Outlet />
    </>
  )
}

export default AppLayout
