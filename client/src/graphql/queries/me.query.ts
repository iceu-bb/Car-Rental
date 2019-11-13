import gql from "graphql-tag";

export default gql`
  query Me {
    me {
      _id
      name
      email
      role
      picture
      createdAt
      title
      firstName
      lastName
      dateOfBirth
      countryOfBirth
      telephoneNumber
      addressLine1
      addressLine2
      city
      region
      postcode
      country
      newsletterCheck
      emailCheck
      smsCheck
    }
  }
`;
