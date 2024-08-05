import { useEffect, useState } from 'react'
import apiCall from '../../api/api'
import { useRecoilValue } from 'recoil'
import { displayFolderState } from '../../reducers/state'
import styled from 'styled-components'
import Button from '../../components/common/Button'
import MemoItem from '../../components/MemoItem'
import Modal from '../../components/common/Modal'

interface MemoProps {
  id: number
  title: string
  content: string
  folderId: number
}

const HomePage = () => {
  const [memoList, setMemoList] = useState<Array<MemoProps>>([])
  const displayFolder = useRecoilValue(displayFolderState)
  const [isModal, setIsModal] = useState<boolean>(false)

  useEffect(() => {
    const fetchMemo = async () => {
      try {
        const response: Array<MemoProps> = await apiCall.get(
          '/memo?folderId=' + displayFolder
        )

        setMemoList(response)
      } catch (e) {
        console.log(e)
      }
    }

    fetchMemo()
  }, [displayFolder])

  const handleModal = () => {
    setIsModal(!isModal)
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
        <Modal setIsModal={setIsModal} title={'메모 추가'}>
          <label htmlFor="">상위디렉토리</label>
          <select>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <label htmlFor="">제목</label>
          <input type="text" />
          <label htmlFor="">상세 내용</label>
          <input type="text" />
        </Modal>
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
