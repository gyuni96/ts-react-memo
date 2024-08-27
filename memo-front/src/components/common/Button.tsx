import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'

interface ButtonProps {
  $variant?: 'primary' | 'basic' | 'danger'
  $disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}

const buttonStyles = {
  primary: {
    backgroundColor: '#007bff',
    color: '#fff',
    hoverBackgroundColor: '#0056b3',
    hoverColor: '#fff',
  },
  basic: {
    backgroundColor: '#6c757d',
    color: '#fff',
    hoverBackgroundColor: '#5a6268',
    hoverColor: '#fff',
  },
  danger: {
    backgroundColor: '#dc3545',
    color: '#fff',
    hoverBackgroundColor: '#bd2130',
    hoverColor: '#fff',
  },
}

const StyledButton = styled.button<ButtonProps>`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.6rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  ${({ $variant = 'basic' }) => css`
    background-color: ${buttonStyles[$variant].backgroundColor};
    color: ${buttonStyles[$variant].color};

    &:hover {
      background-color: ${buttonStyles[$variant].hoverBackgroundColor};
      color: ${buttonStyles[$variant].hoverColor};
    }
  `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      cursor: not-allowed;
      opacity: 0.6;
    `}
`

const Button: React.FC<ButtonProps> = ({
  $variant,
  $disabled,
  onClick,
  children,
}) => {
  return (
    <StyledButton $variant={$variant} $disabled={$disabled} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button
