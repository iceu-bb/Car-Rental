import React, { useContext, useCallback } from 'react';
import { Segment, Header, Grid, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { extrasItems } from '../../helpers/constants';
import { ExtrasItem } from '../../components/Booking-Left-Column/ExtrasItem';
import { Store } from '../../Store';

interface Props {}

export const Extras: React.FC<Props> = () => {
  const { state } = useContext(Store);

  // think memo
  const renderExtrasItems = useCallback(() => {
    const extrasListToRender =
      state.bookingType === 'fullCover'
        ? extrasItems.slice(3, extrasItems.length)
        : extrasItems;

    return extrasListToRender.map(item => (
      <ExtrasItem key={item.symbol} item={item} />
    ));
  }, [state.bookingType]);

  return (
    <>
      <Segment style={{ marginBottom: '.05rem' }}>
        <Header as='h4'>Extras</Header>
      </Segment>

      <Segment style={{ marginTop: '.05rem' }}>
        <Grid>{renderExtrasItems()}</Grid>
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
