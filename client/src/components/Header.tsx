import React from 'react';
import styled from 'styled-components';

import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  font-size: 1.8rem;
  background-color: green;
  display: flex;
  flex-direction: column;
  text-align: center;
`;

/*--- UPPER PART ---*/

const UpperBox = styled.div`
  max-width: 1200px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Logo = styled.div`
  font-size: 3rem;
`;

/*--- BOTTOM PART ---*/

const BottomBox = styled.nav`
  max-width: 1200px;
`;

const NavList = styled.ul`
  max-width: 500px;
  margin: 0 auto;
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

export const Header: React.FC = () => {
  return (
    <StyledHeader>
      <UpperBox>
        <Logo>Rental Cars</Logo>
        <div>
          <div>
            <Link to='/login'>Login</Link>
          </div>
          <div>
            <Link to='/register'>Register</Link>
          </div>
        </div>
      </UpperBox>
      <BottomBox>
        <NavList>
          <li>
            <Link to='/'>home</Link>
          </li>
          <li>
            <Link to='/'>our fleet</Link>
          </li>
          <li>
            <Link to='/'>Contact</Link>
          </li>
        </NavList>
      </BottomBox>
    </StyledHeader>
  );
};
