import React from "react";
import { Divider, Label, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

function Footer() {
  const footer = (
    <>
      <Segment rasied size="small" basic textAlign={"center"}>
        <Divider />
        Created by <Label as="a" href="https://www.kichulkang.com/">Kichul Kang</Label>
      </Segment>
    </>
  );

  return footer;
}

export default Footer;
