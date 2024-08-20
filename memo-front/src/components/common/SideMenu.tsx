import { useEffect, useState } from 'react'
import styled from 'styled-components'
import apiCall from '../../api/api'
import { changeDisplayFolder } from '../../reducers/actions'
import { useRecoilState } from 'recoil'
import { displayFolderState } from '../../reducers/state'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const [folderList, setFolderList] = useState<any>([])
  const [displayFolder, setDisplayFolder] = useRecoilState(displayFolderState)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const data = await apiCall.get('/folder')
        setFolderList(data)
      } catch (e) {
        console.log(e)
      }
    }

    fetchFolder()
  }, [displayFolder])

  const onClickFolder = (folderId: string) => {
    changeDisplayFolder(setDisplayFolder, folderId)
    navigate('/')
  }

  return (
    <SideMenuWrap>
      <MenuList>
        <MenuItem>
          <p>개인 페이지</p>
          <p
            onClick={() => {
              console.log('클릭')
            }}
          >
            +
          </p>
        </MenuItem>
        {folderList.map((folder: any) => (
          <MenuItem
            onClick={() => onClickFolder(folder.id)}
            key={folder.id}
            className={folder.id === displayFolder ? 'active' : ''}
          >
            <p>🗂️ {folder.name}</p>
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

  &:hover {
    background-color: #dbdbdb;
    border-radius: 5px;
  }
  &.active {
    background-color: #dbdbdb;
    border-radius: 5px;
  }
`
