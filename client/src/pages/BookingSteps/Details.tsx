import React, { useContext } from 'react';
import { Segment, Divider } from 'semantic-ui-react';
import { RenterDetailsForm } from '../../components/Forms/RenterDetailsForm';
import { Store } from '../../Store';
import { GetUserData } from '../../components/GetUserData';
import { UpgradeCar } from '../../components/Booking-Left-Column/UpgradeCar';

interface Props {}

export const RenterDetails: React.FC<Props> = () => {
  const { state } = useContext(Store);
  return (
    <>
      {//F is the last class, no upgrades
      state.bookingCar.group !== 'F' && !state.bookingCar.upgraded && (
        <Segment>
          Upgrade to a larger vehicle
          <Divider />
          <UpgradeCar />
        </Segment>
      )}

      {state.isAuth ? <GetUserData /> : <RenterDetailsForm />}

      <Segment>Terms and Conditions</Segment>
    </>
  );
};
