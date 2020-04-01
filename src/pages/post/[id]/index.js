import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "react-avatar";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import "../../../css/styles.css";
import useSWR from "swr";

const url = "http://localhost:3000/api/blogs";

const Index = props => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useSWR(url, {
    initialData: props.blogs
  });

  if (data?.length === 0) return <div>Loading...</div>;

  const [blogs, setBlogs] = useState(data);
  const [blog, setBlog] = useState(data[0]);

  useEffect(() => {
    console.log("inside effect ");
    props.blogs.map(b => {
      console.log("inside loop" + b.blogTitle);
      if (parseInt(b.id) === parseInt(id)) setBlog(b);
    });

    return () => {};
    //fetchBlog;
  }, [id]);

  // const fetchBlog = () => {
  //   //const { id } = context.query;
  //   const { blog } = useSWR("/api/blogs?id=" + id, fetch, { Suspense: true });
  //   console.log("blog " + blog);
  //   setBlog(blog);
  // };

  return (
    <div>
      {/* body content goes here */}
      <Layout>
        <Container fluid={true}>
          <Row>
            <Col md={8}>
              <Row className="blogheading">
                <span>{blog.blogTitle}</span>
              </Row>
              <Row>
                <div style={{ textAlign: "right", margin: "8px 2px" }}>
                  <Avatar facebookId="1570197833" size="60" round={true} />
                </div>
                <Col sm={10}>
                  <Row>
                    <div className="blogBy">by {blog.author}</div>
                  </Row>
                  <Row>
                    <div className="bydate">{blog.postedOn}</div>
                  </Row>
                </Col>
              </Row>
              <Row>
                {/* <img
                  className="img-fluid"
                  src={"/" + blog.image}
                  alt="img"
                  //src={`/${blog.image}`}
                  width="600"
                  height="390"
                /> */}
                <figure className="figure">
                  <img
                    src={"/" + blog.image}
                    className="figure-img img-fluid rounded"
                    width="600"
                    height="390"
                  />
                  <figcaption className="figure-caption">
                    {blog.blogTitle}
                  </figcaption>
                </figure>
              </Row>
              <Row>
                <div style={{ width: "96%" }}>
                  <p className="cardText">{blog.blogText}</p>
                </div>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <div style={{ height: "40px" }}></div>
              </Row>
              <Row>
                <div className="d-inline p-2 bg-dark text-white ">
                  More from CodeGans
                </div>
              </Row>
              {blogs.map(b => (
                <Row key={b.postedOn}>
                  <dev className="sideBarHeading" key={b.id}>
                    <img
                      key={b.blogTitle}
                      style={{ float: "left" }}
                      className="img-fluid img-thumbnail"
                      src={"/" + b.image}
                      width="66"
                      height="42"
                    />
                    <Link key={b.id} href="/post/[id]" as={`/post/${b.id}`}>
                      <a>{b.blogTitle}</a>
                    </Link>
                  </dev>
                </Row>
              ))}
            </Col>
          </Row>
        </Container>
      </Layout>
      {/* this is for footer */}
    </div>
  );
};

Index.getInitialProps = async function(context) {
  const manyBlogs = await fetch(url);
  const blogs = await manyBlogs.json();
  return {
    blogs
  };
};
export default Index;
