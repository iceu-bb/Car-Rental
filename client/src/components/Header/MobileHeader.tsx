import React, { useState, ReactNode, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../helpers/constants';
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar
} from 'semantic-ui-react';

interface HeaderProps {
  children: ReactNode;
  isAuth: boolean;
}

export const MobileHeader: React.FC<HeaderProps> = ({ children }) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  const { pathname } = useLocation();

  const renderMenuItem = useCallback(
    item => (
      <Menu.Item
        key={item.name}
        as={Link}
        to={item.to}
        name={item.name}
        active={pathname === `${item.to}`}
        onClick={() => {
          setOpenSidebar(false);
        }}
      >
        {item.text}
      </Menu.Item>
    ),
    [pathname]
  );

  const renderMenuItems = useMemo(() => menuItems.map(renderMenuItem), [
    renderMenuItem
  ]);

  return (
    <Responsive as={Sidebar.Pushable} maxWidth={Responsive.onlyMobile.maxWidth}>
      <Sidebar
        as={Menu}
        color='grey'
        animation='push'
        inverted
        onHide={() => setOpenSidebar(false)}
        vertical
        visible={openSidebar}
      >
        {renderMenuItems}
      </Sidebar>

      <Sidebar.Pusher dimmed={openSidebar}>
        <Segment
          inverted
          color='violet'
          textAlign='center'
          style={{ padding: '1rem 0' }}
          vertical
        >
          <Container>
            <Menu inverted secondary size='large'>
              <Menu.Item onClick={() => setOpenSidebar(!openSidebar)}>
                <Icon name='sidebar' />
              </Menu.Item>
              <Menu.Item position='right'>
                <Button as={Link} to='/login' inverted>
                  Log in
                </Button>
                <Button
                  as={Link}
                  to='/register'
                  inverted
                  style={{ marginLeft: '0.5em' }}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            </Menu>
          </Container>
        </Segment>
        {children}
      </Sidebar.Pusher>
    </Responsive>
  );
};
