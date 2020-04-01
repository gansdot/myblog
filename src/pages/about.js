import React from "react";
import Layout from "../../components/layout";
import Navigation from "../../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <React.Fragment>
      <Layout>
        <p>
          <h2>About me</h2>
          This is Ganesan Mariappan. Am ReactJs, NextJs developer and front end
          designer as well.
        </p>
      </Layout>
    </React.Fragment>
  );
};

export default About;
