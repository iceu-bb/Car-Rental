import React, { useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../helpers/constants';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment
} from 'semantic-ui-react';

interface HeaderProps {
  mobile?: boolean;
}

export const DesktopHeader: React.FC<HeaderProps> = ({ children }) => {
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
            </Menu.Item>
          </Container>
        </Menu>
      </Segment>
      {children}
    </Responsive>
  );
};
