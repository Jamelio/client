import React from 'react';
import { Viewport } from './Viewport/Viewport';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: black;
    padding: 10px;
    margin: 0;
  }

  video {
    background: rgba(0, 0, 0, 0.2);
    margin: 5px;
    width: 300px;
    display: block;
  }
`

export default function App() {
  return <>
    <GlobalStyle />
    <Viewport />
  </>
}