import React from 'react';

import { Button, Container, Header } from 'semantic-ui-react';

interface HeaderMobileProps {
  mobile?: boolean;
}

export const HomepageHeading: React.FC<HeaderMobileProps> = ({ mobile }) => (
  <Container text>
    <Header
      as='h1'
      content='Rental Cars'
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginTop: mobile ? '1.5em' : '3em'
      }}
    />
    <Header
      as='h2'
      content='The best cat rental in Iceland'
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em'
      }}
    />
    <Button primary size='large'>
      Get Started
    </Button>
  </Container>
);
