import React from 'react';
import {
  Container,
  Segment,
  Header,
  Item,
  Grid,
  List,
  Table
} from 'semantic-ui-react';

interface Props {}

export const AccountOverview: React.FC<Props> = () => {
  return (
    <Container>
      <Segment>
        <Header as='h3'>Upcoming Bookings</Header>
        <Item>No upcoming bookings</Item>
      </Segment>
      <Segment>
        <Header as='h3'>Past Rentals</Header>
        <Item>No rentals available</Item>
      </Segment>
      <Segment>
        <Header as='h3'>Cancelled bookings</Header>
        <Item>No canceled bookings</Item>
      </Segment>

      <Segment>
        <Grid columns={2} stackable>
          <Grid.Column style={{ borderRight: '1px solid #ddd' }}>
            <Header as='h3' size='medium'>
              Gold Account
            </Header>
            <List>
              <List.Item icon='user'>
                With Classic Gold:
                <List bulleted>
                  <List.Item>€15 money off voucher*</List.Item>
                  <List.Item>Vehicle upgrade voucher***</List.Item>
                  <List.Item>Voucher for a free weekend rental**</List.Item>
                  <List.Item>
                    Reach Avis Preferred Plus status even faster: the ‘loyalty
                    value’ of your rental will go up by €100 if you hire a
                    vehicle within 60 days of registration
                  </List.Item>
                </List>
              </List.Item>
              <List.Item icon='marker'>
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
                Standard Account
              </Item.Content>
            </Item>

            <Table stackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Rentals: 0</Table.HeaderCell>
                  <Table.HeaderCell>Spend: $0</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                <Table.Row>
                  <Table.Cell>Rentals to next upgrade: 5</Table.Cell>
                  <Table.Cell>Spend to next upgrade: $1000.00</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Segment>
    </Container>
  );
};
