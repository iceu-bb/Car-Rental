import React from 'react';
import moment from 'moment';
import { Segment, Divider, Grid, Item } from 'semantic-ui-react';

// the same interface in Store
interface Props {
  bookingInfo: any;
}

export const PickupReturn: React.FC<Props> = ({ bookingInfo }) => {
  return (
    <Segment>
      <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Pickup / Return</p>
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
            <Item.Description style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              Keflavik International Airport
            </Item.Description>
            <Item.Meta
              style={{
                margin: '5px 0 10px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {moment(bookingInfo.startDay, 'DD-MM-YYYY').format(
                'dddd, Do MMMM YYYY'
              )}{' '}
              @ {bookingInfo.startHour}
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
            <Item.Description style={{ fontWeight: 'bold', fontSize: '1rem' }}>
              Keflavik International Airport
            </Item.Description>
            <Item.Meta
              style={{
                margin: '5px 0 10px',
                fontWeight: 'bold',
                fontSize: '1rem'
              }}
            >
              {moment(bookingInfo.returnDay, 'DD-MM-YYYY').format(
                'dddd, Do MMMM YYYY'
              )}{' '}
              @ {bookingInfo.returnHour}
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
              {bookingInfo.renterAge}
            </Item.Description>
          </Item>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};
