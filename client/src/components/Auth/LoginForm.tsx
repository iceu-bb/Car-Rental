import React, { useContext, FormEvent } from 'react';
import { Store } from '../../Store';
import { useLoginMutation } from '../../graphql/types';
import { RouteComponentProps } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface LoginFormProps extends RouteComponentProps<any> {}

export const LoginForm: React.FC<LoginFormProps> = ({ history }) => {
  const { dispatch } = useContext(Store);

  const [login] = useLoginMutation();

  const email = 'test@test.com';
  const password = 'test';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    try {
      let token;
      const { data } = await login({ variables: { email, password } });
      if (data) {
        token = data.login.token;
      }
      if (token) {
        window.localStorage.setItem('token', token);
        dispatch({ type: 'IS_AUTH', payload: true });
      }
      //when logged correctly move to protected page
      history.replace('/my-account');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <TextField name='email' label='email' margin='normal' />
      <TextField
        name='password'
        type='password'
        label='password'
        margin='normal'
      />
      <Button type='submit'>Login</Button>
    </form>
  );
};
