import { SetterOrUpdater } from 'recoil'

// 로그인 액션
export const login = (setUser: SetterOrUpdater<string>, username: string) => {
  setUser(username)
  localStorage.setItem('user', username)
}

// 로그아웃 액션
export const logout = (setUser: SetterOrUpdater<string>) => {
  setUser('')
  localStorage.removeItem('user')
}

export const changeDisplayFolder = (
  setDisplayFolder: SetterOrUpdater<string>,
  folderId: string
) => {
  setDisplayFolder(folderId)
}
