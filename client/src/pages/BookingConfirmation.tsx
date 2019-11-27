import React, { useContext } from 'react';
import { Store } from '../Store';
import moment from 'moment';

import { RouteComponentProps } from 'react-router-dom';
import { Segment, Container, Icon, Divider, Button } from 'semantic-ui-react';
import { PickupReturn } from '../components/Booking-Right-Column/PickupReturn';
import { VehicleDetails } from '../components/Booking-Right-Column/VehicleDetails';
import { QuoteDetails } from '../components/Booking-Right-Column/QuoteDetails';
import { useBookingQuery, useCancelBookingMutation } from '../graphql/types';

import UserBookings from '../graphql/queries/userBookings.query';

export const BookingConfirmation: React.FC<RouteComponentProps<any>> = ({
  match,
  history
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

  const [cancelBooking] = useCancelBookingMutation();

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
    _id,
    status,
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

  // we can cancel booking if is not eariler than 24h to booking, and if was not cancelled before
  const isCancellable =
    Number(
      moment()
        .add(1, 'days')
        .format('X')
    ) <
      Number(moment(startDay, 'DD-MM-YYYY').format('X')) +
        Number(moment.duration(startHour).asSeconds()) && status === 'active';

  const totalExtrasFormatted = {} as { [key: string]: number };

  extras!.map((el: any) => {
    totalExtrasFormatted[el.name] = el.value;
  });

  const handleCancelBooking = async () => {
    const { data } = await cancelBooking({
      variables: {
        id: _id as string
      },
      refetchQueries: [{ query: UserBookings, variables: { email } }],
      awaitRefetchQueries: true
    });
    if (!data) {
      console.error('ERROR');
    }
    history.push('/my-account');
  };

  return (
    <Segment style={{ margin: 0, backgroundColor: '#baba' }}>
      <Container>
        <div style={{ maxWidth: 500, margin: '0 auto' }}>
          <Segment>
            <div
              style={{
                backgroundColor: 'yellow',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Icon name='check circle outline' size='big' />
              Booking Confirmed!
              {isCancellable && (
                <Button
                  color='red'
                  size='medium'
                  onClick={() => handleCancelBooking()}
                >
                  Cancel Booking
                </Button>
              )}
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
