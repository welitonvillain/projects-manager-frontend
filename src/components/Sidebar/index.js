import React from 'react';
import { useDispatch } from 'react-redux';

import { FaTasks, FaDoorOpen } from 'react-icons/fa';
import { signOut } from '../../store/modules/auth/actions';

import { Wrapper, Content, Option } from './styles';

export default function Sidebar() {
  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Wrapper>
      <Content>
        <Option to="/activities" title="Atividades">
          <FaTasks size="32" />
        </Option>
      </Content>
      <Option className="logout" to="/" title="Sair" onClick={handleSignOut}>
        <FaDoorOpen size="32" />
      </Option>
    </Wrapper>
  );
}

/*

FaChartLine, FaUserCog

          <Option to="/">
            <FaChartLine size="32" />
          </Option>
          <Option to="/">
            <FaUserCog size="32" />
          </Option>
*/
