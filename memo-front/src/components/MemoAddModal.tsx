import React, { useEffect, useRef, useState } from 'react'
import Modal from './common/Modal'
import apiCall from '../api/api'
import styled from 'styled-components'

interface MemoAddModalProps {
  setIsModal: (isModal: boolean) => void
  onSave: (newMemo: MemoProps) => void
  folderId: string
}

interface MemoProps {
  id: string | undefined
  title: string
  content: string
  folderId: string
}

const MemoAddModal = ({ setIsModal, onSave, folderId }: MemoAddModalProps) => {
  const [folderList, setFolderList] = useState<any>([])
  const folderRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    const folderListFetch = async () => {
      const res = await apiCall.get('/folder')
      setFolderList(res)
    }
    folderListFetch()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const folderId = folderRef.current?.value
    const title = formData.get('addTitleInput')?.toString()
    const content = formData.get('addContentInput')?.toString()

    if (!folderId || !title || !content) {
      alert('모든 값을 입력해주세요')
      return
    }

    try {
      const memoData: MemoProps = { folderId, title, content, id: undefined }
      const { data } = await apiCall.post('/memo', memoData)

      onSave(data)

      setIsModal(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddEvent = () => {}

  return (
    <Modal
      setIsModal={setIsModal}
      title={'메모 추가'}
      addEvent={handleAddEvent}
    >
      <FormWrap onSubmit={handleSubmit} name="addForm">
        <label htmlFor="">상위디렉토리</label>
        <FromSelect ref={folderRef}>
          {folderList.map((folder: any) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </FromSelect>
        <label htmlFor="">제목</label>
        <FromInput type="text" name="addTitleInput" />
        <label htmlFor="">상세 내용</label>
        <FromTextArea name="addContentInput" />
        <button type="submit">전송</button>
      </FormWrap>
    </Modal>
  )
}

export default MemoAddModal

const FormWrap = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: 100%;
`

const FromSelect = styled.select`
  margin-bottom: 0.6rem;
  border: 1px solid #333;
  width: 100%;
  padding: 0.4rem;
`

const FromInput = styled.input`
  margin-bottom: 0.6rem;
  border: 1px solid #333;
  width: 100%;
  padding: 0.4rem;
`

const FromTextArea = styled.textarea`
  margin-bottom: 0.6rem;
  border: 1px solid #333;
  width: 100%;
  height: 100%;
  padding: 0.4rem;
`
