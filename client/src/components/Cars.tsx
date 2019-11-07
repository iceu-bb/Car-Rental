import React, { useContext } from 'react';
import { Store } from '../Store';
import { useCarsQuery, useLoginMutation } from '../graphql/types';
import { Link } from 'react-router-dom';

export const Cars: React.FC = () => {
  const { dispatch } = useContext(Store);

  const [login] = useLoginMutation();
  const { data } = useCarsQuery();

  if (data === undefined || data.cars === undefined) {
    return null;
  }

  const email = 'test@test.com';
  const password = 'test';

  const handleLogin = async () => {
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
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin()}>login</button>
      <Link to='/protected'>Protected</Link>
      <div>
        {data.cars.map((car: any): any => (
          <div key={car._id}>{car.name}</div>
        ))}
      </div>
    </div>
  );
};
