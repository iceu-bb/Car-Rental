import React, { useReducer } from 'react';

import { Container, Segment } from 'semantic-ui-react';
import { DateBookingForm } from '../Forms/DateBookingForm';

interface HeaderMobileProps {
  mobile?: boolean;
}

export const HomepageHeading: React.FC<HeaderMobileProps> = ({ mobile }) => {
  return (
    <Segment
      style={{
        minHeight: '90vh',
        backgroundColor: 'teal',
        margin: 0
      }}
    >
      <Container style={{ margin: '0 auto' }}>
        <DateBookingForm />
      </Container>
    </Segment>
  );
};
