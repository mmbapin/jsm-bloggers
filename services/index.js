import { request, gql } from "graphql-request";

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;

export const getPosts = async () => {
  const query = gql`
    query MyQuery {
      postsConnection {
        edges {
          node {
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            excerpt
            title
            slug
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `

  const results = await request(graphqlAPI, query);
  return results.postsConnection.edges
};


////////Get All Recent Posts////////
export const getRecentPosts = async () => {
  const query = gql`
    query GetPostDetails(){
      posts(
        orderBy: createdAt_ASC
        last: 3
      ){
        title,
        featuredImage{
          url
        },
        createdAt,
        slug
      }
    }`

  const result = await request(graphqlAPI, query)
  console.log("All Recent Posts:", result.posts);
  return result.posts  
}




////////Get Similar Posts//////////
export const getSimilarPosts = async () => {
  const query = gql`
    query GetPostDetails($slug: String!, $categories: [String!]){
      posts(
        where: { slug_not: $slug, AND: {categories_some: { slug_in: $categories}}},
        last: 3
      ){
        title,
        featuredImage{
          url
        },
        createdAt,
        slug
      }
    }`

  const result = await request(graphqlAPI, query)
  console.log("All Similar Posts:", result.posts);
  return result.posts
}


//////Get Category/////
export const getCategories = async () => {
  const query = gql`
    query GetCategories {
      categories {
        name
        id
        slug
      }
    }  
  `

  const result = await request(graphqlAPI, query);
  console.log("Category Name:",result.categories);
  return result.categories;

}


///////Get Post Details/////////
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug : String!) {
      post(where: {slug: $slug}) {
        title
        excerpt
        featuredImage {
          url
        }
        author{
          name
          bio
          photo {
            url
          }
        }
        createdAt
        slug
        content {
          raw
        }
        categories {
          name
          slug
        }
      }
    }
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.post;
};

