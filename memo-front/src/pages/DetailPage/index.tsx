import { useEffect, useState } from 'react'
import apiCall from '../../api/api'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/common/Button'

interface MemoProps {
  id: string | undefined
  title: string
  content: string
  folderId: string
}

const DetailPage = () => {
  const [memo, setMemo] = useState<MemoProps>()
  const { id } = useParams()
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

  return (
    <div>
      <h1>메모 상세</h1>
      <div>
        <Button onClick={() => navigate('/')}>목록</Button>
        <Button onClick={handleDelete}>삭제</Button>
      </div>
      <h2>{memo?.title}</h2>
      <p>{memo?.content}</p>
    </div>
  )
}

export default DetailPage
