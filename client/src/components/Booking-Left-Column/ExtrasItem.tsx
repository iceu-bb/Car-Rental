import React, { useState, useContext } from 'react';
import { Grid, Item, Button, Divider, Icon } from 'semantic-ui-react';
import { Store } from '../../Store';

interface Props {
  item: {
    name: string;
    path: string;
    price: number;
    symbol: string;
    system: string;
    description: string;
  };
}

export const ExtrasItem: React.FC<Props> = ({ item }) => {
  const { state, dispatch } = useContext(Store);

  // check if item was selected - this case is when we move back from RenterDetails section and we have had choosen some extras items
  const [isActive, setActive] = useState(state.totalExtras[item.symbol] > 5);

  // adjust price to group, only coverages
  const groupRelatedItemPrice = Math.round(
    item.system === 'day'
      ? item.price * state.extrasToGroupRate[state.bookingCar.group]
      : item.price
  );

  const handleClick = () => {
    isActive
      ? dispatch({
          type: 'SET_EXTRAS_ITEM_PRICE',
          payload: { name: item.symbol, value: 0 }
        })
      : dispatch({
          type: 'SET_EXTRAS_ITEM_PRICE',
          payload: { name: item.symbol, value: groupRelatedItemPrice }
        });

    setActive(state => !state);
  };

  return (
    <>
      <Grid.Row
        columns={2}
        style={{ backgroundColor: isActive ? '#EEE6F1' : '#fff' }}
      >
        {/* Left Column */}
        <Grid.Column
          width={10}
          style={{
            display: 'flex',
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
            <Item.Header
              style={{
                fontSize: '1.3rem',
                fontWeight: 'bold',
                marginBottom: 5
              }}
            >
              {item.name}
            </Item.Header>
            <Item.Description
              style={{
                fontSize: '1rem',
                fontWeight: 300,
                lineHeight: '1.1rem'
              }}
            >
              {item.description}
            </Item.Description>
          </Item>
        </Grid.Column>

        {/* Right Column  */}
        <Grid.Column
          width={6}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          <Item style={{ marginRight: 30 }}>
            <Item.Header style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
              <span style={{ fontSize: '1rem', fontWeight: 300 }}>ISK</span>{' '}
              {groupRelatedItemPrice}
            </Item.Header>
            <Item.Description
              style={{
                fontSize: '.8rem',
                fontWeight: 300,
                textAlign: 'center'
              }}
            >
              Per {item.system}
            </Item.Description>
          </Item>
          <Button
            style={{ backgroundColor: isActive ? '#fff' : 'violet' }}
            onClick={() => handleClick()}
            icon
            circular
          >
            {isActive ? <Icon name='remove' /> : <Icon name='add' />}
          </Button>
        </Grid.Column>
      </Grid.Row>
      {/* Divider , not on last item */}
      {item.name === 'Booster Seat' ? null : (
        <Divider style={{ margin: 0, borderBottom: 0 }} />
      )}
    </>
  );
};
