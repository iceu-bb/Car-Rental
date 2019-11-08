import React from 'react';
import { useCarsQuery } from '../graphql/types';
import { Link } from 'react-router-dom';

export const Cars: React.FC = () => {
  const { data } = useCarsQuery();

  if (data === undefined || data.cars === undefined) {
    return null;
  }

  return (
    <div>
      <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link>
      <Link to='/my-account'>My Account</Link>
      <div>
        {data.cars.map((car: any): any => (
          <div key={car._id}>{car.name}</div>
        ))}
      </div>
    </div>
  );
};
