import gql from 'graphql-tag';

export default gql`
  mutation Register(
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    register(
      input: {
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    ) {
      email
    }
  }
`;
