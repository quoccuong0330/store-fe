import React from "react";
import TypeProductComponent from "../../components/TypeProductComponent/TypeProductComponent";
import {
  WrapperButton,
  WrapperHomePage,
  WrapperProduct,
  WrapperTypeProduct,
} from "./style";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import banner1 from "../../assets/images/banner_1.webp";
import banner2 from "../../assets/images/banner_2.webp";
import banner3 from "../../assets/images/banner_3.webp";
import CardProductComponent from "../../components/CardProductComponent/CardProductComponent";
import { Col, Pagination, Row } from "antd";
import NavbarComponent from "../../components/NavbarComponent/NavbarComponent";

const TypePage = () => {
  const arrProduct = [
    { name: "TV", link: "/tv" },
    { name: "Tu lanh", link: "/tu-lanh" },
    { name: "Laptop", link: "/laptop" },
  ];
  const arrCategory = ["Laptop1", "Laptop2", "Laptop3", "Laptop4"];

  const onChangePage = () => {};

  return (
    <div>
      <WrapperTypeProduct>
        {arrProduct.map((item, index) => {
          return (
            <TypeProductComponent
              name={item.name}
              link={item.link}
              key={index}
            />
          );
        })}
      </WrapperTypeProduct>
      <WrapperHomePage>
        <Row>
          <Col span={5}>
            <NavbarComponent arrCategory={arrCategory} />
          </Col>
          <Col span={19} push={1}>
            <SliderComponent arrImages={[banner1, banner2, banner3]} />
            <WrapperProduct>
              <CardProductComponent />
              <CardProductComponent />
              <CardProductComponent />
              <CardProductComponent />
              <CardProductComponent />
              <CardProductComponent />
              <CardProductComponent />
              <CardProductComponent />
              <CardProductComponent />
            </WrapperProduct>
            <WrapperButton>
              <Pagination
                defaultCurrent={1}
                total={100}
                onChange={onChangePage}
              />
            </WrapperButton>
          </Col>
        </Row>
      </WrapperHomePage>
    </div>
  );
};

export default TypePage;
