import React from "react";
import Image from "react-bootstrap/Image";

const SideImage = ({ image }) => {
  return (
    <img
      //src={`/${image}`}

      src={"/" + image}
      width="220"
      height="145"
      className="border border-light img-fluid"
    />
  );
};

export default SideImage;
