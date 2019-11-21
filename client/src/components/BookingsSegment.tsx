import React from 'react';
import { Segment, Header, Item, Button, Divider } from 'semantic-ui-react';

interface Props {
  header: string;
  bookings: any[] | null;
}

export const BookingsSegment: React.FC<Props> = ({ header, bookings }) => {
  if (!bookings || bookings.length === 0) {
    return (
      <Segment>
        <Header as='h3'>{header}</Header>
        <Item>Nothing to display here</Item>
      </Segment>
    );
  }

  return (
    <Segment>
      <Header as='h3'>{header}</Header>

      {bookings.map(booking => {
        return (
          <>
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
              <Button>See details</Button>
            </Item>
            <Divider
              style={{
                margin: '5px 0',
                padding: 0
              }}
            />
          </>
        );
      })}
    </Segment>
  );
};
