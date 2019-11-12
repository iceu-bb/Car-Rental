import React, { useContext } from 'react';
import { Store } from '../Store';
import { Segment, Container, Header, Grid, Tab } from 'semantic-ui-react';

import { AccountOverview } from './UserPanel/AccountOverview';
import { AccountSettings } from './UserPanel/AccountSettings';

export const UserPanel: React.FC = () => {
  const { state } = useContext(Store);

  const panes = [
    {
      menuItem: 'Account Overview',
      render: () => (
        <Tab.Pane attached={false}>
          <AccountOverview />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Account Settings',
      render: () => (
        <Tab.Pane attached={false}>
          <AccountSettings />
        </Tab.Pane>
      )
    },
    {
      menuItem: 'Claim Reservation',
      render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane>
    },
    {
      menuItem: 'Manage Reservation',
      render: () => <Tab.Pane attached={false}>Tab 4 Content</Tab.Pane>
    }
  ];

  console.log(state);
  if (state.currentUser.email === '') {
    return null;
  }

  const { name } = state.currentUser;
  return (
    <Segment style={{ margin: 0 }}>
      <Container>
        <Grid>
          <Grid.Row centered>
            <Header as='h2' size='huge' style={{ padding: '70px 10px 30px' }}>
              Welcome {name}
            </Header>
          </Grid.Row>
          <Grid.Row>
            <Tab
              menu={{
                color: 'purple',
                secondary: true,
                pointing: true,
                attached: true,
                className: 'wrapped'
              }}
              panes={panes}
              defaultActiveIndex={1}
            />
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
  );
};
