import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    padding: 10px;
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
