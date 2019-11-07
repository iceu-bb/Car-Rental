import gql from 'graphql-tag';

export default gql`
  query Me {
    me {
      name
      email
      role
      picture
      createdAt
    }
  }
`;
