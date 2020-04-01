import React from "react";
import Figure from "react-bootstrap/Figure";

const SideImage = ({ image }) => {
  return (
    <Figure>
      <Figure.Image
        width={220}
        height={145}
        alt="220x145"
        src={"/" + image.img}
      />
      <Figure.Caption>{image.title}</Figure.Caption>
    </Figure>

    // <img
    //   //src={`/${image}`}

    //   src={"/" + image}
    //   width="220"
    //   height="145"
    //   className="border border-light img-fluid"
    // />
  );
};

export default SideImage;
