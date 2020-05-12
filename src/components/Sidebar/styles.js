import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 80px;
  padding: 80px 0;
  background: #292f4c;
  position: fixed;

  .logout {
    &:hover {
      background: ${lighten(0.05, '#292f4c')};
      border-left: 3px solid #e13c47;
    }
  }
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Option = styled(Link)`
  display: flex;
  height: 80px;
  width: 100%;
  margin-bottom: 4px;
  padding: 16px;
  background: ${lighten(0.02, '#292f4c')};
  text-align: center;
  text-decoration: none;
  justify-content: center;

  transition: 0.3s ease;

  svg {
    color: #fff;
    margin: 8px;
  }

  &:hover {
    background: ${lighten(0.05, '#292f4c')};
    border-left: 3px solid #5b91cc;
  }
`;
