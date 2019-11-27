import gql from 'graphql-tag';

export default gql`
  mutation CancelBooking($id: ID!) {
    cancelBooking(id: $id)
  }
`;
