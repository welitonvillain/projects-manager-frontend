import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  width: 100%;
  padding: 24px;
  min-height: 100vh;
  background: #e3e3e3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  padding: 40px 20px;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0 5px 10px 0px rgba(0, 0, 0, 0.2);
  text-align: center;

  span {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 40px;
    pointer-events: none;
  }

  form {
    display: flex;
    flex-direction: column;

    div {
      width: 100%;
      margin-bottom: 8px;
      position: relative;

      /* Cor de fundo do autocomplete*/
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 30px #ddd inset;
      }

      /* Cor do texto do autocomplete */
      input:-webkit-autofill {
        -webkit-text-fill-color: #666 !important;
      }

      input {
        width: 100%;
        height: 44px;
        padding: 12px;
        margin-bottom: 8px;
        border: none;
        border-radius: 2px;
        font-family: 'Roboto';
        font-weight: bold;
        color: #666;
        background: #ddd;
        transition: 0.3s;

        &::placeholder {
          font-weight: bold;
          color: #aaa;
        }

        &:focus {
          border: 1px solid #292f4c;
        }
      }
    }

    button {
      margin: 32px 0;
      height: 44px;
      background: #292f4c;
      font-weight: bold;
      border: 0;
      border-radius: 2px;
      font-size: 16px;
      color: #fff;

      &:hover {
        background: ${darken(0.05, '#292F4C')};
      }
    }
  }
`;
