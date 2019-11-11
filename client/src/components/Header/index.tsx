import React, { ReactNode } from 'react';

import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

interface HeaderProps {
  children: ReactNode;
  isAuth: boolean;
}

export const Header: React.FC<HeaderProps> = ({ children, isAuth }) => (
  <div>
    <DesktopHeader isAuth={isAuth}>{children}</DesktopHeader>
    <MobileHeader isAuth={isAuth}>{children}</MobileHeader>
  </div>
);
