import { graphql } from "gql.tada";

export const signInMutation = graphql(`
  mutation signin($email: String!, $password: String!){
    signIn(email: $email, password: $password) {
      message,
      access_token
    }
  }
`);

export const updateAccountMutation = graphql(`
  mutation updateAccount($name: String!, $oldPassword: String!, $newPassword: String!){
    updateAccount(name: $name, oldPassword: $oldPassword, newPassword: $newPassword) {
      _id
    }
  } 
`);

export const deleteAccountMutation = graphql(`
  mutation deleteAccount {
    deleteAccount {
      success
      message
      deleted_id
    }
  }
`);

export const registerMutation = graphql(`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password){
      _id
    }
  }
`);
