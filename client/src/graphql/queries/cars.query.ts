import gql from 'graphql-tag';

export default gql`
  query Cars {
    cars {
      _id
      name
      producer
      type
      year
      group
      passengers
      baggages
      doors
      transmission
      propulsion
      incineration
      airconditioning
      ABS
      USB
      powerWindows
      remoteLocking
      Bluetooth
      cruiseControl
      electricCar
    }
  }
`;
