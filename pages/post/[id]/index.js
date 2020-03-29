import React, { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Avatar from "react-avatar";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

const bydate = {
  fontSize: 12,
  fontFamily: `'Helvetica Neue' sans-serif`,
  fontWeight: "700",
  color: "#808080",
  paddingTop: 0,
  marginTop: "0px"
};
const blogBy = {
  fontSize: 12,
  fontFamily: `'Helvetica Neue' sans-serif`,
  fontWeight: "700",
  color: "#428bca",
  paddingTop: 6,
  marginTop: "12px",
  letterSpacing: "0.4px",
  boxSizing: "border-boxing"
};
const blogheading = {
  fontSize: 24,
  fontFamily: `'Helvetica Neue' sans-serif`,
  fontWeight: "400",
  color: "#000",
  paddingTop: 0,
  marginTop: "2px",
  boxSizing: "border-boxing",
  textTransform: "capitalize"
};
const cardText = {
  fontSize: 12,
  textAlign: "left",
  boxSizing: "border-box",
  letterSpacing: "0px",
  fontWeight: "400",
  color: "#333",
  marginBottom: "0px",
  padding: "0px",
  boxSizing: "border-box",
  textDecoration: "none"
};
const sideBarHeading = {
  fontSize: 12,
  fontFamily: `'Helvetica Neue' sans-serif`,
  fontWeight: "500",
  color: "#428bca",
  paddingBottom: 0,
  margin: "4px",
  letterSpacing: "0px",
  textAlign: "left",
  textDecoration: "none"
};

const Index = props => {
  const router = useRouter();
  const { id } = router.query;

  const [blogs, setBlogs] = useState(props.blogs);
  const [blog, setBlog] = useState(props.blogs[0]);

  useEffect(() => {
    console.log("inside effect ");
    props.blogs.map(b => {
      console.log("inside loop" + b.blogTitle);
      if (parseInt(b.id) === parseInt(id)) setBlog(b);
    });
    return () => {};
    //fetchBlog;
  }, [id]);

  // const fetchBlog = async () => {
  //   const { id } = context.query;
  //   console.log("this is fetched id " + id);
  //   const singleBlog = await fetch("http://localhost:3000/api/posts?id=" + id);
  //   const blog = await singleBlog.json();
  //   setBlog(blog);
  // };

  const fetchBlog = () => {
    //const { id } = context.query;
    const { blog } = useSWR("/api/blogs?id=" + id, fetch, { Suspense: true });
    console.log("blog " + blog);
    setBlog(blog);
  };

  return (
    <div>
      {/* body content goes here */}
      <Layout>
        <Container fluid={true}>
          <Row>
            <Col md={8}>
              <Row style={blogheading}>
                <span>{blog.blogTitle}</span>
              </Row>
              <Row>
                <div style={{ textAlign: "right", margin: "8px 2px" }}>
                  <Avatar facebookId="1570197833" size="60" round={true} />
                </div>
                <Col sm={10}>
                  <Row>
                    <div style={blogBy}>by {blog.author}</div>
                  </Row>
                  <Row>
                    <div style={bydate}>{blog.postedOn}</div>
                    {/* <Currdate postDate={props.postDate} /> */}
                  </Row>
                </Col>
              </Row>
              <Row>
                <img
                  //className="rounded"
                  src={blog.image}
                  alt="Blog Image"
                  width="600"
                  height="390"
                />
              </Row>
              <Row>
                <div style={{ width: "96%" }}>
                  <p style={cardText}>{blog.blogText}</p>
                </div>
              </Row>
            </Col>
            <Col md={4}>
              <Row>
                <div style={{ height: "40px" }}></div>
              </Row>
              <Row>
                <div
                  className="d-inline p-2 bg-dark text-white"
                  style={{
                    background: "#111",
                    height: "50px",
                    width: "200px",
                    padding: "6px 2px",
                    margin: "2px",
                    boxSizing: "border-box"
                  }}
                >
                  More from CodeGans
                </div>
              </Row>
              {blogs.map(b => (
                <Row key={b.postedOn}>
                  <dev style={sideBarHeading} key={b.id}>
                    <img
                      key={b.blogTitle}
                      style={{ float: "left" }}
                      className=" border border-info"
                      //src={"/static/" + b.blogImage}
                      src={b.image}
                      width="66"
                      height="42"
                    />
                    <Link key={b.id} href="/post/[id]" as={`/post/${b.id}`}>
                      <a>{b.blogTitle.substring(0, 20)}...</a>
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
  //const { id } = context.query;
  //console.log("this is fetched id " + id);
  //const singleBlog = await fetch("http://localhost:3000/api/posts?id=" + id);
  const manyBlogs = await fetch("http://localhost:3000/api/blogs");
  //const blog = await singleBlog.json();
  const blogs = await manyBlogs.json();
  //console.log("THis is data from api " + JSON.stringify(blog));
  return {
    blogs
    //blog
  };
};
export default Index;
