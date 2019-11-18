import gql from 'graphql-tag';

export default gql`
  mutation CheckBookingDateForm(
    $startDay: String
    $startHour: String
    $returnDay: String
    $returnHour: String
    $renterAge: String
  ) {
    checkBookingDateForm(
      input: {
        startDay: $startDay
        startHour: $startHour
        returnDay: $returnDay
        returnHour: $returnHour
        renterAge: $renterAge
      }
    ) {
      error
      days
    }
  }
`;
