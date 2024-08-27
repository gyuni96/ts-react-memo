import { useCallback, useRef, useState } from 'react'
import apiCall from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'
import styled from 'styled-components'
import useAxiosFetch from '../../hooks/useAxiosFetch'
import { MemoProps } from '../../types/type'

const DetailPage = () => {
  const { id } = useParams()
  const [isReadOnly, setIsReadOnly] = useState(true)
  const { data } = useAxiosFetch(`/memo?id=${id}`)
  const formRef = useRef<HTMLFormElement>(null)
  const navigate = useNavigate()

  const handleDelete = async () => {
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

    const saveData: MemoProps = {
      id,
      title,
      content,
      folderId: data[0]?.folderId || '',
    }
    try {
      const res = await apiCall.put(`/memo/${id}`, JSON.stringify(saveData))

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

  const handleAddEvent = useCallback(() => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event('submit', { bubbles: true, cancelable: true })
      )
    }
  }, [formRef])

  return (
    <DetailContainer>
      <DetailTitleWrap>
        <h1>{data[0]?.title}</h1>
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
          <DetailInput type="text" defaultValue={data[0]?.title} name="title" />
          <DetailTextArea defaultValue={data[0]?.content} name="content" />
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
