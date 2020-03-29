import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "./navbar";
const layoutContainer = {
  width: "80%",
  paddingRight: "7%",
  paddingLeft: "7%",
  marginRight: "auto",
  marginLeft: "auto"
};
const Layout = props => {
  return (
    <div>
      <Navigation />
      <div className="d-flex p-3  " />

      <Container style={layoutContainer}>{props.children}</Container>
    </div>
  );
};

export default Layout;
