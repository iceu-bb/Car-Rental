import React, { useContext } from 'react';
import { GraphQLClient } from 'graphql-request';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Context from '../context';

interface Props {}

const GET_CARS = gql`
  {
    cars {
      _id
      name
      model
      year
      group
    }
  }
`;

const LOGIN = gql`
  mutation {
    login(email: "test@test.com", password: "test") {
      token
    }
  }
`;

const ME = `
  {
    me {
      name
      email
      role
      picture
      createdAt
    }
  }
`;

export const Cars: React.FC<Props> = () => {
  const { dispatch }: any = useContext(Context);
  const [login] = useMutation(LOGIN);
  const { data, error, loading } = useQuery(GET_CARS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  const handleLogin = async () => {
    try {
      const { data } = await login();
      const token = data.login.token;
      console.log(token);

      window.localStorage.setItem('token', token);

      const client = new GraphQLClient('http://localhost:8000/graphql', {
        headers: { authorization: token }
      });

      const { me } = await client.request(ME);
      console.log(me);
      dispatch({ type: 'LOGIN_USER', payload: me });
      dispatch({ type: 'IS_AUTH', payload: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin()}>login</button>
      <div>
        {data.cars.map((car: any): any => (
          <div key={car._id}>{car.name}</div>
        ))}
      </div>
    </div>
  );
};
