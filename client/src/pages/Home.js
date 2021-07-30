import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
import { Grid, Transition } from "semantic-ui-react";

import { FETCH_POSTS_QUERY } from "../util/graphql";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Home() {
  const { user } = useContext(AuthContext);
  console.log(`logging user: ${user}`);
  const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);

  if (loading) return <h1 style={{ textAlign: "center" }}>Loading...</h1>;
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
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
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

export default Home;
