import gql from "graphql-tag";

export default gql`
  mutation UpdateUserPassword(
    $id: ID!
    $newPassword: String!
    $newPasswordConfirm: String!
    $currentPassword: String!
  ) {
    updateUserPassword(
      id: $id
      newPassword: $newPassword
      newPasswordConfirm: $newPasswordConfirm
      currentPassword: $currentPassword
    )
  }
`;
