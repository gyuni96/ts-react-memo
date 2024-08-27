import { useState } from 'react'
import { useRecoilValue } from 'recoil'
import { displayFolderState } from '../../recoil/state'
import styled from 'styled-components'
import Button from '../../components/common/Button'
import MemoItem from '../../components/ui/MemoItem'
import MemoAddModal from '../../components/ui/MemoAddModal'
import useAxios from '../../hooks/useAxiosFetch'
import { MemoProps } from '../../types/type'
import { Modal2 } from '../../components/common/Modal2'

const HomePage = () => {
  const displayFolder = useRecoilValue(displayFolderState)
  const [isModal, setIsModal] = useState<boolean>(false)
  const { data, setData } = useAxios(`/memo?folderId=${displayFolder}`)

  // 모달창열기
  const handleModal = () => {
    setIsModal(!isModal)
  }

  const handleSaveMemo = (newMemo: MemoProps) => {
    // 추가된 메모가 현재 폴더의 메모인지 확인 후 추가
    if (newMemo.folderId === displayFolder) {
      setData((prevMemoList: MemoProps[]) => [...prevMemoList, newMemo])
    }
  }

  return (
    <MemoContainer>
      <MemoTitleWrap>
        <h1>Memo List</h1>
        <Button $variant="primary" onClick={handleModal}>
          추가
        </Button>
      </MemoTitleWrap>
      <MemoWrap>
        {data.map((memo: MemoProps) => (
          <MemoItem memo={memo} key={memo.id} />
        ))}
      </MemoWrap>
      <Modal2 />
      {isModal && (
        <MemoAddModal setIsModal={setIsModal} onSave={handleSaveMemo} />
      )}
    </MemoContainer>
  )
}

export default HomePage

const MemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
`

const MemoTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const MemoWrap = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`
