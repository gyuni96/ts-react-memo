import React from 'react'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  a{
      text-decoration: none;
      color: inherit;
  }
  *{
      box-sizing: border-box;
      font-size: 14px;
      margin: 0;
      padding: 0;
  }
  body{
      font-family: 'Noto Sans KR', sans-serif;
      background-color: #f8f9fa;
  }
  input, textarea { 
    -moz-user-select: auto;
    -webkit-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
  }
  input:focus {
    outline: none;
  }

  button {
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
  }

  ul , ol , li , dl , dt , dd {
    list-style: none;
  }
`

export default GlobalStyle
