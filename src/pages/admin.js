import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import Alert from "react-bootstrap/Alert";
import fetch from "isomorphic-unfetch";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Container from "react-bootstrap/Container";
import Layout from "../components/layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const style = {
  paddingLeft: 200,
  marginRight: 200
};

const Admin = ({ data }) => {
  const filemsg =
    "For higher resolution, select Image checkbox and paste the file path here.";
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [variant, setVariant] = useState("success");
  const [message, setMessage] = useState("saved successfully. Stay cool.");
  const [image, setImage] = useState();
  const [filename, setFilename] = useState(filemsg);
  const [controlType, setControlType] = useState("file");
  const [isChecked, setIsChecked] = useState(false);
  const [blog, setBlog] = useState({
    id: "",
    blogCategory: "",
    blogTitle: "",
    slug: "",
    postedOn: "",
    author: "",
    blogImage: "",
    blogText: "",
    isBinary: "file"
  });

  useEffect(() => {
    if (invalid) {
      setVariant("danger");
      setMessage("not saved. Check your file name ");
    }
    return () => {
      //any cleanup
    };
  }, [variant, message]);

  function handleSubmit(event) {
    if (filename !== filemsg) {
      //console.log("inside handleSubmit ******** " + JSON.stringify(blog));
      setValidated(false);
      persistBlog();
      setShow(true);
    } else {
      setValidated(true);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  const persistBlog = async () => {
    try {
      const apiurl = controlType === "file" ? "blogs" : "upload";
      const isBinary = controlType === "file" ? "yes" : "no";
      const imagedata = controlType === "file" ? image : filename;

      const response = await fetch("http://localhost:3000/api/" + apiurl, {
        mode: "no-cors",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          type: "formData"
        },
        body: JSON.stringify({ ...blog, image: imagedata, isBinary })
      });
      const result = await response.json();
    } catch (error) {
      setInvalid(error);
    }
  };

  useEffect(() => {
    if (!isChecked) {
      console.log("after render filename " + filename);
      setFilename(filename);
    }
  }, [isChecked]);
  const onChange = e => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };
  const chooseFileControl = e => {
    console.log(e.target.value);
    setIsChecked(!isChecked);
    setControlType(!isChecked ? "text" : "file");

    setFilename(filename !== filemsg ? "" : filename);
  };
  const handleChange = e => {
    var fileInput = false;
    if (controlType === "file" && e.target.files[0]) {
      fileInput = true;
    } else {
      setFilename(e.target.value);
    }
    if (fileInput) {
      setFilename(e.target.files[0].name);
      Resizer.imageFileResizer(
        e.target.files[0],
        600,
        360,
        "JPEG",
        70,
        0,
        uri => {
          setImage(uri);
        },
        "base64"
      );
    }
  };

  return (
    <div>
      <Layout>
        <h3 style={{ paddingLeft: "15px" }}>Blog Writing Administrator</h3>
        <Container className="p-3" fluid={true}>
          <Form noValidate validated={validated}>
            {/* {image.preview ? (
              <img src={image.preview} width="300" height="200" alt="img" />
            ) : (
              <> */}
            <InputGroup className="mb-4" controlid="category">
              <InputGroup.Prepend>
                <InputGroup.Text
                  id="basic-addon1"
                  className="text-right"
                  style={{ width: "100px" }}
                >
                  Category
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Category"
                aria-label="small"
                aria-describedby="basic-addon1"
                name="blogCategory"
                id="blogCategory"
                value={blog.blogCategory}
                onChange={onChange}
                required
              />
            </InputGroup>

            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ width: "100px", textAlign: "right" }}
                >
                  Title
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Title"
                aria-label="Title"
                aria-describedby="basic-addon1"
                name="blogTitle"
                id="blogTitle"
                value={blog.blogTitle}
                onChange={onChange}
                required
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ width: "100px", textAlign: "right" }}
                >
                  Tag
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Tags"
                aria-label="Tags"
                aria-describedby="basic-addon1"
                name="slug"
                id="slug"
                value={blog.slug}
                onChange={onChange}
              />
            </InputGroup>
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ width: "100px", textAlign: "right" }}
                >
                  Author
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Author"
                aria-label="Author"
                aria-describedby="basic-addon1"
                name="author"
                id="author"
                value={blog.author}
                onChange={onChange}
                required
              />
            </InputGroup>
            {/* <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ width: "100px", textAlign: "right" }}
                >
                  Image
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Copy and paste the image URL here.."
                aria-label="image"
                aria-describedby="basic-addon1"
                name="blogImage"
                id="blogImage"
                value={blog.blogImage}
                onChange={onChange}
                required
              />
            </InputGroup> */}
            {/* </>
            )} */}
            <div className="input-group mb-3" alt={filemsg}>
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  style={{ width: "100px", textAlign: "right" }}
                >
                  Image
                  <div style={{ width: "80%", marginBottom: "1px" }}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={chooseFileControl}
                      aria-label="Checkbox for following text input"
                    />
                  </div>
                </span>
              </div>
              <div className="custom-file">
                <input
                  type={controlType}
                  className="custom-file-input"
                  onChange={handleChange}
                  id="blogImage"
                />

                <label className="custom-file-label" htmlFor="blogImage">
                  {filename}
                </label>
              </div>
            </div>
            <InputGroup className="mb-4">
              <InputGroup.Prepend>
                <InputGroup.Text
                  id="basic-addon1"
                  style={{ width: "100px", textAlign: "right" }}
                >
                  Description
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                as="textarea"
                placeholder="Blog description"
                aria-label="With textarea"
                name="blogText"
                id="blogText"
                value={blog.blogText}
                onChange={onChange}
              />
            </InputGroup>

            {!show && (
              <Button
                className="btn-block"
                onClick={() => {
                  handleSubmit(event);
                  //persistBlog();
                }}
              >
                Save Blog
              </Button>
            )}
          </Form>
        </Container>

        <Alert show={show} variant={variant}>
          <Alert.Heading>Your blog data</Alert.Heading>
          <Row>
            <Col>
              <p> {message}</p>
            </Col>
            <Col>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => {
                    setShow(false);
                    setBlog({
                      id: "",
                      blogCategory: "",
                      blogTitle: "",
                      slug: "",
                      postedOn: "",
                      author: "",
                      blogImage: "",
                      blogText: ""
                    });
                  }}
                  variant="outline-success"
                >
                  Close me
                </Button>
              </div>
            </Col>
          </Row>
        </Alert>
      </Layout>
    </div>
  );
};

export default Admin;
