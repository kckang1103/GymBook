import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../images/gymbookLogoGray.png";

function HeaderTitle() {
  const header = (
    <Segment basic textAlign={"center"}>
      <Header size="huge" as={Link} to="/">
        <Image
          circular
          src={logo}
        />{" "}
        Gym Book
      </Header>
    </Segment>
  );

  return header;
}

export default HeaderTitle;
