import React, { useState, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { menuItems } from '../../helpers/constants';
import {
  Button,
  Container,
  Menu,
  Responsive,
  Segment,
  Visibility
} from 'semantic-ui-react';

interface HeaderProps {
  mobile?: boolean;
}

export const DesktopHeader: React.FC<HeaderProps> = ({ children }) => {
  const [fixed, setFixed] = useState<boolean>(false);
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
      <Visibility
        once={false}
        onBottomPassed={() => setFixed(true)}
        onBottomPassedReverse={() => setFixed(false)}
      >
        <Segment
          inverted
          textAlign='center'
          color='violet'
          style={{ padding: '1rem 0' }}
          vertical
        >
          <Menu
            fixed={fixed ? 'top' : undefined}
            inverted={!fixed}
            secondary={!fixed}
            size='large'
          >
            <Container>
              {/* render left-side menu items*/}
              {renderMenuItems}

              {/* render right-side menu items*/}
              <Menu.Item position='right'>
                <Button
                  as={Link}
                  to='/login'
                  inverted={!fixed}
                  name='login'
                  active={pathname === '/login'}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to='/register'
                  inverted={!fixed}
                  primary={fixed}
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
      </Visibility>

      {children}
    </Responsive>
  );
};
