import React, { useContext } from 'react';
import { Segment } from 'semantic-ui-react';
import { RenterDetailsForm } from '../../components/Forms/RenterDetailsForm';
import { Store } from '../../Store';
import { GetUserData } from '../../components/GetUserData';

interface Props {}

export const RenterDetails: React.FC<Props> = () => {
  const { state } = useContext(Store);
  return (
    <>
      <Segment>Upgrade to a larger vehicle</Segment>
      {state.isAuth ? <GetUserData /> : <RenterDetailsForm />}

      <Segment>Terms and Conditions</Segment>
    </>
  );
};
