import gql from 'graphql-tag';

export default gql`
  query Car($name: String!, $transmission: String!) {
    car(input: { name: $name, transmission: $transmission }) {
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
