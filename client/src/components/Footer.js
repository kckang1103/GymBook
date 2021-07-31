import React from "react";
import { Container, Divider, Label, Segment } from "semantic-ui-react";

function Footer() {
  const footer = (
    <Container fluid className="footer-container">
      <Segment
        raised
        size="small"
        basic
        textAlign={"center"}
        className="footer"
      >
        <Divider />
        Created by{" "}
        <Label as="a" href="https://www.kichulkang.com/">
          Kichul Kang
        </Label>
      </Segment>
    </Container>
  );

  return footer;
}

export default Footer;
