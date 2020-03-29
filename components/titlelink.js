import React, { useEffect, useState } from "react";
import Link from "next/link";
const imageHeading = {
  textTransform: "capitalize",
  fontSize: "15px",
  textAlign: "center",
  boxSizing: "border-box",
  letterSpacing: "0px",
  fontWeight: "400",
  boxSizing: "border-box",
  padding: "0 2px"
};
const TitleLink = ({ title }) => {
  return (
    <>
      <Link href="/">
        <a className="nav-link m-0 p-0 text-left" style={imageHeading}>
          {title}
        </a>
      </Link>
    </>
  );
};
export default TitleLink;
