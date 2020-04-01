import React from "react";
import { Container } from "react-bootstrap";
import Navigation from "./navbar";
import { SWRConfig } from "swr";
import fetch from "isomorphic-unfetch";

const layoutContainer = {
  width: "80%",
  paddingRight: "7%",
  paddingLeft: "7%",
  marginRight: "auto",
  marginLeft: "auto"
};
const fetcher = (...args) => fetch(...args).then(res => res.data);

const Layout = props => {
  return (
    <div>
      <Navigation />
      <div className="d-flex p-3  " />
      <SWRConfig value={{ dedupingInterval: 5000, fetcher }}>
        <Container style={layoutContainer}>{props.children}</Container>
      </SWRConfig>
    </div>
  );
};

export default Layout;
