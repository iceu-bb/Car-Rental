import React, { useCallback, useState, useContext, useMemo } from 'react';
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
import { useHistory } from 'react-router-dom';
import { Store } from '../../Store';

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
    pricePerDay,
    group,
    passengers,
    baggages,
    doors,
    transmission
  } = car;

  const { state, dispatch } = useContext(Store);
  const history = useHistory();
  const days = state.bookingInfo.days;

  const prices = useMemo(() => {
    const price = days * pricePerDay;
    return [price, 0.9 * price, 1.3 * price];
  }, [days]);

  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAccordionClick = (e: any, titleProps: any) => {
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

  const handleBookNowClick = (id: number) => {
    dispatch({ type: 'BOOKING_STEP_2', payload: { name, transmission } });
    dispatch({ type: 'SET_TOTAL_DAYS', payload: prices[id] });

    // if is is '2' , it means we have fullCoverage package. We change fullCoverage value and then set 'value' for each fullCoverage options to '1'
    if (id == 2) {
      dispatch({ type: 'SET_FULL_COVERAGE', payload: true });
      ['SCDW', 'WSP', 'TP'].forEach(el =>
        dispatch({
          type: 'SET_EXTRAS_ITEM_PRICE',
          payload: { name: el, value: 1 }
        })
      );
    }

    history.push('/booking/extras');
  };

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
                  onClick={handleAccordionClick}
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
                <span>ISK</span> {prices[0]}
              </p>
              <Button
                id={0}
                onClick={(e: any) => handleBookNowClick(e.target.id)}
                color='yellow'
              >
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
                <span>ISK</span> {prices[1]}
              </p>
              <Button
                id={1}
                onClick={(e: any) => handleBookNowClick(e.target.id)}
                color='yellow'
              >
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
                <span>ISK</span> {prices[2]}
              </p>
              <Button
                id={2}
                onClick={(e: any) => handleBookNowClick(e.target.id)}
                color='yellow'
              >
                Book Now
              </Button>
            </div>
          </Grid.Column>
        </Grid>
      </Card.Content>
    </Card>
  );
});
