import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loginState } from '../../reducers/state'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [login, setLogin] = useRecoilState(loginState)
  const navigate = useNavigate()

  useEffect(() => {
    if (!login) {
      console.log('로그인이 필요합니다.')
      navigate('/login')
    }
  }, [])

  return <div>index</div>
}

export default HomePage
