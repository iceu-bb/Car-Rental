import React, { useContext, useCallback } from 'react';
import { Segment, Header, Grid, Button } from 'semantic-ui-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { extrasItems } from '../../helpers/constants';
import { ExtrasItem } from '../../components/Booking-Left-Column/ExtrasItem';
import { Store } from '../../Store';

export const Extras: React.FC<RouteComponentProps> = ({ history }) => {
  const { state, dispatch } = useContext(Store);

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

  // useCallback
  const handleClickBack = () => {
    dispatch({ type: 'SET_BOOKING_STEP', payload: 2 });
    history.push('/booking/selection');
  };

  // useCallback
  const handleClickForward = () => {
    dispatch({ type: 'SET_BOOKING_STEP', payload: 4 });
    history.replace('/booking/details');
  };

  return (
    <>
      <Segment style={{ marginBottom: '.05rem' }}>
        <Header as='h4'>Extras</Header>
      </Segment>

      <Segment style={{ marginTop: '.05rem' }}>
        <Grid>{renderExtrasItems()}</Grid>
      </Segment>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={() => handleClickBack()} size='big'>
          Back
        </Button>
        <Button onClick={() => handleClickForward()} size='big' color='yellow'>
          Next
        </Button>
      </div>
    </>
  );
};
