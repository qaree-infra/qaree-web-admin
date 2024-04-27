import { graphql } from "gql.tada";

export const reviewBookDataMutation = graphql(`
  mutation reviewBookData($bookId: String!, $status: String!, $content: String!) {
    reviewBookData(bookId: $bookId, status: $status, content: $content) {
      success
      message
    }
  }
`);

export const editCategoryMutation = graphql(` 
  mutation editCategory($categoryId: String!, $name_ar: String!, $name_en: String!, $background: String!) {
    editCategory(categoryId: $categoryId, name_ar: $name_ar, name_en: $name_en, background: $background) {
      _id
    }
  }
`);
