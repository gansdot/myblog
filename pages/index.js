import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import TitleLink from "../components/titlelink";
import Title from "../components/title";
import HomeImage from "../components/homeimage";
import SideImage from "../components/sideimage";

import { Container, Row, Col, Image } from "react-bootstrap";
import fetch from "isomorphic-unfetch";

const mainImageHeading = {
  textTransform: "capitalize",
  fontSize: "24px",
  textAlign: "center",
  boxSizing: "border-box",
  letterSpacing: "0px",
  fontWeight: "400",
  boxSizing: "border-box"
};

const Index = props => {
  const [blog, setBlog] = useState(props.blog);
  useEffect(() => {
    setBlog(props.blog);
  }, []);
  const title1 = useTitle(2, blog);
  const title2 = useTitle(3, blog);
  const title3 = useTitle(4, blog);
  const title4 = useTitle(5, blog);

  const image1 = useImage(2, blog);
  const image2 = useImage(3, blog);
  const image3 = useImage(4, blog);
  const image4 = useImage(5, blog);

  return (
    <React.Fragment>
      <Layout>
        <Container fluid={true}>
          <Row>
            <Col xl={5} className="text-center " style={mainImageHeading}>
              <Title blog={blog} headIndex="0" />
              <HomeImage blog={blog} imgIndex="0" />
            </Col>
            <Col xl={7}>
              <Container fluid={true}>
                <Row>
                  <Col xl={6} className="text-center">
                    <SideImage {...image1} />
                    <TitleLink {...title1} />
                  </Col>
                  <Col xl={6} className="text-center ">
                    <SideImage {...image2} />
                    <TitleLink {...title2} />
                  </Col>
                </Row>
                <Row>
                  <Col xl={6} className="text-center">
                    <SideImage {...image3} />
                    <TitleLink {...title3} />
                  </Col>
                  <Col xl={6} className="text-center">
                    <SideImage {...image4} />
                    <TitleLink {...title4} />
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </Layout>
    </React.Fragment>
  );
};

function useTitle(index, blog) {
  const [title, setTitle] = useState("...");
  useEffect(() => {
    setTitle(
      blog.length >= index
        ? blog[index - 1].blogTitle.substring(0, 15) + "..."
        : "..."
    );
  }, []);
  return {
    title
  };
}
function useImage(index, blog) {
  const [image, setImage] = useState("../public/cow.jpg");
  console.log("image value " + image);
  useEffect(() => {
    setImage(
      blog.length >= index ? blog[index - 1].image : "../public/lon_b.jpg"
    );
  }, []);
  return {
    image
  };
}

Index.getInitialProps = async () => {
  const response = await fetch("http://localhost:3000/api/blogs");
  const data = await response.json();
  //console.log("THis is data from api " + JSON.stringify(data));
  return { blog: data };
};

export default Index;
