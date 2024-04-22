import { graphql } from "gql.tada";

export const getAdminInfoQuery = graphql(`
  query getAdminInfo {
    getAdminInfo {
        name,
        email,
        avatar {
          size,
          path
        }
    }
  }
`);

// export const refreshTokenQuery = graphql(`
//   query refreshToken {
//     refreshToken {
//       message
//       refresh_token
//     }
//   }
// `);
