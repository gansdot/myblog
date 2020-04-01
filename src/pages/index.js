import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import HomeImage from "../components/homeimage";
import SideImage from "../components/sideimage";
import useSWR from "swr";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import fetch from "isomorphic-unfetch";
import "../css/styles.css";

const url = "http://localhost:3000/api/blogs";
const Index = ({ result }) => {
  const { data, error } = useSWR(url, {
    initialData: result
  });

  const [blog, setBlog] = useState(data);
  useEffect(() => {}, []);

  const image0 = useImage(1, blog);
  const image1 = useImage(2, blog);
  const image2 = useImage(3, blog);
  const image3 = useImage(4, blog);
  const image4 = useImage(5, blog);

  return (
    <React.Fragment>
      <Layout>
        <Container fluid={true}>
          <Row>
            <Col xl={5} className="mainImageHeading">
              <HomeImage {...image0} />
            </Col>
            <Col xl={7}>
              <Container fluid={true}>
                <Row>
                  <Col xl={6} className="text-left">
                    <SideImage {...image1} />
                  </Col>
                  <Col xl={6} className="text-left ">
                    <SideImage {...image2} />
                  </Col>
                </Row>
                <Row>
                  <Col xl={6} className="text-left">
                    <SideImage {...image3} />
                  </Col>
                  <Col xl={6} className="text-left">
                    <SideImage {...image4} />
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

function useImage(index, data) {
  const [image, setImage] = useState({ img: "/lon_b.jpg", title: "..." });
  useEffect(() => {
    setImage({
      img: data.length >= index ? data[index - 1].image : "/lon_b.jpg",
      title:
        data.length >= index
          ? data[index - 1].blogTitle.substring(0, 15) + "..."
          : "..."
    });
  }, []);
  return {
    image
  };
}

Index.getInitialProps = async ctx => {
  const response = await fetch(url);
  const result = await response.json();
  console.log("hello from server ");

  return { result };
};

export default Index;
