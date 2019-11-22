import React, { useContext } from 'react';
import { Store } from '../Store';

import { RouteComponentProps } from 'react-router-dom';
import { Segment, Container, Icon, Divider } from 'semantic-ui-react';
import { PickupReturn } from '../components/Booking-Right-Column/PickupReturn';
import { VehicleDetails } from '../components/Booking-Right-Column/VehicleDetails';
import { QuoteDetails } from '../components/Booking-Right-Column/QuoteDetails';
import { useBookingQuery } from '../graphql/types';

export const BookingConfirmation: React.FC<RouteComponentProps<any>> = ({
  match
}) => {
  const { bookingNumber } = match.params;
  const { state } = useContext(Store);

  const queryEmail = state.renterInformation.email || state.currentUser.email;

  const { data, loading, error } = useBookingQuery({
    variables: {
      email: queryEmail,
      bookingNumber: state.bookingNumber
    }
  });

  // prevent for checking diffrent booking numbers
  if (bookingNumber != state.bookingNumber)
    return (
      <Container style={{ margin: 50 }}>
        <Segment>
          You have no access to see this booking reservation details. Please
          login to your account panel.
        </Segment>
      </Container>
    );

  if (!data || !data.booking || error || loading) {
    return null;
  }

  const {
    firstName,
    lastName,
    email,
    telephoneNumber,
    startDay,
    returnDay,
    startHour,
    returnHour,
    renterAge,
    days,
    totalDays,
    bookingType,
    extras
  } = data.booking;

  const totalExtrasFormatted = {} as { [key: string]: number };

  extras!.map((el: any) => {
    totalExtrasFormatted[el.name] = el.value;
  });

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
              <p>age {renterAge}</p>
              <p>email {email}</p>
              <p>telephoneNumber {telephoneNumber}</p>
            </div>
          </Segment>
          <Segment>
            <PickupReturn
              bookingInfo={{
                startDay,
                returnDay,
                startHour,
                returnHour,
                renterAge,
                days
              }}
            />

            <QuoteDetails
              totalDays={totalDays}
              totalExtras={totalExtrasFormatted}
              days={days}
              fullCoverage={bookingType === 'fullCover'}
            />
          </Segment>
          {/*or query a car and then BookingCarCard
             <VehicleDetails />
            */}
        </div>
      </Container>
    </Segment>
  );
};
