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
  console.log("All Posts:", results.postsConnection.edges);
  return results.postsConnection.edges
};


////////Get All Recent Posts////////
export const getRecentPosts = async () => {
  const query = gql`
    query getPostDetails(){
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
    query getPostDetails($slug: String!, $categories: [String!]){
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
