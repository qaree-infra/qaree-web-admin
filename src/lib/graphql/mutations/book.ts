import { graphql } from "gql.tada";

export const reviewBookDataMutation = graphql(`
  mutation reviewBookData($bookId: String!, $status: String!, $content: String!) {
    reviewBookData(bookId: $bookId, status: $status, content: $content) {
      success
      message
    }
  }
`);
