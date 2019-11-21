import gql from 'graphql-tag';

export default gql`
  query UserBookings($email: String!) {
    userBookings(email: $email) {
      upcomingBookings {
        bookingNumber
        startDay
        startHour
        returnDay
        returnHour
      }
      currentBookings {
        bookingNumber
        startDay
        startHour
        returnDay
        returnHour
      }
      pastBookings {
        bookingNumber
        startDay
        startHour
        returnDay
        returnHour
      }
      cancelledBookings {
        bookingNumber
        startDay
        startHour
        returnDay
        returnHour
      }
      accountStatus
      rentals
      rentalsToNextUpgrade
      moneySpend
      moneySpendToNextUpgrade
    }
  }
`;
