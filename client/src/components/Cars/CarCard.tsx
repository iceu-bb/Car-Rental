import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Car } from '../../graphql/types';
import { Card, Image, Button, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { smallIcons } from '../../helpers/constants';

const StyledList = styled(List)`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 0.9rem;

  & li {
    display: flex;
    flex-basis: 50%;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 300;

    &:nth-child(1) {
      margin-bottom: 7px;
    }
    &:nth-child(2) {
      margin-bottom: 7px;
    }
  }

  & li > img {
    width: 20px;
    margin-right: 10px;
  }
`;

interface IndexedCar extends Car {
  [index: string]: any;
}

interface CarCardProps {
  car: IndexedCar;
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

  const renderDescriptionList = useCallback(() => {
    return smallIcons.map(icon =>
      car[icon.name] !== 'Manual' ? (
        <List.Item key={icon.id} as='li'>
          <Image
            src={`${process.env.PUBLIC_URL}/assets/icons/icon-sm-${icon.name}.png`}
            alt={`${icon.name} image`}
          />
          {car[icon.name]} {icon.text}
        </List.Item>
      ) : (
        <List.Item key={icon.id} as='li'>
          <Image
            src={`${process.env.PUBLIC_URL}/assets/icons/icon-sm-manual.png`}
            alt='manual image'
          />
          Manual
        </List.Item>
      )
    );
  }, [baggages, doors, passengers, transmission]);

  if (!car.name) {
    return null;
  }

  return (
    <Card>
      <Image
        style={{ backgroundColor: '#fff', padding: '0 2%', margin: '0 auto' }}
        src={`${process.env.PUBLIC_URL}/assets/${name}.png`}
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
          fluid
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
