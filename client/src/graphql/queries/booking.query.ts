import gql from 'graphql-tag';

export default gql`
  query Booking($email: String!, $bookingNumber: Int!) {
    booking(email: $email, bookingNumber: $bookingNumber) {
      car {
        name
        transmission
      }
      firstName
      lastName
      email
      telephoneNumber
      startDay
      returnDay
      startHour
      returnHour
      renterAge
      days
      totalDays
      totalExtras
      bookingType
      extras {
        name
        value
      }
    }
  }
`;
