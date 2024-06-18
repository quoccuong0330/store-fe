import React from "react";
import { WrapperTypeProduct } from "./style";
import Link from "antd/es/typography/Link";

const TypeProductComponent = ({ name, link }) => {
  return (
    <WrapperTypeProduct>
      <Link href={link} style={{ color: "#000" }}>
        {name}
      </Link>
    </WrapperTypeProduct>
  );
};

export default TypeProductComponent;
