import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '../../store/modules/auth/actions';

import { Wrapper, Content } from './styles';

export default function Login() {
  const dispatch = useDispatch();

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Wrapper>
        <Content>
          <span>Angeloni</span>
          <Form onSubmit={handleSubmit}>
            <div key="">
              <Input
                name="email"
                type="email"
                placeholder="Email"
                spellCheck="false"
              />
            </div>
            <div>
              <Input name="password" type="password" placeholder="Password" />
            </div>

            <button type="submit">LOGIN</button>
          </Form>
        </Content>
      </Wrapper>
    </>
  );
}
