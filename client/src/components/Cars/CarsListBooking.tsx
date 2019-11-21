import React, { useCallback } from 'react';

import { Card } from 'semantic-ui-react';
import { Car } from '../../graphql/types';
import { CarCardBooking } from './CarCardBooking';

interface CarsListProps {
  cars: Car[];
  filter: string;
  priceSort: string;
}

export const CarsListBooking: React.FC<CarsListProps> = ({
  cars,
  filter,
  priceSort
}) => {
  const renderCarCard = useCallback(
    (car: Car) => <CarCardBooking key={car._id!} car={car} />,
    []
  );

  const renderCarList = useCallback(
    () =>
      cars
        .sort((x, y) =>
          priceSort === 'lowest'
            ? x.pricePerDay - y.pricePerDay
            : y.pricePerDay - x.pricePerDay
        )
        .filter(el => {
          return filter === 'All' ? el : el.type === filter;
        })
        .map(renderCarCard),
    [filter, priceSort, cars, renderCarCard]
  );

  return <Card.Group itemsPerRow='1'>{renderCarList()}</Card.Group>;
};
