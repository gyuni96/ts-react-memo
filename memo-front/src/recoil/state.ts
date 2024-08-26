import { atom, atomFamily, selector } from 'recoil'

// 사용자 정보를 저장하는 atom
export const userState = atom<string>({
  key: 'userState',
  default: localStorage.getItem('user') || '',
})

// 로그인 상태를 반환하는 selector
export const isLoggedInState = selector({
  key: 'isLoggedInState',
  get: ({ get }) => {
    const user = get(userState)
    return user !== ''
  },
})

export const displayFolderState = atom<string>({
  key: 'displayFolderState',
  default: '',
})
