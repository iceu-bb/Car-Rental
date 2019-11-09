import React, { FormEvent } from 'react';
import { useRegisterMutation } from '../graphql/types';
import { Link, RouteComponentProps } from 'react-router-dom';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

interface RegisterFormProps extends RouteComponentProps<any> {}

export const RegisterForm: React.FC<RegisterFormProps> = ({ history }) => {
  const [register] = useRegisterMutation();

  const random = Math.floor(Math.random() * 500) + 1;
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
        variables: { email, password, passwordConfirm }
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
    <Grid
      textAlign='center'
      style={{ height: 'calc(100vh - 75px)' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='violet' textAlign='center'>
          {/*<Image src='/logo.png' alt='logo' />*/}
          Register account
        </Header>
        <Form size='large' onSubmit={e => handleRegisterAccount(e)}>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              name='email'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Confirm password'
              type='password'
              name='passwordConfirm'
            />
            <Button color='violet' fluid size='large'>
              Register
            </Button>
          </Segment>
        </Form>
        <Message>
          Already have account? <Link to='/login'>Login</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

/*
 <form onSubmit={e => handleRegisterAccount(e)}>
      <input name='name' />
      <input name='email' />
      <input name='password' type='password' />
      <input name='confirm password' type='password' />
      <button type='submit'>Register</button>
    </form> */
