import React from 'react';
import { useRelatedCarsQuery } from '../../graphql/types';
import { CarsList } from './CarsList';

interface Props {
  carGroup: string;
  carId: string | null | undefined;
}

export const RelatedCars: React.FC<Props> = ({ carGroup, carId }) => {
  const { data, loading, error } = useRelatedCarsQuery({
    variables: { id: carId!, group: carGroup }
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (!data || !data.relatedCars || error) {
    return null;
  }

  const { relatedCars } = data;

  console.log(relatedCars);
  return <CarsList cars={relatedCars} filter='All' />;
};
