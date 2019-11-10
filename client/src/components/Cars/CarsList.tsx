import React, { useCallback } from 'react';

import { Card } from 'semantic-ui-react';
import { Car } from '../../graphql/types';
import { CarCard } from './CarCard';

interface CarsListProps {
  cars: Car[];
  filter: string;
}

export const CarsList: React.FC<CarsListProps> = ({ cars, filter }) => {
  const renderCarCard = useCallback(
    (car: Car) => <CarCard key={car._id!} car={car} />,
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

  return (
    <Card.Group stackable itemsPerRow='3' centered>
      {renderCarList()}
    </Card.Group>
  );
};
