import React, { useContext } from 'react';
import { Store } from '../Store';

import { Link, RouteComponentProps } from 'react-router-dom';
import { Segment, Container, Icon, Divider, Grid } from 'semantic-ui-react';
import { PickupReturn } from '../components/Booking-Right-Column/PickupReturn';
import { VehicleDetails } from '../components/Booking-Right-Column/VehicleDetails';
import { QuoteDetails } from '../components/Booking-Right-Column/QuoteDetails';

// show only if booking step = 5

export const BookingConfirmation: React.FC<RouteComponentProps<any>> = ({
  history,
  match
}) => {
  const { bookingNumber } = match.params;
  const { state } = useContext(Store);

  // prevent for diffrent booking numbers checking
  if (bookingNumber != state.bookingNumber)
    return (
      <Container style={{ margin: 50 }}>
        <Segment>
          Please Login to your account to see this Booking Confirmation
        </Segment>
      </Container>
    );

  const {
    firstName,
    lastName,
    email,
    telephoneNumber
  } = state.renterInformation;

  return (
    <Segment style={{ margin: 0, backgroundColor: '#baba' }}>
      <Container>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <Segment>
            <div style={{ backgroundColor: 'yellow' }}>
              <Icon name='check circle outline' size='big' />
              Booking Confirmed!
            </div>
            <div>
              Your vehicle has been booked successfully and you will receive an
              email shortly
            </div>
            <div
              style={{
                backgroundColor: 'green',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              Confirmation Number <p># {bookingNumber}</p>
            </div>
          </Segment>

          <Segment style={{ margin: 0, padding: 0 }}>
            <div>Renter Information</div>
            <Divider />
            <div>
              <p>First Name {firstName}</p>
              <p>last Name {lastName}</p>
              <p>age {state.bookingInfo.renterAge}</p>
              <p>email {email}</p>
              <p>telephoneNumber {telephoneNumber}</p>
            </div>
          </Segment>

          <Segment>
            <PickupReturn bookingInfo={state.bookingInfo} />
            <QuoteDetails
              totalDays={state.totalDays}
              totalExtras={state.totalExtras}
              days={state.bookingInfo.days}
              fullCoverage={state.bookingType === 'fullCover'}
            />
          </Segment>

          {/*or query a car and then BookingCarCard */}
          <VehicleDetails />
        </div>
      </Container>
    </Segment>
  );
};
