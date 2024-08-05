import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from './Button'

interface ModalProps {
  setIsModal: (isModal: boolean) => void
  title: string
  children?: React.ReactNode
}

const Modal = ({ setIsModal, title, children }: ModalProps) => {
  const handleButtonClick = () => {
    setIsModal(false)
  }

  const handleSaveButtonClick = () => {
    console.log('save')
  }

  return (
    <ModalContainer>
      <ModalWrap>
        <ModalHeader>
          <h3>{title}</h3>
          <ModlaButtonWrap>
            <Button onClick={handleSaveButtonClick}>저장</Button>
            <Button onClick={handleButtonClick}>닫기</Button>
          </ModlaButtonWrap>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </ModalWrap>
    </ModalContainer>
  )
}

export default Modal

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`
const ModalWrap = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.6rem;
  width: 50%;
  height: 50%;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
`

const ModlaButtonWrap = styled.div`
  display: flex;
  gap: 0.6rem;
`

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 1rem;
`
