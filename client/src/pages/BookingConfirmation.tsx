import React, { useContext } from 'react';
import { Store } from '../Store';

import { Link, RouteComponentProps } from 'react-router-dom';

// show only if booking step = 5

export const BookingConfirmation: React.FC<RouteComponentProps<any>> = ({
  history,
  match
}) => {
  const { bookingNumber } = match.params;
  const { state } = useContext(Store);

  // prevent for diffrent booking numbers
  if (bookingNumber != state.bookingNumber) history.push('/');

  return <>CONFIRM</>;
};
