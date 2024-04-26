import { graphql } from "gql.tada";

// sortBy: String
// filterBy: String
// page: Int
// limit: Int
// keyword: String
export const getBookSummaryQuery = graphql(`
  query adminGetBooks($sortBy: String, $filterBy: String, $page: Int, $limit: Int, $keyword: String) {
    adminGetBooks(sortBy: $sortBy, filterBy: $filterBy, page: $page, limit: $limit, keyword: $keyword) {
      books {
        _id
        cover {
          size
          path
        }
        name
        avgRate
        price
        author {
          name
          avatar
        }
        status
        createdAt
        reviewer {
          name
        }
      }
    }
  }
`);

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

export const getBookEPubMetadataQuery = graphql(`
  query getBookEPubMetadata($bookId: String!) {
    getBookEPubMetadata(bookId: $bookId) {
      publisher
      generator
      cover
      specifiedFonts
      modified
      language
      title
      subject
      description
      creator
      creatorFileAs
      date
      ISBN
    }
  }
`);
