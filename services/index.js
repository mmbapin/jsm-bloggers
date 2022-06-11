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
export const getSimilarPosts = async (categories,slug) => {
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

  const result = await request(graphqlAPI, query, {categories, slug})
  console.log("All Similar Posts:", result.posts);
  return result.posts
}




/////////Get Category////////
export const getCategories = async () => {
  const query = gql`
    query GetCategories{
      categories{
        name,
        slug
      }
    }
  `

  const result = await request(graphqlAPI, query)
  return result.categories
}




//////Get Post Details ////////
export const getPostDetails = async (slug) => {
  const query = gql`
    query GetPostDetails($slug: String!) {
      post(where: {slug: $slug}){
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
        content{
          raw
        }
      }
    }
  `

  const result = await request(graphqlAPI, query, {slug});
  console.log("Post Details:", result.post);
  return result.post
};



///////////Post Comment/////
export const submitComment = async (obj) => {
  const result = await fetch('/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(obj),
  });

  return result.json()
}



/////////Get Comments////////
export const getComments = async (slug) => {
  const query = gql`
    query GetComments($slug: String!){
      comments(where: { post: { slug: $slug } } ){
        name,
        createdAt,
        comment
      }
    }
  `

  const result = await request(graphqlAPI, query, {slug})
  return result.comments
}



/////////Get Featured Post//////
export const getFeaturedPosts = async () => {
  const query = gql`
    query GetCategoryPost() {
      posts(where: {featuredPost: true}) {
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }   
  `;

  const result = await request(graphqlAPI, query);

  return result.posts;
};


///////Get Category Post//////
export const getCategoryPost = async (slug) => {
  const query = gql`
    query GetCategoryPost($slug: String!) {
      postsConnection(where: {categories_some: {slug: $slug}}) {
        edges {
          cursor
          node {
            author {
              bio
              name
              id
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
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
  `;

  const result = await request(graphqlAPI, query, { slug });

  return result.postsConnection.edges;
};