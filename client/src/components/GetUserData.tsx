import React from 'react';
import { useMeQuery } from '../graphql/types';
import { RenterDetailsForm } from './Forms/RenterDetailsForm';

export const GetUserData: React.FC = () => {
  const { data, error } = useMeQuery();

  if (!data || !data.me || error) {
    return null;
  }

  const { firstName, lastName, email, telephoneNumber } = data.me;

  const userData = {
    firstName,
    lastName,
    email,
    telephoneNumber
  };

  return <RenterDetailsForm userData={userData} />;
};
