import gql from 'graphql-tag';

export default gql`
  mutation UpdatePersonalData(
    $id: ID!
    $title: String
    $firstName: String
    $lastName: String
    $dateOfBirth: String
    $country: String
  ) {
    updatePersonalData(
      input: {
        id: $id
        title: $title
        firstName: $firstName
        lastName: $lastName
        dateOfBirth: $dateOfBirth
        country: $country
      }
    ) {
      title
      firstName
      lastName
      dateOfBirth
      country
    }
  }
`;
