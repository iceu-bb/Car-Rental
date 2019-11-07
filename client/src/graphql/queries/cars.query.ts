import gql from 'graphql-tag';

export default gql`
  query Cars {
    cars {
      _id
      name
      model
      year
      group
    }
  }
`;
