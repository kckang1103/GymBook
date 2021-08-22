import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Dimmer, Grid, Loader, Transition } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";

function Profile(props) {
  const { user } = useContext(AuthContext);
  console.log(`profile page: ${user}`);
  const username = user.username;

  // TODO cache update when new post created
  const { data, loading, error } = useQuery(FETCH_USER_POSTS_QUERY, {
    variables: {
      username,
    },
    update(cache) {
      const data = cache.readQuery({
        query: FETCH_USER_POSTS_QUERY,
      });
      cache.writeQuery({
        query: FETCH_USER_POSTS_QUERY,
        data: {
          data,
        },
      });
    },
  });

  if (loading)
    return (
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    );
  if (error) return `Error! ${error.message}`;

  while (data) {
    console.log(data);
    const { getUserPosts: posts } = data;

    return (
      <Grid columns={3}>
        <Grid.Row className="home-title">
          <h1 id="fonts">{username}'s Profile</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map((post) => <PostCard key={post.id} post={post} />)}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    );
  }
}

const FETCH_USER_POSTS_QUERY = gql`
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

export default Profile;
