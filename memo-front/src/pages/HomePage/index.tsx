import { useEffect, useState } from 'react'
import apiCall from '../../api/api'
import { useRecoilValue } from 'recoil'
import { displayFolderState } from '../../reducers/state'
import styled from 'styled-components'
import Button from '../../components/common/Button'
import MemoItem from '../../components/MemoItem'
import MemoAddModal from '../../components/MemoAddModal'

interface MemoProps {
  id: string | undefined
  title: string
  content: string
  folderId: string
}

const HomePage = () => {
  const [memoList, setMemoList] = useState<Array<MemoProps>>([])
  const displayFolder = useRecoilValue(displayFolderState)
  const [isModal, setIsModal] = useState<boolean>(false)

  useEffect(() => {
    // 메모리스트 불러오기
    const fetchMemo = async () => {
      try {
        const response: Array<MemoProps> = await apiCall.get(
          `/memo?folderId=${displayFolder}`
        )

        setMemoList(response)
      } catch (e) {
        console.log(e)
      }
    }

    fetchMemo()
  }, [displayFolder])

  // 모달창열기
  const handleModal = () => {
    setIsModal(!isModal)
  }

  const handleSaveMemo = (newMemo: MemoProps) => {
    // 추가된 메모가 현재 폴더의 메모인지 확인 후 추가
    if (newMemo.folderId === displayFolder) {
      setMemoList((prevMemoList) => [...prevMemoList, newMemo])
    }
  }

  return (
    <MemoContainer>
      <MemoTitleWrap>
        <h1>Memo List</h1>
        <Button onClick={handleModal}>추가</Button>
      </MemoTitleWrap>
      <MemoWrap>
        {memoList.map((memo) => (
          <MemoItem memo={memo} key={memo.id} />
        ))}
      </MemoWrap>

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
