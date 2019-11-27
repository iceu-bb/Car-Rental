import React from 'react';

import { HomepageHeading } from '../components/Header/HomePageHeading';
import { Header, Segment } from 'semantic-ui-react';

export const MainPage: React.FC = () => {
  return (
    <>
      <HomepageHeading mobile />
      <Segment
        style={{ margin: 0, backgroundColor: '#ddd', minHeight: '500px' }}
      >
        <Header style={{ textTransform: 'uppercase' }} as='h1'>
          cheap prices for car rental in Iceland
        </Header>
        <Header as='h3'>
          Save up to 40% with our Coverage Package! Includes: CDW, SCDW, TP, WSP
          and taxes.
        </Header>

        <Header as='h2'>Special offers</Header>

        <Header as='h2'>Our vehicles</Header>
      </Segment>

      <Segment
        style={{ margin: 0, backgroundColor: 'violet', minHeight: '500px' }}
        as='footer'
      >
        FOOTER
      </Segment>
    </>
  );
};
