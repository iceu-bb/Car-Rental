import React, { useContext } from 'react';
import { Store } from '../Store';
import { Route, RouteComponentProps } from 'react-router-dom';
import { Segment, Container, Menu, Grid } from 'semantic-ui-react';

// Left Column
import { VehiclesSelection } from './BookingSteps/VehiclesSelection';
import { Extras } from './BookingSteps/Extras';
import { RenterDetails } from './BookingSteps/Details';

// Right Column
import { Currency } from '../components/Booking-Right-Column/Currency';
import { PickupReturn } from '../components/Booking-Right-Column/PickupReturn';
import { VehicleDetails } from '../components/Booking-Right-Column/VehicleDetails';
import { QuoteDetails } from '../components/Booking-Right-Column/QuoteDetails';
import { Discount } from '../components/Booking-Right-Column/Discount';

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
            name='search'
            content='Search'
            style={{ margin: 10, padding: '0 30px 10px 0', color: 'brown' }}
          />
          <Menu.Item
            name='selection'
            content='Vehicle Selection'
            active={step === 'selection'}
            style={{ margin: 10, padding: '0 30px 10px 0' }}
          />
          <Menu.Item
            name='extras'
            content='Accessories & Extras'
            active={step === 'extras'}
            style={{ margin: 10, padding: '0 30px 10px 0' }}
          />
          <Menu.Item
            name='details'
            content='Renter Details'
            active={step === 'details'}
            style={{ margin: 10, padding: '0 30px 10px 0' }}
          />
          <Menu.Item
            name='confirm'
            content='Confirm Booking'
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
            <Route exact path='/booking/details' component={RenterDetails} />
          </Grid.Column>

          {/* Right Column */}
          <Grid.Column width={5}>
            <Currency />
            <PickupReturn bookingInfo={state.bookingInfo} />
            {state.step > 1 && (
              <>
                <VehicleDetails />
                <QuoteDetails
                  totalDays={state.totalDays}
                  totalExtras={state.totalExtras}
                  days={state.bookingInfo.days}
                  fullCoverage={state.fullCoverage}
                />
              </>
            )}
            {state.step > 2 && <Discount />}
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};
