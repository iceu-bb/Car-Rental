import React, { useCallback } from 'react';

import { Card } from 'semantic-ui-react';
import { Car } from '../../graphql/types';
import { CarCardBooking } from './CarCardBooking';

interface CarsListProps {
  cars: Car[];
  filter: string;
}

export const CarsListBooking: React.FC<CarsListProps> = ({ cars, filter }) => {
  const renderCarCard = useCallback(
    (car: Car) => <CarCardBooking key={car._id!} car={car} />,
    []
  );

  const renderCarList = useCallback(
    () =>
      cars
        .filter(el => {
          return filter === 'All' ? el : el.type === filter;
        })
        .map(renderCarCard),
    [filter, cars, renderCarCard]
  );

  return <Card.Group itemsPerRow='1'>{renderCarList()}</Card.Group>;
};
