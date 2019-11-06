import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

export const Cars: React.FC<Props> = () => {
  const { data, error, loading } = useQuery(GET_CARS);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <div>
      {data.cars.map((car: any): any => (
        <div key={car._id}>{car.name}</div>
      ))}
    </div>
  );
};
