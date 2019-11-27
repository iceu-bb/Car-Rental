import React from 'react';
import { Dropdown, Icon, Button } from 'semantic-ui-react';
import { Link, useHistory, useLocation } from 'react-router-dom';

interface Props {}

export const DropdownAccount: React.FC<Props> = () => {
  const { pathname } = useLocation();
  const history = useHistory();

  const options = [
    {
      key: 'user',
      text: 'Account',
      icon: 'user',
      active: false,
      onClick: () => {
        history.push('/my-account');
      }
    },
    {
      key: 'sign-out',
      text: 'Sign Out',
      icon: 'sign out',
      onClick: () => {
        //TODO
        console.log('logged out');
        history.push('/');
      }
    }
  ];

  const trigger = (
    <Button
      circular
      icon
      color='violet'
      inverted
      name='my-account'
      active={pathname === '/my-account'}
      style={{
        padding: 13
      }}
    >
      <Icon name='user' size='large' inverted />
    </Button>
  );

  return (
    <Dropdown
      trigger={trigger}
      options={options}
      defaultValue={'xxx'}
      pointing='top right'
      icon={null}
    />
  );
};
