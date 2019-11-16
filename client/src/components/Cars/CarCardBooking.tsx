import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Car } from '../../graphql/types';
import {
  Card,
  Image,
  Button,
  List,
  Accordion,
  Icon,
  Grid
} from 'semantic-ui-react';
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

export const CarCardBooking = React.memo<CarCardProps>(({ car }) => {
  const {
    name,
    producer,
    group,
    passengers,
    baggages,
    doors,
    transmission
  } = car;

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e: any, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

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
      <Card.Content>
        <Grid columns={2}>
          <Grid.Column style={{ width: '33.33%' }}>
            <Image
              src={`${process.env.PUBLIC_URL}/assets/${name}.png`}
              ui={false}
              alt={`${producer} ${name}`}
              style={{ width: '90%', objectFit: 'contain' }}
            />
          </Grid.Column>
          <Grid.Column style={{ width: '66.66%' }}>
            <Card.Meta
              style={{
                marginTop: '5px',
                marginBottom: '10px',
                fontSize: '.7rem',
                lineHeight: '12px'
              }}
            >
              Reservations are made by car category only. We cannot guarantee a
              specific car model.
            </Card.Meta>
            <Card.Header
              style={{ fontSize: '1.7rem' }}
            >{`${producer} ${name} | Group ${group}`}</Card.Header>
            <Card.Description
              style={{ margin: '15px 0 5px', fontSize: '1.3rem' }}
            >
              <StyledList as='ul'>{renderDescriptionList()}</StyledList>
              <Accordion style={{ fontSize: '.9rem' }}>
                <Accordion.Title
                  active={activeIndex === 0}
                  index={0}
                  onClick={handleClick}
                  style={{
                    borderBottom: '1px solid violet',
                    paddingBottom: 0,
                    display: 'inline-block',
                    color: 'violet'
                  }}
                  children={
                    activeIndex === -1 ? (
                      <p>
                        <Icon name='plus' />
                        More information about vehicle
                      </p>
                    ) : (
                      <p>
                        <Icon name='minus' />
                        Less information
                      </p>
                    )
                  }
                />
                <Accordion.Content active={activeIndex === 0}>
                  <List as='ul'>
                    <List.Item as='li' value='*'>
                      Bluetooth
                    </List.Item>
                    <List.Item as='li' value='*'>
                      ABS
                    </List.Item>
                  </List>
                </Accordion.Content>
              </Accordion>
            </Card.Description>{' '}
          </Grid.Column>
        </Grid>
      </Card.Content>

      {/* Payment Options */}
      <Card.Content extra>
        <Grid columns={3}>
          <Grid.Column
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <p>Pay at Location</p>
              <p>Our standard rate payable at one of our offices.</p>
            </div>
            <div style={{ marginTop: 15 }}>
              <p>
                <span>ISK</span> 10000
              </p>
              <Button as={Link} to='/booking/extras' color='yellow'>
                Book Now
              </Button>
            </div>
          </Grid.Column>

          <Grid.Column
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <p>Prepaid Rate</p>
              <p>Pre-pay and rent your car now with a 10% discount</p>
            </div>
            <div style={{ marginTop: 15 }}>
              <p>
                <span>ISK</span> 8000
              </p>
              <Button as={Link} to='/booking/extras' color='yellow'>
                Book Now
              </Button>
            </div>
          </Grid.Column>

          <Grid.Column
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <p>Coverage Package</p>
              <p>
                Save 40% on our extra protection by opting to our coverage
                package. This package includes CDW, SCDW, TP and WSP protection:
              </p>
            </div>

            <div style={{ marginTop: 15 }}>
              <p>
                <span>ISK</span> 15000
              </p>
              <Button as={Link} to='/booking/extras' color='yellow'>
                Book Now
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
});
