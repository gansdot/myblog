import React, { useState, useEffect } from "react";

const HomeImage = ({ blog, imgIndex }) => {
  const [image, setImage] = useState("../public/cow.jpg");
  useEffect(() => {
    setImage(
      blog.length >= imgIndex + 1 ? blog[imgIndex].image : "../public/lon_b.jpg"
    );
  }, [image]);

  return (
    <img
      src={image}
      className="text-center"
      width="340"
      height="230"
      style={{ margin: "0px 40px 40px 30px" }}
    />
  );
};

export default HomeImage;