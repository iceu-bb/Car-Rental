import React, { useReducer } from 'react';

import { Container, Segment } from 'semantic-ui-react';
import { DateBookingForm } from '../Forms/DateBookingForm';
import styled from 'styled-components';

interface HeaderMobileProps {
  mobile?: boolean;
}

const MainSegment = styled.section`
  height: 650px;
  background: url(https://images.unsplash.com/photo-1526553144644-bd9d59da0e76?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HomepageHeading: React.FC<HeaderMobileProps> = ({ mobile }) => {
  return (
    <MainSegment>
      <DateBookingForm />
    </MainSegment>
  );
};
