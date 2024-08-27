import styled from 'styled-components'
import { useRecoilState } from 'recoil'
import { displayFolderState } from '../../recoil/state'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import apiCall from '../../api/api'
import { MemoFolderProps } from '../../types/type'
import { useEffect } from 'react'

const SideMenu = () => {
  const [displayFolder, setDisplayFolder] = useRecoilState(displayFolderState)
  const navigate = useNavigate()
  const { data, setData } = useAxiosFetch('/folder')

  useEffect(() => {
    // 가장 첫번째 폴더로 이동
    if (data.length > 0) {
      if (!displayFolder) {
        setDisplayFolder(data[0].id)
      }
    }
  }, [data, displayFolder])

  const onClickFolder = (folderId: string) => {
    setDisplayFolder(folderId)
    navigate('/')
  }

  const handleFolderDelete = async (id: string) => {
    const deleteFlag = confirm('삭제하시겠습니까?')
    if (deleteFlag) {
      await apiCall.delete(`/folder/${id}`)
      setData((prev: MemoFolderProps[]) =>
        prev.filter((folder: MemoFolderProps) => folder.id !== id)
      )
      // 보여지는 폴더가 삭제된 폴더일 경우 초기화
      if (displayFolder === id) {
        setDisplayFolder('')
      }

      // to-do : 삭제시 메모도 삭제해야됨 (추후 구현)

      alert('삭제되었습니다.')
    }
  }

  return (
    <SideMenuWrap>
      <MenuList>
        {/* <MenuItem>
          <MenuTitle>개인 페이지</MenuTitle>
          <MenuIcon
            onClick={() => {
              console.log('클릭')
            }}
          >
            ➕
          </MenuIcon>
        </MenuItem> */}
        {data.map((folder: any) => (
          <MenuItem
            key={folder.id}
            className={folder.id === displayFolder ? 'active' : ''}
          >
            <MenuTitle onClick={() => onClickFolder(folder.id)}>
              🗂️ {folder.name}
            </MenuTitle>
            <MenuIcon onClick={() => handleFolderDelete(folder.id)}>
              🗑️
            </MenuIcon>
          </MenuItem>
        ))}
      </MenuList>
    </SideMenuWrap>
  )
}

export default SideMenu

const SideMenuWrap = styled.div`
  width: 200px;
  height: 100%;
  border-right: 1px solid rgba(0, 0, 0, 0.4);
`

const MenuList = styled.ul`
  padding: 1rem;
`

const MenuItem = styled.li`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: #dbdbdb;
    border-radius: 5px;
  }
  &.active {
    background-color: #dbdbdb;
    border-radius: 5px;
  }
`
const MenuTitle = styled.p`
  font-size: 1rem;
  width: 100%;
`

const MenuIcon = styled.p`
  font-size: 0.8rem;
`
