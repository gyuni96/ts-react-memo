import { useEffect, useState } from 'react'
import apiCall from '../../api/api'
import { useParams } from 'react-router-dom'

interface MemoProps {
  id: string | undefined
  title: string
  content: string
  folderId: string
}

const DetailPage = () => {
  const [memo, setMemo] = useState<MemoProps>()
  const pageParams = useParams()

  useEffect(() => {
    const memoDetailFetch = async () => {
      const res: Array<MemoProps> = await apiCall.get(
        `/memo?id=${pageParams.id}`
      )

      setMemo(res[0])
    }

    memoDetailFetch()
  }, [])

  return (
    <div>
      <h1>메모 상세</h1>
      <h2>{memo?.title}</h2>
      <p>{memo?.content}</p>
    </div>
  )
}

export default DetailPage
