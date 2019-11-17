import React, { useContext } from 'react';
import { Segment, Divider } from 'semantic-ui-react';
import { Store } from '../../Store';
import { useCarQuery } from '../../graphql/types';
import { CarCard } from '../Cars/CarCard';

interface Props {}

export const VehicleDetails: React.FC<Props> = () => {
  const { state } = useContext(Store);
  const { name, transmission } = state.bookingCar;

  const { data, error } = useCarQuery({
    variables: { name, transmission }
  });

  if (data === undefined || data.car === undefined || error) {
    return null;
  }
  const car = data.car;

  return (
    <Segment>
      <div
        style={{
          fontWeight: 'bold',
          fontSize: '1.1rem'
        }}
      >
        Vehicle Details
      </div>
      <Divider />
      <CarCard car={car} />
    </Segment>
  );
};
