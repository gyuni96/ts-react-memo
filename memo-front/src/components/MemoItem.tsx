import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

interface MemoProps {
  id: string | undefined
  title: string
  content: string
  folderId: string
}

interface MemoItemProps {
  memo: MemoProps
}

const MemoItem = ({ memo }: MemoItemProps) => {
  const navigate = useNavigate()
  const handleDetail = () => {
    navigate(`/page/${memo.id}`)
  }

  return (
    <Item onClick={handleDetail}>
      <h3>{memo.title}</h3>
      <p>{memo.content}</p>
    </Item>
  )
}

export default MemoItem

const Item = styled.li`
  margin-bottom: 0.6rem;
  border: 1px solid #333;
  width: 100%;
  height: 80px;
  padding: 0.6rem;
`
