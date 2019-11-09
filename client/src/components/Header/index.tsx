import React, { ReactNode } from 'react';

import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';

interface HeaderProps {
  children: ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => (
  <div>
    <DesktopHeader>{children}</DesktopHeader>
    <MobileHeader>{children}</MobileHeader>
  </div>
);
