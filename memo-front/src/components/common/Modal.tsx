import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from './Button'

interface ModalProps {
  setIsModal: (isModal: boolean) => void
  title: string
  addEvent?: () => void
  children?: React.ReactNode
}

const Modal = ({ setIsModal, title, addEvent, children }: ModalProps) => {
  const handleButtonClick = () => {
    setIsModal(false)
  }

  return (
    <ModalContainer>
      <ModalWrap>
        <ModalHeader>
          <h3>{title}</h3>
          <ModalButtonWrap>
            {addEvent && (
              <Button $variant="primary" onClick={addEvent}>
                저장
              </Button>
            )}
            <Button onClick={handleButtonClick}>닫기</Button>
          </ModalButtonWrap>
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
  width: 65%;
  height: 50%;
  overflow-y: auto;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  flex-shrink: 0; /* ModalHeader의 높이를 고정 */
`

const ModalButtonWrap = styled.div`
  display: flex;
  gap: 0.6rem;
`

const ModalContent = styled.div`
  flex-grow: 1; /* 남은 공간을 ModalContent가 차지하도록 설정 */
  padding: 0.5rem;
  gap: 1rem;
  overflow-y: auto; /* ModalContent에서 스크롤이 생기도록 설정 */
  height: calc(
    100% - 2rem - 0.5rem - 1rem
  ); /* ModalHeader의 높이(패딩 포함)를 빼고 남은 공간을 차지하도록 설정 */
`
