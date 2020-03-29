import React, { useState, useEffect } from "react";
import Link from "next/link";
const mainImageHeading = {
  textTransform: "capitalize",
  fontSize: "23px",
  textAlign: "center",
  boxSizing: "border-box",
  letterSpacing: "0px",
  fontWeight: "600",
  boxSizing: "border-box"
};
const Title = ({ blog, headIndex }) => {
  const [title, setTitle] = useState("...");
  useEffect(() => {
    setTitle(
      blog.length >= headIndex + 1
        ? blog[headIndex].blogTitle.substring(0, 15) + "..."
        : "..."
    );
  }, []);

  return <div style={{ marginTop: "20px" }}>{title}</div>;
};

export default Title;
