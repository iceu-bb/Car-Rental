import React, { useEffect, useContext } from 'react';
import { useUserBookingsQuery } from '../../graphql/types';
import {
  Container,
  Segment,
  Header,
  Item,
  Grid,
  List,
  Table
} from 'semantic-ui-react';
import { Store } from '../../Store';
import { BookingsSegment } from '../../components/BookingsSegment';

interface Props {}

export const AccountOverview: React.FC<Props> = () => {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    dispatch({ type: 'SET_BOOKING_STEP', payload: 0 });
  }, []);

  const { data, loading, error } = useUserBookingsQuery({
    variables: { email: state.currentUser.email }
  });

  if (!data || !data.userBookings || error || loading) {
    return null;
  }

  const {
    upcomingBookings,
    currentBookings,
    pastBookings,
    cancelledBookings,
    accountStatus,
    rentals,
    rentalsToNextUpgrade,
    moneySpend,
    moneySpendToNextUpgrade
  } = data.userBookings;

  return (
    <Container>
      <BookingsSegment bookings={upcomingBookings} header='Upcoming Bookings' />
      <BookingsSegment bookings={currentBookings} header='Current Rentals' />
      <BookingsSegment bookings={pastBookings} header='Past Rentals' />
      <BookingsSegment
        bookings={cancelledBookings}
        header='Cancelled bookings'
      />

      <Segment>
        <Grid columns={2} stackable>
          <Grid.Column style={{ borderRight: '1px solid #ddd' }}>
            <Header as='h3' size='medium'>
              Gold Account
            </Header>
            <List>
              <List.Item>
                With Classic Gold:
                <List bulleted>
                  <List.Item>€15 money off voucher*</List.Item>
                  <List.Item>Vehicle upgrade voucher***</List.Item>
                  <List.Item>Voucher for a free weekend rental**</List.Item>
                </List>
              </List.Item>
              <List.Item>
                With Premium Gold:
                <List bulleted>
                  <List.Item>Guaranteed vehicle upgrade****</List.Item>
                  <List.Item>Voucher for a free weekend rental**</List.Item>
                  <List.Item>Free second driver</List.Item>
                  <List.Item>Guaranteed car availability*****</List.Item>
                </List>
              </List.Item>
            </List>
          </Grid.Column>

          <Grid.Column>
            <Header as='h3' size='medium'>
              Your balance
            </Header>
            <Item className='wrapped'>
              <Item.Header>Your account status:</Item.Header>
              <Item.Content
                style={{
                  marginLeft: 10,
                  fontSize: '1.1rem',
                  fontWeight: 'bold'
                }}
              >
                {accountStatus}
              </Item.Content>
            </Item>

            <Table stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Rentals: {rentals}</Table.HeaderCell>
                  <Table.HeaderCell>Spend: ISK {moneySpend}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    Rentals to next upgrade:{' '}
                    {rentalsToNextUpgrade === -10
                      ? 'Premium Gold Account'
                      : rentalsToNextUpgrade}
                  </Table.Cell>
                  <Table.Cell>
                    Spend to next upgrade: ISK{' '}
                    {moneySpendToNextUpgrade === -10
                      ? 'Premium Gold Account'
                      : moneySpendToNextUpgrade}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};
