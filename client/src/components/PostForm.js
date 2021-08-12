import React from "react";
import { Button, Form } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import bodypartOptions from "./Workouts";

function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
    bodypart: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(cache, result) {
      const allPosts = cache.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      cache.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...allPosts.getPosts],
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h3>Create a post</h3>
        <Form.Field>
          <Form.Input
            placeholder="Select category"
            name="body"
            fluid
            selection
            options={bodypartOptions}
            onChange={onChange}
            values={values.body}
          />

          {/* <Form.Input
            placeholder="Add a message"
            name="body"
            onChange={onChange}
            values={values.body}
            error={error ? true : false}
          /> */}
          <Button disabled={!values.body.trim()} type="submit" color="blue">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <li>{error.graphQLErrors[0].message}</li>
        </div>
      )}
    </>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;

export default PostForm;
