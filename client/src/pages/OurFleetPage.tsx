import React, { useState, useCallback } from 'react';
import { useCarsQuery } from '../graphql/types';
import { CarsList } from '../components/Cars/CarsList';
import { carTypes } from '../helpers/constants';
import { Container, Header, Segment, Button } from 'semantic-ui-react';

export const OurFleetPage: React.FC = () => {
  const { data } = useCarsQuery();

  const [filter, setFilter] = useState<string>('All');

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

  if (data === undefined || data.cars === undefined) {
    return null;
  }

  return (
    <Container style={{ padding: '50px 30px' }}>
      <Segment style={{ marginBottom: 50 }}>
        <Header as='h2'>
          <Header.Content>
            Our Vehicles
            <Header.Subheader>Manage your preferences</Header.Subheader>
          </Header.Content>
        </Header>

        {renderButtons()}
      </Segment>

      <CarsList cars={data.cars} filter={filter} />
    </Container>
  );
};
