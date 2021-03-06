import React, { useState, useEffect, useCallback, useContext } from 'react';
import { Segment, Select, Button } from 'semantic-ui-react';
import { CarsListBooking } from '../../components/Cars/CarsListBooking';

import { carTypes } from '../../helpers/constants';
import { useCarsQuery } from '../../graphql/types';
import { Store } from '../../Store';

interface Props {}

// TODO filter types
type PriceSortTypes = 'lowest' | 'highest';

const sortOptions = [
  { key: 'lowest', value: 'lowest', text: 'Lowest Price' },
  { key: 'highest', value: 'highest', text: 'Highest Price' }
];

export const VehiclesSelection: React.FC<Props> = () => {
  const { dispatch } = useContext(Store);
  const { data } = useCarsQuery();
  const [filter, setFilter] = useState<string>('All');
  const [priceSort, setPriceSort] = useState<PriceSortTypes>('lowest');

  useEffect(() => {
    // clear extras items price in case someone go back from further steps of booking
    dispatch({ type: 'CLEAR_EXTRAS' });
    // clear step
    dispatch({ type: 'SET_BOOKING_STEP', payload: 2 });
  }, []);

  const renderButtons = useCallback(
    () =>
      carTypes.map(type => (
        <Button
          key={type}
          size='small'
          onClick={() => setFilter(`${type}`)}
          style={{ margin: '0 5px 10px 0' }}
        >
          {type}
        </Button>
      )),
    []
  );

  const handleSortChange = useCallback((e, { value }) => {
    setPriceSort(value);
  }, []);

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
          onChange={handleSortChange}
          style={{ minWidth: '10px' }}
        />
      </Segment>
      <CarsListBooking cars={data.cars} filter={filter} priceSort={priceSort} />
    </>
  );
};
