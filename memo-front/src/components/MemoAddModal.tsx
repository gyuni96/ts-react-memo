import React, { useEffect, useRef, useState } from 'react'
import Modal from './common/Modal'
import apiCall from '../api/api'
import styled from 'styled-components'
import { useRecoilValue } from 'recoil'
import { displayFolderState } from '../recoil/state'
import useAxiosFetch from '../hooks/useAxiosFetch'
import { MemoProps } from '../types/type'

interface MemoAddModalProps {
  setIsModal: (isModal: boolean) => void
  onSave: (newMemo: MemoProps) => void
}

const MemoAddModal = ({ setIsModal, onSave }: MemoAddModalProps) => {
  const displayFolder = useRecoilValue(displayFolderState)
  const [selectedFolder, setSelectedFolder] = useState<string>(displayFolder)
  const formRef = useRef<HTMLFormElement>(null)

  const { data } = useAxiosFetch('/folder')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const folderId = selectedFolder
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

      alert('저장되었습니다.')

      setIsModal(false)
    } catch (e) {
      console.log(e)
    }
  }

  const handleAddEvent = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  const handleOnchangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFolder(e.target.value)
  }

  return (
    <Modal
      setIsModal={setIsModal}
      title={'메모 추가'}
      addEvent={handleAddEvent}
    >
      <FormWrap onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="">상위디렉토리</label>
        <FromSelect value={selectedFolder} onChange={handleOnchangeSelect}>
          {data.map((folder: any) => (
            <option key={folder.id} value={folder.id}>
              {folder.name}
            </option>
          ))}
        </FromSelect>
        <label htmlFor="">제목</label>
        <FromInput type="text" name="addTitleInput" />
        <label htmlFor="">상세 내용</label>
        <FromTextArea name="addContentInput" />
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
