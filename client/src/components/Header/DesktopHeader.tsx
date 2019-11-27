import React, { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../helpers/constants';
import { DropdownAccount } from '../DropdownAccount';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Icon
} from 'semantic-ui-react';

interface HeaderProps {
  mobile?: boolean;
  isAuth: boolean;
}

export const DesktopHeader: React.FC<HeaderProps> = ({ children, isAuth }) => {
  const { pathname } = useLocation();

  const renderMenuItem = useCallback(
    item => (
      <Menu.Item
        key={item.name}
        as={Link}
        to={item.to}
        name={item.name}
        active={pathname === `${item.to}`}
      >
        {item.text}
      </Menu.Item>
    ),
    [pathname]
  );

  // ???
  const renderMenuItems = useMemo(
    () => menuItems.slice(0, 4).map(renderMenuItem),
    [renderMenuItem]
  );

  return (
    <Responsive minWidth={Responsive.onlyTablet.minWidth}>
      <Segment
        inverted
        textAlign='center'
        color='violet'
        style={{ padding: '1rem 0' }}
        vertical
      >
        <Menu inverted secondary size='large'>
          <Container>
            {/* render left-side menu items*/}
            {renderMenuItems}

            {/* render right-side menu items*/}
            <Menu.Item position='right'>
              {!isAuth ? (
                <>
                  <Button
                    as={Link}
                    to='/login'
                    inverted
                    name='login'
                    active={pathname === '/login'}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to='/register'
                    inverted
                    name='register'
                    active={pathname === '/register'}
                    style={{ marginLeft: '0.5em' }}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <DropdownAccount />
              )}
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      {children}
    </Responsive>
  );
};

{
  /*<Button
  circular
  icon
  color='violet'
  inverted
  as={Link}
  to='/my-account'
  name='my-account'
  active={pathname === '/my-account'}
  style={{
    padding: 13
  }}
>
  <Icon name='user' size='large' inverted />
</Button> */
}
