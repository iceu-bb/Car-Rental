import React, { useContext } from 'react';
import { Store } from '../Store';
import styled from 'styled-components';
import { Route, RouteComponentProps, Link } from 'react-router-dom';
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

const StyledMenuItem = styled(Menu.Item)`
  font-size: 1.3rem !important;
  margin: 20px !important;
  padding: 0 68px 12px 0 !important;
  font-weight: 300 !important;
  color: #fbbd08 !important;
  color: violet !important;
  border-bottom: 4px solid rgba(238, 130, 238, 0.5) !important;

  &:hover {
    cursor: pointer;
    border-bottom: 4px solid rgba(238, 130, 238, 0.8) !important;
  }

  &.active {
    color: rgba(251, 189, 8, 0.8) !important;
    border-bottom: 4px solid rgba(251, 189, 8, 0.86) !important;
    pointer-events: none;
  }

  &.disabled {
    border-bottom: 4px solid rgba(40, 40, 40, 0.2) !important;
  }
`;

// TODO: similar component to Our Fleet Page
export const BookingPage: React.FC<RouteComponentProps<any>> = ({
  match,
  history
}) => {
  const { stepName } = match.params;
  const { state } = useContext(Store);

  if (!state.bookingInfo.startDay) {
    return null;
  }

  const handleMenuItemClick = (param: string) => {
    param === 'search'
      ? history.replace('/')
      : history.replace(`/booking/${param}`);
  };

  return (
    <Segment style={{ margin: 0 }}>
      <Container>
        {/*Booking Menu*/}
        <Menu pointing secondary style={{ borderBottom: 'none' }}>
          <StyledMenuItem
            name='search'
            content='Search'
            onClick={() => handleMenuItemClick('search')}
          />
          <StyledMenuItem
            name='selection'
            content='Vehicle Selection'
            active={stepName === 'selection'}
            onClick={() => handleMenuItemClick('selection')}
          />
          <StyledMenuItem
            name='extras'
            content='Accessories & Extras'
            active={stepName === 'extras'}
            disabled={state.step < 3}
            onClick={() => handleMenuItemClick('extras')}
          />
          <StyledMenuItem
            name='details'
            content='Renter Details'
            active={stepName === 'details'}
            disabled={state.step < 4}
          />
          <StyledMenuItem
            name='confirm'
            content='Confirm Booking'
            disabled={true}
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
            {state.step > 2 && (
              <>
                <VehicleDetails />
                {state.step > 3 && <Discount />}
                <QuoteDetails
                  totalDays={state.totalDays}
                  totalExtras={state.totalExtras}
                  days={state.bookingInfo.days}
                  fullCoverage={state.bookingType === 'fullCover'}
                />
              </>
            )}
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
};
