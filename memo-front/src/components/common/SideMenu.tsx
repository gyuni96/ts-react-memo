import { useEffect, useState } from 'react'
import styled from 'styled-components'
import apiCall from '../../api/api'
import { changeDisplayFolder } from '../../reducers/actions'
import { useRecoilState } from 'recoil'
import { displayFolderState } from '../../reducers/state'
import { useNavigate } from 'react-router-dom'

const SideMenu = () => {
  const [folderList, setFolderList] = useState<any>([])
  const [_, setDisplayFolder] = useRecoilState(displayFolderState)
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
  }, [])

  const onClickFolder = (folderId: string) => {
    changeDisplayFolder(setDisplayFolder, folderId)
    navigate('/')
  }

  return (
    <SideMenuWrap>
      <MenuList>
        {folderList.map((folder: any) => (
          <MenuItem onClick={() => onClickFolder(folder.id)} key={folder.id}>
            {folder.name}
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
  /* background-color: red; */
  padding: 1rem;
  border-right: 1px solid #333;
`

const MenuList = styled.ul``

const MenuItem = styled.li``
