import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Car } from '../../graphql/types';
import { Card, Image, Button, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const StyledList = styled(List)`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.9rem;

  & li {
    display: flex;
    flex-basis: 50%;
    margin: 1px 0;

    & > i {
      padding-right: 20px;
    }
  }
`;

interface CarCardProps {
  car: Car;
}

export const CarCard = React.memo<CarCardProps>(({ car }) => {
  const {
    name,
    producer,
    group,
    passengers,
    baggages,
    doors,
    transmission
  } = car;

  const renderDescriptionList = useCallback(
    () => (
      <>
        <List.Item as='li' icon='users' content={`${passengers} passengers`} />
        <List.Item as='li' icon='suitcase' content={`${baggages} Large`} />
        <List.Item as='li' icon='nintendo switch' content={`${doors} Doors`} />
        <List.Item as='li' icon='setting' content={`${transmission}`} />
      </>
    ),
    [baggages, doors, passengers, transmission]
  );

  if (!car.name) {
    return null;
  }

  return (
    <Card>
      <Image
        src={`${process.env.PUBLIC_URL}/assets/${name}.png`}
        wrapped
        ui={false}
        alt={`${producer} ${name}`}
      />
      <Card.Content>
        <Card.Header>{`${producer} ${name} | Group ${group}`}</Card.Header>
        <Card.Meta
          style={{ marginTop: '5px', fontSize: '.7rem', lineHeight: '12px' }}
        >
          Reservations are made by car category only. We cannot guarantee a
          specific car model.
        </Card.Meta>
        <Card.Description style={{ margin: '15px 0 5px' }}>
          <StyledList as='ul'>{renderDescriptionList()}</StyledList>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button
          as={Link}
          to={`/vehicles/${name}-${transmission}`}
          color='violet'
        >
          More Details
        </Button>
      </Card.Content>
    </Card>
  );
});
