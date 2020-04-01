import React from "react";
import Figure from "react-bootstrap/Figure";

const HomeImage = ({ image }) => {
  return (
    <Figure>
      <Figure.Caption>{image.title}</Figure.Caption>

      <Figure.Image
        width={340}
        height={230}
        alt="220x145"
        src={"/" + image.img}
      />
    </Figure>
  );
};

export default HomeImage;
