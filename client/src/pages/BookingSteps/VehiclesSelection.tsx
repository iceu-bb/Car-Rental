import React, { useState, useCallback } from 'react';
import { Segment, Select, Button } from 'semantic-ui-react';
import { CarsListBooking } from '../../components/Cars/CarsListBooking';

import { carTypes } from '../../helpers/constants';
import { useCarsQuery } from '../../graphql/types';

interface Props {}

const sortOptions = [
  { key: 'lowest', value: 'lowest', text: 'Lowest Price' },
  { key: 'highest', value: 'highest', text: 'Highest Price' }
];

export const VehiclesSelection: React.FC<Props> = () => {
  const { data } = useCarsQuery();
  const [filter, setFilter] = useState<string>('All');

  const renderButtons = useCallback(
    () =>
      carTypes.map(type => (
        <Button key={type} size='small' onClick={() => setFilter(`${type}`)}>
          {type}
        </Button>
      )),
    []
  );

  if (data === undefined || data.cars === undefined) {
    return null;
  }

  return (
    <>
      <Segment style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div> {renderButtons()}</div>
        <Select
          defaultValue={sortOptions[0].key}
          options={sortOptions}
          style={{ minWidth: '10px' }}
        />
      </Segment>
      <CarsListBooking cars={data.cars} filter={filter} />
    </>
  );
};
