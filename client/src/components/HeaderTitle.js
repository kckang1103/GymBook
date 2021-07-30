import React from "react";
import { Header, Image, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";
import logo from "../images/gymBookLogo.png";

function HeaderTitle() {
  const header = (
    <Segment size="huge" basic textAlign={"center"}>
      <Header size="huge" as={Link} to="/">
        <Image verticalAlign='middle' centered size="massive"
          src={logo}
        />
        Gym Book
      </Header>
    </Segment>
  );

  return header;
}

export default HeaderTitle;
