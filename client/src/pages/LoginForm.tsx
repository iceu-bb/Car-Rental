import React, { useContext, FormEvent } from 'react';
import { Store } from '../Store';
import { useLoginMutation } from '../graphql/types';
import { Link, RouteComponentProps } from 'react-router-dom';

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment
} from 'semantic-ui-react';

interface LoginFormProps extends RouteComponentProps<any> {}

export const LoginForm: React.FC<LoginFormProps> = ({ history }) => {
  const { dispatch } = useContext(Store);

  const [login] = useLoginMutation();

  const email = 'test@test.com';
  const password = 'test12345A';

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
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
    <Grid
      textAlign='center'
      style={{ height: 'calc(100vh - 75px)' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='violet' textAlign='center'>
          {/*<Image src='/logo.png' alt='logo' />*/}
          Login to your account
        </Header>
        <Form size='large' onSubmit={e => handleLogin(e)}>
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
            <Button color='violet' fluid size='large'>
              Login
            </Button>
          </Segment>
        </Form>
        <Message>
          New to us? <Link to='/register'>Register account</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};
