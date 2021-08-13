import React, { useState } from "react";
import { Button, Card, Dropdown, Form, Menu, Segment } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

import { useForm } from "../util/hooks";
import { FETCH_POSTS_QUERY } from "../util/graphql";
import bodypartOptions from "./Workouts";

function PostFormNew() {
  let text = "";

  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });

  const [value, setValue] = useState("");

  const handleSelect = (e) => {
    text = values.body
      .slice(0, values.body.lastIndexOf(e.target.innerHTML))
      .concat(e.target.innerHTML)
      .concat("\n");

    setValue({
      value: text.slice(0, text.lastIndexOf(e.target.innerHTML)).concat("\n"),
    });
    console.log("the value is: ", value);
    console.log("text is", text);
    values.body = text.concat("\n");
  };

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
    <Card fluid>
      <Form onSubmit={onSubmit}>
        <h3 style={{ textAlign: "center", marginTop: 12 }} id="fonts">Create a post</h3>
        <Form.Field id="fonts">
          <Segment.Group horizontal>
            <Segment textAlign="center">
              <Menu vertical>
                {bodypartOptions.map((bodypart, i) => (
                  <Dropdown
                    id="fonts"
                    basic
                    text={bodypart.text}
                    pointing="left"
                    className="link item"
                    key={i}
                  >
                    <Dropdown.Menu onClick={handleSelect}>
                      {bodypart.workouts.map((workout, i) => (
                        <Dropdown.Item
                          name="body"
                          onClick={handleSelect}
                          id="fonts"
                        >
                          {workout.text}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                ))}
              </Menu>
            </Segment>

            <Segment>
              <Form.TextArea
                id="fonts"
                className="textarea"
                placeholder="Add a description"
                name="body"
                onChange={onChange}
                value={values.body}
                error={error ? true : false}
              />
              <Button
                disabled={!values.body.trim()}
                type="submit"
                color="blue"
                id="fonts"
              >
                Submit
              </Button>
            </Segment>
          </Segment.Group>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <li>{error.graphQLErrors[0].message}</li>
        </div>
      )}
    </Card>
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

export default PostFormNew;
