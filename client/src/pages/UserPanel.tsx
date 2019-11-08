import React, { useContext } from 'react';
import { Store } from '../Store';
interface Props {}

export const UserPanel: React.FC<Props> = () => {
  const { state } = useContext(Store);

  console.log(state);
  if (state.currentUser.email === '') {
    return null;
  }

  const { name } = state.currentUser;
  return <div> Welcome {name}</div>;
};
