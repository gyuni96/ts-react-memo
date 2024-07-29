import React, { useEffect } from 'react'
import styled from 'styled-components'

interface ButtonProps {
  theme?: String
  onClick?: () => void
  children?: React.ReactNode
}

const Button = ({ theme, onClick, children }: ButtonProps) => {
  useEffect(() => {
    theme === '' && 'primary'
  }, [])

  return (
    <StyledButton theme={theme} onClick={onClick}>
      {children}
    </StyledButton>
  )
}

export default Button

const buttonTheme = {
  primary: {
    backgroundColor: '#fff',
    color: '#000',

    hoverBackgroundColor: 'red', //'rgba(0, 0, 0, 0.2)',
    hoverColor: '#fff',
  },
  secondary: {
    backgroundColor: '#000',
    color: '#fff',
  },
}

const StyledButton = styled.button<{ theme: String }>`
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0.6rem;
  padding: 0.5rem 1rem;

  background-color: ${() => buttonTheme.primary.backgroundColor};
  color: ${() => buttonTheme.primary.color};

  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: ${() => buttonTheme.primary.hoverBackgroundColor};
    color: ${() => buttonTheme.primary.hoverColor};
  }
`
