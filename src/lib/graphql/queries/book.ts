import { graphql } from "gql.tada";

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
      currentPage
      numberOfPages
      total
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

export const getBookEPubManifestQuery = graphql(`
  query getBookEPubManifest($bookId: String!) {
    getBookEPubManifest(bookId: $bookId) {
      files {
        href
      }
    }
  }
`);

export const getAllCategoriesQuery = graphql(`
  query getAllCategories($limit: Int, $page: Int, $completed: Boolean) {
    getAllCategories(limit: $limit, page: $page, completed:$completed) {
      categories {
        _id,
        name_en,
        name_ar
        icon {
          name
          path
        }
        background
        updatedAt
        createdAt
      }
      totalCompleted
      totalUncompleted
    }
  }
`);

export const getAllOffersQuery = graphql(`
query getAllOffers($page: Int!, $limit: Int!, $sort: String) {
  getAllOffers(page: $page, limit: $limit, sort: $sort) {
    offers {
      _id
      percent
      expireAt
      book {
       _id
       name 
      }
      createdAt
      updatedAt
    }
    numberOfPages
    currentPage
    total
  }

}`);
