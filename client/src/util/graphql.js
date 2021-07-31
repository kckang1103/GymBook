import gql from "graphql-tag";

export const FETCH_POSTS_QUERY = gql`
  query GetPosts {
    getPosts {
      id
      body
      createdAt
      username
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      likeCount
      likes {
        username
      }
    }
  }
`;

export const FETCH_USER_POSTS_QUERY = gql`
  query ($username: String!) {
    getUserPosts(username: $username) {
      id
      body
      createdAt
      username
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
      likeCount
      likes {
        username
      }
    }
  }
`;
