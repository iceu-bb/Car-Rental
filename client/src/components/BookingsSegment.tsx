import React, { useContext } from 'react';
import { Segment, Header, Item, Button, Divider } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';
import { Store } from '../Store';

interface Props {
  header: string;
  bookings: any[] | null;
}

export const BookingsSegment: React.FC<Props> = ({ header, bookings }) => {
  const { dispatch } = useContext(Store);
  const history = useHistory();

  if (!bookings || bookings.length === 0) {
    return (
      <Segment>
        <Header as='h3'>{header}</Header>
        <Item>Nothing to display here</Item>
      </Segment>
    );
  }

  const handleBookingDetailsClick = (bookingNumber: number) => {
    dispatch({ type: 'SET_BOOKING_NUMBER', payload: bookingNumber });
    history.push(`/booking-confirmation/${bookingNumber}`);
  };

  return (
    <Segment>
      <Header as='h3'>{header}</Header>

      {bookings.map(booking => {
        return (
          <div key={booking.bookingNumber}>
            <Item
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '.9rem',
                fontWeight: '300'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <p
                  style={{
                    marginBottom: 5
                  }}
                >
                  {booking.startDay} - {booking.startHour}
                </p>
                <p>
                  {booking.returnDay} - {booking.returnHour}
                </p>
              </div>
              <Button
                onClick={() => {
                  handleBookingDetailsClick(booking.bookingNumber);
                }}
              >
                See details
              </Button>
            </Item>
            <Divider
              style={{
                margin: '5px 0',
                padding: 0
              }}
            />
          </div>
        );
      })}
    </Segment>
  );
};
