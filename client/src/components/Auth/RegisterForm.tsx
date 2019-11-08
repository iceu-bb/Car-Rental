import React, { FormEvent } from 'react';
import { useRegisterMutation } from '../../graphql/types';
import { RouteComponentProps } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

interface RegisterFormProps extends RouteComponentProps<any> {}

export const RegisterForm: React.FC<RegisterFormProps> = ({ history }) => {
  const [register] = useRegisterMutation();

  const random = Math.floor(Math.random() * 500) + 1;
  const name = `test${random}`;
  const email = `test${random}@test.com`;
  const password = 'test';
  const passwordConfirm = 'test';

  const handleRegisterAccount = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    try {
      let newAccountEmail;
      const { data } = await register({
        variables: { name, email, password, passwordConfirm }
      });

      if (data && data.register) {
        newAccountEmail = data.register.email;
      }
      if (newAccountEmail) {
        console.log(
          `Account created for ${email}, now you can log into your account `
        );
      }
      //when logged correctly move to protected page
      setTimeout(() => history.replace('/login'), 1000);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={e => handleRegisterAccount(e)}>
      <TextField name='name' label='name' margin='normal' />
      <TextField name='email' label='email' margin='normal' />
      <TextField
        name='password'
        type='password'
        label='password'
        margin='normal'
      />
      <TextField
        name='confirm password'
        type='password'
        label='confirm password'
        margin='normal'
      />
      <Button type='submit'>Register</Button>
    </form>
  );
};
