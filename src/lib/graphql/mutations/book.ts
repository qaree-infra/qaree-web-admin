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

export const addCategoryMutation = graphql(`
  mutation addCategory($name_en: String!, $name_ar: String!, $background: String!) {
    addCategory(name_en: $name_en, name_ar: $name_ar, background: $background) {
      _id
    }
  }
`);

export const deleteCategoryMutation = graphql(`
  mutation deleteCategory($categoryId: String!) {
    deleteCategory(categoryId: $categoryId) {
      success
      message
    }
  }
`);

export const addOfferMutation = graphql(`
  mutation addOffer($bookId: String!, $percent: Int!, $expireAt: String!) {
    addOffer(bookId: $bookId, percent: $percent, expireAt: $expireAt) {
      _id
    }
  }
`);

export const editOfferMutation = graphql(`
  mutation editOffer($id: String!, $percent: Int!, $expireAt: String! ) {
    editOffer(id: $id, percent: $percent, expireAt: $expireAt) {
      _id
    }
  }
`);

export const deleteOfferMutation = graphql(`
  mutation deleteOffer($id: String!) {
    deleteOffer(id: $id) {
      success
      message
    }
  }
`);
