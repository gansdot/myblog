import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import TitleLink from "../components/titlelink";
import Title from "../components/title";
import HomeImage from "../components/homeimage";
import SideImage from "../components/sideimage";
import Figure from "react-bootstrap/Figure";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import useSWR, { mutate } from "swr";
import fetch from "isomorphic-unfetch";

const Index = () => {
  return (
    <React.Fragment>
      <Layout>
        <Container>
          <BlogsData />
        </Container>
      </Layout>
    </React.Fragment>
  );
};

const BlogsData = () => {
  const url = "http://localhost:3000/api/blogs";

  const { data, error } = useSWR(url);

  console.log(data);

  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;

  return <ImageData blogs={data} />;
};

const ImageData = ({ blogs }) => {
  return blogs.map(blog => (
    <div key={blog.id}>
      <Figure>
        <Figure.Image
          width={220}
          height={145}
          alt="220x145"
          src={"/" + blog.image}
        />
        <Figure.Caption>{blog.title}</Figure.Caption>
      </Figure>
    </div>
  ));
};

Index.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();
  return { blogs: data };
};

export default Index;
