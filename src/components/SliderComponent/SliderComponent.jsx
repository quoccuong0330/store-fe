import React from "react";
import Slider from "react-slick";
import { Image } from "antd";

const SliderComponent = ({ arrImages }) => {
  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    preview: false,
    arrows: false,
  };
  return (
    <Slider {...settings}>
      {arrImages.map((item, index) => {
        return <Image src={item} key={index} width="90%" height={200}></Image>;
      })}
    </Slider>
  );
};

export default SliderComponent;
