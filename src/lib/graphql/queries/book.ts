import { graphql } from "gql.tada";

export const getAllCategoriesQuery = graphql(`
  query getAllCategories {
    getAllCategories {
      categories {
        _id,
        name_en,
      }
    }
  }
`);

export const getBookEPubContentQuery = graphql(`
  query getBookEPubContent($bookId: String!){
    getBookEPubContent(bookId: $bookId) {
        content {
          id
          title
        }
    }
  }
`);

export const getMyBooksQuery = graphql(`
  query getBooks($page: Int, $limit: Int){
    getBooks(page: $page, limit: $limit) {
      books {
        _id,
        name,
        price,
        categories {
          _id
          name_en
          background
        },
        status,
        createdAt,
        avgRate,
        updatedAt,
        isbn,
        description,
        language,
        publishingRights,
        edition,
      },
      currentPage,
      numberOfPages,
      total
    }
  }
`);
