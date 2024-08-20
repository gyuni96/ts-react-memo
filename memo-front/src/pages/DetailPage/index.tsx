import { useEffect, useRef, useState } from 'react'
import apiCall from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import styled from 'styled-components'

interface MemoProps {
  id: string | undefined
  title: string | undefined
  content: string | undefined
  folderId: string | undefined
}

const DetailPage = () => {
  const [memo, setMemo] = useState<MemoProps>()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const { id } = useParams()
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const memoDetailFetch = async () => {
      const res: Array<MemoProps> = await apiCall.get(`/memo?id=${id}`)

      setMemo(res[0])
    }

    memoDetailFetch()
  }, [])

  const handleDelete = async () => {
    console.log(id)
    try {
      const deleteFlag = confirm('삭제하시겠습니까?')
      if (deleteFlag) {
        await apiCall.delete(`/memo/${id}`)
        alert('삭제되었습니다.')

        navigate('/')
      }
    } catch (e) {
      console.log(e)
    }
  }

  const handleEdit = () => {
    setIsReadOnly(!isReadOnly)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData: FormData = new FormData(e.currentTarget)

    const title: string = formData.get('title')?.toString() || ''
    const content: string = formData.get('content')?.toString() || ''

    const data: MemoProps = {
      id,
      title,
      content,
      folderId: memo?.folderId || '',
    }
    try {
      const res = await apiCall.put(`/memo/${id}`, JSON.stringify(data))

      if (res) {
        alert('수정되었습니다.')
        setIsReadOnly(true)

        navigate('/')
      }
    } catch (e) {
      console.log(e)
      alert('수정에 실패했습니다.')
    }
  }

  const handleAddEvent = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }

  return (
    <DetailContainer>
      <DetailTitleWrap>
        <h1>{memo?.title}</h1>
        <ButtonWrap>
          <Button onClick={() => navigate('/')}>목록</Button>
          {isReadOnly ? (
            <Button onClick={handleEdit}>수정</Button>
          ) : (
            <Button onClick={handleAddEvent}>저장</Button>
          )}

          <Button onClick={handleDelete}>삭제</Button>
        </ButtonWrap>
      </DetailTitleWrap>
      <FormWrap ref={formRef} onSubmit={handleSubmit}>
        <FieldsetWrap disabled={isReadOnly}>
          <DetailInput type="text" defaultValue={memo?.title} name="title" />
          <DetailTextArea defaultValue={memo?.content} name="content" />
        </FieldsetWrap>
      </FormWrap>
    </DetailContainer>
  )
}

export default DetailPage

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  height: 100%;
`

const DetailTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`
const ButtonWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`

const FormWrap = styled.form`
  height: 100%;
`

const FieldsetWrap = styled.fieldset`
  border: none;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const DetailInput = styled.input`
  margin-bottom: 0.6rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  width: 100%;
  padding: 0.6rem;
  border-radius: 5px;
`

const DetailTextArea = styled.textarea`
  margin-bottom: 0.6rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-radius: 5px;
  resize: none;
  &:active,
  &:focus {
    outline: none;
  }
`
