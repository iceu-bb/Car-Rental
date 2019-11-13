import gql from "graphql-tag";

export default gql`
  mutation UpdateUserData(
    $id: ID!
    $title: String
    $firstName: String
    $lastName: String
    $dateOfBirth: String
    $countryOfBirth: String
    $telephoneNumber: Int
    $addressLine1: String
    $addressLine2: String
    $city: String
    $region: String
    $postcode: String
    $country: String
    $newsletterCheck: Boolean
    $emailCheck: Boolean
    $smsCheck: Boolean
  ) {
    updateUserData(
      input: {
        id: $id
        title: $title
        firstName: $firstName
        lastName: $lastName
        dateOfBirth: $dateOfBirth
        countryOfBirth: $countryOfBirth
        telephoneNumber: $telephoneNumber
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        city: $city
        region: $region
        postcode: $postcode
        country: $country
        newsletterCheck: $newsletterCheck
        emailCheck: $emailCheck
        smsCheck: $smsCheck
      }
    )
  }
`;
