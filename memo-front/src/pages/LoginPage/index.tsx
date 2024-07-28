import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { loginState } from '../../reducers/state'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [login, setLogin] = useRecoilState(loginState)
  const navigate = useNavigate()

  console.log('로그인페이지')

  useEffect(() => {
    if (!!login) {
      console.log('로그인')
      navigate('/')
    }
  }, [login])

  return (
    <>
      <p>로그인 페이지 입니다.</p>
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
          localStorage.setItem('login', 'adminUser')
        }
      >
        로그인
      </button>
    </>
  )
}

export default LoginPage
