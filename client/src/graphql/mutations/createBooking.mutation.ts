import gql from 'graphql-tag';

export default gql`
  mutation CreateBooking(
    $car: ID
    $firstName: String
    $lastName: String
    $email: String
    $telephoneNumber: Int
    $airlineCode: String
    $flightNumber: String
    $totalDays: Int
    $bookingType: String
    $bookingDate: BookingDateFormInput
    $extras: [ExtrasItem]
  ) {
    createBooking(
      input: {
        car: $car
        firstName: $firstName
        lastName: $lastName
        email: $email
        telephoneNumber: $telephoneNumber
        bookingDate: $bookingDate
        bookingType: $bookingType
        totalDays: $totalDays
        extras: $extras
        airlineCode: $airlineCode
        flightNumber: $flightNumber
      }
    ) {
      bookingNumber
    }
  }
`;
