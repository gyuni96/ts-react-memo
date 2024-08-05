import React from 'react'
import styled from 'styled-components'

interface MemoProps {
  id: number
  title: string
  content: string
  folderId: number
}

interface MemoItemProps {
  memo: MemoProps
}

const MemoItem = ({ memo }: MemoItemProps) => {
  return (
    <Item>
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
  padding: 0.6rem;
`
