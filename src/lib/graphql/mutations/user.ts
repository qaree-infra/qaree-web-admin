import { graphql } from "gql.tada";

export const signInMutation = graphql(`
  mutation signin($email: String!, $password: String!){
    signIn(email: $email, password: $password) {
      message,
      access_token
    }
  }
`);

export const signUpMutation = graphql(`
  mutation register ($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email,  password: $password) {
      _id
    }
  }
`);

export const updateAccountAction = graphql(`
  mutation updateAccount($name: String!, $oldPassword: String!, $newPassword: String!){
    updateAccount(name: $name, oldPassword: $oldPassword, newPassword: $newPassword) {
      _id
    }
  } 
`);

export const deleteAccountAction = graphql(`
  mutation deleteAccount {
    deleteAccount {
      success
      message
      deleted_id
    }
  }
`);

// export const verifyAccountMutation = graphql(`
//   mutation verifyAccount($otp: String!, $email: String!){
//     verifyAccount(otp: $otp, email: $email) {
//       message,
//       success
//     }
//   }
// `);

// export const resendValidatingOTPMutation = graphql(`
//   mutation resendValidatingOTP($email:String!){
//     resendValidatingOTP(email: $email) {
//       message,
//       success
//     }
//   }
// `);

// export const resendResetPasswordOTPMutation = graphql(`
//   mutation resendResetPasswordOTP($email: String!){
//     resendResetPasswordOTP(email: $email) {
//       message,
//       success
//     }
//   }
// `);

// export const validateResetPasswordOTPMutation = graphql(`
//   mutation validateResetPasswordOTP($email: String!, $otp: String!){
//     validateResetPasswordOTP(email: $email, otp: $otp) {
//       message,
//       success,
//       reset_token
//     }
//   }
// `);

// export const resetPassword = graphql(`
//   mutation resetPassword($newPassword: String!){
//     resetPassword(newPassword: $newPassword) {
//         message
//     }
//   }
// `);

// export const forgetPasswordMutation = graphql(`
//   mutation forgetPassword($email: String!){
//     forgetPassword(email: $email) {
//       message,
//       success
//     }
//   }
// `);

// export const resetPasswordMutation = graphql(`
//   mutation resetPassword($newPassword: String!){
//     resetPassword(newPassword: $newPassword) {
//         message
//     }
//   }
// `);

// export const loginWithGoogleMutation = graphql(`
//   mutation googleLogin($token: String!){
//     googleLogin(google_token: $token)
//       {
//         access_token,
//         message
//       }
//   }
// `);
