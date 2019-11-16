import React, { useContext } from 'react';
import { VehiclesSelection } from './BookingSteps/VehiclesSelection';
import {
  Segment,
  Container,
  Menu,
  Grid,
  Select,
  Divider,
  Item
} from 'semantic-ui-react';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Extras } from './BookingSteps/Extras';
import { Store } from '../Store';
import moment from 'moment';

const currencyOptions = [
  { key: 'isk', value: 'isk', text: 'ISK' },
  { key: 'euro', value: 'euro', text: 'EUR' },
  { key: 'pound', value: 'pound', text: 'GBP' },
  { key: 'dollar', value: 'dollar', text: 'USD' }
];

// TODO: similar component to Our Fleet Page
export const BookingPage: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const { step } = match.params;
  const { state } = useContext(Store);

  if (!state.bookingInfo.startDay) {
    return null;
  }

  return (
    <Segment style={{ margin: 0 }}>
      <Container>
        <Menu pointing secondary style={{ borderBottom: 'none' }}>
          <Menu.Item
            name='Search'
            style={{ margin: 10, padding: '0 30px 10px 0', color: 'brown' }}
          />
          <Menu.Item
            name='Vehicle Selection'
            active={step === 'selection'}
            style={{ margin: 10, padding: '0 30px 10px 0' }}
          />
          <Menu.Item
            name='Accessories & Extras'
            active={step === 'extras'}
            style={{ margin: 10, padding: '0 30px 10px 0' }}
          />
          <Menu.Item
            name='Renter Details'
            style={{ margin: 10, padding: '0 30px 10px 0' }}
          />
          <Menu.Item
            name='Confirm Booking'
            style={{ margin: 10, padding: '0 30px 10px 0' }}
          />
        </Menu>
        <Grid>
          {/* Left Column */}
          <Grid.Column width={11}>
            <Route
              exact
              path='/booking/selection'
              component={VehiclesSelection}
            />
            <Route exact path='/booking/extras' component={Extras} />
          </Grid.Column>

          {/* Right Column */}
          <Grid.Column width={5}>
            <Segment
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Currency
              </div>
              <Select
                defaultValue={currencyOptions[0].key}
                options={currencyOptions}
                style={{ minWidth: '10px' }}
              />
            </Segment>
            <Segment>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Pickup / Return
              </p>
              <Divider />
              <Grid>
                {/* ROW 1 - Pickup */}
                <Grid.Row style={{ padding: '0 15px' }}>
                  <Item>
                    <Item.Header
                      style={{
                        margin: '10px 0',
                        fontSize: '.9rem',
                        color: '#777',
                        fontWeight: '300'
                      }}
                    >
                      Pickup
                    </Item.Header>
                    <Item.Description
                      style={{ fontWeight: 'bold', fontSize: '1rem' }}
                    >
                      Keflavik International Airport
                    </Item.Description>
                    <Item.Meta
                      style={{
                        margin: '5px 0 10px',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}
                    >
                      {moment(state.bookingInfo.startDay, 'DD-MM-YYYY').format(
                        'dddd, Do MMMM YYYY'
                      )}{' '}
                      @ {state.bookingInfo.startHour}
                    </Item.Meta>
                  </Item>
                </Grid.Row>
                {/* ROW 2 - Return */}
                <Grid.Row style={{ padding: '0 15px' }}>
                  <Item>
                    <Item.Header
                      style={{
                        margin: '10px 0',
                        fontSize: '.9rem',
                        color: '#777',
                        fontWeight: '300'
                      }}
                    >
                      Return
                    </Item.Header>
                    <Item.Description
                      style={{ fontWeight: 'bold', fontSize: '1rem' }}
                    >
                      Keflavik International Airport
                    </Item.Description>
                    <Item.Meta
                      style={{
                        margin: '5px 0 10px',
                        fontWeight: 'bold',
                        fontSize: '1rem'
                      }}
                    >
                      {moment(state.bookingInfo.returnDay, 'DD-MM-YYYY').format(
                        'dddd, Do MMMM YYYY'
                      )}{' '}
                      @ {state.bookingInfo.returnHour}
                    </Item.Meta>
                  </Item>
                </Grid.Row>

                {/* ROW 3 - Renter age */}
                <Grid.Row style={{ padding: '0 15px' }}>
                  <Item>
                    <Item.Header
                      style={{
                        margin: '10px 0 5px',
                        fontSize: '.9rem',
                        color: '#777',
                        fontWeight: '300'
                      }}
                    >
                      Renter Age
                    </Item.Header>
                    <Item.Description
                      style={{
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        marginBottom: 10
                      }}
                    >
                      {state.bookingInfo.renterAge}
                    </Item.Description>
                  </Item>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};
