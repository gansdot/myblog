import React from "react";
import Layout from "../components/layout";
import Navigation from "../components/navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const About = () => {
  return (
    <React.Fragment>
      <Layout>
        <p>
          <h2>Who We Are</h2>
          HDFC Bank is one of India’s leading private banks and was among the
          first to receive approval from the Reserve Bank of India (RBI) to set
          up a private sector bank in 1994. Today, HDFC Bank has a banking
          network of 5,345 branches and 14,533 ATMs spread across 2,787 cities
          and towns.
        </p>
      </Layout>
    </React.Fragment>
  );
};

export default About;
