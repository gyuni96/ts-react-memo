import { atom } from 'recoil'

export const loginState = atom<string>({
  key: 'loginState',
  default: localStorage.getItem('login') || '',
})
