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

export const adminGetAllUsersQuery = graphql(`
  query adminGetAllUsers($sortBy: String, $page: Int, $limit: Int, $keyword: String) {
    adminGetAllUsers(sortBy: $sortBy, page: $page, limit: $limit, keyword: $keyword) {
    users {
      _id
      name
      email
      avatar {
        name
        path
      }
      createdAt
    }
    currentPage
    numberOfPages
    total
    }
  }
`);

export const getAdminsQuery = graphql(`
  query getAdmins($sortBy: String ,$page: Int ,$limit: Int ,$keyword: String) {
    getAdmins(sortBy: $sortBy, page:$page, limit: $limit, keyword: $keyword) {
      admins {
        _id
        name
        email
        avatar {
          name
          path
        }
        createdAt
      }
      currentPage
      numberOfPages
      total
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
