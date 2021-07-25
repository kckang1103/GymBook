import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid, Transition } from 'semantic-ui-react';

import PostCard from '../components/PostCard';

function Home() {
    const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    if (data) {
    console.log(data);
    const { getPosts: posts } = data;

    return (
        <Grid columns={3}>
            <Grid.Row className="home-title">
                <h1>Recent Posts</h1>
            </Grid.Row>
            <Grid.Row>
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
        </Grid>
    );
                }
}

const FETCH_POSTS_QUERY = gql`
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
      __typename
    }
    likeCount
    likes {
      username
      __typename
    }
    __typename
  }
}
`;

export default Home;