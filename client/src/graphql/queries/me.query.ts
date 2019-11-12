import gql from 'graphql-tag';

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
      country
    }
  }
`;
