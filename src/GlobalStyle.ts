import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    font-family: sans-serif;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: #fff;
    padding: 0;
    margin: 0;
    touch-action: pan-x pan-y;
  }

  video {
    background: rgba(0, 0, 0, 0.2);
    margin: 5px;
    width: 300px;
    display: block;
  }
`
