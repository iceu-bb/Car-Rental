import React from 'react';
import { Segment, Header, Grid, Item, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface Props {}

export const Extras: React.FC<Props> = () => {
  return (
    <>
      <Segment style={{ marginBottom: '.05rem' }}>
        <Header as='h4'>Extras</Header>
      </Segment>
      <Segment style={{ marginTop: '.05rem' }}>
        <Grid>
          <Grid.Row columns={2}>
            {/* Column 1 */}
            <Grid.Column
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  minWidth: 80,
                  minHeight: 80,
                  backgroundColor: 'violet',
                  marginRight: 20
                }}
              ></div>
              <Item>
                <Item.Header style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                  SCDW Protection
                </Item.Header>
                <Item.Description
                  style={{
                    fontSize: '.85rem',
                    fontWeight: 300,
                    lineHeight: '.9rem'
                  }}
                >
                  The Super Collision Damage Waiver reduces your excess in case
                  of damage to your rental car
                </Item.Description>
              </Item>
            </Grid.Column>
            {/* Column 2 */}
            <Grid.Column
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}
            >
              <Item style={{ marginRight: 20 }}>
                <Item.Header style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                  <span style={{ fontSize: '1rem', fontWeight: 300 }}>ISK</span>{' '}
                  1500
                </Item.Header>
                <Item.Description
                  style={{
                    fontSize: '.8rem',
                    fontWeight: 300,
                    textAlign: 'center'
                  }}
                >
                  Per day
                </Item.Description>
              </Item>
              <Button size='huge'>Add</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button as={Link} to='/booking/selection' size='big'>
          Back
        </Button>
        <Button as={Link} to='/booking/details' size='big' color='yellow'>
          Next
        </Button>
      </div>
    </>
  );
};
