import { graphql } from "gql.tada";

export const userInfoQuery = graphql(`
  query userInfo {
    userInfo {
        name,
        email,
        avatar {
          size,
          path
        }
    }
  }
`);

export const refreshTokenQuery = graphql(`
  query refreshToken {
    refreshToken {
      message
      refresh_token
    }
  }
`);
