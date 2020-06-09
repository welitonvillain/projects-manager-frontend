import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  padding: 24px 24px 0 24px;
  margin-left: 80px;
`;

export const Header = styled.div`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  height: 56px;
  width: 100%;
  padding: 10px 8px 8px 8px;
  background: #f2f2f2;
  justify-content: space-between;
  border-bottom: 1px solid #999;

  .add-projects {
    width: 324px;
    height: 100%;
    display: flex;
    justify-content: space-between;

    button {
      height: 36px;
      width: 40px;
      padding: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      border-radius: 2px;
      background: #292f4c;
      transition: background 0.3s;

      cursor: pointer;

      svg {
        font-size: 20px;
        color: #fff;
      }

      &:hover {
        background: #5b91cc;
      }
    }
  }
`;

export const Title = styled.div`
  span {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Weeks = styled.div`
  height: 40px;
  width: 100%;
  padding: 7px;
  margin: 16px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    display: flex;
    width: 32px;
    justify-content: center;
    align-items: center;
    background: none;
    border: 0;

    &:disabled {
      opacity: 50%;
    }

    svg {
      color: #292f4c;
      font-size: 20px;

      &:hover {
        color: #5b91cc;
        font-size: 24px;
      }
    }
  }

  strong {
    color: #333;
    font-weight: bold;
    font-size: 20px;
    margin: 0 16px;
  }
`;

export const Activities = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 16px;
  background: none;
`;

export const Days = styled.div`
  width: 100%;
  margin-bottom: 24px;
  background: none;

  .day {
    height: 24px;
    width: 100%;
    margin-bottom: 12px;
    border-bottom: 1px solid #ddd;

    span {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }

  .addActivity {
    height: 48px;
    width: 100%;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      height: 40px;
      width: 128px;
      border: none;
      border-radius: 2px;
      background: #292f4c;

      font-weight: bold;
      letter-spacing: 1px;
      color: #fff;

      transition: background 0.3s;

      &:hover {
        background: #5b91cc;
      }
    }
  }
`;

export const Add = styled.div`
  position: sticky;
  top: 56px;
  z-index: 1;
  display: flex;
  height: 52px;
  width: 100%;
  padding: 8px;
  background: #f2f2f2;
  justify-content: space-between;
  align-items: center;

  .add-activities {
    height: 100%;
    display: flex;

    button {
      height: 100%;
      width: 40px;
      padding: 2px;
      display: flex;
      justify-content: center;
      border: 0;
      border-radius: 2px;
      background: #292f4c;
      transition: background 0.3s;

      cursor: pointer;

      svg {
        font-size: 20px;
        color: #fff;
      }

      &:hover {
        background: #5b91cc;
      }
    }

    .submit-button {
      height: 100%;
      width: 120px;
      margin-left: 24px;
      background: #292f4c;
      border: 0;
      border-radius: 2px;
      font-weight: bold;
      color: #fff;
      text-align: center;
      transition: background 0.3s;

      &:hover {
        background: #6ea469;
      }
    }
  }
`;

export const ActivityTable = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  padding: 24px 40px 0 40px;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Table = styled.table`
  width: 100%;
  margin-bottom: 10px;
  td {
    height: 40px;
    text-align: center;

    .div-description {
      height: 100%;

      input {
        height: 100%;
        width: 100%;
        border: 0;
        border-radius: 2px;
        padding: 8px;
        background: ${darken(0.01, '#ddd')};
        color: #666;

        &::placeholder {
          color: #aaa;
        }
      }
    }

    .div-delete {
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;

      button {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 2px;
        font-weight: bold;
        font-size: 12px;
        background: none;
        color: #ddd;
        transition: background 0.3s;

        &:hover {
          background: ${lighten(0.1, '#E13C47')};
          color: #fff;
        }
      }
    }
  }

  #class,
  #act {
    width: 15%;
  }

  #init,
  #end {
    width: 7.5%;
  }

  #delete {
    width: 2.5%;
  }
`;
