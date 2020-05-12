import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root {
    display: flex;
    max-height: 100%;
    min-width: 100%;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    background: #f2f2f2;
  }

  button {
    cursor: pointer;
  }
`;
