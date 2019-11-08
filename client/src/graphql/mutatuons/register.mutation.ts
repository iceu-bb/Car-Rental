import gql from 'graphql-tag';

export default gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $passwordConfirm: String!
  ) {
    register(
      input: {
        name: $name
        email: $email
        password: $password
        passwordConfirm: $passwordConfirm
      }
    ) {
      name
      email
    }
  }
`;
