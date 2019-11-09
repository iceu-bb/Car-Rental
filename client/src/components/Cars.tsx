import React from 'react';
import { useCarsQuery } from '../graphql/types';

export const Cars: React.FC = () => {
  const { data } = useCarsQuery();

  if (data === undefined || data.cars === undefined) {
    return null;
  }

  return (
    <div>
      {data.cars.map((car: any): any => (
        <div key={car._id}>{car.name}</div>
      ))}
    </div>
  );
};
